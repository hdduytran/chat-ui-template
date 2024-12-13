'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAvatarUrl } from "../utils/avatarUtils"

interface Event {
  id: number;
  title: string;
  date: Date;
  attendees: string[];
}

export default function CalendarTab() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: "Team Meeting", date: new Date(2023, 5, 15, 10, 0), attendees: ["Alice", "Bob", "Charlie"] },
    { id: 2, title: "Project Review", date: new Date(2023, 5, 17, 14, 0), attendees: ["Diana", "Ethan"] },
    { id: 3, title: "Client Call", date: new Date(2023, 5, 20, 11, 0), attendees: ["Fiona", "George"] },
  ])
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: "", date: new Date(), attendees: "" })

  const handleCreateEvent = () => {
    const newEventObj: Event = {
      id: events.length + 1,
      title: newEvent.title,
      date: newEvent.date,
      attendees: newEvent.attendees.split(',').map(a => a.trim()),
    }
    setEvents([...events, newEventObj])
    setIsCreateEventOpen(false)
    setNewEvent({ title: "", date: new Date(), attendees: "" })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Calendar</h3>
        <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
          <DialogTrigger asChild>
            <Button>Create Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="date">Event Date</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={newEvent.date.toISOString().slice(0, 16)}
                  onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="attendees">Attendees (comma-separated)</Label>
                <Input
                  id="attendees"
                  value={newEvent.attendees}
                  onChange={(e) => setNewEvent({ ...newEvent, attendees: e.target.value })}
                />
              </div>
              <Button onClick={handleCreateEvent}>Create Event</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {events
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {event.date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <div className="flex -space-x-2">
                  {event.attendees.slice(0, 3).map((attendee, index) => (
                    <Avatar key={index} className="h-6 w-6 border-2 border-background">
                      <AvatarImage src={getAvatarUrl(attendee)} alt={attendee} />
                      <AvatarFallback>{attendee[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.attendees.length > 3 && (
                    <Avatar className="h-6 w-6 border-2 border-background">
                      <AvatarFallback>+{event.attendees.length - 3}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  )
}

