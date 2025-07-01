"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, id, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <motion.textarea
          ref={ref}
          id={id}
          required={required}
          className={cn(
            "w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border rounded-lg focus:outline-none focus:border-purple-500 min-h-[100px]",
            error ? "border-red-500" : "dark:border-gray-800 border-gray-200",
            className,
          )}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  },
)

FormTextarea.displayName = "FormTextarea"
