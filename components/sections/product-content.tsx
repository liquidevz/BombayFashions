"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Share2, Star, Check, Truck, Shield, Phone, Mail, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import JsonLd from "@/components/json-ld"
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/schema"

interface Product {
  id: string | number
  name?: string
  title?: string
  category: string
  price: string
  originalPrice?: string
  description?: string
  excerpt?: string
  imageUrl: string
  inStock?: boolean
  featured?: boolean
  slug?: string
  features?: string[]
  gallery: string[]
}

interface ProductContentProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductContent({ product, relatedProducts }: ProductContentProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

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

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: product.name || product.title || "Product Details", url: `/products/${product.slug}` },
  ]

  const structuredData = {
    product: generateProductSchema(product),
    breadcrumb: generateBreadcrumbSchema(breadcrumbItems),
  }

  return (
    <>
      <JsonLd data={structuredData} />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Copy the JSX from the product page */}
      </div>
    </>
  )
} 