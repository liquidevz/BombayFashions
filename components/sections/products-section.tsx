"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Star, Eye, ShoppingCart, Tag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import productData from '@/lib/product-data.json'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Product {
  id: string | number;
  name?: string;
  title?: string;
  category: string;
  price: string;
  originalPrice?: string;
  description?: string;
  excerpt?: string;
  imageUrl: string;
  inStock?: boolean;
  featured?: boolean;
  slug?: string;
}

const ProductsSection = () => {
  const defaultImage = "/placeholder.svg"
  
  const featuredProducts = productData.products
    .filter((product: Product) => product.featured)
    .slice(0, 3)
    .map((product: Product) => ({
      id: product.id,
      name: (product.name || product.title || "Untitled Product") as string,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description || product.excerpt || "",
      imageUrl: product.imageUrl || defaultImage,
      inStock: product.inStock ?? true,
      slug: product.slug || product.id.toString()
    }));

  const ProductCard = ({ product, index }: { product: Product, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:shadow-[#192e42]/20 transition-all duration-500 transform hover:-translate-y-2">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name || "Product Image"}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Featured Badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm">
            Featured
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <button className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
              <Eye size={16} className="text-gray-700 dark:text-gray-300" />
            </button>
            <button className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
              <ShoppingCart size={16} className="text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#192e42] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <h3 className="text-xl text-gray-800 dark:text-white mb-2 group-hover:text-[#192e42] dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl text-[#192e42] dark:text-blue-400">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            {product.inStock && (
              <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                In Stock
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="mt-4 w-full inline-flex items-center justify-center bg-white/90 text-[#192e42] px-6 py-3 rounded-xl hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm border border-gray-100"
          >
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#192e42] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#1a3249] rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-[#192e42] dark:text-blue-400 px-6 py-2 rounded-full text-sm mb-6">
            <Tag size={16} />
            Premium Workwear Collection
          </div>
          
          <h2 className="text-4xl md:text-5xl mb-6">
            <span className="text-[#192e42] dark:text-blue-400">
              Professional Uniforms
            </span>
            <br />
            <span className="text-gray-800 dark:text-white">
              For Every Industry
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover our comprehensive range of high-quality workwear designed for comfort, 
            durability, and professional excellence across various industries.
          </p>
        </motion.div>

        {/* Mobile View (Carousel) */}
        <div className="block md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredProducts.map((product, index) => (
                <CarouselItem key={product.id}>
                  <ProductCard product={product} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-4 px-4">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 sm:h-12 sm:w-12" />
              <CarouselNext className="static translate-y-0 h-10 w-10 sm:h-12 sm:w-12" />
            </div>
          </Carousel>
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-4 md:mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-white/90 text-[#192e42] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm border border-gray-100"
          >
            View All Products <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductsSection 