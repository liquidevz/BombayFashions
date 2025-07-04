"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Scissors, Shirt, Shield, Package, GraduationCap, Stethoscope, UtensilsCrossed, Building2 } from "lucide-react"
// import Footer from "@/components/footer"

import HeroSlideshow from "@/components/hero-slideshow"
import LogoMarquee from "@/components/logo-marquee"
import WhyUsSection from "@/components/why-us-section"
import BlogSection from "@/components/blog-section"
import ProductsSection from "@/components/sections/products-section"
import SuspenseWrapper from "@/components/providers/suspense-wrapper"
// Import blog data
import blogData from "@/lib/blog-data.json"

export default function Home() {
  return (
    <SuspenseWrapper>
      <HomeContent />
    </SuspenseWrapper>
  )
}

function HomeContent() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.2 })

  const aboutRef = useRef<HTMLDivElement>(null)
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 })

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Hero section images
  const heroImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRgfKXCkOSqyGssT15r6biHjz6iZWE7tevw&s", 
    "/images/uniforms/corporate-1.jpg",
    "/images/uniforms/school-1.jpg",
    "/images/uniforms/hospital-1.jpg"
  ]

  return (
    <main className="min-h-screen dark:bg-black bg-white">

      {/* Hero Section with Slideshow */}
      <section className="relative h-screen">
        <HeroSlideshow images={heroImages}>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl text-white dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              BombayFashions
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white dark:text-gray-200 max-w-2xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Where professional excellence meets quality craftsmanship. Premium workwear and uniform solutions
              designed for every industry.
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
                className="bg-transparent text-white dark:text-white font-semibold py-3 px-8 rounded-full border border-white dark:border-white hover:bg-white hover:text-black transition-colors duration-300"
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
                <h2 className="text-3xl md:text-4xl mb-6">
                  About <span className="text-gradient">Bombay Fashions</span>
                </h2>
                <div className="h-1 w-20 bg-gradient mb-6"></div>
                <p className="dark:text-gray-300 text-gray-700 mb-6">
                  We at Bombay Fashion strive to create and maintain a lifestyle and standard that is unmatched in the textile & uniform design industry.
                </p>
                <p className="dark:text-gray-300 text-gray-700 mb-6">
                  With 75 state-of-the-art machines at our disposal in our in-house manufacturing unit, we ensure the production of the highest grade fabric. Our dedicated design team specializes in crafting bespoke designs tailored to the unique needs of schools, hospitals, and restaurants, ensuring that every piece meets the highest standards of quality and aesthetics.
                </p>
                <p className="dark:text-gray-300 text-gray-700 mb-6">
                  This level of customisation adds a personal touch to all the products we deliver to our clients. All our endeavours are underpinned by a commitment to compliance with REACH regulations, further reinforcing our dedication to sustainability and excellence.
                </p>
                <p className="dark:text-gray-300 text-gray-700 mb-6">
                  These are some of the practices that highlight our vision of a chic yet traditional; premium and environment friendly brand.
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
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
                <Image src="/images/founder.png" alt="Bombay Fashions Manufacturing" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient p-6 rounded-xl shadow-xl max-w-xs">
                <p className="text-white font-medium !text-white">
                  "Our mission is to create uniforms that empower professionals to perform at their best."
                </p>
                <p className="text-white text-sm mt-2 !text-white">- Partap Kukreja, Founder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-20 relative overflow-hidden dark:bg-black bg-white">
        <div className="services-bg">
          <div className="blur-circle-1"></div>
          <div className="blur-circle-2"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 dark:text-white text-gray-900">
              Our <span className="text-gradient">Uniform Categories</span>
            </h2>
            <div className="h-1 w-20 bg-gradient mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive range of professional uniforms designed to meet the highest standards of quality and comfort across various industries.
            </p>
          </div>

          <div ref={servicesRef} className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card-new group"
              >
                <div className="image-container">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={500}
                    height={375}
                    className="object-cover"
                  />
                  <div className="overlay" />
                </div>
                
                <div className="content">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="icon-container">
                      {service.icon}
                    </div>
                    <h3 className="title">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="description">
                    {service.description}
                  </p>

                  <Link
                    href={service.link}
                    className="learn-more"
                  >
                    Learn More <ArrowRight className="icon" />
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

      {/* Products Section */}
      <ProductsSection />

      {/* Why Choose Us Section */}
      <WhyUsSection />

      {/* Blog Section */}
      <BlogSection blogs={blogData.blogs} />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden dark:bg-black bg-gray-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-6 dark:text-white text-gray-900">
              Ready to <span className="text-gradient">Get Started</span>?
            </h2>
            <p className="dark:text-gray-300 text-gray-700 mb-8">
              Whether you need uniforms for your team or want to create custom workwear, we have the expertise and
              technology to help you achieve professional excellence.
            </p>
            <Link
              href="/contact"
              className="bg-gradient text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg transition-shadow duration-300 inline-block"
            >
              Get Your Quote Today
            </Link>
          </div>
        </div>
      </section>

      {/* <BookNowButton /> */}
    </main>
  )
}

const services = [
  {
    title: "School Uniforms",
    description:
      "Complete range of school uniforms including shirts, trousers, skirts, and blazers with customizable designs and high-quality materials.",
    image: "/placeholder.jpg",
    icon: <GraduationCap className="w-5 h-5 text-white" />,
    link: "/products?category=School%20Uniforms",
  },
  {
    title: "Hospital Uniforms",
    description: "Professional medical uniforms including scrubs, lab coats, and nursing attire designed for comfort and functionality.",
    image: "/placeholder.jpg",
    icon: <Stethoscope className="w-5 h-5 text-white" />,
    link: "/products?category=Hospital%20Uniforms",
  },
  {
    title: "Hotel & Hospitality",
    description: "Elegant hospitality uniforms for hotels, restaurants, and service staff that combine style with durability.",
    image: "/placeholder.jpg",
    icon: <UtensilsCrossed className="w-5 h-5 text-white" />,
    link: "/products?category=Hotel%20%26%20Hospitality",
  },
  {
    title: "Corporate Uniforms",
    description: "Professional corporate wear including formal shirts, trousers, and suits tailored to enhance your brand identity.",
    image: "/placeholder.jpg",
    icon: <Building2 className="w-5 h-5 text-white" />,
    link: "/products?category=Corporate%20Uniforms",
  },
]