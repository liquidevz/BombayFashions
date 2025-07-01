import type { ReactNode } from "react"
import { Suspense } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { ThemeProvider } from "@/components/providers/theme-provider"
import Cursor from "@/components/ui/cursor"
import SoundEffectsWrapper from "@/components/providers/sound-effects-wrapper"
import Preloader from "@/components/ui/preloader"
import { Analytics } from "@/components/providers/analytics"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Suspense fallback={<div>Loading...</div>}>
        <Preloader />
        <Cursor />
        <SoundEffectsWrapper />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </div>
        <Analytics />
      </Suspense>
    </ThemeProvider>
  )
}
