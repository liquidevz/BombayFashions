import ProductForm from "@/components/forms/product-form";
import dbConnect from "@/lib/db";
import Category from "@/lib/models/Category";

async function getCategories() {
  await dbConnect();
  const categories = await Category.find({});
  return categories;
}

export default async function NewProduct() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <ProductForm
          action="/api/admin/products/create"
          categories={JSON.parse(JSON.stringify(categories))}
        />
      </div>
    </div>
  );
} 