"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

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
    image: "/placeholder.svg?key=wt096",
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

// Testimonial card component with floating animation
const TestimonialCard = ({ testimonial, index, isVisible }: any) => {
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)

  // Random floating animation parameters
  const floatY = (index % 3) * 5
  const floatDuration = 3 + (index % 2)
  const floatDelay = index * 0.2

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          delay: index * 0.15,
          ease: [0.43, 0.13, 0.23, 0.96],
        },
      })
    }
  }, [isVisible, controls, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={controls}
      whileHover={{
        y: -10,
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gradient p-[1px] rounded-2xl h-full"
      style={{ transformOrigin: "center bottom" }}
    >
      <motion.div
        className="dark:bg-[#121212] bg-white rounded-2xl p-6 h-full flex flex-col relative overflow-hidden"
        animate={{
          y: isHovered ? 0 : [0, -floatY, 0],
        }}
        transition={{
          y: {
            duration: floatDuration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: floatDelay,
          },
        }}
      >
        {/* Animated gradient background on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 opacity-5 dark:opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "linear-gradient(45deg, #8a2be2, #ff6347)",
                filter: "blur(20px)",
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="mb-4 flex"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.15 + 0.2 + i * 0.1 }}
            >
              <Star
                size={16}
                className={`${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} mr-1`}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="relative mb-6 flex-grow">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
          >
            <Quote className="absolute top-0 left-0 w-8 h-8 text-purple-500" />
          </motion.div>
          <motion.p
            className="text-base dark:text-gray-300 text-gray-700 italic pl-6 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          >
            "{testimonial.quote}"
          </motion.p>
        </div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
          className="flex items-center mt-auto"
        >
          <motion.div className="relative w-12 h-12 mr-4" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient opacity-70 blur-sm"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                repeatType: "reverse",
              }}
            />
            <div className="absolute top-0 left-0 w-full h-full rounded-full overflow-hidden border-2 border-white/30">
              <img
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <div>
            <motion.h4
              className="font-bold text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
            >
              {testimonial.name}
            </motion.h4>
            <motion.p
              className="text-sm dark:text-gray-400 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
            >
              {testimonial.role}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function AnimatedTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = { mobile: 1, tablet: 2, desktop: 3 }
  const [displayCount, setDisplayCount] = useState(itemsPerPage.desktop)

  // Update display count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDisplayCount(itemsPerPage.mobile)
      } else if (window.innerWidth < 1024) {
        setDisplayCount(itemsPerPage.tablet)
      } else {
        setDisplayCount(itemsPerPage.desktop)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalPages = Math.ceil(testimonials.length / displayCount)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  // Get current testimonials to display
  const getCurrentTestimonials = () => {
    const start = currentPage * displayCount
    const end = start + displayCount
    return testimonials.slice(start, end)
  }

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

        <div ref={containerRef} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {getCurrentTestimonials().map((testimonial, index) => (
                <TestimonialCard
                  key={`${currentPage}-${index}`}
                  testimonial={testimonial}
                  index={index}
                  isVisible={isInView}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="flex justify-center mt-12 gap-4">
            <motion.button
              onClick={prevPage}
              className="p-3 rounded-full dark:bg-[#1a1a1a] bg-gray-100 dark:hover:bg-[#252525] hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentPage === index
                      ? "bg-gradient w-6"
                      : "dark:bg-gray-700 bg-gray-300 hover:dark:bg-gray-600 hover:bg-gray-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial page ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextPage}
              className="p-3 rounded-full dark:bg-[#1a1a1a] bg-gray-100 dark:hover:bg-[#252525] hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
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
