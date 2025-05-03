"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Menu, X, ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/services" },
  { name: "BLOG", href: "/blog" },
  { name: "PAGES", href: "/pages" },
  { name: "CONTACT US", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Animate navbar items on load
    gsap.from(".nav-item", {
      opacity: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
    })

    // Handle scroll effect
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark/90 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
            AI<span className="text-white">CHAT</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <button className="nav-item text-sm font-medium hover:text-purple-500 transition-colors flex items-center">
                {item.name} <span className="ml-1">▼</span>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-1">
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                    Option 1
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                    Option 2
                  </Link>
                  <Link href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
                    Option 3
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart and Join Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/cart" className="nav-item relative">
            <ShoppingCart className="h-6 w-6 text-white hover:text-purple-500 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </Link>
          <Button className="nav-item bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
            Join Community <Zap className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white hover:text-purple-500 py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-white" />
                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  2
                </span>
              </Link>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                Join Community <Zap className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
