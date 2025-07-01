"use client"

import type React from "react"
import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  icon?: React.ReactNode
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", size = "md", isLoading, icon, href, ...props }, ref) => {
    const variants = {
      primary: "bg-gradient text-white",
      outline: "border border-purple-500 dark:text-white text-gray-900 hover:bg-purple-500 hover:bg-opacity-10",
      ghost: "hover:bg-white hover:bg-opacity-10",
    }

    const sizes = {
      sm: "py-2 px-4 text-sm",
      md: "py-3 px-6",
      lg: "py-4 px-8 text-lg",
    }

    const buttonClasses = cn(
      "font-semibold rounded-full inline-flex items-center justify-center transition-colors",
      variants[variant],
      sizes[size],
      isLoading && "opacity-70 cursor-not-allowed",
      className,
    )

    const content = (
      <>
        {isLoading ? (
          <div className="audio-wave">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </>
    )

    // If href is provided, render as Link
    if (href) {
      return (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
          <Link href={href} className={buttonClasses} {...props}>
            {content}
          </Link>
        </motion.div>
      )
    }

    // Regular button
    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {content}
      </motion.button>
    )
  },
)

Button.displayName = "Button"

export { Button }
