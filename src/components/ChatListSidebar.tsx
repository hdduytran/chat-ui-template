'use client'

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from 'lucide-react'
import ContactList from "./ContactList"
import ProfileTab from "./ProfileTab"
import GroupsTab from "./GroupsTab"
import ContactsTab from "./ContactsTab"
import CalendarTab from "./CalendarTab"

interface ChatListSidebarProps {
  activeTab: string
}

export default function ChatListSidebar({ activeTab }: ChatListSidebarProps) {
  return (
    <Card className="w-1/4 p-4 overflow-hidden bg-background">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">
          {activeTab === "profile" && "Profile"}
          {activeTab === "chats" && "Chats"}
          {activeTab === "groups" && "Groups"}
          {activeTab === "contacts" && "Contacts"}
          {activeTab === "calendar" && "Calendar"}
        </h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        {activeTab === "chats" && (
          <>
            <h3 className="mb-2 text-lg font-semibold">Recent Chats</h3>
            <ContactList />
          </>
        )}
        {activeTab === "groups" && <GroupsTab />}
        {activeTab === "contacts" && <ContactsTab />}
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "calendar" && <CalendarTab />}
      </ScrollArea>
    </Card>
  )
}

