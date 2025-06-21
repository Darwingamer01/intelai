"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Menu, X, ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { CosmicLoader } from "../ui/cosmic-loader"


const navItems = [
  { name: "HOME", href: "home" },
  { name: "FEATURES", href: "features"},
  { name: "CONTACT US", href: "contact" },
  {name: "PRICING", href: "pricing" },
  {name: "EXPERIENCE AI", href: "/user/chats"},
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (isOpen) {
      // Animate the mobile menu from top to bottom
      gsap.set(mobileMenuRef.current, {
        display: "block",
        height: 0,
        opacity: 0,
      })

      gsap.to(mobileMenuRef.current, {
        height: "100vh",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      })

      // Animate menu items
      const menuItems = menuItemsRef.current?.children
      if (menuItems) {
        gsap.from(menuItems, {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
          delay: 0.3,
          ease: "power2.out",
        })
      }
    } else {
      // Animate closing the menu
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" })
        },
      })
    }
  }, [isOpen])  

  // Setup underline animation for menu items
  useEffect(() => {
    const menuItems = document.querySelectorAll(".mobile-nav-item")

    menuItems.forEach((item) => {
      // Create underline element for each menu item
      const underline = document.createElement("span")
      underline.classList.add("nav-underline")
      item.appendChild(underline)

      // Set initial state
      gsap.set(underline, {
        width: 0,
        left: 0,
        bottom: 0,
        height: "2px",
        position: "absolute",
        background: "linear-gradient(to right, #8b5cf6, #14b8a6)",
      })

      // Create hover animation
      item.addEventListener("mouseenter", () => {
        gsap.to(underline, {
          width: "100%",
          duration: 0.3,
          ease: "power2.out",
        })
      })

      item.addEventListener("mouseleave", () => {
        gsap.to(underline, {
          width: 0,
          duration: 0.3,
          ease: "power2.in",
        })
      })
    })
  }, [isOpen])

  const handleNavClick = (item: { name: string; href: string }) => {
      if (item.href.startsWith("/")) {
        router.push(item.href);
      } else {
        document.getElementById(item.href)?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false); 
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
        <div
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-md overflow-hidden z-40"
        style={{ display: "none" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Background animation */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <CosmicLoader size={300} color="#8b5cf6" />
          </div>
      
          {/* Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full bg-purple-500 opacity-20"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              }}
            />
          ))}
        </div>

        <div className="flex relative container justify-end p-4">
          <Button onClick={()=>{
            setIsOpen(false)
          }} className="text-white border-white hover:text-purple-500 transition-colors">
            <X className="mr-2" /> 
          </Button></div>

        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div ref={menuItemsRef} className="space-y-8">
            {navItems.map((item, index) => (
              <div key={index} className="text-center">
                <button
                  className="mobile-nav-item relative inline-block text-white text-2xl font-medium hover:text-purple-400 transition-colors py-2 px-4"
                  onClick={() => handleNavClick(item)}
                >
                  {item.name}
                </button>
              </div>
            ))}
      
           
          </div>
         </div>
       

      </div>
      )}
    </nav>
  )
}
