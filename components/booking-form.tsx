"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"
import { submitBookingForm } from "@/app/actions/form-actions"
import { trackEvent } from "@/components/analytics"

interface BookingFormProps {
  onClose: () => void
}

export default function BookingForm({ onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: "",
    date: "",
    time: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Convert form data to FormData object
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      // Submit form using server action
      const result = await submitBookingForm(formDataObj)

      if (result.success) {
        // Track successful form submission
        trackEvent("form_submit", "booking", "Booking Form", 1)

        // Show success state
        setIsSuccess(true)

        // Close modal after success
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        // Handle error
        alert(result.message || "Failed to submit booking. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(138, 43, 226, 0.4)" },
  }

  if (isSuccess) {
    return (
      <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-6"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
        <p className="text-gray-400">We've received your booking request. Check your email for confirmation details.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div className="space-y-2 md:col-span-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-400">
          Your name *
        </label>
        <motion.input
          whileFocus="focus"
          variants={inputVariants}
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none"
          placeholder="Enter your full name"
        />
      </motion.div>

      <motion.div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">
          Email address *
        </label>
        <motion.input
          whileFocus="focus"
          variants={inputVariants}
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none"
          placeholder="your@email.com"
        />
      </motion.div>

      <motion.div className="space-y-2">
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-400">
          WhatsApp number *
        </label>
        <motion.input
          whileFocus="focus"
          variants={inputVariants}
          type="tel"
          id="whatsapp"
          name="whatsapp"
          required
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none"
          placeholder="+91 98765 43210"
        />
      </motion.div>

      <motion.div className="space-y-2 md:col-span-2">
        <label htmlFor="service" className="block text-sm font-medium text-gray-400">
          Studio Service *
        </label>
        <motion.select
          whileFocus="focus"
          variants={inputVariants}
          id="service"
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none appearance-none"
        >
          <option value="">Select a service</option>
          <option value="recording">Recording</option>
          <option value="mixing">Mixing & Mastering</option>
          <option value="production">Music Production</option>
          <option value="jamming">Jamming Session</option>
          <option value="video">Video Shooting</option>
                          <option value="consultation">Design Consultation</option>
        </motion.select>
      </motion.div>

      <motion.div className="space-y-2">
        <label htmlFor="date" className="block text-sm font-medium text-gray-400">
          Date *
        </label>
        <div className="relative">
          <motion.input
            whileFocus="focus"
            variants={inputVariants}
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none"
          />
          <Calendar
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={18}
          />
        </div>
      </motion.div>

      <motion.div className="space-y-2">
        <label htmlFor="time" className="block text-sm font-medium text-gray-400">
          Time *
        </label>
        <div className="relative">
          <motion.select
            whileFocus="focus"
            variants={inputVariants}
            id="time"
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg focus:outline-none appearance-none"
          >
            <option value="">Select time</option>
            <option value="1 Hour">1 Hour</option>
            <option value="2 Hours">2 Hours</option>
            <option value="3 Hours">3 Hours</option>
            <option value="4 Hours">4 Hours</option>
            <option value="Full Day">Full Day</option>
          </motion.select>
          <Clock
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={18}
          />
        </div>
      </motion.div>

      <motion.div className="md:col-span-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient rounded-lg font-semibold text-white flex items-center justify-center relative overflow-hidden group"
        >
          {isSubmitting ? (
            <div className="audio-wave">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <>
              <span>Book Session Now</span>
              <motion.span
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%", opacity: 0.1 }}
                animate={{ x: "100%" }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
              />
            </>
          )}
        </motion.button>
      </motion.div>
    </form>
  )
}
