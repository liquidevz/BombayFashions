"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Building2, Mail, Phone, MapPin, Loader2, Check, Clock } from "lucide-react"
import BookingForm from "@/components/forms/booking-form"
import SuspenseWrapper from "@/components/providers/suspense-wrapper"
import GoogleMapComponent from "@/components/ui/google-map"

const categories = [
  "Corporate Uniforms",
  "Hospital Uniforms",
  "Hotel & Hospitality",
  "School Uniforms",
]

const budgetRanges = [
  "₹10,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹5,00,000",
  "₹5,00,000+"
]

const quantityRanges = [
  "10-50 pieces",
  "50-100 pieces",
  "100-500 pieces",
  "500+ pieces"
]

export default function Contact() {
  return (
    <SuspenseWrapper>
      <ContactContent />
    </SuspenseWrapper>
  )
}

function ContactContent() {
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
              Contact Us
            </motion.h1>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Home</span>
              <span>-</span>
              <span className="text-gradient">Contact</span>
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

      {/* Contact Info & Form Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl h-full flex flex-col"
              >
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have questions about our uniform manufacturing services? We're here to help you create the perfect professional attire for your needs.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Office Address</h3>
                      <p className="text-gray-600">123 Fashion Street, Mumbai, Maharashtra 400001</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email Us</h3>
                      <p className="text-gray-600">info@bombayfashions.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Call Us</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-600">Andheri East, Near Metro Station</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Working Hours</h3>
                      <p className="text-gray-600">Monday - Saturday: 10:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-auto rounded-xl overflow-hidden">
                  <GoogleMapComponent />
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type Selection */}
                  <div className="flex space-x-4 p-1 bg-gray-50 rounded-lg w-fit">
                    <button
                      type="button"
                      onClick={() => setInquiryType('individual')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        inquiryType === 'individual'
                          ? 'bg-white shadow text-gray-900'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Individual
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('company')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        inquiryType === 'company'
                          ? 'bg-white shadow text-gray-900'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Company
                    </button>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {inquiryType === 'company' ? 'Contact Person' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] transition-colors"
                        placeholder={inquiryType === 'company' ? 'Contact Person Name' : 'Your Full Name'}
                      />
                    </div>
                    {inquiryType === 'company' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] transition-colors"
                          placeholder="Company Name"
                        />
                      </div>
                    )}
                  </div>

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] transition-colors"
                        placeholder="Your Phone Number"
                      />
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Uniform Category
                    </label>
                    <select
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] transition-colors"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget & Quantity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] transition-colors"
                      >
                        <option value="">Select Budget Range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity Required
                      </label>
                      <select
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] transition-colors"
                      >
                        <option value="">Select Quantity Range</option>
                        {quantityRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#192e42] focus:border-[#192e42] transition-colors"
                      placeholder="Please describe your specific requirements, including any customization needs..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Sent Successfully!
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
