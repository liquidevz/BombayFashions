import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/lib/models/Product";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const formData = await request.formData();
    
    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      {
        title: formData.get("title"),
        slug: formData.get("slug"),
        category: formData.get("category"),
        price: formData.get("price"),
        originalPrice: formData.get("originalPrice") || undefined,
        excerpt: formData.get("excerpt") || undefined,
        description: formData.get("description"),
        features: (formData.get("features") as string).split("\n").filter(Boolean),
        imageUrl: formData.get("imageUrl"),
        gallery: (formData.get("gallery") as string).split("\n").filter(Boolean),
        inStock: formData.get("inStock") === "on",
        featured: formData.get("featured") === "on",
      },
      { new: true }
    );
    
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.redirect(new URL("/admin/products", request.url));
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
} 