"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { X, Mail, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!modalRef.current) return

    if (isOpen) {
      // Show the modal
      gsap.set(modalRef.current, { display: "flex" })
      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })

      // Animate the content
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      })
    } else {
      // Hide the modal
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(modalRef.current, { display: "none" })
          // Reset form state when modal is closed
          setEmail("")
          setError("")
          setIsSuccess(false)
        },
      })
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

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
      await 
      setIsSuccess(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

    const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose()
    }
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ display: "none", opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
            Reset Password
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {isSuccess ? (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Reset Link Sent</h3>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to <span className="text-purple-400">{email}</span>. Please check your
              email and follow the instructions.
            </p>
            <Button onClick={onClose} className="bg-purple-600 hover:bg-purple-700 text-white">
              Back to Sign In
            </Button>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6">
              Enter your email address below and we'll send you a link to reset your password.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 h-auto flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
