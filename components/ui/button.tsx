"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"

import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "subtle"
  size?: "sm" | "md" | "lg" | "icon" | "default"
  asChild?: boolean
  href?: string
  icon?: React.ReactNode
  isLoading?: boolean
  as?: string
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#192e42] text-white shadow-sm hover:bg-[#192e42]/90 hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        subtle: "bg-white/90 text-[#192e42] shadow-sm backdrop-blur-sm hover:bg-white hover:shadow-md border border-gray-100"
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        md: "h-10 px-5 py-2",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, href, children, icon, isLoading, as, ...props }, ref) => {
    const buttonClasses = cn(buttonVariants({ variant, size, className }))
    
    if (asChild) {
      return (
        <Slot className={buttonClasses} ref={ref} {...props}>
          {children}
        </Slot>
      )
    }

    if (href || as === "a") {
      return (
        <Link href={href || "#"} className={buttonClasses}>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </Link>
      )
    }

    const content = (
      <>
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
          </>
        )}
      </>
    )

    return (
      <button
        className={cn(buttonClasses, isLoading && "opacity-70 cursor-not-allowed")}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {content}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
