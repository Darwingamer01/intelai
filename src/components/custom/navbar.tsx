"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Menu, X, ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { useRouter } from "next/navigation"

const navItems = [
  { name: "HOME", href: "/" },
  { name: "FEATURES", href: "features"},
  { name: "CONTACT US", href: "contact" },
  {name: "PRICING", href: "pricing" },
  {name: "EXPERIENCE AI", href: "/chat"},
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate navbar items on load
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      })
    }, navRef)

    return () => ctx.revert() 
  }, []);
    
  useEffect(() => {
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

  const handleNavClick = (item: { name: string; href: string }) => {
      if (item.href.startsWith("/")) {
        router.push(item.href);
      } else {
        document.getElementById(item.href)?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false); // Close the mobile menu after clicking
      }
    };

  return (
    <nav ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark/90 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-8 flex justify-between items-center ">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
            Intel<span className="text-white">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <button onClick={() => handleNavClick(item)} className="nav-item text-sm font-medium hover:text-purple-500  transition-colors flex items-center whitespace-nowrap">
                {item.name} 
              </button>
            </div>
          ))}
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
          <div className="container mx-auto px-4 flex flex-col items-start space-y-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="text-white hover:text-purple-500 py-2"
                onClick={() => handleNavClick(item)}
              >
                {item.name}
              </button>
            ))}
            
          </div>
        </div>
      )}
    </nav>
  )
}
