"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { gsap } from "gsap"
import { Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { contain } from "three/src/extras/TextureUtils.js"
import emailjs from '@emailjs/browser';
import axios from "axios"
import { sendEmailToUser } from "./email"

interface verifyEmailProps{
  setclose: (value:boolean)=> void;
}

export default function VerifyEmail({setclose}:verifyEmailProps) {
  const [step, setStep] = useState<"email" | "verification" | "reset">("email")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""])
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter();
  const [codeNew, setcodeNew] = useState("");

  const formRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  

  useEffect(() => {
    
    const ctx = gsap.context(()=>{
      const tl = gsap.timeline()

    tl.from(".verify-title", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".verify-subtitle",
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
        ".verify-button",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      )
    }, containerRef);
    

    return () => ctx.revert()
  }, [])

  // Animation for step transition
  useEffect(() => {
    if (step === "verification") {
      gsap.fromTo(".verification-form", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
    } else if (step === "reset") {
      gsap.fromTo(".reset-form", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
    }
  }, [step])

  let verificationNumber:number;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    console.log('clicked');
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    try {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      verificationNumber = Math.floor(100000 + Math.random() * 900000);
      console.log(verificationNumber);
      await sendEmailToUser(email, verificationNumber).then(
        () => {
          console.log("Mail Sent");
        },
        (error) => {
          console.log(error);
          alert("Something went wrong");
        }
      );
      const str = verificationNumber.toString();
      setcodeNew(str);
      setSuccess("Verification code sent to your email")

      // Animate success message
      gsap.from(".success-message", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power3.out",
      })

      // Wait a moment before showing the verification form
      setTimeout(() => {
        setStep("verification")
      }, 1500)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  


  const handleResend = async (email:string) => {
    console.log('clicked');
    setError("")
    setSuccess("")
    setVerificationCode(["", "", "", "", "", ""]);

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    try {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      verificationNumber = Math.floor(100000 + Math.random() * 900000);
      console.log(verificationNumber);
      await sendEmailToUser(email, verificationNumber).then(
        () => {
          console.log("Mail Sent");
        },
        (error) => {
          console.log(error);
          alert("Something went wrong");
        }
      );
      const str = verificationNumber.toString();
      setcodeNew(str);
      setSuccess("Verification code sent to your email")

      // Animate success message
      gsap.from(".success-message", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power3.out",
      })

      // Wait a moment before showing the verification form
      setTimeout(() => {
        setStep("verification")
      }, 1500)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newVerificationCode = [...verificationCode]

    // Handle paste event with multiple digits
    if (value.length > 1) {
      const digits = value.split("")
      for (let i = 0; i < digits.length && i + index < 6; i++) {
        newVerificationCode[i + index] = digits[i]
      }
      setVerificationCode(newVerificationCode)

      // Focus on the appropriate input after paste
      const nextIndex = Math.min(index + value.length, 5)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    // Handle single digit input
    newVerificationCode[index] = value
    setVerificationCode(newVerificationCode)

    // Auto-focus next input if current input is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    const code = verificationCode.join("")
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit verification code")
      return
    }

    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      
      if (code === codeNew) {
        setSuccess("Email verified successfully!")

        // Animate success message
        gsap.from(".success-message", {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power3.out",
        })

        // Wait a moment before showing the reset form
        setTimeout(() => {
          setStep("reset")
        }, 1500)
      } else {
        setError("Invalid verification code. Please try again.")
        setVerificationCode(["", "", "", "", "", ""]);
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    try {
      setIsLoading(true)
      const data = {email, password};
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/forgot-password`, data);
      if(res.status===200){
        setSuccess("Password reset successfully!")
      }
      else if(res.status===401){
        setError(`No user found with ${email}`);
        return;
      }
      gsap.from(".success-message", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power3.out",
      })
      setclose(true);
      
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case "email":
        return "Forgot Password"
      case "verification":
        return "Verify Your Email"
      case "reset":
        return "Reset Password"
      default:
        return "Forgot Password"
    }
  }

  const getStepSubtitle = () => {
    switch (step) {
      case "email":
        return "Enter your email address to receive a verification code"
      case "verification":
        return `We've sent a 6-digit code to ${email}`
      case "reset":
        return "Create a new password for your account"
      default:
        return "Enter your email address to receive a verification code"
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
     <div
        ref={formRef}
        className="w-full max-w-md bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-700"
      >
        <div className="text-center mb-8">
          <h1 className="verify-title text-3xl font-bold bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent mb-2">
            {getStepTitle()}
          </h1>
          <p className="verify-subtitle text-gray-400">{getStepSubtitle()}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="success-message mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            {success}
          </div>
        )}

        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="form-field relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="verify-button w-full bg-purple-600 hover:bg-purple-700 text-white py-6 h-auto flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Send Verification Code
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        )}

        {step === "verification" && (
          <form onSubmit={handleVerifySubmit} className="verification-form space-y-6">
            <div className="form-field flex flex-col gap-2 items-center ">
              <label htmlFor="verification-code" className="block text-sm font-medium text-gray-300 mb-2">
                Verification Code
              </label>
              <div className="flex gap-2 justify-between w-full">
                {verificationCode.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
  inputRefs.current[index] = el;
}}
                    type="text"
                    inputMode="numeric"
                    maxLength={6} // Allow paste of full code
                    value={digit}
                    onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="flex-1 min-w-0 w-12 h-12 text-center text-xl bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || verificationCode.join("").length !== 6}
              className="verify-button w-full bg-purple-600 hover:bg-purple-700 text-white py-6 h-auto flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Verify Email
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <div className="text-center text-sm">
              <p className="text-gray-400">
                Didn't receive a code?{" "}
                <button type="button" onClick={()=>{
                  handleResend(email);
                  }} className="text-purple-400 hover:text-purple-300 transition-colors">
                  Resend Code
                </button>
              </p>
            </div>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetSubmit} className="reset-form space-y-6">
            <div className="form-field relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                  required
                />
              </div>
            </div>

            <div className="form-field relative">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="verify-button w-full bg-purple-600 hover:bg-purple-700 text-white py-6 h-auto flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Reset Password
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <button onClick={()=>setclose(true)} className="text-purple-400 hover:text-purple-300 transition-colors">
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
