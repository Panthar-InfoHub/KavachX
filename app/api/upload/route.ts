import { NextResponse } from "next/server";
import sharp from "sharp";
import { requireAdmin } from "@/lib/admin";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    // 1. Authenticate & Authorize Admin
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: { message: authResult.error } },
        { status: authResult.status }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    let inputBuffer: Buffer;
    let mimeType = "image/jpeg";

    // 2. Parse File Buffer from Request (Multipart FormData or JSON Base64)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, error: { message: "No file provided in form data" } },
          { status: 400 }
        );
      }

      mimeType = file.type || "image/jpeg";

      // File type validation
      if (!mimeType.startsWith("image/")) {
        return NextResponse.json(
          { success: false, error: { message: "Uploaded file must be an image (JPEG, PNG, WebP, etc.)" } },
          { status: 400 }
        );
      }

      // Max size limit validation (50MB)
      if (file.size > 50 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: { message: "Image size exceeds 50MB limit. Please upload a smaller image." } },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      inputBuffer = Buffer.from(bytes);
    } else if (contentType.includes("application/json")) {
      let body: any;
      try {
        body = await req.json();
      } catch {
        return NextResponse.json(
          { success: false, error: { message: "Invalid JSON request body" } },
          { status: 400 }
        );
      }

      if (!body.file || typeof body.file !== "string") {
        return NextResponse.json(
          { success: false, error: { message: "No image file or base64 string provided" } },
          { status: 400 }
        );
      }

      // Base64 string handling
      const base64Data = body.file.replace(/^data:image\/\w+;base64,/, "");
      inputBuffer = Buffer.from(base64Data, "base64");
    } else {
      return NextResponse.json(
        { success: false, error: { message: "Unsupported Content-Type header" } },
        { status: 400 }
      );
    }

    // 3. Sharp Optimization Pipeline
    let sharpPipeline = sharp(inputBuffer).rotate(); // Auto-orient EXIF metadata

    // Inspect metadata
    const metadata = await sharpPipeline.metadata();

    // Verify actual image format
    if (!metadata.format) {
      return NextResponse.json(
        { success: false, error: { message: "File content is not a valid image format." } },
        { status: 400 }
      );
    }

    // Max dimension constraint (2400px width/height), without upscaling smaller images
    if ((metadata.width && metadata.width > 2400) || (metadata.height && metadata.height > 2400)) {
      sharpPipeline = sharpPipeline.resize({
        width: 2400,
        height: 2400,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    // High-quality WebP encoding with alpha channel / transparency support
    sharpPipeline = sharpPipeline.webp({
      quality: 82,
      alphaQuality: 85,
      effort: 4,
    });

    let optimizedBuffer = await sharpPipeline.toBuffer();

    // Small Image Guardrail: If original buffer is smaller than optimized output, retain original
    let finalBuffer: Buffer = optimizedBuffer;
    let finalMimeType = "image/webp";

    if (inputBuffer.length < optimizedBuffer.length) {
      finalBuffer = Buffer.from(inputBuffer);
      finalMimeType = mimeType;
    }

    // Calculate compression metric
    const reductionPercent = Math.max(
      0,
      Math.round(((inputBuffer.length - finalBuffer.length) / inputBuffer.length) * 100)
    );

    // 4. Upload Optimized Buffer to Cloudinary
    const fileDataUri = `data:${finalMimeType};base64,${finalBuffer.toString("base64")}`;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "dqmkau6vi";

    let uploadResult: {
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      format: string;
    } | null = null;

    try {
      // Primary: Signed Cloudinary Upload
      const res = await cloudinary.uploader.upload(fileDataUri, {
        folder: "kavachx/blogs",
        resource_type: "image",
      });
      uploadResult = {
        secure_url: res.secure_url,
        public_id: res.public_id,
        width: res.width,
        height: res.height,
        format: res.format,
      };
    } catch (uploadErr: any) {
      console.warn("Cloudinary signed upload failed:", uploadErr.message);

      // Fallback: Try unsigned upload with fallback upload presets
      if (
        uploadErr?.message?.includes("Invalid Signature") ||
        uploadErr?.http_code === 401
      ) {
        const presetsToTry = [
          process.env.CLOUDINARY_UPLOAD_PRESET,
          "ml_default",
          "kavachx",
          "unsigned_preset",
        ].filter(Boolean) as string[];

        for (const preset of presetsToTry) {
          try {
            const formData = new FormData();
            formData.append("file", fileDataUri);
            formData.append("upload_preset", preset);
            formData.append("folder", "kavachx/blogs");

            const unsignedRes = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );

            const unsignedData = await unsignedRes.json();
            if (unsignedData.secure_url) {
              uploadResult = {
                secure_url: unsignedData.secure_url,
                public_id: unsignedData.public_id,
                width: unsignedData.width,
                height: unsignedData.height,
                format: unsignedData.format,
              };
              break;
            }
          } catch {
            // Try next preset
          }
        }
      }

      if (!uploadResult) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message:
                "Cloudinary authentication failed (Invalid Signature). Please check your CLOUDINARY_API_SECRET in .env.local (Cloudinary Dashboard -> API Keys -> API Secret).",
            },
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        originalSize: inputBuffer.length,
        optimizedSize: finalBuffer.length,
        reductionPercent,
      },
    });
  } catch (error: any) {
    console.error("POST /api/upload Error:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message || "Failed to process and upload image" } },
      { status: 500 }
    );
  }
}
