"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Brain, Sparkles, Shield, Zap, MessageSquare, Code } from "lucide-react"

const features = [
  {
    icon: <Brain className="h-10 w-10" />,
    title: "Advanced AI",
    description: "Powered by cutting-edge language models for human-like conversations.",
  },
  {
    icon: <Sparkles className="h-10 w-10" />,
    title: "Creative Assistant",
    description: "Generate ideas, content, and creative solutions for any project.",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Secure & Private",
    description: "Your conversations are encrypted and never shared with third parties.",
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Lightning Fast",
    description: "Get instant responses with our optimized infrastructure.",
  },
  {
    icon: <MessageSquare className="h-10 w-10" />,
    title: "Multi-turn Conversations",
    description: "Natural dialogue with context awareness and memory.",
  },
  {
    icon: <Code className="h-10 w-10" />,
    title: "Code Generation",
    description: "Write, debug, and explain code in multiple programming languages.",
  },
]

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      tl.from(".features-title", {
        opacity: 0,
        y: 50,
        duration: 0.2,
      })

      // Animate feature cards
      tl.from(".feature-card", {
        opacity: 0,
        y: 50,
        duration: 0.3,
        stagger: 0.1,
      })

      tl.to(".feature-card", {
        opacity: 1,
        y: +10,
        duration: 0.1,
        stagger: 0.4,
        ease: "sine.out",
      })
    }, featuresRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={featuresRef} id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="features-title text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover what makes our AI chat platform stand out from the rest
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="text-purple-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
