import fs from "fs/promises";
import path from "path";
import ProductForm from "@/components/forms/product-form";

async function getCategories() {
  const productData = await fs.readFile(path.join(process.cwd(), "lib/product-data.json"), "utf-8");
  return JSON.parse(productData).categories;
}

export default async function NewProduct() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <ProductForm
          action="/api/admin/products/create"
          categories={categories}
        />
      </div>
    </div>
  );
} 