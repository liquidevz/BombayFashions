import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import ProductForm from "@/components/forms/product-form";

async function getData(id: string) {
  const productData = await fs.readFile(path.join(process.cwd(), "lib/product-data.json"), "utf-8");
  const data = JSON.parse(productData);
  const product = data.products.find((p: any) => p.id.toString() === id);
  
  if (!product) {
    notFound();
  }
  
  return {
    product,
    categories: data.categories,
  };
}

export default async function EditProduct({ params }: { params: { id: string } }) {
  const { product, categories } = await getData(params.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <ProductForm
          product={product}
          action={`/api/admin/products/${params.id}/update`}
          categories={categories}
        />
      </div>
    </div>
  );
} 