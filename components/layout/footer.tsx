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
                <h2 className="text-xl font-bold text-white">
                  BOMBAYFASHIONS
                </h2>
              </motion.div>
            </Link>
            <p className="mt-4 text-sm text-gray-300 max-w-xs">
              Your trusted partner for high-quality uniforms. Serving businesses, schools, and healthcare institutions since 2008.
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
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
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
            © {currentYear} BombayFashions. All rights reserved.
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
