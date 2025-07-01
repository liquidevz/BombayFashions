"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamic import with ssr: false is allowed in Client Components
const SoundEffectsComponent = dynamic(() => import("./sound-effects"), {
  ssr: false,
  loading: () => null,
})

export default function SoundEffectsWrapper() {
  // Using useState and useEffect ensures this only runs on the client
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <SoundEffectsComponent />
}
