"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamic import with ssr: false is allowed in Client Components
const SoundEffectsComponent = dynamic(() => import("../features/sound-effects"), {
  ssr: false,
  loading: () => null,
})

export default function SoundEffectsWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <SoundEffectsComponent />
}
