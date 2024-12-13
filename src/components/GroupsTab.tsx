'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAvatarUrl } from "../utils/avatarUtils"

const groups = [
  { id: 1, name: "Project Alpha", members: 5, lastActivity: "2h ago" },
  { id: 2, name: "Coffee Lovers", members: 12, lastActivity: "5m ago" },
  { id: 3, name: "Book Club", members: 8, lastActivity: "1d ago" },
  { id: 4, name: "Tech Innovators", members: 20, lastActivity: "3h ago" },
  { id: 5, name: "Fitness Fanatics", members: 15, lastActivity: "1h ago" },
]

export default function GroupsTab() {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.id} className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <Avatar className="h-12 w-12">
            <AvatarImage src={getAvatarUrl(group.name)} alt={group.name} />
            <AvatarFallback>{group.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="text-sm font-semibold">{group.name}</h4>
            <p className="text-xs text-muted-foreground">{group.members} members</p>
          </div>
          <div className="text-xs text-muted-foreground">{group.lastActivity}</div>
        </div>
      ))}
    </div>
  )
}

