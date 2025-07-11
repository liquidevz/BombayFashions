import BlogForm from "@/components/forms/blog-form";

export default function NewBlog() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <BlogForm action="/api/admin/blogs/create" />
      </div>
    </div>
  );
} 