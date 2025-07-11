import { notFound } from "next/navigation";
import BlogForm from "@/components/forms/blog-form";
import dbConnect from "@/lib/db";
import Blog from "@/lib/models/Blog";

async function getBlog(id: string) {
  await dbConnect();
  const blog = await Blog.findById(id);
  
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
          blog={JSON.parse(JSON.stringify(blog))}
          action={`/api/admin/blogs/${params.id}/update`}
        />
      </div>
    </div>
  );
} 