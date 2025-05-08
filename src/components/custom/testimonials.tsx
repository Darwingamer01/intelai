"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    image: "/testimonials/Sarah.jpg",
    content:
      "This AI chat platform has completely transformed my workflow. The responses are incredibly helpful and save me hours of research time.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    image: "/testimonials/Michael.jpg",
    content:
      "I use the code generation feature daily. It helps me solve complex problems and explains the solutions in a way that's easy to understand.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    image: "/testimonials/Emily.jpg",
    content:
      "The creative assistant has been a game-changer for our marketing campaigns. It generates fresh ideas when we're stuck and helps us refine our messaging.",
    rating: 4,
  },
  {
    name: "Daljit Singh",
    role: "Student",
    image: "/testimonials/Daljit.jpg",
    content:
      "As a student, this AI chat has been invaluable for explaining complex concepts and helping me study more effectively.",
    rating: 5,
  },
]

export default function Testimonials() {
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from(".testimonials-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        },
      })

      // Set up auto-slide
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }, testimonialsRef)

    return () => ctx.revert()
  }, [])

  // Animate slide transition
  useEffect(() => {
    gsap.to(".testimonial-slide", {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power2.out",
    })
  }, [currentSlide])

  return (
    <section ref={testimonialsRef} id="testimonials" className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="testimonials-title text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their work with our AI chat
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Slide */}
          <div
            className="testimonial-slide bg-gray-800 border border-gray-700 rounded-xl p-8 opacity-0 transform translate-x-10"
            style={{ minHeight: "300px" }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
              <div className="flex-shrink-0">
                <Image
                  src={testimonials[currentSlide].image || "/placeholder.svg"}
                  alt={testimonials[currentSlide].name}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-purple-500"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{testimonials[currentSlide].name}</h3>
                <p className="text-gray-400">{testimonials[currentSlide].role}</p>
                <div className="flex mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonials[currentSlide].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <blockquote className="text-lg text-gray-300 italic">"{testimonials[currentSlide].content}"</blockquote>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-gray-800 border border-gray-700 hover:border-purple-500 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? "bg-purple-500 w-6" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-gray-800 border border-gray-700 hover:border-purple-500 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
