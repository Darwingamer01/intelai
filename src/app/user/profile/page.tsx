"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Bell,
  Shield,
  LogOut,
  Edit,
  Camera,
  Save,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"




// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: "January 2023",
  avatar: "/placeholder.svg?height=200&width=200",
  bio: "AI enthusiast and tech lover. I enjoy exploring the latest advancements in artificial intelligence and machine learning.",
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    bio: userData.bio,
  })
  const [activeTab, setActiveTab] = useState("profile")
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Create a GSAP timeline for the animations
    const tl = gsap.timeline()

    const ctx = gsap.context(()=>{
        
    // Animate the profile elements
    tl.from(".profile-header", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".profile-avatar",
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6",
      )
      .from(
        ".profile-name",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".profile-info",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".profile-tabs",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .from(
        ".tab-content",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      )

    // Animate background elements
    gsap.to(".bg-gradient", {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none",
    })

    }, profileRef)


    // Cleanup function
    return () => {
      ctx.revert() // Revert the GSAP context
    }
  }, [])

  // Animation for tab switching
  useEffect(() => {
    gsap.fromTo(".tab-content", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
  }, [activeTab])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated data to your API
    setIsEditing(false)
    // For demo purposes, we're not actually updating the userData
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div ref={profileRef} className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-y-auto overflow-x-hidden">
      {/* Animated background gradient */}
      <div className="bg-gradient absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-teal-400/20 rounded-full transform scale-150"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="profile-header relative bg-gray-800 rounded-2xl p-8 mb-8 shadow-xl border border-gray-700 overflow-y">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-r from-purple-600/20 to-teal-400/20 opacity-50"></div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Avatar */}
            <div className="profile-avatar relative">
              <div className="w-32 h-32 rounded-full border-4 border-purple-500 overflow-y">
                <Image
                  src={userData.avatar || "/placeholder.svg"}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="text-2xl font-bold bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="pl-10 bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full rounded-md bg-gray-700 border border-gray-600 focus:border-purple-500 text-white p-3"
                      placeholder="Bio"
                    ></textarea>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <h1 className="profile-name text-2xl font-bold text-white mb-2">{userData.name}</h1>
                    <Button
                      onClick={() =>{ 
                        console.log("hit");
                        setIsEditing(true);
                      }}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit Profile
                    </Button>
                  </div>
                  <p className="text-gray-400 mb-4">{userData.bio}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="profile-info flex items-center text-sm text-gray-400">
                      <Mail className="h-4 w-4 mr-2 text-purple-500" />
                      {userData.email}
                    </div>
                    <div className="profile-info flex items-center text-sm text-gray-400">
                      <Phone className="h-4 w-4 mr-2 text-purple-500" />
                      {userData.phone}
                    </div>
                    <div className="profile-info flex items-center text-sm text-gray-400">
                      <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                      {userData.location}
                    </div>
                    <div className="profile-info flex items-center text-sm text-gray-400">
                      <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                      Member since {userData.joinDate}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="profile-tabs bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full bg-gray-800 border-b border-gray-700 p-0 mb-2 pb-2">
              <TabsTrigger
                value="profile"
                className="flex-1 py-4 data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 overflow-y-auto"
              >
                <User className="h-4 w-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger value="statistics" className="flex-1 py-4 data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chart-no-axes-combined-icon lucide-chart-no-axes-combined "><path d="M12 16v5"/><path d="M16 14v7"/><path d="M20 10v11"/><path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/><path d="M4 18v3"/><path d="M8 14v7"/></svg><div className="ml-2">Statistics</div>
              </TabsTrigger>
            </TabsList>
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <TabsContent value="profile" className="tab-content mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Chat History</h3>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10].map((i) => (
                        <div
                          key={i}
                          className="bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-white">Chat Session #{i}</h4>
                            <span className="text-xs text-gray-400">
                              {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300 line-clamp-2">
                            This is a preview of your conversation with the AI assistant. Click to view the full
                            conversation history.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
              </TabsContent>
              <TabsContent value="statistics" className="tab-content mt-0">
                <div>
                    <h3 className="text-lg font-medium text-white mb-4">Usage Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <div className="text-2xl font-bold text-white">152</div>
                        <div className="text-sm text-gray-400">Total Conversations</div>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <div className="text-2xl font-bold text-white">1,240</div>
                        <div className="text-sm text-gray-400">Messages Sent</div>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <div className="text-2xl font-bold text-white">85%</div>
                        <div className="text-sm text-gray-400">Helpful Responses</div>
                      </div>
                    </div>
                  </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
