"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface HeroSlideshowProps {
  images: string[]
  interval?: number
  children?: React.ReactNode
}

export default function HeroSlideshow({ images, interval = 5000, children }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, interval)

    return () => clearInterval(timer)
  }, [handleNext, interval])

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Previous Image (for crossfade) */}
      <div className="absolute inset-0">
        <Image
          src={images[(currentIndex - 1 + images.length) % images.length]}
          alt="Previous slide"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Current Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0"
        >
          <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
            fill
            priority
          className="object-cover"
          />
        <div className="absolute inset-0 bg-black/40" />
        </motion.div>

      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  )
}
