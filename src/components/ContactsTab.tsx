'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAvatarUrl } from "../utils/avatarUtils"

const contacts = [
  { id: 1, name: "Alice Johnson", status: "Online", lastSeen: "Now" },
  { id: 2, name: "Bob Smith", status: "Offline", lastSeen: "2h ago" },
  { id: 3, name: "Charlie Brown", status: "Online", lastSeen: "Now" },
  { id: 4, name: "Diana Prince", status: "Away", lastSeen: "30m ago" },
  { id: 5, name: "Ethan Hunt", status: "Busy", lastSeen: "1h ago" },
  { id: 6, name: "Fiona Apple", status: "Online", lastSeen: "Now" },
  { id: 7, name: "George Michael", status: "Offline", lastSeen: "1d ago" },
]

export default function ContactsTab() {
  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div key={contact.id} className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <Avatar className="h-10 w-10">
            <AvatarImage src={getAvatarUrl(contact.name)} alt={contact.name} />
            <AvatarFallback>{contact.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="text-sm font-semibold">{contact.name}</h4>
            <p className="text-xs text-muted-foreground">{contact.status}</p>
          </div>
          <div className="text-xs text-muted-foreground">{contact.lastSeen}</div>
        </div>
      ))}
    </div>
  )
}

