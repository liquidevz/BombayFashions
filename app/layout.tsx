import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/providers/analytics";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { headers } from "next/headers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "BombayFashions | Premium Uniform Manufacturing",
  description: "Your trusted partner for high-quality uniforms. Serving businesses, schools, and healthcare institutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the current pathname from headers
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdminRoute = pathname.startsWith("/admin") || pathname === "/login";

  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>
        {!isAdminRoute && <Navbar />}
        <main className="min-h-screen">{children}</main>
        {!isAdminRoute && <Footer />}
        <Analytics />
      </body>
    </html>
  );
}
