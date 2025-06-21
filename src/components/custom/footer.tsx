"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser";


export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const [email, setemail] = useState("");
  const [loading, setloading] = useState(false);

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setemail(e.target.value);
  };

  const handleSubmit = () => {
      setloading(true);
      emailjs.send('service_x9a1382', 'template_m25ij2i', {from_name:"IntelAi", to_name: "", from_email:email, to_email:"jay.siserpratap@gmail.com", message:`Email: ${email}`},'f_VZUB9-gBXWtZ5v1' ).then(
        () => {
          setloading(false);
          alert("Thank you for subscribing.");
          }, (error) => {
          setloading(false)
        console.log(error);
      alert("Something Went wrong");
    }
      );
  };

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
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" onClick={()=>{scroll("home")}} className="text-gray-400 hover:text-purple-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <button onClick={()=>{scroll("features")}} className="text-gray-400 hover:text-purple-500 transition-colors">
                  Features
                </button>
              </li>
              <li>
                <Link href="/user/chats" className="text-gray-400 hover:text-purple-500 transition-colors">
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
            <h3 className="text-xl font-bold mb-6">Contact Dev</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-purple-500 mr-3 mt-1" />
                <a href="https://3d-portfolio-seven-xi.vercel.app/" className="text-gray-400 hover:text-purple-500">Portfolio</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-purple-500 mr-3" />
                <a href="mailto:siserinsevoc@gmail.com" className="text-gray-400 hover:text-purple-500 transition-colors">
                  siserinsevoc@gmail.com
                </a>
              </li>
              <div className="flex space-x-4">
                <a href="https://x.com/PratapSiser" className="text-gray-400 hover:text-purple-500 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/siser_ins17/" className="text-gray-400 hover:text-purple-500 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/siser" className="text-gray-400 hover:text-purple-500 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://github.com/Siser-Pratap" className="text-gray-400 hover:text-purple-500 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
            </div>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-column">
            <h3 className="text-xl font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to receive updates and news.</p>
            <div className="flex flex-col space-y-3">
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Your email address"
                className="bg-gray-800 border-gray-700 focus:border-purple-500"
              />
              <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white">{loading ? (
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
          ) : (
            "Subscribe"
          )}</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-500">© {new Date().getFullYear()} Siser Pratap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
