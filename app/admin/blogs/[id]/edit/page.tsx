import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import BlogForm from "@/components/forms/blog-form";

async function getBlog(id: string) {
  const blogData = await fs.readFile(path.join(process.cwd(), "lib/blog-data.json"), "utf-8");
  const blogs = JSON.parse(blogData).blogs;
  const blog = blogs.find((b: any) => b.id.toString() === id);
  
  if (!blog) {
    notFound();
  }
  
  return blog;
}

export default async function EditBlog({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <BlogForm
          blog={blog}
          action={`/api/admin/blogs/${params.id}/update`}
        />
      </div>
    </div>
  );
} 