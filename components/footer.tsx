"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative dark:bg-[#080808] bg-gray-100 pt-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center group mb-6">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <h1 className="text-xl font-bold relative">
                  <span className="text-gradient">BOMBAYFASHIONS</span>
                  <motion.span
                    className="block text-xs text-center dark:text-white/70 text-black/70"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    STUDIO
                  </motion.span>
                </h1>
              </motion.div>
            </Link>
            <p className="dark:text-gray-400 text-gray-600 mb-6">
              Premier workwear and uniform manufacturing company, offering professional design services, quality production,
              and customization to help businesses achieve their professional image goals.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Youtube size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              <span className="text-gradient">Quick Links</span>
              <div className="h-1 w-full bg-gradient mt-1"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                        { name: "Products", href: "/products" },
                { name: "Services", href: "/services" },
                { name: "Studio", href: "/studio" },
        { name: "Contact", href: "/contact" },
                { name: "Founder", href: "/founder" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="dark:text-gray-400 text-gray-600 hover:text-gradient transition-colors flex items-center"
                  >
                    <span className="mr-2">•</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              <span className="text-gradient">Contact Us</span>
              <div className="h-1 w-full bg-gradient mt-1"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-purple-500 mr-3 mt-1 shrink-0" />
                <span className="dark:text-gray-400 text-gray-600">
                  123 Music Avenue, Thane West, Maharashtra 400601, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-purple-500 mr-3 shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="dark:text-gray-400 text-gray-600 hover:text-gradient transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-purple-500 mr-3 shrink-0" />
                <a
                  href="mailto:info@bombayfashions.com"
                  className="dark:text-gray-400 text-gray-600 hover:text-gradient transition-colors"
                >
                  info@bombayfashions.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              <span className="text-gradient">Newsletter</span>
              <div className="h-1 w-full bg-gradient mt-1"></div>
            </h3>
            <p className="dark:text-gray-400 text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates, special offers, and music tips.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 dark:bg-[#1a1a1a] bg-white border dark:border-gray-800 border-gray-200 rounded-l-md focus:outline-none focus:border-purple-500 w-full"
              />
              <button
                type="submit"
                className="bg-gradient text-white px-4 py-2 rounded-r-md hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t dark:border-gray-800 border-gray-200 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="dark:text-gray-500 text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} BombayFashions . All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="dark:text-gray-400 text-gray-600 text-sm hover:text-gradient">
              Privacy Policy
            </Link>
            <Link href="/terms" className="dark:text-gray-400 text-gray-600 text-sm hover:text-gradient">
              Terms of Service
            </Link>
            <Link href="/contact" className="dark:text-gray-400 text-gray-600 text-sm hover:text-gradient">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Social icon component
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <motion.a
    href="#"
    className="w-8 h-8 rounded-full dark:bg-[#1a1a1a] bg-white border dark:border-gray-800 border-gray-200 flex items-center justify-center dark:text-gray-400 text-gray-600 hover:text-gradient transition-colors"
    whileHover={{ scale: 1.1, y: -3 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
)
