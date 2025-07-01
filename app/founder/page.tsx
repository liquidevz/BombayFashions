"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Award, Globe, Music, Star } from "lucide-react"
import BookNowButton from "@/components/book-now-button"

export default function Founder() {
  const [activeSection, setActiveSection] = useState("hero")
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  // Data
  const performances = {
    international: [
      "Ali Akbar Khan College of Music, USA",
      "Lecture & demonstration at Pt. Habib Khan Saraswati Temple, San Jose, USA",
      "Vocal jugalbandi with tablist maestro Pt. Sapanji Chaudhary & sitarist Pt. Habib Khan, San Jose, USA",
      "Rendered Shabadh at various Gurudwaras and offered Bhakti Sangeet at multiple temples in the USA",
      "Presented an Urdu Ghazals program for legendary film star Mr. Dev Anand's 80th birthday in California, USA",
    ],
    national: [
      "Special performance at Nanded Lokotsav, organized by Cultural Affairs Minister Mr. Ashokji Chavan",
      "Dr. Vasantrao Deshpande Memorial Trust Festival, Pune",
      "Performed at Sadbhavna Samaroh, organized for Honorable Chief Minister of Maharashtra, Shri Vilasraoji Deshmukh",
      "Dattajayanti Mahotsav, Gwalior",
      "Akhil Bhartiya Marathi Urdu & Hindi Ghazal Sammelan, Aurangabad",
      "Raja-Rani Festival, organized by the Orissa Tourism Department, Bhubaneswar",
      "Ellora Festival – performed classical and Urdu ghazals",
      "Sawai Gandharva Mahotsav (54th year) at Pune – widely appreciated performance",
    ],
  }

  const awards = [
    "Sangeet Visharad & Sangeet Alankar from Akhil Bhartiya Gandharva Mahavidyalaya",
    "Received the Gaanheera award from S.N.D.T. University, Mumbai",
    "Won gold medals in three consecutive National Youth Festivals (1992-1994)",
    "Prestigious Sangeet Ratna Award (2003)",
    "Adarsh Guru award conferred by the State Bank of Hyderabad",
    "Felicitated by former Chief Minister Shri Sharadraoji Pawar",
    "Felicitated by renowned film director Mr. Madhur Bhandarkar and Cultural Affairs Minister Mr. Ashokji Chavan",
  ]

  const albums = [
    "Guruarchna and Kusummala – Marathi Bhajans",
    "From Classical Music to Folksongs – Live DVD of Sawai Gandharva Mahotsav",
    "Rooh – A soul-stirring collection of Urdu Ghazals",
    "Bholababa Swar Ghumla – Marathi Bhajans with Pt. Ajit Kadkade",
    "Sung for Sare Jahan Se Achha Hindustan Hamara, a 26-episode Urdu documentary broadcast on All India Radio",
  ]

  const projects = [
    "Mitwa – A program on Bandishes of Pt. Nath Neralkar",
    "Maifilicha Kinara – A Marathi & Urdu Ghazal program",
    "Indradhanush – The first all-ladies orchestra in Marathwada, directed & organized by Hema",
    "Swar-Yatra – A thematic musical journey",
  ]

  useEffect(() => {
    const sections = document.querySelectorAll('.section')
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      sections.forEach((section) => {
        const htmlSection = section as HTMLElement
        const sectionTop = htmlSection.offsetTop
        const sectionHeight = htmlSection.offsetHeight
        if (scrollY >= sectionTop - 200 && scrollY < sectionTop + sectionHeight - 200) {
          setActiveSection(section.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-black">

      <div ref={containerRef} className="relative bg-black text-white overflow-hidden pt-20">
        {/* Vertical Navigation */}
        <nav className="fixed top-1/2 left-6 transform -translate-y-1/2 z-40 hidden md:block">
          <div className="flex flex-col items-center">
            <div className="h-full w-0.5 bg-gray-800 absolute left-1/2 transform -translate-x-1/2 z-0"></div>
            <ul className="relative z-10 space-y-8">
              {[
                { id: "hero", label: "Intro", icon: "♪" },
                { id: "performances", label: "Performances", icon: "♫" },
                { id: "accolades", label: "Accolades", icon: "♬" },
                { id: "projects", label: "Projects", icon: "♩" },
              ].map((item, index) => (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold z-10 transition-all duration-300 ${
                        activeSection === item.id
                          ? "bg-gradient text-white scale-110"
                          : "bg-[#1a1a1a] text-gray-400 hover:bg-[#252525]"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`absolute left-12 whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                        activeSection === item.id ? "text-gradient" : "text-gray-400"
                      }`}
                    >
                      {item.label}
                    </span>
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute left-12 -bottom-1 h-0.5 w-12 bg-gradient"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                  {index < 3 && <div className="h-6 w-0.5 bg-gray-800 mx-auto mt-2"></div>}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Navigation (horizontal) */}
        <nav className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-black/30 backdrop-blur-lg rounded-full px-2 py-1 border border-gray-800 md:hidden">
          <ul className="flex items-center space-x-1">
            {["hero", "performances", "accolades", "projects"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 block ${
                    activeSection === item ? "bg-gradient text-white" : "text-gray-400 hover:text-white"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(item)?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl md:text-4xl text-white/30"
              initial={{
                x: Math.random() * 100 + "%",
                y: -20,
                rotate: Math.random() * 360,
                opacity: 0.3 + Math.random() * 0.7,
              }}
              animate={{
                y: "120vh",
                rotate: Math.random() * 720,
              }}
              transition={{
                duration: 15 + Math.random() * 30,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 20,
                ease: "linear",
              }}
            >
              {["♪", "♫", "♬"][Math.floor(Math.random() * 3)]}
            </motion.div>
          ))}
        </div>

        {/* Hero Section */}
        <motion.section
          id="hero"
          className="min-h-screen relative flex items-center justify-center"
          style={{ y: bgY, opacity: opacityHero, scale: scaleHero }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#8a2be2]/30 via-black to-[#ff6347]/30">
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(138,43,226,0.3),transparent_70%)]" />
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(255,99,71,0.3),transparent_70%)]" />
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
                  <span className="text-gradient">Hema Upasani</span>
                </h1>
                <div className="h-1 w-40 md:w-60 bg-gradient mx-auto mt-4 rounded-full" />
              </motion.div>

              <div className="relative mb-12">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/30 relative">
                  <img
                    src="/images/founder.png"
                    alt="Hema Upasani"
                    className="w-full h-full object-cover bg-gradient-to-br from-purple-900 to-orange-500"
                  />
                  <div className="absolute bottom-0 w-full bg-gradient backdrop-blur-sm text-white text-center py-2">
                    <p className="text-sm font-medium">Daughter of Pt. Nath Neralkar</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl mx-auto mb-12"
              >
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                  Renowned Hindustani classical vocalist and ghazal exponent with a{" "}
                  <span className="font-semibold text-orange-400">deep-rooted understanding of Raagdari</span>.
                  Recipient of <span className="text-purple-400 font-medium">Sangeet Ratna</span> and{" "}
                  <span className="text-purple-400 font-medium">Gaanheera</span> awards.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl w-full">
                {[
                  { number: "30+", label: "Years Experience", icon: Star },
                  { number: "54", label: "Sawai Gandharva", icon: Music },
                  { number: "19", label: "Awards", icon: Award },
                  { number: "500+", label: "Performances", icon: Globe },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-xl bg-[#0a0a0a] backdrop-blur-sm border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex justify-center mb-3">
                      <stat.icon className="h-6 w-6 text-white/70" />
                    </div>
                    <p className="text-3xl font-bold text-gradient">{stat.number}</p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Performances Section */}
        <section id="performances" className="min-h-screen py-20 md:py-32 relative bg-[#050505]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(138,43,226,0.3),transparent_70%)]" />
          </div>

          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gradient mb-12">Notable Performances</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <PerformanceList
                title="International"
                items={performances.international}
                icon={<Globe className="text-purple-400" />}
                color="purple"
              />
              <PerformanceList
                title="National"
                items={performances.national}
                icon={<Music className="text-orange-400" />}
                color="orange"
              />
            </div>
          </div>
        </section>

        {/* Accolades Section */}
        <section id="accolades" className="min-h-screen py-20 md:py-32 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(255,99,71,0.3),transparent_70%)]" />
          </div>

          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gradient mb-12">Accolades & Discography</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <InfoCard
                title="Discography"
                items={albums}
                icon={<Music className="text-purple-400" />}
                color="purple"
              />
              <InfoCard title="Awards" items={awards} icon={<Award className="text-orange-400" />} color="orange" />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20 md:py-32 relative bg-[#050505]">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.2),transparent_70%)]" />
          </div>

          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gradient mb-12">Pioneering Initiatives</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {projects.map((project, i) => (
                <ProjectCard key={i} index={i + 1} title={project} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <BookNowButton />
    </main>
  )
}

// Reusable Components
const PerformanceList = ({
  title,
  items,
  icon,
  color,
}: { title: string; items: string[]; icon: React.ReactNode; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#0a0a0a] backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
  >
    <div className="p-4 flex items-center gap-3 border-b border-gray-800">
      <div className="p-2 bg-[#1a1a1a] rounded-full">{icon}</div>
      <h3 className="text-xl font-bold text-gradient">{title}</h3>
    </div>
    <ul className="p-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start text-white/80">
          <span className={`text-${color}-400 mr-2 mt-1`}>•</span>
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
)

const InfoCard = ({
  title,
  items,
  icon,
  color,
}: { title: string; items: string[]; icon: React.ReactNode; color: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="bg-[#0a0a0a] backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-[#1a1a1a] rounded-full">{icon}</div>
      <h3 className="text-2xl font-bold text-gradient">{title}</h3>
    </div>
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="p-4 rounded-lg bg-[#1a1a1a] border border-gray-800">
          <div className="flex items-center gap-3">
            <span className={`text-${color}-400`}>🎵</span>
            <p className="font-medium">{item}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
)

const ProjectCard = ({ index, title }: { index: number; title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-6 bg-[#0a0a0a] backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
  >
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gradient flex items-center justify-center text-white font-bold text-2xl">
        {index}
      </div>
      <p className="text-white font-medium text-xl">{title}</p>
    </div>
  </motion.div>
)
