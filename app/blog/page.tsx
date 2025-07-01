"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, User, Search, Filter } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import blogData from "@/lib/blog-data.json"

export default function BlogPage() {
  const blogs = blogData.blogs

  return (
    <main className="min-h-screen dark:bg-black bg-white">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[15%] right-[10%] w-40 h-40 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-[25%] left-[5%] w-48 h-48 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute top-[60%] right-[70%] w-32 h-32 rounded-full bg-pink-500 opacity-10 blur-3xl"></div>
          <div className="absolute top-[30%] left-[80%] w-24 h-24 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8 justify-center"
          >
            <Link href="/" className="hover:text-gradient transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-300">Blog</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-16"
          >
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Fashion <span className="text-gradient">Insights</span>
              <br />
              <span className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-600 dark:text-gray-300">
                & Style Guide
              </span>
            </h1>
            
            {/* Decorative Line */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500"></div>
              <div className="h-1 w-8 bg-gradient mx-4 rounded-full"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500"></div>
            </div>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the latest trends, styling tips, and fashion insights from BombayFashions. 
              Your ultimate destination for professional uniform guidance and style inspiration.
            </p>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 text-center mb-12"
            >
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-gradient">{blogs.length}+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Articles</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-gradient">10K+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Readers</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-bold text-gradient">5+</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Categories</span>
              </div>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
            >
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
              <button className="flex items-center px-6 py-3 bg-gradient text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest <span className="text-gradient">Articles</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay updated with our latest fashion insights and styling tips
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={blog.imageUrl || "/placeholder.jpg"}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-xs font-semibold text-gradient shadow-lg">
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{blog.date}</span>
                    <span className="mx-2">•</span>
                    <User className="w-4 h-4 mr-2" />
                    <span>{blog.author}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 line-clamp-2 dark:text-white text-gray-800 group-hover:text-gradient transition-colors duration-300">
                    <Link href={`/blog/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-gradient font-semibold hover:underline transition-all duration-300 group/link"
                  >
                    Read More 
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4 dark:text-white">No blog posts found</h3>
              <p className="text-gray-600 dark:text-gray-400">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
} 