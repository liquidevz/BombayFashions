"use client"

import { motion } from "framer-motion"

const ScrollingTestimonials = () => {
  return (
    <section className="py-20 relative overflow-hidden dark:bg-[#0a0a0a] bg-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="mb-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">What Our Clients Say</span>
          </h2>
          <p className="dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from musicians and artists who have experienced the BombayFashions 
            difference.
          </p>
        </motion.div>
      </div>

      <div className="p-4 overflow-x-hidden relative">
        {/* Gradient fade on left side */}
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r dark:from-[#0a0a0a] from-gray-50 to-transparent" />

        <div className="flex items-center mb-8">
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
        </div>
        <div className="flex items-center mb-8">
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
        </div>
        <div className="flex items-center">
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
        </div>

        {/* Gradient fade on right side */}
        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l dark:from-[#0a0a0a] from-gray-50 to-transparent" />
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
    </section>
  )
}

const TestimonialList = ({ list, reverse = false, duration = 50 }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className="flex gap-4 px-2"
    >
      {list.map((t) => {
        return (
          <div
            key={t.id}
            className="shrink-0 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative dark:bg-[#121212] bg-white border dark:border-gray-800 border-gray-200 shadow-lg"
          >
            <img src={t.img || "/placeholder.svg"} alt={t.name} className="w-full h-44 object-cover" />
            <div className="dark:bg-[#121212] bg-white p-4 relative">
              <span className="block font-semibold text-lg mb-1 text-gradient">{t.name}</span>
              <span className="block mb-3 text-sm font-medium dark:text-gray-400 text-gray-600">{t.title}</span>
              <span className="block text-sm dark:text-gray-300 text-gray-700">{t.info}</span>
            </div>
            <span className="text-7xl absolute top-2 right-2 text-purple-500 opacity-10">"</span>
          </div>
        )
      })}
    </motion.div>
  )
}

// Testimonial data with your studio's content but using the new structure
const testimonials = {
  top: [
    {
      id: 1,
      img: "/images/testimonial-1.png",
      name: "Priya Sharma",
      title: "Independent Artist",
      info: "BombayFashions  transformed my voice completely. The vocal training here is exceptional, and the recording facilities are top-notch. I've recorded two singles here and couldn't be happier with the results!",
    },
    {
      id: 2,
      img: "/images/testimonial-2.png",
      name: "Rahul Mehta",
      title: "Music Producer",
      info: "As a fashion buyer, I'm very particular about uniform quality. BombayFashions exceeds expectations with their fabric selection and craftsmanship. The team's expertise makes every order perfect and timely.",
    },
    {
      id: 3,
      img: "/images/testimonial-3.png",
      name: "Ananya Desai",
      title: "Student",
      info: "I took guitar lessons at BombayFashions  and was amazed by how quickly I progressed. The instructors are patient, knowledgeable, and truly passionate about music. Highly recommended for anyone looking to learn!",
    },
  ],
  middle: [
    {
      id: 1,
      img: "/images/testimonial-4.jpg",
      name: "Vikram Singh",
      title: "Indie Band Vocalist",
      info: "The mixing and mastering services at BombayFashions  are exceptional. They brought my tracks to life with a professional sound that I couldn't achieve elsewhere. Worth every penny!",
    },
    {
      id: 2,
      img: "/diverse-musician-ensemble.png",
      name: "Aditya Kapoor",
      title: "Band Member",
      info: "The uniform fittings at BombayFashions are incredible! The process is well-organized, and the quality is perfect. It's become our company's go-to place for all uniform needs.",
    },
    {
      id: 3,
      img: "/female-singer.png",
      name: "Meera Joshi",
      title: "Aspiring Singer",
      info: "I've been taking vocal lessons for 6 months, and the improvement in my singing is remarkable. The personalized approach and detailed feedback have helped me overcome challenges I've struggled with for years.",
    },
  ],
  bottom: [
    {
      id: 1,
      img: "/diverse-musician-ensemble.png",
      name: "Rohan Patel",
      title: "Guitar Enthusiast",
      info: "The guitar lessons at BombayFashions  have been transformative. My instructor tailors each lesson to my skill level and musical interests, making learning both challenging and enjoyable.",
    },
    {
      id: 2,
      img: "/music-student.png",
      name: "Neha Sharma",
      title: "Recording Artist",
      info: "I recorded my debut EP at BombayFashions  and was blown away by the quality. The engineers are incredibly skilled and patient, helping me achieve exactly the sound I was looking for.",
    },
    {
      id: 3,
      img: "/music-student.png",
      name: "Arjun Kapoor",
      title: "Piano Student",
      info: "Working with BombayFashions has been a joy. The designers make complex requirements accessible and the showroom environment is inspiring. I've achieved more in months than I did in years of searching elsewhere.",
    },
  ],
}

export default ScrollingTestimonials
