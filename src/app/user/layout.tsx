"use client"

import type React from "react"
import { useEffect, useRef, useLayoutEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { gsap } from "gsap"
import { MessageSquare, PlusCircle, Settings, LogOut, ChevronRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LayoutProps {
  children: React.ReactNode
  params: {
    userId: string
  }
}

export default function UserLayout({ children, params }: LayoutProps) {
  const { userId } = params
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const hasMounted = useRef(false) // <-- Track initial mount
  const containerRef = useRef<HTMLDivElement>(null) // <-- Define containerRef

  const recentChats = [
    { id: "chat1", title: "AI capabilities discussion", date: "2 hours ago", active: pathname.includes("/chat1") },
    { id: "chat2", title: "Image analysis help", date: "Yesterday", active: pathname.includes("/chat2") },
    { id: "chat3", title: "Code review assistance", date: "2 days ago", active: pathname.includes("/chat3") },
    { id: "chat4", title: "Project brainstorming", date: "1 week ago", active: pathname.includes("/chat4") },
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sidebar-item", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      })

      gsap.from(".chat-item", {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.3,
      })

      gsap.from(".main-content", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Animate main content on route/pathname change
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".main-content", {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(".main-content", {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [pathname])

  return (
    <div ref={containerRef} className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`sidebar bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and toggle */}
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <Link href={`/user/${userId}/chats`} className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-teal-400 w-10 h-10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              {isSidebarOpen && (
                <span className="ml-3 font-bold text-xl bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
                  AI Chat
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              <ChevronRight
                className={`h-5 w-5 transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </div>

          {/* Main navigation */}
          <div className="p-4 flex-1 overflow-y-auto">
            <Link
              href={`/user/chats`}
              className={`sidebar-item flex items-center p-3 mb-2 rounded-lg transition-colors ${
                pathname === `/user/${userId}/chats`
                  ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                  : "hover:bg-gray-700"
              }`}
            >
              <PlusCircle className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>New Chat</span>}
            </Link>

            <Link
              href={`/user/${userId}/settings`}
              className={`sidebar-item flex items-center p-3 mb-2 rounded-lg transition-colors ${
                pathname.includes("/settings")
                  ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                  : "hover:bg-gray-700"
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Settings</span>}
            </Link>

            <Link
              href={`/user/profile`}
              className={`sidebar-item flex items-center p-3 mb-2 rounded-lg transition-colors ${
                pathname.includes("/profile")
                  ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                  : "hover:bg-gray-700"
              }`}
            >
              <User className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>Profile</span>}
            </Link>

            {isSidebarOpen && (
              <div className="mt-8">
                <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3 px-3">Recent Chats</h3>
              </div>
            )}

            <div className="space-y-1">
              {recentChats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/user/${userId}/chats/${chat.id}`}
                  className={`chat-item flex items-center p-3 rounded-lg transition-colors ${
                    chat.active
                      ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
                  {isSidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{chat.title}</p>
                      <p className="text-xs text-gray-400">{chat.date}</p>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* User section */}
          <div className="p-4 border-t border-gray-700">
            <div className="sidebar-item flex items-center p-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 flex items-center justify-center">
                <span className="text-white font-semibold">AJ</span>
              </div>
              {isSidebarOpen && (
                <div className="ml-3 flex-1">
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-xs text-gray-400">Free Plan</p>
                </div>
              )}
            </div>

            <Button variant="ghost" className="sidebar-item w-full mt-2 text-gray-400 hover:text-white justify-start">
              <LogOut className="h-4 w-4 mr-3" />
              {isSidebarOpen && <span>Sign Out</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
