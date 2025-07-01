"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const features = [
  {
    id: 1,
    title: "Personalized Designs",
    description: "We tailor all recordings to bring fresh and comfortable experience to every artist.",
    icon: "/placeholder.svg",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Durable Equipment",
    description: "Our professional equipment are not only reliable but highly durable to last for extended sessions.",
    icon: "/placeholder.svg",
    color: "bg-purple-500"
  },
  {
    id: 3,
    title: "Competitive Pricing",
    description: "We offer fair rates and ensure you get premium quality output from our end.",
    icon: "/placeholder.svg",
    color: "bg-yellow-500"
  },
  {
    id: 4,
    title: "Prompt Delivery",
    description: "We always deliver your projects on schedule with possible delivery from our end.",
    icon: "/placeholder.svg",
    color: "bg-red-500"
  }
]

const detailedFeatures = [
  {
    id: 1,
    title: "PERSONALIZED DESIGNS",
    description: "We at BombayFashions  pay attention to each detail and provide the best of custom made recordings. Our in-house design team crafts out a combination of your requirement and creative engineering to the best of their ability.",
    icon: "/placeholder.svg"
  },
  {
    id: 2,
    title: "COMPETITIVE PRICING",
    description: "With an in house 75 state of the art machines we offer the most competitive pricing of our services. We achieve quality conscious outputs at best price points keeping in mind our consumer brand relationship.",
    icon: "/placeholder.svg"
  },
  {
    id: 3,
    title: "DURABLE GARMENTS",
    description: "Our equipment are not only comfortable to register but also durable in nature. Studios are sourced directly from the best malls in India. Having the finest materials to sew each piece, quality output is guaranteed.",
    icon: "/placeholder.svg"
  },
  {
    id: 4,
    title: "PROMPT DELIVERY",
    description: "We at BombayFashions  hold value for timelines. With our in house manufacturing unit we fast track our delivery schedules and meet consumer expectations.",
    icon: "/placeholder.svg"
  }
]

export default function WhyUsSection() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(featuresRef, { once: true, amount: 0.2 })

  return (
    <section className="py-20 relative overflow-hidden bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="text-gradient">Choose Us</span>
          </h2>
          <div className="h-1 w-20 bg-gradient mx-auto"></div>
        </div>

        {/* Feature Summary Cards */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${feature.color} bg-opacity-10 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300`}
            >
              <div className="h-12 w-12 mb-4 flex items-center justify-center rounded-md bg-gradient">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={30}
                  height={30}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Features */}
        <div className="space-y-24">
          {detailedFeatures.map((feature, index) => {
            const isEven = index % 2 === 0
            return (
              <div 
                key={feature.id} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </div>
                <div className="w-full lg:w-1/2 space-y-4">
                  <h3 className="text-2xl font-bold dark:text-white text-gray-800">{feature.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
