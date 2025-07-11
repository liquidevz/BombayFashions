import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blogData = await fs.readFile(path.join(process.cwd(), "lib/blog-data.json"), "utf-8");
    const data = JSON.parse(blogData);
    
    data.blogs = data.blogs.filter((b: any) => b.id.toString() !== params.id);
    
    await fs.writeFile(
      path.join(process.cwd(), "lib/blog-data.json"),
      JSON.stringify(data, null, 2)
    );
    
    return NextResponse.redirect(new URL("/admin/blogs", request.url));
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
} 