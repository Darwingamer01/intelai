"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { CosmicLoader } from "./cosmic-loader"

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Fade out the loading screen after a delay
    const timeout = setTimeout(() => {
      gsap.to(".loading-screen", {
        opacity: 0,
        duration: 0.5,
        onComplete: () => setIsVisible(false),
      })
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  if (!isVisible) return null

  return (
    <div className="loading-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900">
      <div className="relative">
        <CosmicLoader size={120} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-purple-500 animate-pulse" />
        </div>
      </div>
      <p className="mt-6 text-white text-lg font-medium animate-pulse">{message}</p>
    </div>
  )
}
