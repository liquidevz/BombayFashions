"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import BookNowButton from "@/components/book-now-button"
import { Scissors, Shirt, Shield, Package, Palette, Users } from "lucide-react"

const services = [
  {
    title: "Custom Manufacturing",
    icon: <Scissors className="w-8 h-8" />,
    description: "Professional uniform manufacturing with state-of-the-art equipment and experienced tailors for all industries.",
    image: "/images/studio1.png",
  },
  {
    title: "Design Services",
    icon: <Palette className="w-8 h-8" />,
    description: "Expert design consultation to create professional uniforms that reflect your brand identity.",
    image: "/images/studio2.png",
  },
  {
    title: "Quality Control",
    icon: <Shield className="w-8 h-8" />,
    description: "Rigorous quality assurance processes to ensure every uniform meets our high standards and durability requirements.",
    image: "/images/studio3.png",
  },
  {
    title: "Bulk Orders",
    icon: <Package className="w-8 h-8" />,
    description: "Efficient bulk uniform production for schools, hospitals, restaurants, and corporate clients with competitive pricing.",
    image: "/images/studio4.png",
  },
  {
    title: "Customization",
    icon: <Shirt className="w-8 h-8" />,
    description: "Personalized branding, logo embroidery, and custom fitting services to meet your specific requirements.",
    image: "/images/studio5.png",
  },
  {
    title: "Consultation",
    icon: <Users className="w-8 h-8" />,
    description: "Professional consultation to help you choose the right uniforms and fabrics for your industry needs.",
    image: "/images/studio6.png",
  },
]

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })

  const servicesRef = useRef<HTMLDivElement>(null)
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.1 })

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
              Services
            </motion.h1>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Home</span>
              <span>-</span>
              <span className="text-gradient">Services</span>
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
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              <span className="text-gradient">What We Do Best</span>
            </h2>
            <p className="text-gray-600">
              Our team will help you create the perfect professional image with state-of-the-art manufacturing equipment and years of
              experience in workwear design
            </p>
          </motion.div>

          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-xl overflow-hidden h-[400px] relative group shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mb-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center mb-4 text-white">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                  </motion.div>

                  <motion.p className="text-gray-200 text-sm transform opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {service.description}
                  </motion.p>

                  <motion.button
                    className="mt-4 py-2 px-4 rounded-full bg-white text-sm text-gray-900 hover:bg-opacity-90 transition-colors transform opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to <span className="text-gradient">Elevate Your Professional Image?</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Contact us now and let's bring your uniform vision to life with our professional services and
              state-of-the-art manufacturing equipment.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <a href="/contact" className="bg-gradient text-white font-semibold py-3 px-8 rounded-full inline-block">
                Get Your Quote
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <BookNowButton />
    </main>
  )
}
