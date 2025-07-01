"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import BookNowButton from "@/components/book-now-button"
import { X } from "lucide-react"

const studioImages = [
  {
    src: "/images/studio1.png",
    alt: "Recording Room",
    featured: true,
  },
  {
    src: "/images/studio2.png",
    alt: "Control Room",
  },
  {
    src: "/images/studio3.png",
    alt: "Live Room",
  },
  {
    src: "/images/studio4.png",
    alt: "Vocal Booth",
  },
  {
    src: "/images/studio5.png",
    alt: "Mixing Console",
    featured: true,
  },
  {
    src: "/images/studio6.png",
    alt: "Microphone Setup",
  },
  {
    src: "/images/studio7.png",
    alt: "Green Screen",
  },
  {
    src: "/images/studio8.png",
    alt: "Instrument Collection",
  },
]

export default function Studio() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })

  const galleryRef = useRef<HTMLDivElement>(null)
  const isGalleryInView = useInView(galleryRef, { once: true, amount: 0.1 })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-black">

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-orange-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div ref={titleRef} className="text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Our Studio
            </motion.h1>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Home</span>
              <span>-</span>
              <span className="text-gradient">Creative Space</span>
            </motion.div>

            <motion.div
              className="h-1 w-20 bg-gradient mx-auto mt-8"
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div ref={galleryRef} className="grid-gallery">
            {studioImages.map((image, index) => (
              <motion.div
                key={image.src}
                className={`grid-gallery-item ${image.featured ? "featured" : ""}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isGalleryInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedImage(image.src)}
              >
                <img src={image.src || "/placeholder.svg"} alt={image.alt} />
                <div className="grid-gallery-caption">
                  <h3 className="text-lg font-semibold">{image.alt}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mt-16"
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-gradient">State-of-the-Art Facilities</span>
            </h2>
            <p className="text-gray-400 mb-4">
              Our studio is designed with acoustics in mind, featuring professional treatment to ensure the best
              possible sound for your recordings.
            </p>
            <p className="text-gray-400 mb-4">
              With separate recording rooms, a control room, and a comfortable lounge area, we provide everything you
              need for a productive and enjoyable session.
            </p>
            <p className="text-gray-400">
              Located in the heart of Thane, our studio is easily accessible and offers a creative environment for
              artists to bring their musical visions to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Studio"
                className="max-h-[90vh] w-auto object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookNowButton />
    </main>
  )
}
