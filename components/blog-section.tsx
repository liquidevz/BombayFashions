"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Blog {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  imageUrl: string
}

interface BlogSectionProps {
  blogs: Blog[]
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const blogsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(blogsRef, { once: true, amount: 0.2 })

  return (
    <section className="py-20 relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] right-[10%] w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[5%] w-40 h-40 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">
            Latest from <span className="text-gradient">Our Blog</span>
          </h2>
          <div className="h-1 w-20 bg-gradient mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Fashion insights, styling tips, and uniform trends from BombayFashions
          </p>
        </div>

        {/* Mobile View (Carousel) */}
        <div className="block md:hidden" ref={blogsRef}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {blogs.map((blog, index) => (
                <CarouselItem key={blog.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-56">
                      <Image
                        src={blog.imageUrl || "/placeholder.jpg"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>{blog.date}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.author}</span>
                      </div>
                      <h3 className="text-xl mb-3 line-clamp-2 dark:text-white text-gray-800">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center text-gradient hover:underline"
                      >
                        Read More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 mx-1" />
              <CarouselNext className="static translate-y-0 mx-1" />
            </div>
          </Carousel>
        </div>

        {/* Desktop View (Grid) */}
        <div 
          ref={blogsRef} 
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-56">
                <Image
                  src={blog.imageUrl || "/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{blog.date}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.author}</span>
                </div>
                <h3 className="text-xl mb-3 line-clamp-2 dark:text-white text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center text-gradient hover:underline"
                >
                  Read More <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="bg-gradient text-white py-3 px-8 rounded-full hover:shadow-lg transition-shadow duration-300 inline-block"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}
