"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Instagram, Facebook, Linkedin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { trackEvent } from "../providers/analytics"

const navItems = [
  { name: "HOME", href: "/" },
  { name: "PRODUCTS", href: "/products" },
  { name: "SERVICES", href: "/services" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACT", href: "/contact" }
]

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Convert pathname to match our navigation item format
  const activeItem = pathname === "/" ? "HOME" : pathname.slice(1).toUpperCase()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white bg-opacity-100 backdrop-blur-md py-3 shadow-md"
            : "bg-white bg-opacity-100 backdrop-blur-sm py-3"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <h1 className="text-xl font-bold relative">
                <span className="text-gradient">BOMBAYFASHIONS</span>
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium relative ${
                  activeItem === item.name
                    ? "text-gradient"
                    : "text-gray-700 hover:text-black"
                }`}
                onClick={() => {
                  trackEvent("navigation", "click", `Nav Link: ${item.name}`, 1)
                }}
              >
                {item.name}
                {activeItem === item.name && (
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient"
                    layoutId="navbar-underline"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-white md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col min-h-screen px-8 pt-20 pb-8">
              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col items-start space-y-8 py-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Link
                      href={item.href}
                      className={`text-3xl font-seasons block w-full py-2 ${
                        activeItem === item.name ? "text-gradient" : "text-gray-800"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <motion.div 
                      className="h-px w-full bg-gray-100 mt-2"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    />
                  </motion.div>
                ))}
              </nav>

              {/* Book Call Button */}
              <div className="mt-auto">
                <Link 
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 px-6 bg-gradient text-white text-center rounded-lg text-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Book a Consultation
                </Link>

                {/* Social Links */}
                <div className="mt-8">
                  <p className="text-gray-500 mb-4 text-sm">Follow Us:</p>
                  <div className="flex items-center space-x-6">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <link.icon size={24} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
