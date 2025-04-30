'use client';
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [expand, setExpand] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {selectedChat} = useAppContext()
  const containerRef = useRef(null)

  useEffect(()=>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat])

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  },[messages])



  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand}/>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image onClick={()=> (expand ? setExpand(false) : setExpand(true))}
             className="rotate-180" src={assets.menu_icon} alt=""/>
            <Image className="opacity-70" src={assets.chat_icon} alt=""/>
          </div>
          {messages.length === 0 ? (
  <>
    <div className="flex items-center gap-3">
      <p className="text-2xl font-medium">Hi, I'm Sadya-Ai. Salut, Je suis Sadya-ai</p>
    </div>
    <p className="text-sm mt-2">How can I help you today? Comment puis-je vous aider aujourd'hui?</p>
  </>
) : (
  <div
    ref={containerRef}
    className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
  >
    <p className="fixed top-8 border border-transparent hover:border-gray-500/50 py-1 px-2 rounded-lg font-semibold mb-6">
      {selectedChat.name}
    </p>
    {messages.map((msg, index) => (
      <Message key={index} role={msg.role} content={msg.content} />
    ))}
    {isLoading && (
      <div className="loader flex justify-center items-center gap-1 py-3 max-w-3xl w-full">
        <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
        <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
        <div className="w-1 h-1 rounded-full bg-white animate-bounce"></div>
      </div>
    )}
  </div>
)}

            
         
        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>
        <p className="text-xs absolute bottom-1 text-gray-500">AI-generated, for reference only</p>

        </div>
      </div>
    </div>
  );
}
