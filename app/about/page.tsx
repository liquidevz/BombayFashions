"use client"

import { Check, MapPin, Mail, Phone } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function AboutPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div ref={titleRef} className="text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 font-seasons"
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.h1>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Home</span>
              <span>-</span>
              <span className="text-gradient">About Us</span>
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

      {/* Main Content */}
      <div className="relative overflow-hidden">
        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-20 h-32 bg-slate-800 rounded-tr-[2rem]"></div>
        <div className="absolute bottom-0 right-0 flex items-end">
          <div className="w-64 h-64 bg-gradient-to-tl from-blue-500 via-blue-400 to-blue-300 rounded-full -mr-32 -mb-32 opacity-90"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-slate-800 rounded-full -mr-20 -mb-20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-8 py-16 relative z-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 max-w-7xl mx-auto">
            {/* Left Section - Introduction */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <p className="text-gray-500 text-sm font-medium tracking-wide uppercase font-seasons">Introduction</p>
                <div>
                  <h2 className="text-4xl sm:text-5xl font-bold leading-tight font-seasons">
                    <span className="text-slate-800">BOMBAY</span>
                    <br />
                    <span className="text-blue-600">FASHION</span>
                  </h2>
                  <p className="text-xl text-gray-600 font-light mt-4 font-seasons">Premium Work Wear</p>
                </div>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed font-poppins">
                <p className="text-base">
                  Indian Clothing is a Premium work wear manufacturing firm, we specialise in White PC Shirts, PV
                  Trousers, Scrub Suits and more.
                </p>

                <p className="text-base">
                  We prioritise sourcing fabric directly from mills ensuring premium quality and cost effective pricing
                  for our customers.
                </p>

                <p className="text-base">
                  We have an in house manufacturing unit that sew the finest garments for you. As proud holders of GOTs
                  certification, we uphold the highest standards of organic textiles.
                </p>
              </div>
            </div>

            {/* Center Section - Products & Services */}
            <div className="lg:col-span-4 space-y-12">
              {/* Product Showcase */}
              <div className="bg-gray-50 rounded-3xl p-8 shadow-sm">
                <div className="grid grid-cols-2 gap-6">
                  {/* Product 1 */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl mb-4 flex items-center justify-center">
                      <div className="w-16 h-20 bg-white/20 rounded-lg"></div>
                    </div>
                    <div className="h-3 bg-blue-100 rounded-full"></div>
                  </div>

                  {/* Product 2 */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl mb-4 flex items-center justify-center">
                      <div className="w-16 h-20 bg-white/20 rounded-lg"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full"></div>
                  </div>

                  {/* Product 3 */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4 flex items-center justify-center">
                      <div className="w-16 h-20 bg-white/20 rounded-lg"></div>
                    </div>
                    <div className="h-3 bg-blue-100 rounded-full"></div>
                  </div>

                  {/* Product 4 */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl mb-4 flex items-center justify-center">
                      <div className="w-16 h-20 bg-white/20 rounded-lg"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-sm font-medium tracking-wide uppercase mb-3 font-seasons">Services & More</p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight font-seasons">
                    What We
                    <br />
                    Can Do
                  </h2>
                </div>

                <div className="space-y-4 text-gray-700 font-poppins">
                  <p className="text-base font-medium">As a Premium Work Wear Company</p>
                  <p className="text-base leading-relaxed">
                    We provide a wide range of services from Customising the design to the colour, timely deliveries and
                    a great product.
                  </p>
                </div>

                <div className="space-y-4 pt-4">
                  {["Quality Conscious Fabric", "Premium Garmenting", "Optimum Minimum Order Quantity"].map(
                    (item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-700 font-medium font-seasons">{item}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Contact */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <p className="text-gray-500 text-sm font-medium tracking-wide uppercase mb-3 font-seasons">Come visit us!</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-6 font-seasons">Work Space</h2>
                <p className="text-gray-700 text-base leading-relaxed font-poppins">
                  We are available for you to come down and personally meet us. Have a look at the variety of products
                  we develop.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-8 font-poppins">
                {/* Addresses */}
                <div className="space-y-6">
                  {[
                    {
                      title: "Shop 17, 18,Talam Arcade,",
                      subtitle: "KG Circle Majestic 560009",
                    },
                    {
                      title: "43,Hennur cross road,",
                      subtitle: "HBR Layout 4th Block,\nBangalore 560043",
                    },
                    {
                      title: "Devasandra Industrial Estate,",
                      subtitle: "Krishnarajapuram, Bengaluru,\nKarnataka 560048",
                    },
                  ].map((address, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-800">{address.title}</p>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{address.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">uniforms@bombayfashions.in</p>
                  </div>
                </div>

                {/* Phone Numbers */}
                <div className="space-y-3">
                  {["+91 9916930444", "+91 9844120777"].map((phone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 