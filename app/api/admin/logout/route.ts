import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.redirect(new URL("/admin/login", "http://localhost:3000"));
  response.cookies.delete("admin_token");
  return response;
} 