"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Home,
  Music2,
  Headphones,
  Mic2,
  BookOpen,
  User,
} from "lucide-react"
import { SocialIcon } from "../ui/social-icon"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#192e42] dark:bg-[#192e42] pt-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute bottom-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center group mb-6">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <h1 className="text-xl font-bold relative">
                  <span className="text-white">BOMBAYFASHIONS</span>
                  <motion.span
                    className="block text-xs text-center text-gray-300"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    STUDIO
                  </motion.span>
                </h1>
              </motion.div>
            </Link>
            <p className="text-gray-300 mb-6">
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
              <span className="text-white">Quick Links</span>
              <div className="h-1 w-full bg-yellow-300 mt-1"></div>
            </h3>

            {/* First row */}
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row">
                <div className="flex items-center mb-4 sm:mb-0 sm:w-1/3">
                  <Home className="w-5 h-5 text-yellow-300 mr-3 shrink-0" />
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Home
                  </Link>
                </div>
                <div className="flex items-center mb-4 sm:mb-0 sm:w-1/3">
                  <Headphones className="w-5 h-5 text-yellow-300 mr-3 shrink-0" />
                  <Link
                    href="/products"
                    className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Products
                  </Link>
                </div>
                <div className="flex items-center sm:w-1/3">
                  <Music2 className="w-5 h-5 text-yellow-300 mr-3 shrink-0" />
                  <Link
                    href="/services"
                    className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Services
                  </Link>
                </div>
              </div>
            </div>

            {/* Second row */}
            <div>
              <div className="flex flex-col sm:flex-row">
                <div className="flex items-center mb-4 sm:mb-0 sm:w-1/3">
                  <Mic2 className="w-5 h-5 text-yellow-300 mr-3 shrink-0" />
                  <Link
                    href="/studio"
                    className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Studio
                  </Link>
                </div>
                <div className="flex items-center mb-4 sm:mb-0 sm:w-1/3">
                  <BookOpen className="w-5 h-5 text-yellow-300 mr-3 shrink-0" />
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Contact
                  </Link>
                </div>
                <div className="flex items-center sm:w-1/3">
                  <User className="w-5 h-5 text-yellow-300 mr-3 shrink-0" />
                  <Link
                    href="/founder"
                    className="text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Founder
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              <span className="text-white">Contact Us</span>
              <div className="h-1 w-full bg-yellow-300 mt-1"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-yellow-300 mr-3 mt-1 shrink-0" />
                <span className="text-gray-300">
                  123 Fashion Avenue, Mumbai, Maharashtra 400001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-yellow-300 mr-3 shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-yellow-300 mr-3 shrink-0" />
                <a
                  href="mailto:info@bombayfashions.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@bombayfashions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} BombayFashions . All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-300 text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 text-sm hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-300 text-sm hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
