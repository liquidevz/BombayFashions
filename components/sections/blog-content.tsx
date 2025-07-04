"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User, Search, Filter, Clock, Tag } from "lucide-react"
import blogData from "@/lib/blog-data.json"

export default function BlogContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })
  
  const blogs = blogData.blogs

  // Filter blogs based on search only (no categories for now)
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const categories = ['Workwear', 'Corporate', 'Healthcare', 'Hospitality']

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Copy the JSX from the blog page */}
    </main>
  )
} 