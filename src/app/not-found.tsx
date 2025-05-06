"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { CosmicLoader } from "@/components/ui/cosmic-loader"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create a GSAP timeline for the animations
    const tl = gsap.timeline()

    // Animate the elements
    tl.from(".not-found-title", {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".not-found-subtitle",
        {
          opacity: 0,
          y: -30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        ".not-found-description",
        {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        ".not-found-actions",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      )

    // Animate particles
    gsap.set(".particle", {
      x: () => Math.random() * window.innerWidth,
      y: () => Math.random() * window.innerHeight,
      opacity: () => Math.random() * 0.5 + 0.2,
      scale: () => Math.random() * 0.8 + 0.2,
    })

    gsap.to(".particle", {
      x: "+=50",
      y: "+=30",
      rotation: "+=15",
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
    })

    // Animate the cosmic anomaly
    gsap.to(".cosmic-anomaly", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 relative overflow-hidden"
    >
      {/* Background particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-purple-500 opacity-20"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
          }}
        />
      ))}

      {/* Cosmic anomaly background */}
      <div className="cosmic-anomaly absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-transparent to-teal-400 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-purple-500 opacity-20"></div>
          <div
            className="absolute inset-0 rounded-full border-2 border-teal-400 opacity-20"
            style={{ transform: "scale(1.1)" }}
          ></div>
          <div
            className="absolute inset-0 rounded-full border border-purple-300 opacity-10"
            style={{ transform: "scale(1.2)" }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="mb-8">
          <CosmicLoader size={150} />
        </div>

        <h1 className="not-found-title text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">404</span>
        </h1>

        <h2 className="not-found-subtitle text-2xl font-semibold text-white mb-4">Cosmic Anomaly Detected</h2>

        <p className="not-found-description text-gray-300 mb-8">
          The page you're looking for has been pulled into a black hole or simply doesn't exist in this universe. Our AI
          is still mapping the cosmos, but it couldn't find what you're searching for.
        </p>

        <div className="not-found-actions flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-6 h-auto">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-6 h-auto"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
