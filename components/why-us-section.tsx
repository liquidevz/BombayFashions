"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Square } from "lucide-react"

const features = [
  {
    title: "Personalized Designs",
    description: "We tailor all uniforms to bring fresh and comfortable experience to every professional.",
    icon: () => (
      <div className="bg-blue-600 p-4 rounded-2xl inline-flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          <path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25V9.75M8.25 21h5.625c.621 0 1.125-.504 1.125-1.125v-5.25M8.25 9.75h12M10.5 2.25h2.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H10.5c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125z" />
          <path d="M3.75 6.75h.007v.008H3.75v-.008zM3.75 9.75h.007v.008H3.75v-.008zm3-3h.007v.008H6.75v-.008zm0 3h.007v.008H6.75v-.008z" />
        </svg>
      </div>
    ),
    bgColor: "bg-[#F0F7FF]"
  },
  {
    title: "Durable Garments",
    description: "Our professional uniforms are not only reliable but highly durable to last for extended use.",
    icon: () => (
      <div className="bg-purple-600 p-4 rounded-2xl inline-flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    bgColor: "bg-[#FDF4FF]"
  },
  {
    title: "Competitive Pricing",
    description: "We offer fair rates and ensure you get premium quality output from our end.",
    icon: () => (
      <div className="bg-amber-500 p-4 rounded-2xl inline-flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    bgColor: "bg-[#FEFCE8]"
  },
  {
    title: "Prompt Delivery",
    description: "We always deliver your projects on schedule with possible delivery from our end.",
    icon: () => (
      <div className="bg-red-500 p-4 rounded-2xl inline-flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-white"
        >
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    bgColor: "bg-[#FFF1F2]"
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
    description: "Our garments are not only comfortable to wear but also durable in nature. Fabrics are sourced directly from the best mills in India. Having the finest materials to craft each piece, quality output is guaranteed.",
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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Why Choose <span className="text-gradient">Bombay Fashions</span>
          </h2>
          <div className="h-1 w-20 bg-gradient mx-auto mb-6"></div>
          <p className="text-gray-600">
            We pride ourselves on delivering exceptional quality uniforms with unmatched service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`${feature.bgColor} rounded-2xl p-6 md:p-8`}
            >
              <feature.icon />
              <h3 className="text-xl text-[#192e42] mb-3 mt-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
