'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { User, MessageSquare, Users, ContactIcon, Settings, LogOut, Calendar } from 'lucide-react'
import Image from "next/image"

interface LeftSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  showSettings: boolean
  setShowSettings: (show: boolean) => void
}

export default function LeftSidebar({ activeTab, setActiveTab, showSettings, setShowSettings }: LeftSidebarProps) {
  return (
    <Card className="w-16 flex flex-col justify-between p-2 bg-primary text-primary-foreground">
      <div className="flex justify-center py-4">
        <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} />
      </div>

      <div className="space-y-4">
        {[
          { icon: User, tab: "profile" },
          { icon: MessageSquare, tab: "chats" },
          { icon: Users, tab: "groups" },
          { icon: ContactIcon, tab: "contacts" },
          { icon: Calendar, tab: "calendar" },
        ].map(({ icon: Icon, tab }) => (
          <Button 
            key={tab}
            variant="ghost" 
            size="icon" 
            className={`w-full text-primary-foreground hover:bg-primary-foreground/10 ${activeTab === tab ? "bg-primary-foreground/20" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            <Icon className="h-6 w-6" />
          </Button>
        ))}
      </div>

      <div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-full text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-6 w-6" />
        </Button>
        {showSettings && (
          <div className="absolute bottom-16 left-16 bg-background shadow-lg rounded-lg p-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

