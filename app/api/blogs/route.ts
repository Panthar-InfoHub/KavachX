import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(req: Request) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: { message: authResult.error } },
        { status: authResult.status }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const rawLimit = parseInt(searchParams.get("limit") || "10", 10);
    const limit = Math.min(50, Math.max(1, isNaN(rawLimit) ? 10 : rawLimit));
    const search = searchParams.get("search")?.trim() || "";
    const statusParam = searchParams.get("status")?.toUpperCase() || "ALL";

    // Build MongoDB filter query
    const filter: Record<string, any> = {};

    if (statusParam === "DELETED") {
      filter.isDeleted = true;
    } else if (statusParam === "DRAFT" || statusParam === "PUBLISHED") {
      filter.isDeleted = { $ne: true };
      filter.status = statusParam;
    } else {
      // "ALL" active (non-deleted) blogs
      filter.isDeleted = { $ne: true };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Blog.countDocuments(filter);
    const totalPages = Math.ceil(total / limit) || 1;
    const skip = (page - 1) * limit;

    const blogDocs = await Blog.find(filter)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const blogs = blogDocs.map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt || "",
      content: doc.content || "",
      coverImage: doc.coverImage || "",
      status: doc.status,
      authorEmail: doc.authorEmail,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      publishedAt: doc.publishedAt || null,
      isDeleted: Boolean(doc.isDeleted),
      deletedAt: doc.deletedAt || null,
    }));

    return NextResponse.json({
      success: true,
      data: {
        blogs,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
    });
  } catch (error: any) {
    console.error("GET /api/blogs Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch blogs" } },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return NextResponse.json(
        { success: false, error: { message: authResult.error } },
        { status: authResult.status }
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

    const { title, slug, excerpt, content, coverImage, status } = body || {};

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, error: { message: "Title is required" } },
        { status: 400 }
      );
    }

    if (!slug || typeof slug !== "string" || !slug.trim()) {
      return NextResponse.json(
        { success: false, error: { message: "Slug is required" } },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { success: false, error: { message: "Content is required" } },
        { status: 400 }
      );
    }

    const normalizedSlug = slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");

    // Check slug uniqueness
    const existingBlog = await Blog.findOne({
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

    // Always derive author email from authenticated session
    const authorEmail = authResult.user.email;

    const initialStatus = status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
    const initialPublishedAt = initialStatus === "PUBLISHED" ? new Date() : null;

    if (coverImage && typeof coverImage === "string" && coverImage.trim()) {
      const trimmedUrl = coverImage.trim();
      if (
        !/^https?:\/\//i.test(trimmedUrl) &&
        !/^\//.test(trimmedUrl)
      ) {
        return NextResponse.json(
          { success: false, error: { message: "Cover image must be a valid HTTP/HTTPS or relative URL" } },
          { status: 400 }
        );
      }
    }

    const newBlog = await Blog.create({
      title: title.trim(),
      slug: normalizedSlug,
      excerpt: typeof excerpt === "string" ? excerpt.trim() : "",
      content: content.trim(),
      coverImage: typeof coverImage === "string" ? coverImage.trim() : "",
      status: initialStatus,
      authorEmail,
      publishedAt: initialPublishedAt,
      isDeleted: false,
      deletedAt: null,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newBlog._id.toString(),
          title: newBlog.title,
          slug: newBlog.slug,
          excerpt: newBlog.excerpt,
          content: newBlog.content,
          coverImage: newBlog.coverImage,
          status: newBlog.status,
          authorEmail: newBlog.authorEmail,
          createdAt: newBlog.createdAt,
          updatedAt: newBlog.updatedAt,
          publishedAt: newBlog.publishedAt,
          isDeleted: newBlog.isDeleted,
          deletedAt: newBlog.deletedAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/blogs Error:", error);
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
