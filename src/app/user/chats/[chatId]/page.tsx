"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { gsap } from "gsap"
import { Send, Paperclip, Mic, Bot, User, Sparkles, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios";
import {use} from 'react';
import { useParams } from "next/navigation"
import { main } from "@/lib/gemini"


import { Container } from "postcss"
import { multiMain } from "@/lib/gemini"
import { stringify } from "querystring"

interface PageProps {
  params: {
    chatId: string
  }
}

// Mock message type
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  image?: string
}

interface historyProps {
  history: Array<{
    role: "user" | "model";
    parts: [{text:string}];
  }>;
}

const token = localStorage.getItem("authToken");

export default function ChatPage({ params }: PageProps) {
  const { chatId } = params;
  const router = useRouter()
  const searchParams = useSearchParams();
  const chatType = searchParams.get("type") || "general"
  
  const [url, setUrl] = useState("");
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  interface Chat {
    _id: string,
    role: "user" | "assistant";
    messages: string;
    images: string;
  }

  interface ProfileData{
    image: String,
  }

  const [formData, setFormData] = useState<ProfileData>({
      image: "",
    });

  const id = params.chatId;

  const handleImageUpload = async (imagePath: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(imagePath);
    const uploadFormData = new FormData();
    uploadFormData.append("file", imagePath);
    uploadFormData.append("upload_preset", "IntelAi"); 
    const res = await fetch("https://api.cloudinary.com/v1_1/di4jbsdwo/image/upload", {
      method: "POST",
      body: uploadFormData,
    });
    const data = await res.json();
    console.log(data, 'data');
    return data.secure_url;
  };



  useEffect(() => {
    // Fetch chat data from the backend API
    const fetchChatData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chats/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        });
         const formattedChats = response.data.chats.map((chat: any) => ({
            id: chat._id, // Map `_id` to `id`
            role: chat.role,
            content: chat.messages,
            timestamp: chat.date, // Convert timestamp to Date object
            image: chat.images || null, // Handle optional images
          }));

        setMessages(formattedChats);
        console.log(messages, "messages");
        
        
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setIsLoading(false);
        
      }
    };

    fetchChatData();
  }, [id]);

  

  
  useEffect(() => {
    let welcomeMessage = "Hi there! How can I assist you today?"
    
    
    

    if (chatType === "image") {
      welcomeMessage = "Upload an image, and I'll analyze it for you."
    } else if (chatType === "code") {
      welcomeMessage = "Share your code, and I'll help you debug or improve it."
    }

    // For existing chats, load mock conversation history
    if (chatId.startsWith("chat")) {
      const mockHistory: Message[] = [
        {
          id: "1",
          role: "assistant",
          content: "Hello! How can I help you today?",
          timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
        },
        {
          id: "2",
          role: "user",
          content: "I'm trying to understand how AI works. Can you explain it simply?",
          timestamp: new Date(Date.now() - 1000 * 60 * 9), // 9 minutes ago
        },
        {
          id: "3",
          role: "assistant",
          content:
            "AI or Artificial Intelligence is like teaching computers to learn and make decisions similar to humans. It uses data patterns to improve over time. Think of it as training a pet to recognize commands, but with math and algorithms instead of treats!",
          timestamp: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
        },
      ]
      setMessages(mockHistory)
    } else {
      // For new chats, just show the welcome message
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: welcomeMessage,
          timestamp: new Date(),
        },
      ])
    }
  }, [chatId, chatType])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Animate new messages
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (messages.length > 0) {
        gsap.from(".message:last-child", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
        })
      }
    

     // Initial animations
  
    gsap.from(".chat-header", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power3.out",
    })

    gsap.from(".chat-footer", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2,
    })

    // Stagger animation for existing messages
    gsap.from(".message", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
    })
  }, [messages.length]);

