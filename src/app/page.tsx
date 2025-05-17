"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/custom/navbar"
import Hero from "@/components/custom/hero"
import Features from "@/components/custom/features"
import Testimonials from "@/components/custom/testimonials"
import Pricing from "@/components/custom/pricing"
import Footer from "@/components/custom/footer"

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initialize animations
    const ctx = gsap.context(() => {
      // Fade in the main content
      gsap.from(".fade-in", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      })

      // Parallax effect for background elements
      gsap.to(".parallax-bg", {
        y: -100,
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    }, mainRef)

    return () => ctx.revert() // Cleanup
  }, [])

  return (
    <main ref={mainRef} id="home" className="min-h-screen bg-dark text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 parallax-bg"></div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Footer />
    </main>
  )
}
