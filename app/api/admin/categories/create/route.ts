import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const productData = await fs.readFile(path.join(process.cwd(), "lib/product-data.json"), "utf-8");
    const data = JSON.parse(productData);
    
    // Get the highest ID and increment by 1
    const maxId = Math.max(...data.categories.map((c: any) => c.id), 0);
    const newCategory = {
      id: maxId + 1,
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
    };
    
    data.categories.push(newCategory);
    
    await fs.writeFile(
      path.join(process.cwd(), "lib/product-data.json"),
      JSON.stringify(data, null, 2)
    );
    
    return NextResponse.redirect(new URL("/admin/categories", request.url));
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
} 