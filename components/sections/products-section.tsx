"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Star, Eye, ShoppingCart, Tag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import productData from '@/lib/product-data.json'

const ProductsSection = () => {
  const { products, categories } = productData
  const featuredProducts = products.filter(product => product.featured).slice(0, 6)

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
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-[#192e42] dark:text-blue-400 px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <Tag size={16} />
            Premium Workwear Collection
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
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

        

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
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
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                    <span className="text-sm font-medium text-[#192e42] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-[#192e42] dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                    {product.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-[#192e42] dark:text-blue-400">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    {product.inStock && (
                      <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full font-medium">
                        In Stock
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="block w-full bg-gradient-to-r from-[#192e42] to-[#1a3249] text-white text-center py-3 rounded-xl font-semibold hover:from-[#1a3249] hover:to-[#1b3651] transition-all duration-300 transform hover:scale-105 group/btn"
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#192e42] to-[#1a3249] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-[#1a3249] hover:to-[#1b3651] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            View All Products
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductsSection 