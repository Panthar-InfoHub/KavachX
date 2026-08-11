import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function POST(
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

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: { message: "Blog not found" } },
        { status: 404 }
      );
    }

    blog.status = "DRAFT";
    blog.publishedAt = null;
    await blog.save();

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blog.slug}`);

    return NextResponse.json({
      success: true,
      message: "Blog moved to draft",
      data: {
        id: blog._id.toString(),
        title: blog.title,
        status: blog.status,
        publishedAt: blog.publishedAt,
      },
    });
  } catch (error: any) {
    console.error("POST /api/blogs/[id]/unpublish Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
