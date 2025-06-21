"use client"

import type React from "react"
import { useEffect, useRef, useLayoutEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { gsap } from "gsap"
import { MessageSquare, PlusCircle, Settings, LogOut, ChevronRight, User, Divide } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import Loader from "@/components/loader/loader"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Spinner from "@/components/ui/spinner"
import { profile } from "console"

interface LayoutProps {
  children: React.ReactNode
  params: {
    userId: string
  }
}

interface chatsData{
  chatId: string,
  message: string,
  date: Date,
};

export default function UserLayout({ children, params }: LayoutProps) {
  const { userId } = params
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const hasMounted = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isloading, setisloading] = useState(false);
  const [chats, setchats] = useState<chatsData[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [existing, setexisting] = useState(true);
  const [name, setname] = useState("");
  const router =  useRouter();
  const [chatsloading, setchatsloading] = useState(false);
  const [profileloading, setprofileloading] = useState(false);
  const [logoutloading, setlogoutloading] = useState(false);
  const [directloading, setdirectloading] = useState(false);


   const recentChats = [
    { id: "chat1", title: "AI capabilities discussion", date: "2 hours ago", active: pathname.includes("/chat1") },
    { id: "chat2", title: "Image analysis help", date: "Yesterday", active: pathname.includes("/chat2") },
    { id: "chat3", title: "Code review assistance", date: "2 days ago", active: pathname.includes("/chat3") },
    { id: "chat4", title: "Project brainstorming", date: "1 week ago", active: pathname.includes("/chat4") },
  ]

  const getProfileData = async()=>{
      setprofileloading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userProfile`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
        if(res.data===null){
          setexisting(false);
          return;
        }
        const profileData = res.data;
        console.log(profileData);
        setname(profileData.name);
        console.log(name, 'name');
        setprofileloading(false);
        
      } catch (error:any) {
        console.log(error);
        
        console.log(error.message);
        setprofileloading(false);
      }
      
    }

  

  const getUserChats = async() =>{
      setchatsloading(true);
      try {
        const userChats = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/userChats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log(userChats);
        console.log(userChats.data);
        setchats(userChats.data.chats);
        setchatsloading(false);
      } catch (error:any) {
        console.log(error);
        
        console.log(error.message);
      }
    };


    const handlelogout = async() => {
      setlogoutloading(true);
      localStorage.setItem('authToken', "");
      document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict';
      toast.success("Logout SuccessFull");
      setlogoutloading(false);
      setTimeout(() => {
      toast.success('Redirecting');
    }, 400);
      router.push('/');
      setlogoutloading(true);
    }

useEffect(() => {
  const authToken = localStorage.getItem('authToken');
  setToken(authToken);
  console.log('authtoken', authToken);
  getUserChats();
  getProfileData();

}, [token, setToken]);



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
    <>
    <div ref={containerRef} className="flex h-screen bg-gray-900 text-white overflow-hidden ">
      <div
        className={`sidebar bg-gray-800 border-r border-gray-700 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20" 
        } sm:${!isSidebarOpen? "flex":"hidden"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and toggle */}
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <Link href={`/user/chats`} className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-teal-400 w-10 h-10 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              {isSidebarOpen && (
                <span className="ml-3 font-bold text-xl bg-gradient-to-r from-purple-500 to-teal-400 bg-clip-text text-transparent">
                  Intel AI
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`text-gray-400 hover:text-white h-2 w-2`}
            >
              <ChevronRight
                className={`h-auto w-auto transition-transform duration-300 ${isSidebarOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </div>

          {/* Main navigation */}
          <div className="p-4 flex-1 overflow-y-auto">
            <Link
              href={`/user/chats`}
              className={`sidebar-item flex items-center p-3 mb-2 rounded-lg transition-colors overflow-hidden ${
                pathname === `/user/chats`
                  ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                  : "hover:bg-gray-700"
              }`}
            >
              <PlusCircle className="h-5 w-5 mr-3" />
              {isSidebarOpen && <span>New Chat</span>}
            </Link>
            {directloading? <Spinner />:
              
                <Link
                  href={`/user/profile`}
                  className={`sidebar-item flex items-center p-3 mb-2 rounded-lg transition-colors ${
                    pathname.includes("/profile")
                      ? "bg-purple-600/20 text-purple-400 border border-purple-600/30"
                      : "hover:bg-gray-700"
                  }`}
                   onClick={()=> {setdirectloading(true);toast.success('Redirecting'); router.push('/user/profile');setdirectloading(false);}}
                >
                  <User className="h-5 w-5 mr-3" />
                  {isSidebarOpen && <span>Profile</span>}
                </Link>
              
          }

            {isSidebarOpen && (
              <div className="mt-8">
                <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3 px-3">Recent Chats</h3>
              </div>
            )}

            {chatsloading?<div className="mr-2 sm:mr-4"><Spinner /></div>:
              <div className="space-y-1">
                {chats.map((chat) => (
                  <Link
                    key={chat.chatId}
                    href={`/user/chats/${chat.chatId}`}
                    className={`chat-item flex items-center p-3 rounded-lg transition-colors `}
                  >
                    <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
                    {isSidebarOpen && (
                      <div className="flex-1 min-w-0">
                        <p className="truncate">{chat.message}</p>
                        <p className="text-xs text-gray-400">
                        {new Date(chat.date).toLocaleDateString()}
                      </p>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            }
          </div>

          {/* User section */}
          <div className="p-4 border-t border-gray-700">
            <div className="sidebar-item flex items-center p-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 flex items-center justify-center">
                {profileloading?<Spinner />:
                  <span className="text-white font-semibold">
                    {existing?name.split(" ").map(word => word[0]).join(""):""}
                  </span>
              }
              </div>
              {isSidebarOpen && (
                <div className="ml-3 flex-1">
                  <p className="font-medium">{existing?name:"Update Profile"}</p>
                  <p className="text-xs text-gray-400">Free Plan</p>
                </div>
              )}
            </div>

          {logoutloading?<Spinner />:
              <Button variant="ghost" onClick={handlelogout} className="sidebar-item w-full mt-2 text-gray-400 hover:text-white justify-start">
                <LogOut className="h-4 w-4 mr-3" />
                {isSidebarOpen && <span>Sign Out</span>}
              </Button>
          }
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content flex-1 overflow-hidden">{children}</div>
    </div>

  </>
  )
}
