"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  children?: ReactNode
  className?: string
  align?: "center" | "left" | "right"
  height?: "full" | "large" | "medium" | "small"
}

export function HeroSection({
  title,
  subtitle,
  children,
  className,
  align = "center",
  height = "medium",
}: HeroSectionProps) {
  const alignments = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  }

  const heights = {
    full: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[60vh]",
    small: "min-h-[40vh]",
  }

  return (
    <section
      className={cn(
        "relative flex flex-col justify-center overflow-hidden pt-32",
        heights[height],
        alignments[align],
        className,
      )}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {typeof title === "string" ? <h1 className="text-5xl md:text-6xl font-bold mb-4">{title}</h1> : title}

          {subtitle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              {typeof subtitle === "string" ? (
                <p className="text-xl md:text-2xl dark:text-gray-300 text-gray-700">{subtitle}</p>
              ) : (
                subtitle
              )}
            </motion.div>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
