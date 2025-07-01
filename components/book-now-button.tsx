"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, X } from "lucide-react"
import BookingForm from "./booking-form"
import { trackEvent } from "./analytics"

export default function BookNowButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
    trackEvent(!isOpen ? "open_modal" : "close_modal", "booking", "Book Now Button", 1)
  }

  return (
    <>
      <motion.button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 z-20 bg-gradient text-white font-semibold py-3 px-6 rounded-full flex items-center space-x-2 shadow-lg book-now-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone className="h-5 w-5" />
        <span>Book Now</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-[#121212] rounded-xl w-full max-w-3xl mx-4 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    <span className="text-gradient">Book Your Session</span>
                  </h2>
                  <button
                    onClick={toggleModal}
                    className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <BookingForm onClose={toggleModal} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
