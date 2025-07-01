"use client"

import type React from "react"

import { motion } from "framer-motion"

interface SocialIconProps {
  icon: React.ReactNode
  href?: string
}

export function SocialIcon({ icon, href = "#" }: SocialIconProps) {
  return (
    <motion.a
      href={href}
      className="w-8 h-8 rounded-full dark:bg-[#1a1a1a] bg-white border dark:border-gray-800 border-gray-200 flex items-center justify-center dark:text-gray-400 text-gray-600 hover:text-gradient transition-colors"
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  )
}
