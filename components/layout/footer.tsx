"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  MapPin,
  Mail,
} from "lucide-react"
import GoogleMapComponent from "../ui/google-map"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-seasons text-xl mb-4 pb-2 border-b border-yellow-500/30 tracking-wide">
      {children}
    </h3>
  )

  return (
    <footer className="relative bg-[#111827] text-white">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none" />

      {/* Main footer content */}
      <div className="relative container mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Our Services Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <SectionTitle>OUR SERVICES</SectionTitle>
              <p className="text-sm text-gray-300 leading-relaxed">
                BombayFashions have ventured into the Uniforms and Commercial shops in Mumbai. We are experts in
                Public School Uniforms, Colleges, Hospitals, Hotels as well as corporate uniform business.
              </p>
            </motion.div>
          </div>

          {/* Quick Links Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full flex flex-col"
            >
              <SectionTitle>QUICK LINKS</SectionTitle>
              <ul className="space-y-2 text-sm mb-4">
                {[
                  { href: "/", text: "HOME" },
                  { href: "/about", text: "ABOUT US" },
                  { href: "/products", text: "PRODUCTS" },
                  { href: "/contact", text: "CONTACT" },
                  { href: "/blog", text: "BLOG" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-gray-300 hover:text-yellow-500 transition-colors duration-200 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-500 mr-0 group-hover:mr-2 transition-all duration-200" />
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div className="mt-auto">
                <div className="flex space-x-4">
                  {[
                    { Icon: Facebook, href: "https://facebook.com" },
                    { Icon: Instagram, href: "https://instagram.com" },
                    { Icon: Twitter, href: "https://twitter.com" },
                  ].map(({ Icon, href }) => (
                    <Link 
                      key={href}
                      href={href} 
                      className="text-gray-400 hover:text-yellow-500 transition-colors duration-200"
                    >
                      <Icon size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Location Map Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SectionTitle>LOCATION</SectionTitle>
              <div className="w-full h-[180px] sm:h-[200px] rounded-lg overflow-hidden shadow-lg shadow-black/20 border border-gray-800">
                <GoogleMapComponent />
              </div>
            </motion.div>
          </div>

          {/* Address Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SectionTitle>ADDRESS</SectionTitle>
              <div className="space-y-4 text-sm">
                <div className="text-gray-300 space-y-1">
                  <p className="text-white">BombayFashions</p>
                  <p>1, BombayFashions Street,</p>
                  <p>1st Street Nadar Colony,</p>
                  <p>Nanjundapuram Road, Mumbai</p>
                  <p>Maharashtra - 641023, India</p>
                </div>

                <div className="space-y-2">
                  {[
                    { icon: <Phone size={14} />, href: "tel:+919916930444", text: "+91 9916930444" },
                    { icon: <Phone size={14} />, href: "tel:+919844120777", text: "+91 9844120777" },
                    { icon: <Mail size={14} />, href: "mailto:uniforms@bombayfashions.in", text: "uniforms@bombayfashions.in" },
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center text-gray-300 group">
                      <span className="text-yellow-500/70 mr-2">{contact.icon}</span>
                      <a href={contact.href} className="hover:text-yellow-500 transition-colors duration-200 text-xs sm:text-sm">
                        {contact.text}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-8 pt-4 border-t border-gray-800/50">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-xs sm:text-sm text-gray-400"
          >
            <p>Copyright © BombayFashions, {currentYear}. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
