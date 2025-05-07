"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { MessageSquare, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic";
import Link from "next/link"


const ModelViewer = dynamic(() => import('@/components/model/model'), { ssr: false });

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".hero-description", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      })

      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      })

      // Animate robot hand
      gsap.from(".hero-image", {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.out",
      })

      // Floating animation for the robot hand
      gsap.to(".hero-image", {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })

      // Particle effects
      const particles = document.querySelectorAll(".particle")
      particles.forEach((particle) => {
        gsap.to(particle, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          opacity: "random(0.3, 0.8)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        })
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center pt-20">
      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 rounded-full bg-purple-500 opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Hero Content */}
        <div className="z-10">
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
              AI-Powered Chat
            </span>{" "}
            <br />
            For The Future
          </h1>

          <p className="hero-description text-lg md:text-xl text-gray-300 mb-8">
            Experience the next generation of AI conversation. Our advanced chat platform delivers intelligent
            responses, creative content, and helpful solutions.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg flex items-center gap-2 h-auto">
              <Link href="/sign-in">
                Start Chatting <MessageSquare className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg flex items-center gap-2 h-auto"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth"});
                }}
            >
              Learn More <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hero-image relative z-10 flex justify-center">
          <div className="relative w-full max-w-lg aspect-square">
            <ModelViewer />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-teal-400/20 rounded-full blur-xl pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  )
}
