"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export default function SoundEffects() {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const navSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create audio elements
      hoverSoundRef.current = new Audio()
      clickSoundRef.current = new Audio()
      navSoundRef.current = new Audio()

      // Function to safely load audio
      const loadAudio = async (audioRef: React.RefObject<HTMLAudioElement>, path: string) => {
        if (audioRef.current) {
          try {
            // Check if file exists before setting src
            const response = await fetch(path, { method: "HEAD" })
            if (response.ok) {
              audioRef.current.src = path
              audioRef.current.preload = "auto"
              // Set volume only after src is set
              if (path.includes("hover")) audioRef.current.volume = 0.2
              if (path.includes("click")) audioRef.current.volume = 0.3
              if (path.includes("nav")) audioRef.current.volume = 0.4
            } else {
              console.warn(`Audio file not found: ${path}`)
            }
          } catch (err) {
            console.warn(`Error loading audio file ${path}:`, err)
          }
        }
      }

      // Load audio files
      loadAudio(hoverSoundRef, "/sounds/hover.mp3")
      loadAudio(clickSoundRef, "/sounds/click.mp3")
      loadAudio(navSoundRef, "/sounds/nav.mp3")

      // Add event listeners
      const buttons = document.querySelectorAll("button, a, [role=button]")

      buttons.forEach((button) => {
        button.addEventListener("mouseenter", playHoverSound)
        button.addEventListener("click", playClickSound)
      })

      const navLinks = document.querySelectorAll("nav a")
      navLinks.forEach((link) => {
        link.addEventListener("click", playNavSound)
      })

      return () => {
        buttons.forEach((button) => {
          button.removeEventListener("mouseenter", playHoverSound)
          button.removeEventListener("click", playClickSound)
        })

        navLinks.forEach((link) => {
          link.removeEventListener("click", playNavSound)
        })
      }
    }
  }, [])

  const playHoverSound = () => {
    if (hoverSoundRef.current && hoverSoundRef.current.src) {
      hoverSoundRef.current.currentTime = 0
      hoverSoundRef.current.play().catch((e) => {
        // Silently handle errors - often due to user interaction requirements
        if (e.name !== "NotAllowedError") {
          console.warn("Hover sound play failed:", e)
        }
      })
    }
  }

  const playClickSound = () => {
    if (clickSoundRef.current && clickSoundRef.current.src) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((e) => {
        if (e.name !== "NotAllowedError") {
          console.warn("Click sound play failed:", e)
        }
      })
    }
  }

  const playNavSound = () => {
    if (navSoundRef.current && navSoundRef.current.src) {
      navSoundRef.current.currentTime = 0
      navSoundRef.current.play().catch((e) => {
        if (e.name !== "NotAllowedError") {
          console.warn("Nav sound play failed:", e)
        }
      })
    }
  }

  return null
}
