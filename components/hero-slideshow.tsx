"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HeroSlideshowProps {
  images: string[]
  interval?: number
  children?: React.ReactNode
  overlay?: boolean
}

export default function HeroSlideshow({ images, interval = 5000, children, overlay = true }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            backgroundImage: `url(${images[currentIndex] || "/placeholder.svg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#1f2937'
          }}
        />
      </AnimatePresence>

      {overlay && (
        <div 
          className="absolute inset-0 z-10" 
          style={{
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'brightness(0.8)'
          }}
        />
      )}

      <div className="relative z-20 w-full h-full">{children}</div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
