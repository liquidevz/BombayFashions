"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Building2, Mail, Phone, MapPin, Loader2, Check, Clock } from "lucide-react"
import BookingForm from "@/components/forms/booking-form"
import GoogleMapComponent from "@/components/ui/google-map"

export const categories = [
  "Corporate Uniforms",
  "Hospital Uniforms",
  "Hotel & Hospitality",
  "School Uniforms",
]

export const budgetRanges = [
  "₹10,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹5,00,000",
  "₹5,00,000+"
]

export const quantityRanges = [
  "10-50 pieces",
  "50-100 pieces",
  "100-500 pieces",
  "500+ pieces"
]

export default function ContactContent() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })
  
  const [inquiryType, setInquiryType] = useState<'individual' | 'company'>('individual')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Copy the JSX from the contact page */}
    </main>
  )
} 