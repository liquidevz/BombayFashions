"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Share2, Clock, Tag } from "lucide-react"
import JsonLd from "@/components/json-ld"
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/schema"

interface BlogPost {
  id: number
  slug: string
  title: string
  content: string
  excerpt: string
  date: string
  author: string
  imageUrl: string
  tags?: string[]
}

interface BlogPostContentProps {
  post: BlogPost
  relatedBlogs: BlogPost[]
}

export default function BlogPostContent({ post, relatedBlogs }: BlogPostContentProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: shareUrl,
      })
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(shareUrl)
    }
  }

  // Calculate read time (assuming 200 words per minute)
  const readTime = Math.ceil(post.content.split(' ').length / 200)

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]

  const structuredData = {
    blogPost: generateBlogPostSchema(post),
    breadcrumb: generateBreadcrumbSchema(breadcrumbItems),
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <main className="min-h-screen dark:bg-black bg-white">
        {/* Copy the JSX from the blog post page */}
      </main>
    </>
  )
} 