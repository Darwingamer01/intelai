"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Basic access to AI chat features",
    features: [
      { text: "100 messages per month", included: true },
      { text: "Basic AI capabilities", included: true },
      { text: "Standard response time", included: true },
      { text: "Community support", included: true },
      { text: "Advanced features", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "19",
    description: "Perfect for professionals and creators",
    features: [
      { text: "Unlimited messages", included: true },
      { text: "Advanced AI capabilities", included: true },
      { text: "Faster response time", included: true },
      { text: "Email support", included: true },
      { text: "Custom instructions", included: true },
      { text: "Priority support", included: false },
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "49",
    description: "For teams and businesses with advanced needs",
    features: [
      { text: "Unlimited messages", included: true },
      { text: "Most advanced AI capabilities", included: true },
      { text: "Fastest response time", included: true },
      { text: "Dedicated support", included: true },
      { text: "Custom instructions", included: true },
      { text: "API access", included: true },
    ],
  },
]

export default function Pricing() {
  const pricingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      tl.from(".pricing-title", {
        opacity: 0,
        y: 50,
        duration: 0.5,
      })
      tl.from('.pricing-card', {
        opacity: 0,
        y: 50,
        duration: 0.1,
        stagger: 0.1,
      })
      tl.to(".pricing-card", {
        opacity: 1,
        y:0,
        duration:0.1,
        stagger: 0.4,
        ease: "sine.out",
      })
      tl.to(".popular", {
        top:-12,
        duration:0.1,
        ease: "sine.out",
      })
    }, pricingRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={pricingRef} id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="pricing-title text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan for your needs and start chatting with our AI today
          </p>
        </div>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.popular?"popular":""} relative bg-gray-800 border rounded-xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "border-purple-500 shadow-lg shadow-purple-500/20 transform md:-translate-y-4"
                  : "border-gray-700 hover:border-purple-500/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-purple-500 mr-2" />
                    ) : (
                      <X className="h-5 w-5 text-gray-600 mr-2" />
                    )}
                    <span className={feature.included ? "text-gray-300" : "text-gray-500"}>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                }`}
              >
                <Link href="/user/chats">
                  Get Started
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
