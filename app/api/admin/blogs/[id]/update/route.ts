import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const blogData = await fs.readFile(path.join(process.cwd(), "lib/blog-data.json"), "utf-8");
    const data = JSON.parse(blogData);
    
    const blogIndex = data.blogs.findIndex((b: any) => b.id.toString() === params.id);
    
    if (blogIndex === -1) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    
    const updatedBlog = {
      ...data.blogs[blogIndex],
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      date: formData.get("date"),
      author: formData.get("author"),
      imageUrl: formData.get("imageUrl"),
    };
    
    data.blogs[blogIndex] = updatedBlog;
    
    await fs.writeFile(
      path.join(process.cwd(), "lib/blog-data.json"),
      JSON.stringify(data, null, 2)
    );
    
    return NextResponse.redirect(new URL("/admin/blogs", request.url));
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
} 