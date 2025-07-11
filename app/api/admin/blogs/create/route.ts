import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Blog from "@/lib/models/Blog";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    
    const newBlog = await Blog.create({
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      date: formData.get("date"),
      author: formData.get("author"),
      imageUrl: formData.get("imageUrl"),
    });
    
    return NextResponse.redirect(new URL("/admin/blogs", request.url));
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
} 