"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export default function SoundEffects() {
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const navSoundRef = useRef<HTMLAudioElement | null>(null)

  const loadAudio = (ref: React.RefObject<HTMLAudioElement>, src: string) => {
    if (ref.current) {
      ref.current.src = src
      ref.current.volume = 0.1
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create audio elements
      hoverSoundRef.current = new Audio()
      clickSoundRef.current = new Audio()
      navSoundRef.current = new Audio()

      // Load audio files
      if (hoverSoundRef.current) {
        loadAudio(hoverSoundRef, "/sounds/hover.mp3")
      }
      if (clickSoundRef.current) {
        loadAudio(clickSoundRef, "/sounds/click.mp3")
      }
      if (navSoundRef.current) {
        loadAudio(navSoundRef, "/sounds/nav.mp3")
      }

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
