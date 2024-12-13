'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Paperclip, Send, Smile, File, ImageIcon, X } from 'lucide-react'
import Image from "next/image"
import { getFileIcon } from "../utils/fileUtils"

interface ChatInputProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export default function ChatInput({ setMessages }: ChatInputProps) {
  const [message, setMessage] = useState<string>("")
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)
  const [selectedFiles, setSelectedFiles] = useState<FilePreview[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  }

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prevFiles => {
      const newFiles = [...prevFiles];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  }

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prevMessage => prevMessage + emoji);
    setShowEmojiPicker(false);
  }

  const handleSendMessage = () => {
    if (message.trim() || selectedFiles.length > 0) {
      const newMessage: Message = {
        id: Date.now(),
        sender: "Patricia Smith",
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toISOString().split('T')[0],
        files: selectedFiles
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage("");
      setSelectedFiles([]);
    }
  }

  // Mock emoji data - replace with a proper emoji library in a real application
  const emojis: string[] = ["😀", "😂", "😍", "🤔", "👍", "🎉", "🌟", "🔥"];

  return (
    <>
      {/* File Previews */}
      {selectedFiles.length > 0 && (
        <div className="p-2 bg-gray-100 border-t">
          <ScrollArea className="max-h-32">
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative">
                  {file.file.type.startsWith("image/") ? (
                    <Image src={file.preview} alt={file.file.name} width={80} height={80} className="rounded" />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                      {getFileIcon(file.file.type)}
                    </div>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <p className="text-xs mt-1 text-center truncate w-20">{file.file.name}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <File className="h-4 w-4" />
                    <span>Upload Files</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                    />
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <ImageIcon className="h-4 w-4" />
                    <span>Upload Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      multiple
                    />
                  </label>
                </div>
              </PopoverContent>
            </Popover>
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      className="text-2xl hover:bg-muted rounded"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Input 
            placeholder="Enter Message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-gray-100"
          />
          <Button onClick={handleSendMessage}><Send className="h-4 w-4 mr-2" /> Send</Button>
        </div>
      </div>
    </>
  )
}

