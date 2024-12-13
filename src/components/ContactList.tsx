'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { getAvatarUrl } from "../utils/avatarUtils"

interface Contact {
  id: number;
  name: string;
  status: string;
  time: string;
  unread: number;
  online: boolean;
}

const contacts: Contact[] = [
  { id: 1, name: "John Doe", status: "Nice to meet you", time: "2m ago", unread: 3, online: true },
  { id: 2, name: "Jane Smith", status: "Hey! There I'm available", time: "1h ago", unread: 0, online: true },
  { id: 3, name: "Alice Johnson", status: "At work", time: "3h ago", unread: 1, online: false },
]

export default function ContactList() {
  return (
    <>
      {contacts.map((contact) => (
        <div key={contact.id} className="flex items-center mb-4 cursor-pointer">
          <Avatar className="h-10 w-10">
            <AvatarImage src={getAvatarUrl(contact.name)} alt={contact.name} />
            <AvatarFallback>{contact.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium">{contact.name}</p>
            <p className="text-xs text-muted-foreground truncate">{contact.status}</p>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{contact.time}</div>
          {contact.unread > 0 && (
            <div className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {contact.unread}
            </div>
          )}
          <div className={`ml-2 w-2 h-2 rounded-full ${contact.online ? "bg-green-500" : "bg-red-500"}`} />
        </div>
      ))}
    </>
  )
}

