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
import Spinner from "@/components/ui/spinner"


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
  const [loading, setloading] = useState(false);
  

  
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

    gsap.set('.chat-card', {
      opacity:0,
    });
    
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
      // .from(
      //   ".chat-card",
      //   {
      //     opacity: 0,
      //     y: 30,
      //     stagger: 0.1,
      //     duration: 0.2,
      //     ease: "sign.inOut",
      //   },
      //   "-=0.4",
      // )
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
    setloading(true);
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
    setloading(false);
  }

  
  
  



  return (
    <div
      ref={containerRef}
      className="h-full min-h-screen flex flex-col items-center justify-center sm:p-4 p-2 md:p-6 relative sm:overflow-hidden overflow-y-auto overflow-x-hidden"
    >
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-purple-500 opacity-20"
          style={{
            width: `${i * 2 * 10}px`,
            height: `${i * 2 * 10}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            opacity: 0.2,
          }}
        />
      ))}

      <div className="max-w-4xl w-full text-center sm:mt-8 mt-36 px-2">
        <h1 className="welcome-title text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
            Welcome to Intel AI
          </span>
        </h1>
        <p className="welcome-subtitle text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
          Start a new conversation, upload images for analysis, or get help with your code. Our AI is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl px-2">
        <div className="chat-card bg-gray-800/80 opacity-0 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
            <MessageSquare className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">New Chat</h3>
          <p className="text-gray-400 text-xs sm:text-sm">Start a conversation with our AI assistant</p>
        </div>

        <div className="chat-card bg-gray-800/80 opacity-0 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
            <ImageIcon className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Analyze Images</h3>
          <p className="text-gray-400 text-xs sm:text-sm">Upload images for AI analysis and insights</p>
        </div>

        <div className="chat-card bg-gray-800/80 opacity-0 backdrop-blur-sm border border-gray-700 rounded-xl p-4 sm:p-6 flex flex-col items-center text-center hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
            <Code className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Code Help</h3>
          <p className="text-gray-400 text-xs sm:text-sm">Get assistance with coding and debugging</p>
        </div>
      </div>

      <div className="w-full max-w-2xl px-2">
        <form onSubmit={handleInputSubmit} className="chat-input relative sm:mt-8 mt-8 flex flex-row">
          <input
            type="text"
            placeholder="Hii..."
            className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full py-3 sm:py-4 px-4 sm:px-6 pr-10 sm:pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            type="submit"
            className=" bg-gradient-to-r from-purple-500 to-teal-400 rounded-full p-2 sm:p-4 ml-1 text-white"
          >
            {loading?<div className="relative "><Spinner /></div>:<Sparkles className="h-5 w-5 " />}
          </button>
        </form>
      </div>

      <div className="mt-8 sm:mt-12 flex items-center justify-center">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full py-2 px-3 sm:px-4 flex items-center">
          <Zap className="h-4 w-4 text-yellow-400 mr-2" />
          <span className="text-xs sm:text-sm text-gray-300">Upgrade to Pro for unlimited conversations</span>
        </div>
      </div>
    </div>
  )
}
