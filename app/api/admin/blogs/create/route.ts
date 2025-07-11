import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const blogData = await fs.readFile(path.join(process.cwd(), "lib/blog-data.json"), "utf-8");
    const data = JSON.parse(blogData);
    
    // Get the highest ID and increment by 1
    const maxId = Math.max(...data.blogs.map((b: any) => b.id), 0);
    const newBlog = {
      id: maxId + 1,
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      date: formData.get("date"),
      author: formData.get("author"),
      imageUrl: formData.get("imageUrl"),
    };
    
    data.blogs.push(newBlog);
    
    await fs.writeFile(
      path.join(process.cwd(), "lib/blog-data.json"),
      JSON.stringify(data, null, 2)
    );
    
    return NextResponse.redirect(new URL("/admin/blogs", request.url));
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
} 