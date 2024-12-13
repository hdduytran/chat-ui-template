'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Phone, Video, ChevronLeft } from 'lucide-react'
import { getAvatarUrl } from "../utils/avatarUtils"
import { useState } from "react"

interface ChatHeaderProps {
  nickname: string
  setNickname: (nickname: string) => void
  showRightSidebar: boolean
  setShowRightSidebar: (show: boolean) => void
}

export default function ChatHeader({ nickname, setNickname, showRightSidebar, setShowRightSidebar }: ChatHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src={getAvatarUrl(nickname)} alt={nickname} />
          <AvatarFallback>{nickname.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="p-0 font-medium">{nickname}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Nickname</DialogTitle>
              </DialogHeader>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter new nickname"
              />
              <Button onClick={() => {
                console.log("Nickname updated");
                setIsDialogOpen(false);
              }}>Save</Button>
            </DialogContent>
          </Dialog>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => setShowRightSidebar(!showRightSidebar)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

