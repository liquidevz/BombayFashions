"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Check } from "lucide-react"
import { submitBookingForm } from "@/app/actions/form-actions"
import { trackEvent } from "@/components/providers/analytics"
import { FormInput } from "./form-input"
import { FormSelect } from "./form-select"
import { Button } from "../ui/button"

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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp number is required"
    if (!formData.service) newErrors.service = "Please select a service"
    if (!formData.date) newErrors.date = "Please select a date"
    if (!formData.time) newErrors.time = "Please select a time"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

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

  if (isSuccess) {
    return (
      <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-6"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
        <p className="text-gray-400">We've received your booking request. Check your email for confirmation details.</p>
      </motion.div>
    )
  }

  const serviceOptions = [
    { value: "recording", label: "Recording" },
    { value: "mixing", label: "Mixing & Mastering" },
    { value: "production", label: "Music Production" },
    { value: "jamming", label: "Jamming Session" },
    { value: "video", label: "Video Shooting" },
    { value: "teaching", label: "Music Teaching" },
  ]

  const timeOptions = [
    { value: "1 Hour", label: "1 Hour" },
    { value: "2 Hours", label: "2 Hours" },
    { value: "3 Hours", label: "3 Hours" },
    { value: "4 Hours", label: "4 Hours" },
    { value: "Full Day", label: "Full Day" },
  ]

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <FormInput
          label="Your name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          error={errors.name}
          placeholder="Enter your full name"
        />
      </div>

      <FormInput
        label="Email address"
        id="email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        error={errors.email}
        placeholder="your@email.com"
      />

      <FormInput
        label="WhatsApp number"
        id="whatsapp"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={handleChange}
        required
        error={errors.whatsapp}
        placeholder="+91 98765 43210"
      />

      <div className="md:col-span-2">
        <FormSelect
          label="Studio Service"
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          error={errors.service}
          options={serviceOptions}
        />
      </div>

      <div className="relative">
        <FormInput
          label="Date"
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          error={errors.date}
        />
        <Calendar
          className="absolute right-3 top-[38px] transform -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
      </div>

      <div className="relative">
        <FormSelect
          label="Time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          error={errors.time}
          options={timeOptions}
        />
        <Clock
          className="absolute right-3 top-[38px] transform -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
      </div>

      <div className="md:col-span-2">
        <Button type="submit" isLoading={isSubmitting} className="w-full py-4" size="lg">
          Book Session Now
        </Button>
      </div>
    </form>
  )
}
