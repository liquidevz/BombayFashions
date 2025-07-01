"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, ChevronUp, Check } from "lucide-react"
import { submitDemoForm } from "@/app/actions/form-actions"
import { trackEvent } from "@/components/analytics"

interface FormData {
  name: string
  phone: string
  email: string
  course: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  course?: string
}

interface DemoBookingFormProps {
  onClose: () => void
}

export default function DemoBookingForm({ onClose }: DemoBookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[0-9+\- ]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.course) {
      newErrors.course = "Please select a course"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Convert form data to FormData object
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      // Submit form using server action
      const result = await submitDemoForm(formDataObj)

      if (result.success) {
        // Track successful form submission
        trackEvent("form_submit", "demo_booking", "Demo Booking Form", 1)

        // Show success state
        setIsSuccess(true)

        // Close modal after success
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        // Handle error
        alert(result.message || "Failed to submit form. Please try again.")
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
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            <span className="text-gradient">Demo Booked!</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
            aria-label="Close modal"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        </div>

        <div className="text-center py-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-6"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="dark:text-gray-400 text-gray-600 max-w-md mx-auto">
            Your demo session has been booked successfully. We'll contact you shortly to confirm the details.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-8 py-3 px-6 bg-gradient rounded-lg font-semibold text-white"
          >
            Close
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 id="demo-form-title" className="text-2xl font-bold">
          <span className="text-gradient">Book Your Free Demo</span>
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
          aria-label="Close modal"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border ${
              errors.name ? "border-red-500" : "dark:border-gray-800 border-gray-200"
            } rounded-lg focus:outline-none focus:border-purple-500`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-xs mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border ${
              errors.phone ? "border-red-500" : "dark:border-gray-800 border-gray-200"
            } rounded-lg focus:outline-none focus:border-purple-500`}
            placeholder="Your contact number"
          />
          {errors.phone && (
            <p id="phone-error" className="text-red-500 text-xs mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border ${
              errors.email ? "border-red-500" : "dark:border-gray-800 border-gray-200"
            } rounded-lg focus:outline-none focus:border-purple-500`}
            placeholder="Your email address"
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="course" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Interested In *
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={!!errors.course}
            aria-describedby={errors.course ? "course-error" : undefined}
            className={`w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border ${
              errors.course ? "border-red-500" : "dark:border-gray-800 border-gray-200"
            } rounded-lg focus:outline-none focus:border-purple-500`}
          >
            <option value="">Select a course</option>
            <option value="vocal-beginner">Vocal Training - Beginner</option>
            <option value="vocal-intermediate">Vocal Training - Intermediate</option>
            <option value="vocal-advanced">Vocal Training - Advanced</option>
            <option value="guitar">Guitar Lessons</option>
            <option value="piano">Piano/Keyboard</option>
            <option value="production">Music Production</option>
          </select>
          {errors.course && (
            <p id="course-error" className="text-red-500 text-xs mt-1">
              {errors.course}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border dark:border-gray-800 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Tell us about your music goals"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient rounded-lg font-semibold text-white flex items-center justify-center relative overflow-hidden disabled:opacity-70"
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
              <Calendar className="w-5 h-5 mr-2" />
              Book My Free Demo Session
            </>
          )}
        </motion.button>

        <p className="text-xs dark:text-gray-400 text-gray-500 text-center">
          By booking a demo, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </div>
  )
}
