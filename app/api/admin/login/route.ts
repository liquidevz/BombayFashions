import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123"; // In production, use environment variables and hash passwords

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const response = NextResponse.redirect(new URL("/admin", request.url), {
        status: 303, // Force POST to GET redirect
      });
      
      response.cookies.set("admin_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      
      return response;
    }

    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", request.url),
      {
        status: 303, // Force POST to GET redirect
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", request.url),
      {
        status: 303, // Force POST to GET redirect
      }
    );
  }
} 