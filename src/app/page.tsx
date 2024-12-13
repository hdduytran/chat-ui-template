'use client'

import { useState } from "react"
import LeftSidebar from "../components/LeftSidebar"
import ChatListSidebar from "../components/ChatListSidebar"
import MainChatSection from "../components/MainChatSection"
import RightSidebar from "../components/RightSidebar"

export default function ChatApp() {
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("chats")
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false)

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <ChatListSidebar activeTab={activeTab} />
      <MainChatSection 
        showRightSidebar={showRightSidebar}
        setShowRightSidebar={setShowRightSidebar}
      />
      {showRightSidebar && <RightSidebar />}
    </div>
  )
}

