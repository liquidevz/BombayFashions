"use client"

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Filter, Grid3X3, List, Star, ShoppingCart, Eye, ArrowRight, Package, Users, Building2, Stethoscope, UtensilsCrossed, GraduationCap, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import productData from '@/lib/product-data.json'
import SuspenseWrapper from '@/components/providers/suspense-wrapper'

function SearchParamsHandler({ onCategoryChange }: { onCategoryChange: (category: string) => void }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      // Decode the category parameter and set it
      const decodedCategory = decodeURIComponent(categoryParam)
      onCategoryChange(decodedCategory)
    }
  }, [searchParams, onCategoryChange])

  return null
}

export default function ProductsPage() {
  return (
    <SuspenseWrapper>
      <ProductsContent />
    </SuspenseWrapper>
  )
}

function ProductsContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })

  const { products, categories } = productData

  // Calculate category counts
  const categoryCountsMap = useMemo(() => {
    const counts: { [key: string]: number } = {}
    categories.forEach(category => {
      counts[category.name] = products.filter(product => product.category === category.name).length
    })
    return counts
  }, [products, categories])

  // Get category icons
  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Corporate Uniforms':
        return Building2
      case 'Hospital Uniforms':
        return Stethoscope
      case 'Hotel & Hospitality':
        return UtensilsCrossed
      case 'School Uniforms':
        return GraduationCap
      default:
        return Package
    }
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Normalize product properties to handle different property names
      const productTitle = product.title || product.name || ''
      const productDescription = product.description || ''
      const productCategory = product.category || ''

      const matchesSearch = productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          productDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          productCategory.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || productCategory === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort products
    switch (sortBy) {
      case 'featured':
        return filtered.sort((a, b) => ((b.featured ? 1 : 0) - (a.featured ? 1 : 0)))
      case 'price-low':
        return filtered.sort((a, b) => {
          const priceA = parseInt((a.price || '0').replace('₹', '').replace(',', ''))
          const priceB = parseInt((b.price || '0').replace('₹', '').replace(',', ''))
          return priceA - priceB
        })
      case 'price-high':
        return filtered.sort((a, b) => {
          const priceA = parseInt((a.price || '0').replace('₹', '').replace(',', ''))
          const priceB = parseInt((b.price || '0').replace('₹', '').replace(',', ''))
          return priceB - priceA
        })
      case 'name':
        return filtered.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''))
      default:
        return filtered
    }
  }, [products, searchTerm, selectedCategory, sortBy])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SuspenseWrapper>
        <SearchParamsHandler onCategoryChange={setSelectedCategory} />
      </SuspenseWrapper>

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div ref={titleRef} className="text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Products
            </motion.h1>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Home</span>
              <span>-</span>
              <span className="text-gradient">Products</span>
              {selectedCategory && (
                <>
                  <span>-</span>
                  <span className="text-gradient truncate max-w-32 sm:max-w-none">{selectedCategory}</span>
                </>
              )}
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
      <section className="py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search for uniforms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] text-gray-900 dark:text-white placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="container mx-auto px-0 md:px-4">
          {/* Mobile Scroll Indicator */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-2 md:hidden">
            ← Swipe to see more →
          </div>
          
          <div className="scrollbar-hide horizontal-scroll category-scroll flex md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 py-3 md:py-6 px-4 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('')}
              className={`flex-none min-w-[120px] md:min-w-0 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
                selectedCategory === ''
                  ? 'bg-[#192e42] text-white shadow-sm ring-2 ring-[#192e42] ring-offset-2' 
                  : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <Package className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">All Products</span>
            </button>
            
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.name)
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex-none min-w-[120px] md:min-w-0 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    selectedCategory === category.name
                      ? 'bg-[#192e42] text-white shadow-sm ring-2 ring-[#192e42] ring-offset-2' 
                      : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs opacity-75">({categoryCountsMap[category.name] || 0})</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto mb-3 text-gray-400 w-10 h-10" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {searchTerm || selectedCategory 
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "We're working on adding more products to our catalog."}
              </p>
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('')
                  }}
                  className="inline-flex items-center px-4 py-2 bg-[#192e42] text-white text-sm font-medium rounded-lg hover:bg-[#1a3249] transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6' 
                : 'space-y-4'
            }`}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700'
                      : 'bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-all duration-200 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row'
                  }`}
                >
                  {/* Product Image */}
                  <div className={`${
                    viewMode === 'grid'
                      ? 'aspect-[4/3] bg-gray-50 dark:bg-gray-700 relative'
                      : 'aspect-[4/3] sm:w-48 bg-gray-50 dark:bg-gray-700 relative'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={product.imageUrl || '/placeholder.jpg'}
                        alt={product.title || product.name || 'Product Image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        {product.title || product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                        {product.excerpt || product.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-medium text-gray-900 dark:text-white">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Link
                        href={`/products/${product.slug || product.id}`}
                        className="inline-flex items-center text-sm font-medium text-[#192e42] hover:text-[#1a3249] dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                      <div className="flex items-center gap-2">
                        {product.featured && (
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Featured
                          </span>
                        )}
                        {product.inStock && (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            In Stock
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 