"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Navbar from "@/components/navbar"
import BookNowButton from "@/components/book-now-button"

const equipmentCategories = [
  {
    title: "Recording Room",
    items: [
      {
        name: "Console and Interface",
        description: "Universal Audio Apollo x8, Focusrite Scarlett 18i20",
        image: "/images/equipment/console.jpg",
      },
      {
        name: "Microphones",
        description: "Neumann U87, Shure SM7B, AKG C414, Rode NT1-A",
        image: "/images/equipment/microphones.jpg",
      },
      {
        name: "Monitors",
        description: "Yamaha HS8, KRK Rokit 8, Focal Alpha 65",
        image: "/images/equipment/monitors.jpg",
      },
      {
        name: "Headphones",
        description: "Beyerdynamic DT 990 Pro, Audio-Technica ATH-M50x",
        image: "/images/equipment/headphones.jpg",
      },
    ],
  },
  {
    title: "Control Room",
    items: [
      {
        name: "DAW",
        description: "Pro Tools, Logic Pro X, Ableton Live, FL Studio",
        image: "/images/equipment/daw.jpg",
      },
      {
        name: "Plugins",
        description: "Waves Complete, FabFilter Bundle, Native Instruments Komplete",
        image: "/images/equipment/plugins.jpg",
      },
      {
        name: "MIDI Controllers",
        description: "Native Instruments Komplete Kontrol S49, Akai MPK Mini",
        image: "/images/equipment/midi.jpg",
      },
      {
        name: "Outboard Gear",
        description: "Universal Audio 1176, Avalon VT-737sp, DBX 160A",
        image: "/images/equipment/outboard.jpg",
      },
    ],
  },
  {
    title: "Instruments",
    items: [
      {
        name: "Keyboards",
        description: "Nord Stage 3, Yamaha CP88, Roland Juno-106",
        image: "/images/equipment/keyboards.jpg",
      },
      {
        name: "Guitars",
        description: "Fender Stratocaster, Gibson Les Paul, Taylor Acoustic",
        image: "/images/equipment/guitars.jpg",
      },
      {
        name: "Bass",
        description: "Fender Precision Bass, Music Man StingRay",
        image: "/images/equipment/bass.jpg",
      },
      {
        name: "Drums",
        description: "Pearl Masters, Zildjian Cymbals, Roland V-Drums",
        image: "/images/equipment/drums.jpg",
      },
    ],
  },
]

export default function Equipment() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true })

  const listRef = useRef<HTMLDivElement>(null)
  const isListInView = useInView(listRef, { once: true, amount: 0.2 })

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

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
              Equipment
            </motion.h1>

            <motion.div
              className="flex items-center justify-center space-x-2 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span>Home</span>
              <span>-</span>
              <span className="text-gradient">Equipment</span>
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

      {/* Main Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient">What We Use for Perfect Sound</span>
            </h2>
            <p className="text-gray-400">
              BombayFashions offers clients an endless choice of great uniform and fashion equipment. To get a
              more comprehensive idea of the gear found in BombayFashions , please see below for our full Recording
              Studios equipment list.
            </p>
          </motion.div>

          <div ref={listRef} className="space-y-16">
            {equipmentCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isListInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="bg-[#0a0a0a] rounded-xl p-8 border border-gray-800"
              >
                <h3 className="text-2xl font-bold mb-8 relative inline-block">
                  <span className="text-gradient">{category.title}</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 bg-gradient"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </h3>

                <div className="equipment-list grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      className="equipment-item flex flex-col md:flex-row gap-4 bg-black/30 p-4 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * itemIndex }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-full md:w-1/3 h-40 relative rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg?height=160&width=160"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="w-full md:w-2/3">
                        <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-gray-400 mb-8">
              Every piece of equipment we own can be found here on this list, and we update it regularly for new
              additions. We're always adapting to the shifting musical landscape.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <a href="#book-now" className="bg-gradient text-white font-semibold py-3 px-8 rounded-full inline-block">
                Book a Session
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <BookNowButton />
    </main>
  )
}
