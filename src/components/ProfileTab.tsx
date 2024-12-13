'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getAvatarUrl } from "../utils/avatarUtils"

export default function ProfileTab() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Software developer | Coffee enthusiast | Avid reader",
    location: "San Francisco, CA",
    joinDate: "January 2022"
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src={getAvatarUrl(user.name)} alt={user.name} />
          <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <h3 className="mt-4 text-xl font-semibold">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm">{user.bio}</p>
        <p className="text-sm">📍 {user.location}</p>
        <p className="text-sm">🗓️ Joined {user.joinDate}</p>
      </div>
      <div className="pt-4">
        <Button className="w-full">Edit Profile</Button>
      </div>
    </div>
  )
}

