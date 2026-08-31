import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: { message: authResult.error } },
        { status: authResult.status }
      );
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid blog ID format" } },
        { status: 400 }
      );
    }

    await connectDB();

    const blogDoc = await Blog.findById(id).lean();
    if (!blogDoc) {
      return NextResponse.json(
        { success: false, error: { message: "Blog not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (blogDoc as any)._id.toString(),
        title: (blogDoc as any).title,
        slug: (blogDoc as any).slug,
        excerpt: (blogDoc as any).excerpt || "",
        content: (blogDoc as any).content || "",
        coverImage: (blogDoc as any).coverImage || "",
        status: (blogDoc as any).status,
        authorEmail: (blogDoc as any).authorEmail,
        createdAt: (blogDoc as any).createdAt,
        updatedAt: (blogDoc as any).updatedAt,
        publishedAt: (blogDoc as any).publishedAt || null,
        isFeatured: Boolean((blogDoc as any).isFeatured),
        isDeleted: Boolean((blogDoc as any).isDeleted),
        deletedAt: (blogDoc as any).deletedAt || null,
      },
    });
  } catch (error: any) {
    console.error("GET /api/blogs/[id] Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: { message: authResult.error } },
        { status: authResult.status }
      );
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid blog ID format" } },
        { status: 400 }
      );
    }

    await connectDB();

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: { message: "Invalid JSON request body" } },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: { message: "Blog not found" } },
        { status: 404 }
      );
    }

    const { title, slug, excerpt, content, coverImage, status, isFeatured } = body || {};

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return NextResponse.json(
          { success: false, error: { message: "Title cannot be empty" } },
          { status: 400 }
        );
      }
      blog.title = title.trim();
    }

    if (slug !== undefined) {
      if (typeof slug !== "string" || !slug.trim()) {
        return NextResponse.json(
          { success: false, error: { message: "Slug cannot be empty" } },
          { status: 400 }
        );
      }
      const normalizedSlug = slug
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-");

      if (normalizedSlug !== blog.slug) {
        const existingBlog = await Blog.findOne({
          _id: { $ne: id },
          slug: normalizedSlug,
          isDeleted: { $ne: true },
        });

        if (existingBlog) {
          return NextResponse.json(
            {
              success: false,
              error: { message: "A blog with this slug already exists." },
            },
            { status: 409 }
          );
        }
        blog.slug = normalizedSlug;
      }
    }

    if (excerpt !== undefined) {
      blog.excerpt = typeof excerpt === "string" ? excerpt.trim() : "";
    }

    if (content !== undefined) {
      if (typeof content !== "string" || !content.trim()) {
        return NextResponse.json(
          { success: false, error: { message: "Content cannot be empty" } },
          { status: 400 }
        );
      }
      blog.content = content.trim();
    }

    if (coverImage !== undefined) {
      const trimmed = typeof coverImage === "string" ? coverImage.trim() : "";
      if (
        trimmed &&
        !/^https?:\/\//i.test(trimmed) &&
        !/^\//.test(trimmed)
      ) {
        return NextResponse.json(
          { success: false, error: { message: "Cover image must be a valid HTTP/HTTPS or relative URL" } },
          { status: 400 }
        );
      }
      blog.coverImage = trimmed;
    }

    if (status !== undefined) {
      if (status === "PUBLISHED") {
        blog.status = "PUBLISHED";
        blog.publishedAt = blog.publishedAt || new Date();
      } else if (status === "DRAFT") {
        blog.status = "DRAFT";
        blog.publishedAt = null;
      } else {
        return NextResponse.json(
          { success: false, error: { message: "Invalid status value" } },
          { status: 400 }
        );
      }
    }

    if (isFeatured !== undefined) {
      if (Boolean(isFeatured)) {
        await Blog.updateMany({ _id: { $ne: id }, isFeatured: true }, { isFeatured: false });
        blog.isFeatured = true;
      } else {
        blog.isFeatured = false;
      }
    }

    await blog.save();

    return NextResponse.json({
      success: true,
      data: {
        id: blog._id.toString(),
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        coverImage: blog.coverImage,
        status: blog.status,
        authorEmail: blog.authorEmail,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt,
        publishedAt: blog.publishedAt,
        isFeatured: Boolean(blog.isFeatured),
        isDeleted: blog.isDeleted,
        deletedAt: blog.deletedAt,
      },
    });
  } catch (error: any) {
    console.error("PATCH /api/blogs/[id] Error:", error);
    if (error.code === 11000 || error.name === "MongoServerError") {
      return NextResponse.json(
        { success: false, error: { message: "A blog with this slug already exists." } },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: { message: authResult.error } },
        { status: authResult.status }
      );
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: { message: "Invalid blog ID format" } },
        { status: 400 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const permanent = searchParams.get("permanent") === "true";

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: { message: "Blog not found" } },
        { status: 404 }
      );
    }

    if (permanent) {
      await Blog.findByIdAndDelete(id);
      return NextResponse.json({
        success: true,
        message: "Blog permanently deleted",
      });
    }

    // Default: Soft Delete
    blog.isDeleted = true;
    blog.deletedAt = new Date();
    await blog.save();

    return NextResponse.json({
      success: true,
      message: "Blog moved to trash",
    });
  } catch (error: any) {
    console.error("DELETE /api/blogs/[id] Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
