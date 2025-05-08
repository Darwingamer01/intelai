"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"


export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer elements
      gsap.from(".footer-column", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])


  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <footer ref={footerRef} id="contact" className="bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
                Intel<span className="text-white">AI</span>
              </span>
            </h3>
            <p className="text-gray-400 mb-6">
              Experience the future of conversation with our advanced AI chat platform. Get intelligent responses,
              creative content, and helpful solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <button onClick={()=>{scroll("features")}} className="text-gray-400 hover:text-purple-500 transition-colors">
                  Features
                </button>
              </li>
              <li>
                <Link href="/chats" className="text-gray-400 hover:text-purple-500 transition-colors">
                  Experience AI
                </Link>
              </li>
              <li>
                <button onClick={()=>{scroll('pricing')}} className="text-gray-400 hover:text-purple-500 transition-colors">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={()=>{scroll('testimonials')}}  className="text-gray-400 hover:text-purple-500 transition-colors">
                  Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-500 mr-3 mt-1" />
                <span className="text-gray-400">123 AI Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-purple-500 mr-3" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-500 mr-3" />
                <span className="text-gray-400">info@aichat.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to receive updates and news.</p>
            <div className="flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 focus:border-purple-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} AICHAT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
