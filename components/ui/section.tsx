import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: "default" | "alt" | "gradient"
}

export function Section({ children, className, id, background = "default" }: SectionProps) {
  const backgrounds = {
    default: "dark:bg-black bg-white",
    alt: "dark:bg-[#0a0a0a] bg-gray-50",
    gradient: "bg-gradient-to-br from-purple-900/20 via-black to-orange-900/20",
  }

  return (
    <section id={id} className={cn("py-16 md:py-24 relative overflow-hidden", backgrounds[background], className)}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">{children}</div>
    </section>
  )
}
