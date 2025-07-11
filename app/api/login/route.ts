import { NextResponse } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const url = new URL(request.url);
    const from = url.searchParams.get('from') || '/admin';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.redirect(new URL(from, request.url), {
        status: 303,
      });
      
      response.cookies.set("admin_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        // Set max age to 7 days
        maxAge: 7 * 24 * 60 * 60,
      });
      
      return response;
    }

    return NextResponse.redirect(
      new URL(`/login?error=invalid&from=${encodeURIComponent(from)}`, request.url),
      {
        status: 303,
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.redirect(
      new URL("/login?error=invalid", request.url),
      {
        status: 303,
      }
    );
  }
} 