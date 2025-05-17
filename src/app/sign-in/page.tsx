"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Mail, Lock, ArrowRight, Github, Facebook, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";
import { ForgotPasswordModal } from "@/components/auth/forgot-password"
import VerifyEmail from "@/components/auth/verify-email"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const formRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isVerifyEmail, setisVerifyEmail] = useState(false);

  // useEffect(() => {
  //   // Create a GSAP timeline for the animations
  //   const tl = gsap.timeline()

  //   setTimeout(()=>{
  //     gsap.set(".particle", {
  //       x: () => Math.random() * window.innerWidth,
  //       y: () => Math.random() * window.innerHeight,
  //       opacity: () => Math.random() * 0.5 + 0.2,
  //       scale: () => Math.random() * 0.8 + 0.2,
  //     })
  
  //     // Animate the background particles
  //     gsap.to(".particle", {
  //       x: "+=50",
  //       y: "+=30",
  //       rotation: "+=15",
  //       duration: 8,
  //       ease: "sine.inOut",
  //       repeat: -1,
  //       yoyo: true,
  //       stagger: 0.1,
  //     })
  
  //     // Animate the form elements
  //     tl.from(".signin-title", {
  //       opacity: 0,
  //       y: -30,
  //       duration: 0.8,
  //       ease: "power3.out",
  //     })
  //       .from(
  //         ".signin-subtitle",
  //         {
  //           opacity: 0,
  //           y: -20,
  //           duration: 0.8,
  //           ease: "power3.out",
  //         },
  //         "-=0.6",
  //       )
  //       .from(
  //         ".form-field",
  //         {
  //           opacity: 0,
  //           y: 20,
  //           duration: 0.6,
  //           stagger: 0.2,
  //           ease: "power3.out",
  //         },
  //         "-=0.4",
  //       )
  //       .from(
  //         ".signin-button",
  //         {
  //           opacity: 0,
  //           y: 20,
  //           duration: 0.6,
  //           ease: "power3.out",
  //         },
  //         "-=0.2",
  //       )
  //       .from(
  //         ".divider",
  //         {
  //           width: 0,
  //           duration: 0.8,
  //           ease: "power3.out",
  //         },
  //         "-=0.4",
  //       )
  //       .from(
  //         ".social-button",
  //         {
  //           opacity: 0,
  //           scale: 0.8,
  //           duration: 0.6,
  //           stagger: 0.1,
  //           ease: "back.out(1.7)",
  //         },
  //         "-=0.4",
  //       )
  //       .from(
  //         ".signup-link",
  //         {
  //           opacity: 0,
  //           y: 20,
  //           duration: 0.6,
  //           ease: "power3.out",
  //         },
  //         "-=0.2",
  //       )
  //   }, 0);
    
    

  //   // Cleanup function
  //   return () => {
  //     tl.kill()
  //   }
  // }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".particle", {
        x: () => Math.random() * window.innerWidth,
        y: () => Math.random() * window.innerHeight,
        opacity: () => Math.random() * 0.5 + 0.2,
        scale: () => Math.random() * 0.8 + 0.2,
      })
  
      gsap.to(".particle", {
        x: "+=50",
        y: "+=30",
        rotation: "+=15",
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
      })
  
      const tl = gsap.timeline()
      tl.from(".signin-title", { opacity: 0, y: -30, duration: 0.8, ease: "power3.out" })
        .from(".signin-subtitle", { opacity: 0, y: -20, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".form-field", { opacity: 0, y: 20, duration: 0.6, stagger: 0.2, ease: "power3.out" }, "-=0.4")
        .from(".signin-button", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .from(".divider", { width: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(".social-button", { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.4")
        .from(".signup-link", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.2")
    }, containerRef)
  
    return () => ctx.revert()
  }, [])

  const forgot = () => {
    setisVerifyEmail(true);
  }

  const setclose = () => {
    setisVerifyEmail(false);
  }
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      document.cookie = `authToken=${token}; path=/; max-age=86400; secure; samesite=strict`;
      router.push("/")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-purple-500 opacity-20"
          style={{
            width: `${10 + i * 0.5 * 10 + 25}px`,
            height: `${10 + i * 0.5* 10 + 25}px`,
          }}
        />
      ))}

      {/* Glowing orb */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-400 rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>

      {(!isForgotPasswordOpen && !isVerifyEmail) && <div
        ref={formRef}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700"
      >
        <div className="text-center mb-8">
          <h1 className="signin-title text-3xl font-bold bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="signin-subtitle text-gray-400">Sign in to continue to AI Chat</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">{error}</div>
        )}

       {(!isForgotPasswordOpen && !isVerifyEmail) && <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-field relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
              required
            />
          </div>

          <div className="form-field relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
              required
            />
          </div>

          <div className="form-field flex items-center justify-between text-sm">
            <button onClick={forgot} className="text-purple-400 hover:text-purple-300 transition-colors">
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="signin-button w-full bg-purple-600 hover:bg-purple-700 text-white py-6 h-auto flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>}
        <p className="signup-link mt-8 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-purple-400 hover:text-purple-300 transition-colors">
            Sign up
          </Link>
        </p>
      </div>}
       {isVerifyEmail && <VerifyEmail  setclose={setclose}/> }
       {/* <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} /> */}
    </div>
  )
}
