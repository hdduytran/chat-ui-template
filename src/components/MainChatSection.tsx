'use client'

import { useState } from "react"
import ChatHeader from "./ChatHeader"
import ChatMessages from "./ChatMessages"
import ChatInput from "./ChatInput"

interface MainChatSectionProps {
  showRightSidebar: boolean
  setShowRightSidebar: (show: boolean) => void
}

export default function MainChatSection({ showRightSidebar, setShowRightSidebar }: MainChatSectionProps) {
  const [nickname, setNickname] = useState<string>("Patricia Smith")
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "Doris Brown", content: "Hey Patricia, how are you doing?", time: "10:00 AM", date: "2023-06-01" },
    { id: 2, sender: "Doris Brown", content: "I hope you're having a great day!", time: "10:01 AM", date: "2023-06-01" },
    { id: 3, sender: "Patricia Smith", content: "Hi Doris! I'm doing great, thanks for asking. How about you?", time: "10:05 AM", date: "2023-06-01" },
    { id: 4, sender: "Doris Brown", content: "I'm good too! Just wanted to check in and see if you're free for a quick call later today?", time: "10:10 AM", date: "2023-06-01" },
    { id: 5, sender: "Doris Brown", content: "We could discuss the new project proposal.", time: "10:11 AM", date: "2023-06-01" },
    { id: 6, sender: "Patricia Smith", content: "Sure, I'd be happy to chat. How about 3 PM?", time: "10:15 AM", date: "2023-06-02" },
    { id: 7, sender: "Doris Brown", content: "Perfect! I'll send you a calendar invite. Talk to you then!", time: "10:20 AM", date: "2023-06-02" },
    { id: 8, sender: "Doris Brown", content: "Looking forward to our call!", time: "10:21 AM", date: "2023-06-02" },
  ])

  return (
    <div className="flex-1 flex flex-col bg-background">
      <ChatHeader 
        nickname={nickname} 
        setNickname={setNickname}
        showRightSidebar={showRightSidebar}
        setShowRightSidebar={setShowRightSidebar}
      />
      <ChatMessages messages={messages} />
      <ChatInput setMessages={setMessages} />
    </div>
  )
}

