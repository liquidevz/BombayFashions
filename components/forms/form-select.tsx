"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: { value: string; label: string }[]
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, error, id, required, options, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <motion.select
          ref={ref}
          id={id}
          required={required}
          className={cn(
            "w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border rounded-lg focus:outline-none focus:border-purple-500 appearance-none",
            error ? "border-red-500" : "dark:border-gray-800 border-gray-200",
            className,
          )}
          whileFocus={{ scale: 1.01 }}
          {...props}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </motion.select>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    )
  },
)

FormSelect.displayName = "FormSelect"
