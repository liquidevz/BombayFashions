"use client"

import { useState, useMemo, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Filter, Grid3X3, List, Star, ShoppingCart, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import productData from '@/lib/product-data.json'

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })

  const { products, categories } = productData

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    switch (sortBy) {
      case 'featured':
        return filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      case 'price-low':
        return filtered.sort((a, b) => parseInt(a.price.replace('₹', '').replace(',', '')) - parseInt(b.price.replace('₹', '').replace(',', '')))
      case 'price-high':
        return filtered.sort((a, b) => parseInt(b.price.replace('₹', '').replace(',', '')) - parseInt(a.price.replace('₹', '').replace(',', '')))
      case 'name':
        return filtered.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered
    }
  }, [products, searchTerm, selectedCategory, sortBy])

  const stats = [
    { label: 'Total Products', value: products.length },
    { label: 'Categories', value: categories.length },
    { label: 'Happy Clients', value: '500+' },
    { label: 'Years Experience', value: '15+' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden dark:bg-black bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div ref={titleRef} className="text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4 dark:text-white text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Products
            </motion.h1>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Home</span>
              <span>-</span>
              <span className="text-gradient">Products</span>
            </motion.div>

            <motion.div
              className="h-1 w-20 bg-gradient mx-auto mt-8"
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
        </div>
      </section>



      {/* Filters Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#192e42] text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#192e42] text-gray-900 dark:text-white"
            >
              <option value="featured">Featured</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-white dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' 
                  ? 'bg-[#192e42] text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#192e42]'}`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' 
                  ? 'bg-[#192e42] text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-[#192e42]'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-600 dark:text-gray-300">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
            }>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:shadow-[#192e42]/20 transition-all duration-300 ${
                    viewMode === 'list' ? 'flex items-center' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'aspect-[4/3]'} overflow-hidden`}>
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#192e42] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">
                        {product.category}
                      </span>
                      {product.inStock && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">In Stock</span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-[#192e42] dark:group-hover:text-blue-400 transition-colors">
                      {product.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
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
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 bg-gradient-to-r from-[#192e42] to-[#1a3249] text-white px-4 py-2 rounded-xl font-semibold hover:from-[#1a3249] hover:to-[#1b3651] transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        <Eye size={18} />
                        View Details
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProductsPage 