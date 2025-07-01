"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star, Quote } from "lucide-react"

// Testimonial data
const testimonials = [
  {
    quote:
      "BombayFashions  transformed my voice completely. The vocal training here is exceptional, and the recording facilities are top-notch. I've recorded two singles here and couldn't be happier with the results!",
    name: "Priya Sharma",
    role: "Independent Artist",
    image: "/images/testimonial-1.png",
    rating: 5,
  },
  {
    quote:
      "As a fashion buyer, I'm very particular about uniform quality. BombayFashions exceeds expectations with their fabric selection and craftsmanship. The team's expertise makes every order perfect and timely.",
    name: "Rahul Mehta",
          role: "Fashion Buyer",
    image: "/images/testimonial-2.png",
    rating: 5,
  },
  {
    quote:
      "I took guitar lessons at BombayFashions  and was amazed by how quickly I progressed. The instructors are patient, knowledgeable, and truly passionate about music. Highly recommended for anyone looking to learn!",
    name: "Ananya Desai",
    role: "Student",
    image: "/images/testimonial-3.png",
    rating: 4,
  },
  {
    quote:
      "The mixing and mastering services at BombayFashions  are exceptional. They brought my tracks to life with a professional sound that I couldn't achieve elsewhere. Worth every penny!",
    name: "Vikram Singh",
    role: "Indie Band Vocalist",
    image: "/images/testimonial-4.jpg",
    rating: 5,
  },
  {
    quote:
      "The uniform fittings at BombayFashions are incredible! The process is well-organized, and the quality is perfect. It's become our company's go-to place for all uniform needs.",
    name: "Aditya Kapoor",
          role: "HR Manager",
    image: "/placeholder.svg?key=u9bxl",
    rating: 5,
  },
  {
    quote:
      "I've been taking vocal lessons for 6 months, and the improvement in my singing is remarkable. The personalized approach and detailed feedback have helped me overcome challenges I've struggled with for years.",
    name: "Meera Joshi",
    role: "Aspiring Singer",
    image: "/female-singer.png",
    rating: 5,
  },
]

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section className="py-20 relative overflow-hidden dark:bg-[#0a0a0a] bg-gray-50">
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">What Our Clients Say</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from musicians and artists who have experienced the BombayFashions 
            difference.
          </p>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <a href="/contact" className="bg-gradient text-white font-semibold py-3 px-8 rounded-full inline-block">
              Join Our Happy Clients
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
