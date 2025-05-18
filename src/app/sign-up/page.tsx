"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { User, Mail, Lock, ArrowRight, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";
import {toast} from 'sonner';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const formRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Password validation criteria
  const validations = [
    { id: 1, text: "At least 8 characters", valid: formData.password.length >= 8 },
    { id: 2, text: "At least one uppercase letter", valid: /[A-Z]/.test(formData.password) },
    { id: 3, text: "At least one number", valid: /[0-9]/.test(formData.password) },
    { id: 4, text: "At least one special character", valid: /[^A-Za-z0-9]/.test(formData.password) },
  ]

  useEffect(() => {
    // Calculate password strength
    const strength = validations.filter((v) => v.valid).length
    setPasswordStrength(strength)
  }, [formData.password])

  useEffect(() => {
    // Create a GSAP timeline for the animations
    const tl = gsap.timeline()

    const ctx = gsap.context(()=>{

      gsap.set(".particle", {
              x: () => Math.random() * window.outerWidth,
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



       // Animate the background elements
    gsap.to(".bg-blob", {
      x: "random(-20, 20)",
      y: "random(-20, 20)",
      scale: "random(0.9, 1.1)",
      duration: "random(10, 20)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    })

    // Animate the form elements
    tl.from(".signup-title", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".signup-subtitle",
        {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        ".form-field",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".signup-button",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .from(
        ".signin-link",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      )
    }, containerRef)

    return ()=> ctx.revert() // Cleanup function
  }, [])

  // Animation for step transition
  useEffect(() => {
    if (step === 2) {
      gsap.fromTo(".step-2", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" })
    }
  }, [step])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep1 = () => {
    if (!formData.name || !formData.email) {
      setError("Please fill in all fields")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (passwordStrength < 3) {
      setError("Please create a stronger password")
      return false
    }
    return true
  }

  const handleNextStep = () => {
    setError("")
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateStep2()) {
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      console.log(response.data);
  
      // Save the token in localStorage
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      toast.success("Sign-up Successfull, Redirecting to Sign-in");
      router.push("/sign-in")
    } catch (err) {
      setError("An error occurred during sign up")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >

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


      {/* Animated background blobs */}
      <div className="bg-blob absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px]"></div>
      <div className="bg-blob absolute bottom-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full filter blur-[100px]"></div>
      <div className="bg-blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full filter blur-[80px]"></div>

      <div
        ref={formRef}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700"
      >
        <div className="text-center mb-8">
          <h1 className="signup-title text-3xl font-bold bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="signup-subtitle text-gray-400">Join the AI Chat community</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">{error}</div>
        )}

        <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-6">
          {step === 1 ? (
            <>
              <div className="form-field relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                  required
                />
              </div>

              <div className="form-field relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                  required
                />
              </div>

              <Button
                type="button"
                onClick={handleNextStep}
                className="signup-button w-full bg-purple-600 hover:bg-purple-700 text-white py-6 h-auto flex items-center justify-center gap-2 group"
              >
                Continue
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </>
          ) : (
            <div className="step-2">
              <div className="form-field relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                  required
                />
              </div>

              {formData.password && (
                <div className="mt-2 mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-400">Password strength:</span>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength === 0
                          ? "text-red-400"
                          : passwordStrength < 2
                            ? "text-orange-400"
                            : passwordStrength < 4
                              ? "text-yellow-400"
                              : "text-green-400"
                      }`}
                    >
                      {passwordStrength === 0
                        ? "Very Weak"
                        : passwordStrength === 1
                          ? "Weak"
                          : passwordStrength === 2
                            ? "Medium"
                            : passwordStrength === 3
                              ? "Strong"
                              : "Very Strong"}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        passwordStrength === 0
                          ? "bg-red-500"
                          : passwordStrength === 1
                            ? "bg-orange-500"
                            : passwordStrength === 2
                              ? "bg-yellow-500"
                              : passwordStrength === 3
                                ? "bg-green-500"
                                : "bg-emerald-500"
                      }`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>

                  <ul className="mt-3 space-y-1">
                    {validations.map((validation) => (
                      <li key={validation.id} className="flex items-center text-xs">
                        {validation.valid ? (
                          <Check className="h-3 w-3 text-green-400 mr-2" />
                        ) : (
                          <X className="h-3 w-3 text-red-400 mr-2" />
                        )}
                        <span className={validation.valid ? "text-green-400" : "text-gray-400"}>{validation.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="form-field relative mt-4">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                  required
                />
              </div>

              {formData.password && formData.confirmPassword && (
                <div className="mt-2 flex items-center">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <Check className="h-4 w-4 text-green-400 mr-2" />
                      <span className="text-xs text-green-400">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 text-red-400 mr-2" />
                      <span className="text-xs text-red-400">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}

              <div className="flex items-center mt-6">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="mr-2 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>

        <p className="signin-link mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-purple-400 hover:text-purple-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
