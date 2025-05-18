"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { MessageSquare, ImageIcon, Code, Sparkles, Zap } from "lucide-react"
import { main, multiMain } from "@/lib/gemini"
import axios, { AxiosHeaders } from "axios";
import { headers } from "next/headers"
import { useState } from "react"


interface PageProps {
  params: {
    userId: string
  }
}

export default function ChatsPage({ params }: PageProps) {
  const { userId } = params
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [userChats, setuserChats] = useState([]);

  
interface historyProps {
  history: Array<{
    role: "user" | "model" | "";
    parts: [{text:string}];
  }>;
}

const history = [{ role: "user" as const, parts: [{ text: "" }] }];

  
  useEffect(() => {
    if (!containerRef.current) return

    // Create a GSAP timeline for the animations
    const ctx = gsap.context(()=>{
    
    const tl = gsap.timeline()
    // Animate the welcome text
    tl.from(".welcome-title", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".welcome-subtitle",
        {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        ".chat-card",
        {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.2,
          ease: "sign.inOut",
        },
        "-=0.4",
      )
      .to(".chat-card", {
      y: "+=10",
      opacity: 1.2,
      duration: 0.2,
      stagger: 0.1,
      ease: "sine.inOut",
      yoyo:true,
    })
      .from(
        ".chat-input",
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

    // Floating animation for the cards
    
  }, containerRef)

  return () => {
    ctx.revert() // Clean up the GSAP context on unmount
  }
    
  }, [])

  const handleCreateChat = (type: string) => {
    const chatId = `new-${Date.now()}`
    router.push(`/user/${userId}/chats/${chatId}?type=${type}`)
  }
  
  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector("input") as HTMLInputElement;
    const text = input.value;
    const data = {role: "user", message: text, images: "", date: new Date().toISOString()};
    const answer = await multiMain({ history: [{ role: "user", parts: [{ text }] }] }, text);
    console.log(answer);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chats/`, data, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }
    });
    console.log(response.data);
    const chatId = response.data.chatId;
    const newData = {role:"assistant", message: answer, images:"", date: new Date().toISOString()};
    const newResponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chats/${chatId}`, newData, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }
    })
    console.log(newResponse.data);
    const addChat = {chatId: chatId, message: text, date: new Date().toISOString()};
    console.log(addChat, 'addchat');
    const addChatId = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userChats`, addChat, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }
    })
    console.log(addChatId.data);
    router.push(`/user/chats/${chatId}`)
  }

  
  
  



  return (
    <div ref={containerRef} className="h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-purple-500 opacity-20"
          style={{
            width: `${i * 2*10}px`,
            height: `${i * 2*10}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            opacity:0.2,
          }}
        />
      ))}

      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="welcome-title text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
            Welcome to Intel AI
          </span>
        </h1>
        <p className="welcome-subtitle text-gray-300 text-lg max-w-2xl mx-auto">
          Start a new conversation, upload images for analysis, or get help with your code. Our AI is here to assist
          you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
        <div
          className="chat-card bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center  hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
          
        >
          <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
            <MessageSquare className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">New Chat</h3>
          <p className="text-gray-400 text-sm">Start a conversation with our AI assistant</p>
        </div>

        <div
          className="chat-card bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center  hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
        >
          <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
            <ImageIcon className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analyze Images</h3>
          <p className="text-gray-400 text-sm">Upload images for AI analysis and insights</p>
        </div>

        <div
          className="chat-card bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center  hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
          
        >
          <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
            <Code className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Code Help</h3>
          <p className="text-gray-400 text-sm">Get assistance with coding and debugging</p>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <form onSubmit={handleInputSubmit} className="chat-input relative">
          <input
            type="text"
            placeholder="Hii..."
            className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full py-4 px-6 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-teal-400 rounded-full p-2 text-white"
          >
            <Sparkles className="h-5 w-5" />
          </button>
        </form>
      </div>

      <div className="mt-12 flex items-center justify-center">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full py-2 px-4 flex items-center">
          <Zap className="h-4 w-4 text-yellow-400 mr-2" />
          <span className="text-sm text-gray-300">Upgrade to Pro for unlimited conversations</span>
        </div>
      </div>
    </div>
  )
}
