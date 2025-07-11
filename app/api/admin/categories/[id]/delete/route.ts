import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productData = await fs.readFile(path.join(process.cwd(), "lib/product-data.json"), "utf-8");
    const data = JSON.parse(productData);
    
    // Check if any products are using this category
    const productsUsingCategory = data.products.some((p: any) => {
      const category = data.categories.find((c: any) => c.id.toString() === params.id);
      return p.category === category?.name;
    });
    
    if (productsUsingCategory) {
      return NextResponse.json(
        { error: "Cannot delete category: it is being used by one or more products" },
        { status: 400 }
      );
    }
    
    data.categories = data.categories.filter((c: any) => c.id.toString() !== params.id);
    
    await fs.writeFile(
      path.join(process.cwd(), "lib/product-data.json"),
      JSON.stringify(data, null, 2)
    );
    
    return NextResponse.redirect(new URL("/admin/categories", request.url));
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
} 