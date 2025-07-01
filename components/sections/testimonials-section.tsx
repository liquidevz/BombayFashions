"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Section } from "../ui/section"
import { SectionTitle } from "../ui/section-title"
import { Button } from "../ui/button"

interface Testimonial {
  quote: string
  name: string
  role: string
  image: string
  rating: number
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export function TestimonialsSection({
  testimonials,
  title = "What Our Clients Say",
  subtitle = "Don't just take our word for it. Hear from musicians and artists who have experienced the BombayFashions  difference.",
  ctaText = "Join Our Happy Clients",
  ctaLink = "/contact",
}: TestimonialsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <Section background="alt">
      <SectionTitle title={title} subtitle={subtitle} center />

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              y: -10,
              boxShadow: "0 10px 30px -10px rgba(138, 43, 226, 0.3)",
              transition: { duration: 0.3 },
            }}
            className="bg-gradient p-[1px] rounded-2xl h-full"
          >
            <div className="dark:bg-[#121212] bg-white rounded-2xl p-6 h-full flex flex-col">
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} mr-1`}
                  />
                ))}
              </div>

              <div className="relative mb-6 flex-grow">
                <Quote className="absolute top-0 left-0 w-8 h-8 text-purple-500 opacity-20" />
                <p className="text-base dark:text-gray-300 text-gray-700 italic pl-6 pt-2">"{testimonial.quote}"</p>
              </div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="flex items-center mt-auto"
              >
                <div className="relative w-12 h-12 mr-4">
                  <div className="absolute inset-0 rounded-full bg-gradient opacity-70 blur-sm"></div>
                  <div className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden border-2 border-white/30">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gradient">{testimonial.name}</h4>
                  <p className="text-sm dark:text-gray-400 text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {ctaText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button as="a" href={ctaLink}>
            {ctaText}
          </Button>
        </motion.div>
      )}
    </Section>
  )
}
