"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Music, Mic, Video, BookOpen } from "lucide-react"
import Footer from "@/components/footer"
import BookNowButton from "@/components/book-now-button"
import ScrollingTestimonials from "@/components/scrolling-testimonials"
import HeroSlideshow from "@/components/hero-slideshow"
import LogoMarquee from "@/components/logo-marquee"
import WhyUsSection from "@/components/why-us-section"
import BlogSection from "@/components/blog-section"
// Import blog data
import blogData from "@/lib/blog-data.json"

export default function Home() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 })

  const aboutRef = useRef<HTMLDivElement>(null)
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 })

  const heroImages = ["/images/studio1.png", "/images/studio2.png", "/images/studio3.png", "/images/studio4.png"]

  return (
    <main className="min-h-screen dark:bg-black bg-white">

      {/* Hero Section with Slideshow */}
      <section className="relative h-screen">
        <HeroSlideshow images={heroImages}>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              BombayFashions
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Where your musical journey comes to life. Professional recording, production, and music education
              services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="bg-gradient text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg transition-shadow duration-300"
              >
                Book Now
              </Link>
              <Link
                href="/services"
                className="bg-transparent text-white font-semibold py-3 px-8 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-300"
              >
                Our Services
              </Link>
            </motion.div>
          </div>
        </HeroSlideshow>
      </section>


     {/* About Section */}
      <section className="py-20 dark:bg-[#0a0a0a] bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div ref={aboutRef}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  About <span className="text-gradient">BombayFashions</span>
                </h2>
                <div className="h-1 w-20 bg-gradient mb-6"></div>
                <p className="dark:text-gray-300 text-gray-700 mb-6">
                  Founded in 2010, BombayFashions has been the creative home for hundreds of artists, from
                  emerging talents to established stars. Our state-of-the-art facility combines cutting-edge technology
                  with acoustic perfection.
                </p>
                <p className="dark:text-gray-300 text-gray-700 mb-6">
                  We believe that great music production is a collaboration between technical excellence and artistic
                  vision. Our team of experienced engineers and producers work closely with artists to bring their
                  musical ideas to life.
                </p>
                <Link href="/founder" className="inline-flex items-center text-gradient font-semibold hover:underline">
                  Meet Our Founder <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                <Image src="/images/founder.png" alt="Studio Founder" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient p-6 rounded-xl shadow-xl max-w-xs">
                <p className="text-white font-medium">
                  "Our mission is to create a space where artists feel inspired to create their best work."
                </p>
                <p className="text-white text-sm mt-2">- Raj Kapoor, Founder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <div className="h-1 w-20 bg-gradient mx-auto"></div>
          </div>

          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-card rounded-xl overflow-hidden h-80"
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="service-card-content">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient flex items-center justify-center mr-3">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white service-card-title">{service.title}</h3>
                  </div>
                  <p className="text-gray-200 text-sm service-card-description">{service.description}</p>
                  <Link
                    href={service.link}
                    className="mt-4 inline-flex items-center text-white text-sm font-medium hover:underline"
                  >
                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Marquee Section */}
      <LogoMarquee 
        logos={[
          { src: "/placeholder-logo.png", alt: "Partner 1" },
          { src: "/placeholder-logo.svg", alt: "Partner 2" },
          { src: "/placeholder-logo.png", alt: "Partner 3" },
          { src: "/placeholder-logo.svg", alt: "Partner 4" },
          { src: "/placeholder-logo.png", alt: "Partner 5" },
          { src: "/placeholder-logo.svg", alt: "Partner 6" }
        ]} 
      />

      {/* Why Choose Us Section */}
      <WhyUsSection />

      {/* Blog Section */}
      <BlogSection blogs={blogData.blogs} />

      {/* Testimonials Section */}
      <ScrollingTestimonials />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to <span className="text-gradient">Create</span>?
            </h2>
            <p className="dark:text-gray-300 text-gray-700 mb-8">
              Whether you're looking to record your first single or produce a complete album, we have the expertise and
              equipment to help you achieve your musical goals.
            </p>
            <Link
              href="/contact"
              className="bg-gradient text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg transition-shadow duration-300 inline-block"
            >
              Book Your Session Today
            </Link>
          </div>
        </div>
      </section>

      <BookNowButton />
    </main>
  )
}

const services = [
  {
    title: "Recording",
    description:
      "Professional audio recording services with state-of-the-art equipment and experienced sound engineers.",
    image: "/images/recording.png",
    icon: <Mic className="w-5 h-5 text-white" />,
    link: "/services#recording",
  },
  {
    title: "Music Production",
    description: "Full-service music production from arrangement to mixing and mastering for a polished final product.",
    image: "/music-producer-studio.png",
    icon: <Music className="w-5 h-5 text-white" />,
    link: "/services#production",
  },
  {
    title: "Video Production",
    description: "Professional music video production services to visually enhance your musical creations.",
    image: "/images/video.png",
    icon: <Video className="w-5 h-5 text-white" />,
    link: "/services#video",
  },
  {
    title: "Music Teaching",
    description: "Expert music education for all ages and skill levels, from beginners to advanced musicians.",
    image: "/images/teaching.png",
    icon: <BookOpen className="w-5 h-5 text-white" />,
    link: "/teaching",
  },
]