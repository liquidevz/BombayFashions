import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Layout from "@/components/layout/layout"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "BombayFashions  | Thane's Premier Music & Recording Studio",
  description: "Redefining sound with professional recording services, music production, and teaching.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} font-sans dark:bg-black bg-white dark:text-white text-gray-900 overflow-x-hidden`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
