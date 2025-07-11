import { notFound } from "next/navigation";
import ProductForm from "@/components/forms/product-form";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

async function getData(id: string) {
  await dbConnect();
  const [product, categories] = await Promise.all([
    Product.findById(id),
    Category.find({})
  ]);
  
  if (!product) {
    notFound();
  }
  
  return {
    product,
    categories,
  };
}

export default async function EditProduct({ params }: { params: { id: string } }) {
  const { product, categories } = await getData(params.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <ProductForm
          product={JSON.parse(JSON.stringify(product))}
          action={`/api/admin/products/${params.id}/update`}
          categories={JSON.parse(JSON.stringify(categories))}
        />
      </div>
    </div>
  );
} 