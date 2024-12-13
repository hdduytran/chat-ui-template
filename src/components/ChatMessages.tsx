'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"
import { getFileIcon } from "@/utils/fileUtils"
import { getAvatarUrl } from "@/utils/avatarUtils"

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  date: string;
  files?: FilePreview[];
}

interface FilePreview {
  file: File;
  preview: string;
}

interface ChatMessagesProps {
  messages: Message[]
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const groupMessagesByDate = (messages: Message[]): Record<string, Message[]> => {
    const groups: Record<string, Message[]> = {};
    messages.forEach(message => {
      if (!groups[message.date]) {
        groups[message.date] = [];
      }
      groups[message.date].push(message);
    });
    return groups;
  }

  const groupConsecutiveMessages = (messages: Message[]): Message[][] => {
    const groupedMessages: Message[][] = [];
    let currentGroup: Message[] = [];

    messages.forEach((message, index) => {
      if (index === 0 || message.sender !== messages[index - 1].sender) {
        if (currentGroup.length> 0) {
          groupedMessages.push(currentGroup);
        }
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groupedMessages.push(currentGroup);
    }

    return groupedMessages;
  }

  const messageGroups = groupMessagesByDate(messages);

  return (
    <ScrollArea className="flex-1 p-4 bg-gray-200">
      <div className="space-y-4">
        {Object.entries(messageGroups).map(([date, msgs]) => (
          <div key={date}>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">{new Date(date).toLocaleDateString()}</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {groupConsecutiveMessages(msgs).map((group, groupIndex) => (
              <div key={groupIndex} className={`flex ${group[0].sender !== "Doris Brown" ? "justify-end" : "justify-start"} mb-4`}>
                <div className={`flex ${group[0].sender !== "Doris Brown" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src={getAvatarUrl(group[0].sender)} alt={group[0].sender} />
                    <AvatarFallback>{group[0].sender.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col ${group[0].sender !== "Doris Brown" ? "items-end mr-2" : "items-start ml-2"}`}>
                    {group.map((msg, msgIndex) => (
                      <div 
                        key={msg.id} 
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.sender !== "Doris Brown" ? "bg-blue-100 text-foreground" : "bg-white text-foreground"
                        } ${msgIndex !== 0 ? "mt-1" : ""}`}
                      >
                        <p>{msg.content}</p>
                        {msg.files && msg.files.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {msg.files.map((file, fileIndex) => (
                              <div key={fileIndex} className="relative">
                                {file.file.type.startsWith("image/") ? (
                                  <Image src={file.preview} alt={file.file.name} width={80} height={80} className="rounded" />
                                ) : (
                                  <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                                    {getFileIcon(file.file.type)}
                                  </div>
                                )}
                                <p className="text-xs mt-1 text-center truncate w-20">{file.file.name}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {msgIndex === group.length - 1 && (
                          <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

