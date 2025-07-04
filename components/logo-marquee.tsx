"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface LogoMarqueeProps {
  logos: { src: string; alt: string }[]
}

export default function LogoMarquee({ logos }: LogoMarqueeProps) {
  // Duplicate logos to create seamless infinite scroll effect
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className="w-full py-12 overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl mb-4">
          Our <span className="text-gradient">Partners</span>
        </h2>
        <div className="h-1 w-20 bg-gradient mx-auto"></div>
      </div>
      
      <div className="flex items-center">
        <div className="flex animate-marquee">
          {duplicatedLogos.map((logo, index) => (
            <div 
              key={`${logo.alt}-${index}`} 
              className="mx-8 flex-shrink-0 flex items-center justify-center h-20 w-40 relative"
            >
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={160} 
                height={80} 
                className="object-contain max-h-full max-w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
