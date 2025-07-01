"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/app/actions/form-actions"
import { useState } from "react"
import { trackEvent } from "@/components/analytics"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      const result = await submitContactForm(formDataObj)

      if (result.success) {
        // Track successful form submission
        trackEvent("form_submit", "contact", "Contact Form", 1)

        // Show success state
        setIsSuccess(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        })
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

  return (
    <main className="flex min-h-screen flex-col">

      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          <span className="gradient-text">Book Now</span>
        </h1>

        <div className="max-w-md mx-auto bg-[#1a1a1a] p-6 rounded-lg border border-gray-800">
          {isSuccess && (
            <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-500 p-4 rounded-md mb-6">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="bg-[#252525] border-gray-700 focus:border-purple-gradient"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="bg-[#252525] border-gray-700 focus:border-purple-gradient"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="bg-[#252525] border-gray-700 focus:border-purple-gradient"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-medium">
                Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-[#252525] border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-gradient"
              >
                <option value="">Select a service</option>
                <option value="recording">Recording</option>
                <option value="production">Music Production</option>
                <option value="mixing">Mixing & Mastering</option>
                <option value="consultation">Design Consultation</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project"
                className="bg-[#252525] border-gray-700 focus:border-purple-gradient min-h-[100px]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-bg hover:opacity-90 transition-opacity"
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
                "Submit Booking"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