return ctx.revert();
}, [])


  useEffect(()=>{
    console.log(messages);
  }, [messages]);

  
    

 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageFile: File | null = null;
    let uploadedUrl: string | undefined = undefined;
    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
      console.log("hit");
      imageFile = fileInputRef.current.files[0];
      console.log(imageFile);
      uploadedUrl = await handleImageUpload(imageFile);
      setUrl(uploadedUrl || "");
      
    }

    console.log(url, 'url');
    
    
    const text = input;
    
    if (!input.trim() && !imagePreview) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
      image: uploadedUrl || undefined,
    }

    console.log(userMessage);

    const data = {role: "user", message: text, image:uploadedUrl, date: new Date().toISOString()};
    console.log(data);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chats/${id}`, data, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

    if(response.data.status!==201){
      console.log(response.data.message);
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    uploadedUrl=undefined;
    setUrl("");
    setImagePreview(null)
    setShowImageUpload(false)

    if (fileInputRef.current) {
    fileInputRef.current.value = "";
    }


    // Simulate AI response
    setIsLoading(true)

    const transformMessagesToHistory = (message: any[]): historyProps["history"] =>{
        return messages.map((message)=>({
          role:message.role==="assistant"?"model":"user",
          parts: [{text: message.content}],
        }));
    };
    
    const history = transformMessagesToHistory(messages);
    

    setTimeout(async() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: !imagePreview
          ? (await multiMain({ history }, text)) ?? ""
          : (await main(imagePreview, text)) ?? "",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      
      const newData = {role:"assistant", message:assistantMessage.content, image:"", date: new Date().toISOString()};
      const answerResponse  = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chats/${id}`, newData, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      if(answerResponse.data.status!==201){
        console.log(answerResponse.data.message);
      };
      setIsLoading(false)
      console.log(messages);
      (e as unknown as React.FormEvent<HTMLFormElement> | null) = null;
    }, 1500)
  }

  const getAIResponse = (userInput: string, image: string | null): string => {
    if (image) {
      return "I've analyzed the image you shared. It appears to be [image description]. Is there anything specific about it you'd like to know?"
    }

    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's what I know about that topic...",
      "Great question! Based on my knowledge, I can tell you that...",
      "I'd be happy to help with that. The answer is...",
      "Thanks for asking! From my perspective, I would say...",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setImagePreview(e.target.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
    setShowImageUpload(true)
  }

  const cancelImageUpload = () => {
    setImagePreview(null)
    setShowImageUpload(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div ref={chatContainerRef} className="flex flex-col h-full">
      {/* Chat header */}
      <div className="chat-header flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center mr-3">
            <Bot className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h2 className="font-semibold">{messages?.[0]?.content||"New Chat"}</h2>
            <p className="text-xs text-gray-400">
              {chatType === "general" ? "General Assistant" : chatType === "image" ? "Image Analysis" : "Code Helper"}
            </p>
          </div>
        </div>
        <div>
          <Button variant="outline" onClick={()=> router.push('/user/chats')} size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
            <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ backgroundImage: "radial-gradient(circle at center, rgba(124, 58, 237, 0.05) 0%, transparent 70%)" }}
      >
        {messages.map((message) => (
          <div key={message.id} className={`message flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-3/4 rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-purple-600 text-white rounded-tr-none"
                  : "bg-gray-800 text-white rounded-tl-none"
              }`}
            >
              <div className="flex items-center mb-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    message.role === "user" ? "bg-purple-700" : "bg-gray-700"
                  }`}
                >
                  {message.role === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                </div>
                <span className="text-xs opacity-75">
                  {message.role === "user" ? "You" : "AI Assistant"} •{" "}
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              {message.image && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={message.image || "/placeholder.svg"}
                    alt="Uploaded image"
                    width={300}
                    height={200}
                    className="max-w-full object-contain"
                  />
                </div>
              )}

              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message flex justify-start">
            <div className="bg-gray-800 rounded-2xl rounded-tl-none p-4 text-white">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                  <Bot className="h-3 w-3" />
                </div>
                <span className="text-xs opacity-75">AI Assistant • Typing...</span>
              </div>
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Image preview */}
      {showImageUpload && imagePreview && (
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Image Preview</h3>
            <Button variant="ghost" size="sm" onClick={cancelImageUpload} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          </div>
        </div>
      )}

      {/* Chat input */}
      <div className="chat-footer p-4 border-t border-gray-700 bg-gray-800">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleAttachClick}
            className="text-gray-400 hover:text-white"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-gray-700 border border-gray-600 rounded-full py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || (!input.trim() && !imagePreview)}
            className="bg-gradient-to-r from-purple-500 to-teal-400 rounded-full p-3 text-white disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
      </div>
    </div>
  )
}
