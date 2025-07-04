"use client"

import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Share2, Clock, Tag } from "lucide-react"
import blogData from "@/lib/blog-data.json"

interface BlogPostProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params
  const blog = blogData.blogs.find(b => b.slug === slug)

  if (!blog) {
    notFound()
  }

  // Get related blogs (excluding current one)
  const relatedBlogs = blogData.blogs.filter(b => b.slug !== slug).slice(0, 3)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: shareUrl,
      })
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(shareUrl)
    }
  }

  // Calculate read time (assuming 200 words per minute)
  const readTime = Math.ceil(blog.content.split(' ').length / 200)

  return (
    <main className="min-h-screen dark:bg-black bg-white">
      
      {/* Enhanced Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-40 h-40 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-[30%] right-[15%] w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
          <div className="absolute top-[60%] left-[70%] w-24 h-24 rounded-full bg-pink-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8"
          >
            <Link href="/" className="hover:text-gradient transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gradient transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-300">Current Article</span>
          </motion.div>

          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-gradient hover:underline transition-all duration-300 group"
            >
              <ArrowLeft className="mr-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Article Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6"
            >
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{readTime} min read</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>Fashion Tips</span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 dark:text-white leading-tight"
            >
              {blog.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              {blog.excerpt}
            </motion.p>

            {/* Share Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center mb-12"
            >
              <button
                onClick={handleShare}
                className="inline-flex items-center bg-gradient text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={blog.imageUrl || "/placeholder.jpg"}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gradient prose-a:text-gradient prose-p:text-gray-700 dark:prose-p:text-gray-300">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
              >
                Related <span className="text-gradient">Articles</span>
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog, index) => (
                  <motion.article
                    key={relatedBlog.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedBlog.imageUrl || "/placeholder.jpg"}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 dark:text-white">
                        <Link 
                          href={`/blog/${relatedBlog.slug}`}
                          className="hover:text-gradient transition-colors duration-300"
                        >
                          {relatedBlog.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                        {relatedBlog.excerpt}
                      </p>
                      
                      <Link
                        href={`/blog/${relatedBlog.slug}`}
                        className="text-gradient font-semibold text-sm hover:underline"
                      >
                        Read More
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
} 