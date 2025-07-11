import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/lib/models/Blog";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const formData = await request.formData();
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      {
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        date: formData.get("date"),
        author: formData.get("author"),
        imageUrl: formData.get("imageUrl"),
      },
      { new: true }
    );
    
    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    return NextResponse.redirect(new URL("/admin/blogs", request.url));
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
} 