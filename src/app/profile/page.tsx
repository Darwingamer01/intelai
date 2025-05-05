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
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"

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

    // Cleanup function
    return () => {
      tl.kill()
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
    <div ref={profileRef} className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="bg-gradient absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-teal-400/20 rounded-full transform scale-150"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="profile-header relative bg-gray-800 rounded-2xl p-8 mb-8 shadow-xl border border-gray-700 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-r from-purple-600/20 to-teal-400/20 opacity-50"></div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Avatar */}
            <div className="profile-avatar relative">
              <div className="w-32 h-32 rounded-full border-4 border-purple-500 overflow-hidden">
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
                      onClick={() => setIsEditing(true)}
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
            <TabsList className="w-full bg-gray-800 border-b border-gray-700 p-0">
              <TabsTrigger
                value="profile"
                className="flex-1 py-4 data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500"
              >
                <User className="h-4 w-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex-1 py-4 data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500"
              >
                <Settings className="h-4 w-4 mr-2" /> Settings
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex-1 py-4 data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500"
              >
                <Bell className="h-4 w-4 mr-2" /> Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex-1 py-4 data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500"
              >
                <Shield className="h-4 w-4 mr-2" /> Security
              </TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="profile" className="tab-content mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Chat History</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
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
                </div>
              </TabsContent>

              <TabsContent value="settings" className="tab-content mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Dark Mode</h4>
                          <p className="text-sm text-gray-400">Toggle between light and dark themes</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Email Notifications</h4>
                          <p className="text-sm text-gray-400">Receive email updates about your account</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Chat History</h4>
                          <p className="text-sm text-gray-400">Save your chat history for future reference</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Language</h3>
                    <div className="relative">
                      <select className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2.5 appearance-none">
                        <option value="en">English (US)</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="tab-content mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Push Notifications</h4>
                          <p className="text-sm text-gray-400">Receive notifications on your device</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">New Features</h4>
                          <p className="text-sm text-gray-400">Get notified about new features and updates</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Marketing</h4>
                          <p className="text-sm text-gray-400">Receive marketing communications</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Recent Notifications</h3>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-white">System Update</h4>
                            <span className="text-xs text-gray-400">
                              {new Date(Date.now() - i * 3600000).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">
                            We've updated our AI models to provide more accurate and helpful responses.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="tab-content mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-1">
                          Current Password
                        </label>
                        <Input
                          type="password"
                          id="current-password"
                          className="bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-1">
                          New Password
                        </label>
                        <Input
                          type="password"
                          id="new-password"
                          className="bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <Input
                          type="password"
                          id="confirm-password"
                          className="bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                        />
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">Update Password</Button>
                    </form>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
                    <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </div>
                      </div>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        Set Up Two-Factor Authentication
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Sessions</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-white">Current Session</h4>
                            <p className="text-sm text-gray-400">
                              Chrome on Windows • {new Date().toLocaleDateString()}
                            </p>
                          </div>
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Active</span>
                        </div>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-white">Previous Session</h4>
                            <p className="text-sm text-gray-400">
                              Safari on iPhone • {new Date(Date.now() - 86400000).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          >
                            Log Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                      <LogOut className="h-4 w-4 mr-2" /> Log Out of All Devices
                    </Button>
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
