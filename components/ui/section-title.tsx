"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}

export function SectionTitle({ title, subtitle, center = false, className }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={cn("mb-16", center && "text-center", center ? "mx-auto" : "", center ? "max-w-3xl" : "", className)}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="dark:text-gray-400 text-gray-600">{subtitle}</p>}
    </motion.div>
  )
}
