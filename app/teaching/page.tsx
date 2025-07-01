"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import BookNowButton from "@/components/book-now-button"
import { Mic, Guitar, Piano, Laptop, Check, Music, Calendar, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react"
import ScrollingTestimonials from "@/components/scrolling-testimonials"
import HeroSlideshow from "@/components/hero-slideshow"
import Footer from "@/components/footer"

// Course data structure
const vocalCourses = [
  {
    level: "Beginner Level",
    courses: [
      {
        title: "Karaoke Singer",
        sessions: "2 Sessions",
        description:
          "Love singing but lack confidence? This course will help you sing your favorite song flawlessly while improving basic vocal control.",
        learnings: [
          "Breathing techniques for better vocal control",
          "Pitch accuracy & rhythm improvement",
          "Confidence-building for casual performances",
        ],
        originalFee: "₹2,000",
        discountedFee: "₹1,900",
        discount: "5% Diwali Discount!",
        icon: <Mic className="w-6 h-6" />,
        color: "from-purple-500 to-pink-500",
      },
      {
        title: "Brush Up Melody",
        sessions: "5 Sessions",
        description:
          "Learn essential vocal basics and master one song with improved voice clarity, projection, and expression.",
        learnings: [
          "Vocal warm-ups & exercises",
          "Understanding vocal range & control",
          "Singing with emotion and expression",
        ],
        originalFee: "₹5,000",
        discountedFee: "₹4,500",
        discount: "10% OFF!",
        icon: <Mic className="w-6 h-6" />,
        color: "from-pink-500 to-rose-500",
      },
      {
        title: "Rhythm & Range",
        sessions: "10 Sessions",
        description:
          "Build a strong foundation in classical techniques and expand your vocal range with structured practice.",
        learnings: [
          "Vocal basics & advanced breathing techniques",
          "Singing a chosen song with proper technique",
          "Introduction to Raags for better vocal flexibility",
        ],
        originalFee: "₹10,000",
        discountedFee: "₹9,000",
        discount: "10% OFF!",
        icon: <Mic className="w-6 h-6" />,
        color: "from-rose-500 to-red-500",
      },
    ],
  },
  {
    level: "Intermediate Level",
    subtitle: "Sharpen Your Skills",
    courses: [
      {
        title: "Harmony Mastery",
        sessions: "15 Sessions",
        description:
          "For singers looking to improve their voice texture, resonance, and harmony skills for duets and group singing.",
        learnings: [
          "Harmonization techniques & blending voices",
          "Expanding vocal dynamics & range",
          "Stage presence & confidence",
        ],
        originalFee: "₹30,000",
        discountedFee: "₹27,000",
        discount: "10% OFF!",
        icon: <Mic className="w-6 h-6" />,
        color: "from-orange-500 to-amber-500",
      },
      {
        title: "Mastering the Melody",
        sessions: "20 Sessions",
        description:
          "Gain full control over your breath, vocal agility, and emotional connection to songs for impactful performances.",
        learnings: [
          "Advanced breath control for long notes",
          "Vocal dynamics & modulations",
          "Expressing emotions through voice",
        ],
        originalFee: "₹40,000",
        discountedFee: "₹36,000",
        discount: "10% OFF!",
        icon: <Mic className="w-6 h-6" />,
        color: "from-amber-500 to-yellow-500",
      },
    ],
  },
  {
    level: "Experienced Level",
    subtitle: "Sing Like a Pro!",
    courses: [
      {
        title: "Singing Maestro",
        sessions: "25 Sessions",
        description:
          "A high-level training program designed to refine your singing technique, stage presence, and vocal mastery for professional singing.",
        learnings: [
          "Mastering different vocal registers",
          "Preparing for live performances & auditions",
          "Perfecting stage presence & audience engagement",
        ],
        originalFee: "₹55,000",
        discountedFee: "₹46,750",
        discount: "15% OFF!",
        icon: <Mic className="w-6 h-6" />,
        color: "from-green-500 to-emerald-500",
      },
      {
        title: "Complete Vocal Journey",
        sessions: "35 Sessions",
        description:
          "A comprehensive program covering all aspects of professional singing, from technical mastery to live performance skills.",
        learnings: [
          "In-depth vocal techniques & song interpretation",
          "Classical & contemporary singing styles",
          "Microphone techniques & recording tips",
        ],
        originalFee: "₹80,500",
        discountedFee: "₹68,425",
        discount: "15% OFF!",
        icon: <Mic className="w-6 h-6" />,
        color: "from-teal-500 to-cyan-500",
      },
      {
        title: "Vocal Prodigy",
        sessions: "60 Sessions",
        description:
          "A personalized mentorship program for singers who want to become industry-ready with hands-on experience and expert guidance.",
        learnings: [
          "One-on-one coaching with expert vocal trainers",
          "Performance coaching for concerts & recordings",
          "Songwriting, improvisation, and advanced vocal techniques",
        ],
        originalFee: "₹1,32,000",
        discountedFee: "₹1,12,200",
        discount: "15% OFF!",
        icon: <Mic className="w-6 h-6" />,
        color: "from-blue-500 to-indigo-500",
      },
    ],
  },
]

// Other course categories
const otherCourses = [
  {
    title: "Guitar Lessons",
    icon: <Guitar className="w-8 h-8" />,
    description:
      "Master the guitar with personalized lessons covering chords, scales, music theory, and various playing styles.",
    duration: "16 weeks",
    level: "All levels",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Piano/Keyboard",
    icon: <Piano className="w-8 h-8" />,
    description: "Develop your piano skills with comprehensive lessons on technique, theory, and performance.",
    duration: "12 weeks",
    level: "Beginner to Intermediate",
    color: "from-blue-500 to-teal-500",
  },
  {
    title: "Music Production",
    icon: <Laptop className="w-8 h-8" />,
    description:
      "Learn the art of music production, including recording, mixing, and mastering using industry-standard software.",
    duration: "8 weeks",
    level: "Beginner to Intermediate",
    color: "from-green-500 to-emerald-500",
  },
]

// Course card component for the new grid layout
const CourseCard = ({ course, index }: { course: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="dark:bg-[#0a0a0a] bg-gray-50 rounded-xl overflow-hidden border dark:border-gray-800 border-gray-200 relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: "0 10px 30px -10px rgba(138, 43, 226, 0.3)" }}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${course.color}`}></div>
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center mr-4 shrink-0">
            {course.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{course.title}</h3>
            <p className="text-purple-500 dark:text-purple-300 text-sm mb-2">{course.sessions}</p>
            <p className="dark:text-gray-400 text-gray-600 text-sm">{course.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <span className="text-xs px-3 py-1 rounded-full bg-purple-500 bg-opacity-20 text-purple-500 dark:text-purple-300">
            {course.sessions}
          </span>
          <span className="text-xs px-3 py-1 rounded-full bg-orange-500 bg-opacity-20 text-orange-500 dark:text-orange-300">
            {course.discount}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 mb-4">
          <div>
            <span className="dark:text-gray-400 text-gray-500 text-sm line-through mr-2">{course.originalFee}</span>
            <span className="text-xl font-bold text-gradient">{course.discountedFee}</span>
          </div>
        </div>

        <div className="pt-4 border-t dark:border-gray-800 border-gray-200">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-semibold text-gradient">What Will You Learn?</span>
            <span className="p-1 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors">
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 my-4">
                  {course.learnings.map((learning: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span className="dark:text-gray-300 text-gray-700 text-sm">{learning}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-1.5 px-4 bg-gradient rounded-full text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <ShoppingCart size={14} />
              <span>Buy Now</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-1.5 px-4 border border-purple-500 rounded-full dark:text-white text-gray-900 text-sm font-medium hover:bg-purple-500 hover:bg-opacity-10 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar size={14} />
              <span>Book Demo</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Teaching() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })

  const coursesRef = useRef<HTMLDivElement>(null)
  const isCoursesInView = useInView(coursesRef, { once: true, amount: 0.1 })

  const [showDemoForm, setShowDemoForm] = useState(false)

  const heroImages = ["/music-student.png", "/female-singer.png", "/diverse-musician-ensemble.png"]

  return (
    <main className="min-h-screen dark:bg-black bg-white">

      {/* Hero Section with Slideshow */}
      <section className="relative h-[60vh] md:h-[70vh]">
        <HeroSlideshow images={heroImages}>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Music Teaching
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Learn from experienced instructors and develop your musical skills with our personalized lessons
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDemoForm(true)}
              className="bg-gradient text-white font-semibold py-3 px-8 rounded-full inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Calendar className="w-5 h-5" />
              <span>Book Your Free Demo</span>
            </motion.button>
          </div>
        </HeroSlideshow>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient">Learn from the Best</span>
            </h2>
            <p className="dark:text-gray-400 text-gray-600 mb-8">
              Our experienced instructors provide personalized lessons to help you develop your musical skills and
              achieve your goals, whether you're a beginner or looking to refine your technique.
            </p>
          </motion.div>

          <div ref={coursesRef} className="space-y-16">
            {/* Vocal Training Courses - Now in a grid layout like Other Music Programs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center mr-4">
                  <Mic className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Vocal Training Programs</h2>
              </div>

              {vocalCourses.map((levelGroup, levelIndex) => (
                <div key={levelGroup.level} className="mb-12">
                  <div className="flex items-center mb-6">
                    <h3 className="text-xl font-bold text-gradient">{levelGroup.level}</h3>
                    {levelGroup.subtitle && (
                      <p className="dark:text-gray-400 text-gray-600 text-sm ml-2">({levelGroup.subtitle})</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {levelGroup.courses.map((course, courseIndex) => (
                      <CourseCard key={course.title} course={course} index={courseIndex} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Other Courses */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center mr-4">
                  <Music className="w-6 h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Other Music Programs</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherCourses.map((course, index) => (
                  <motion.div
                    key={course.title}
                    className="dark:bg-[#0a0a0a] bg-gray-50 rounded-xl overflow-hidden border dark:border-gray-800 border-gray-200 relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isCoursesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, boxShadow: "0 10px 30px -10px rgba(138, 43, 226, 0.3)" }}
                  >
                    <div className={`h-2 w-full bg-gradient-to-r ${course.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center mr-4">
                          {course.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                          <p className="dark:text-gray-400 text-gray-600 text-sm mb-4">{course.description}</p>
                          <div className="flex flex-wrap gap-3 mb-4">
                            <span className="text-xs px-3 py-1 rounded-full bg-purple-500 bg-opacity-20 text-purple-500 dark:text-purple-300">
                              Duration: {course.duration}
                            </span>
                            <span className="text-xs px-3 py-1 rounded-full bg-orange-500 bg-opacity-20 text-orange-500 dark:text-orange-300">
                              Level: {course.level}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 py-1.5 px-3 text-sm bg-gradient rounded-full text-white font-medium flex items-center justify-center gap-1"
                            >
                              <ShoppingCart size={14} />
                              <span>Enroll</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setShowDemoForm(true)}
                              className="flex-1 py-1.5 px-3 text-sm border border-purple-500 rounded-full dark:text-white text-gray-900 font-medium hover:bg-purple-500 hover:bg-opacity-10 transition-colors flex items-center justify-center gap-1"
                            >
                              <Calendar size={14} />
                              <span>Demo</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Using the new ScrollingTestimonials component */}
      <ScrollingTestimonials />

      {/* Demo Booking Modal */}
      <AnimatePresence>
        {showDemoForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="dark:bg-[#121212] bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              role="dialog"
              aria-labelledby="demo-form-title"
              aria-modal="true"
            >
              <DemoBookingForm onClose={() => setShowDemoForm(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <BookNowButton />
    </main>
  )
}

const DemoBookingForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold" id="demo-form-title">
          <span className="text-gradient">Book Your Free Demo</span>
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
          aria-label="Close modal"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border dark:border-gray-800 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border dark:border-gray-800 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Your contact number"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border dark:border-gray-800 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Your email address"
          />
        </div>

        <div>
          <label htmlFor="course" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Interested In *
          </label>
          <select
            id="course"
            required
            className="w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border dark:border-gray-800 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
          >
            <option value="">Select a course</option>
            <option value="vocal-beginner">Vocal Training - Beginner</option>
            <option value="vocal-intermediate">Vocal Training - Intermediate</option>
            <option value="vocal-advanced">Vocal Training - Advanced</option>
            <option value="guitar">Guitar Lessons</option>
            <option value="piano">Piano/Keyboard</option>
            <option value="production">Music Production</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium dark:text-gray-400 text-gray-600 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={3}
            className="w-full px-4 py-3 dark:bg-[#1a1a1a] bg-gray-50 border dark:border-gray-800 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Tell us about your music goals"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-4 bg-gradient rounded-lg font-semibold text-white flex items-center justify-center"
        >
          Book My Free Demo Session
        </motion.button>

        <p className="text-xs dark:text-gray-400 text-gray-500 text-center">
          By booking a demo, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </div>
  )
}
