import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const productData = await fs.readFile(path.join(process.cwd(), "lib/product-data.json"), "utf-8");
    const data = JSON.parse(productData);
    
    // Get the highest ID and increment by 1
    const maxId = Math.max(...data.products.map((p: any) => Number(p.id)), 0);
    const newProduct = {
      id: maxId + 1,
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
    };
    
    data.products.push(newProduct);
    
    await fs.writeFile(
      path.join(process.cwd(), "lib/product-data.json"),
      JSON.stringify(data, null, 2)
    );
    
    return NextResponse.redirect(new URL("/admin/products", request.url));
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
} 