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
    
    data.products = data.products.filter((p: any) => p.id.toString() !== params.id);
    
    await fs.writeFile(
      path.join(process.cwd(), "lib/product-data.json"),
      JSON.stringify(data, null, 2)
    );
    
    return NextResponse.redirect(new URL("/admin/products", request.url));
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
} 