"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Share2, Star, Check, Truck, Shield, Phone, Mail, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import productData from '@/lib/product-data.json'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params
  const { products } = productData
  
  const product = products.find(p => p.slug === slug)
  
  if (!product) {
    notFound()
  }

  const ProductContent = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('description')

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

    const tabs = [
      { id: 'description', label: 'Description' },
      { id: 'features', label: 'Features' },
      { id: 'specifications', label: 'Specifications' }
    ]

    const benefits = [
      { icon: Truck, text: 'Free shipping on orders above ₹2,000' },
      { icon: Shield, text: '1 year warranty on all products' },
      { icon: Phone, text: '24/7 customer support' },
      { icon: Check, text: 'Quality guarantee' }
    ]

    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Header */}
        <section className="pt-24 pb-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <Link
                href="/products"
                className="flex items-center gap-2 text-[#192e42] dark:text-blue-400 hover:text-[#1a3249] dark:hover:text-blue-300 transition-colors"
              >
                <ArrowLeft size={20} />
                Back to Products
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 dark:text-gray-300">{product.category}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-800 dark:text-white font-medium">{product.title}</span>
            </motion.div>
          </div>
        </section>

        {/* Product Details */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Main Image */}
                <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={product.gallery[selectedImageIndex]}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  {product.featured && (
                    <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Featured Product
                    </div>
                  )}
                  
                  {/* Image Navigation */}
                  {product.gallery.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(prev => prev === 0 ? product.gallery.length - 1 : prev - 1)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(prev => prev === product.gallery.length - 1 ? 0 : prev + 1)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-2 rounded-full shadow-lg transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.gallery.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {product.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index 
                            ? 'border-blue-600 dark:border-blue-400' 
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#192e42] dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg text-sm font-medium">
                      {product.category}
                    </span>
                    {product.inStock && (
                      <span className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-lg text-sm font-medium">
                        In Stock
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    {product.title}
                  </h1>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">(4.8) • 127 reviews</span>
                  </div>

                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.excerpt}
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
                  <div className="text-4xl font-bold text-[#192e42] dark:text-blue-400">
                    {product.price}
                  </div>
                  {product.originalPrice && (
                    <div className="text-2xl text-gray-400 line-through">
                      {product.originalPrice}
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg text-sm font-semibold">
                      Save {Math.round((1 - parseInt(product.price.replace('₹', '').replace(',', '')) / parseInt(product.originalPrice.replace('₹', '').replace(',', ''))) * 100)}%
                    </div>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#192e42] to-[#1a3249] text-white py-4 rounded-xl font-semibold hover:from-[#1a3249] hover:to-[#1b3651] transition-all duration-300 transform hover:scale-105">
                    Add to Cart - {product.price}
                  </button>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                      <Heart size={18} />
                      Add to Wishlist
                    </button>
                    <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3 pt-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <benefit.icon size={18} className="text-blue-600 dark:text-blue-400" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>

                {/* Contact */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-3">Need Help? Contact Us</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                          <Phone size={16} className="text-[#192e42] dark:text-blue-400" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Mail size={16} className="text-[#192e42] dark:text-blue-400" />
                      <span>info@bombayfashions.com</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Detailed Information Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                                      className={`flex-1 py-4 px-6 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#192e42] dark:text-blue-400 border-b-2 border-[#192e42] dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#192e42] dark:hover:text-blue-400'
                  }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'description' && (
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                      {product.description}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                                          <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-gray-200 dark:border-gray-700">
                      <Check size={18} className="text-[#192e42] dark:text-blue-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-800 dark:text-white">Product Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-300">Category</span>
                          <span className="font-medium text-gray-800 dark:text-white">{product.category}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-300">Material</span>
                          <span className="font-medium text-gray-800 dark:text-white">Premium Fabric</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-300">Care Instructions</span>
                          <span className="font-medium text-gray-800 dark:text-white">Machine Washable</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-gray-800 dark:text-white">Availability</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-300">Stock Status</span>
                          <span className="font-medium text-green-600 dark:text-green-400">In Stock</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                          <span className="font-medium text-gray-800 dark:text-white">2-3 Business Days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16"
              >
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
                  Related Products
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedProducts.map((relatedProduct, index) => (
                    <Link
                      key={relatedProduct.id}
                      href={`/products/${relatedProduct.slug}`}
                      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:shadow-[#192e42]/20 transition-all duration-300"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={relatedProduct.imageUrl}
                          alt={relatedProduct.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                                              <h3 className="font-bold text-gray-800 dark:text-white mb-2 group-hover:text-[#192e42] dark:group-hover:text-blue-400 transition-colors">
                        {relatedProduct.title}
                      </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {relatedProduct.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                                                  <span className="text-xl font-bold text-[#192e42] dark:text-blue-400">
                          {relatedProduct.price}
                        </span>
                        <span className="text-sm text-[#192e42] dark:text-blue-400 group-hover:underline">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    )
  }

  return <ProductContent />
}

export default ProductPage 