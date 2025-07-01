"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Volume2, VolumeX, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { trackEvent } from "../providers/analytics"

const navItems = [
  { name: "HOME", href: "/" },
  { name: "EQUIPMENT", href: "/equipment" },
  { name: "SERVICES", href: "/services" },
  { name: "STUDIO", href: "/studio" },
  { name: "TEACHING", href: "/teaching" },
  { name: "FOUNDER", href: "/founder" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const [activeItem, setActiveItem] = useState("")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    const handleRouteChange = () => {
      const path = window.location.pathname
      const currentPage = path === "/" ? "HOME" : path.slice(1).toUpperCase()
      setActiveItem(currentPage)
    }

    window.addEventListener("scroll", handleScroll)
    handleRouteChange()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleSound = () => {
    setSoundOn(!soundOn)
    // Logic to mute/unmute all audio elements
    document.querySelectorAll("audio").forEach((audio) => {
      audio.muted = soundOn
    })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "dark:bg-black dark:bg-opacity-80 bg-white bg-opacity-80 backdrop-blur-md py-2 shadow-md"
            : "bg-transparent py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center group">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium relative ${
                  activeItem === item.name
                    ? "text-gradient"
                    : "dark:text-gray-300 text-gray-700 hover:dark:text-white hover:text-black"
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

          <div className="flex items-center space-x-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme === "dark" ? "dark" : "light"}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            )}

            <button
              onClick={toggleSound}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
              aria-label={soundOn ? "Mute sound" : "Unmute sound"}
            >
              {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>

            <button
              onClick={toggleMenu}
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
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 dark:bg-black bg-white dark:bg-opacity-95 bg-opacity-95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center space-y-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-2xl font-bold ${
                        activeItem === item.name ? "text-gradient" : "dark:text-gray-300 text-gray-700"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="absolute bottom-10 flex space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="p-3 rounded-full bg-gradient text-white"
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                )}

                <button
                  onClick={toggleSound}
                  className="p-3 rounded-full bg-gradient text-white"
                  aria-label={soundOn ? "Mute sound" : "Unmute sound"}
                >
                  {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
