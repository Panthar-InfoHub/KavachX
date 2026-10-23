import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { requireAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function POST(
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

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: { message: "Blog not found" } },
        { status: 404 }
      );
    }

    if (blog.isDeleted) {
      return NextResponse.json(
        { success: false, error: { message: "Cannot feature a deleted blog." } },
        { status: 400 }
      );
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Body may be empty if simple toggle request
    }

    const targetFeatured =
      typeof body.isFeatured === "boolean" ? body.isFeatured : !blog.isFeatured;

    if (targetFeatured) {
      // Unfeature any currently featured blog
      await Blog.updateMany({ isFeatured: true }, { isFeatured: false });
      blog.isFeatured = true;
    } else {
      blog.isFeatured = false;
    }

    await blog.save();

    revalidatePath("/blogs");
    revalidatePath(`/blogs/${blog.slug}`);

    return NextResponse.json({
      success: true,
      message: blog.isFeatured
        ? "Blog marked as featured"
        : "Blog unfeatured",
      data: {
        id: blog._id.toString(),
        title: blog.title,
        isFeatured: blog.isFeatured,
      },
    });
  } catch (error: any) {
    console.error("POST /api/blogs/[id]/feature Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Internal server error" } },
      { status: 500 }
    );
  }
}
