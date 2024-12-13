'use client'

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Pin, Calendar, Group, FileText, Flag, Trash2 } from 'lucide-react'
import Image from "next/image"

export default function RightSidebar() {
  return (
    <Card className="w-1/4 p-4 overflow-hidden bg-background">
      <ScrollArea className="h-full">
        <div className="space-y-6">
          {/* Notifications and Pin */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Chat Settings</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Label>
              <Switch id="notifications" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <Label htmlFor="pin" className="flex items-center space-x-2">
                <Pin className="h-4 w-4" />
                <span>Pin this chat</span>
              </Label>
              <Switch id="pin" />
            </div>
          </div>

          {/* Calendar and Groups */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Shared Information</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Next meeting: Tomorrow, 3 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Group className="h-4 w-4" />
                <span>2 shared groups</span>
              </div>
            </div>
          </div>

          {/* Shared Media */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Shared Media</h3>
            <div className="grid grid-cols-3 gap-2">
              <Image src="/placeholder.svg?height=80&width=80" alt="Shared image" width={80} height={80} className="rounded" />
              <Image src="/placeholder.svg?height=80&width=80" alt="Shared image" width={80} height={80} className="rounded" />
              <Image src="/placeholder.svg?height=80&width=80" alt="Shared image" width={80} height={80} className="rounded" />
            </div>
          </div>

          {/* Shared Files */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Shared Files</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Project_proposal.pdf</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Meeting_notes.docx</span>
              </div>
            </div>
          </div>

          {/* Other Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Other Settings</h3>
            <Button variant="ghost" className="w-full justify-start">
              <Flag className="h-4 w-4 mr-2" />
              Report
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Chat History
            </Button>
          </div>
        </div>
      </ScrollArea>
    </Card>
  )
}

