"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Plus,
  Search,
  Pin,
  Archive,
  BlocksIcon as Block,
  Flag,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"

interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar: string
  }
  timestamp: string
  type: "text" | "image" | "file"
  reactions?: Array<{
    emoji: string
    count: number
    users: string[]
  }>
  isOwn: boolean
}

interface User {
  id: string
  name: string
  username: string
  avatar: string
  status: "online" | "away" | "offline"
  lastSeen?: string
  bio?: string
  joinedDate: string
  mutualCampaigns: Array<{
    id: string
    name: string
  }>
}

const mockUser: User = {
  id: "1",
  name: "Dr. Marina Ocean",
  username: "marina_ocean",
  avatar: "/placeholder.svg",
  status: "online",
  bio: "Marine biologist and ocean conservation advocate. Leading the Pacific Ocean Cleanup initiative.",
  joinedDate: "January 2023",
  mutualCampaigns: [
    { id: "1", name: "Ocean Cleanup Initiative" },
    { id: "2", name: "Marine Life Protection" },
  ],
}

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hi! Thanks for supporting our ocean cleanup project. Your contribution really makes a difference! 🌊",
    sender: {
      id: "1",
      name: "Dr. Marina Ocean",
      avatar: "/placeholder.svg",
    },
    timestamp: "2h ago",
    type: "text",
    isOwn: false,
  },
  {
    id: "2",
    content:
      "Thank you for the amazing work you're doing! I'm really passionate about ocean conservation. Is there any way I can get more involved as a volunteer?",
    sender: {
      id: "current",
      name: "You",
      avatar: "/placeholder.svg",
    },
    timestamp: "2h ago",
    type: "text",
    isOwn: true,
  },
  {
    id: "3",
    content:
      "That's wonderful to hear! We're always looking for dedicated volunteers. We have cleanup sessions every weekend, and we also need help with data collection and community outreach.",
    sender: {
      id: "1",
      name: "Dr. Marina Ocean",
      avatar: "/placeholder.svg",
    },
    timestamp: "1h ago",
    type: "text",
    isOwn: false,
    reactions: [{ emoji: "👍", count: 1, users: ["current"] }],
  },
  {
    id: "4",
    content: "I'd love to join the weekend cleanup sessions! What should I bring, and where do you usually meet?",
    sender: {
      id: "current",
      name: "You",
      avatar: "/placeholder.svg",
    },
    timestamp: "1h ago",
    type: "text",
    isOwn: true,
  },
  {
    id: "5",
    content:
      "Perfect! We meet at Marina Bay every Saturday at 9 AM. Just bring gloves, water, and sun protection. We provide all the cleanup equipment. I'll send you the exact location and our volunteer group chat link.",
    sender: {
      id: "1",
      name: "Dr. Marina Ocean",
      avatar: "/placeholder.svg",
    },
    timestamp: "30m ago",
    type: "text",
    isOwn: false,
  },
]

export default function DirectMessagePage() {
  const params = useParams()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [user, setUser] = useState<User>(mockUser)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: "current",
        name: "You",
        avatar: "/placeholder.svg",
      },
      timestamp: "now",
      type: "text",
      isOwn: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find((r) => r.emoji === emoji)
          if (existingReaction) {
            // Toggle reaction
            const hasUserReacted = existingReaction.users.includes("current")
            if (hasUserReacted) {
              return {
                ...msg,
                reactions: msg.reactions
                  ?.map((r) =>
                    r.emoji === emoji ? { ...r, count: r.count - 1, users: r.users.filter((u) => u !== "current") } : r,
                  )
                  .filter((r) => r.count > 0),
              }
            } else {
              return {
                ...msg,
                reactions: msg.reactions?.map((r) =>
                  r.emoji === emoji ? { ...r, count: r.count + 1, users: [...r.users, "current"] } : r,
                ),
              }
            }
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [...(msg.reactions || []), { emoji, count: 1, users: ["current"] }],
            }
          }
        }
        return msg
      }),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SocialNavigation />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b bg-white px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/social/dm">
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>

              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                    user.status,
                  )}`}
                />
              </div>

              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">
                  {user.status === "online" ? "Online" : user.lastSeen || "Offline"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Pin className="h-4 w-4 mr-2" />
                    Pin Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Block className="h-4 w-4 mr-2" />
                    Block User
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Flag className="h-4 w-4 mr-2" />
                    Report User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : ""}`}>
                  {!message.isOwn && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                  )}

                  <div className={`flex flex-col ${message.isOwn ? "items-end" : "items-start"} max-w-xs lg:max-w-md`}>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        message.isOwn ? "bg-[#00EE7D] text-black" : "bg-white border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>

                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {message.reactions.map((reaction, index) => (
                          <button
                            key={index}
                            onClick={() => handleReaction(message.id, reaction.emoji)}
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${
                              reaction.users.includes("current")
                                ? "bg-[#00EE7D]/20 border-[#00EE7D]"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                          >
                            <span>{reaction.emoji}</span>
                            <span>{reaction.count}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    <span className="text-xs text-gray-500 mt-1">{message.timestamp}</span>
                  </div>

                  {/* Quick Reactions */}
                  <div className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {["👍", "❤️", "😂", "😮", "😢", "😡"].map((emoji) => (
                          <DropdownMenuItem key={emoji} onClick={() => handleReaction(message.id, emoji)}>
                            {emoji}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
              <Input
                placeholder={`Message ${user.name}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="border-none bg-transparent focus:ring-0"
              />
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* User Info Sidebar */}
        <div className="hidden xl:flex w-80 bg-white border-l flex-col">
          <div className="p-6 border-b">
            <div className="text-center">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-500">@{user.username}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className={`h-2 w-2 rounded-full ${getStatusColor(user.status)}`} />
                <span className="text-sm text-gray-500 capitalize">{user.status}</span>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {user.bio && (
                <div>
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-sm text-gray-600">{user.bio}</p>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Member Since</h4>
                <p className="text-sm text-gray-600">{user.joinedDate}</p>
              </div>

              {user.mutualCampaigns.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Mutual Campaigns</h4>
                  <div className="space-y-2">
                    {user.mutualCampaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-[#00EE7D] rounded-full" />
                        <span className="text-sm">{campaign.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 border-t space-y-2">
            <Button className="w-full bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
              <Phone className="h-4 w-4 mr-2" />
              Voice Call
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Video className="h-4 w-4 mr-2" />
              Video Call
            </Button>
          </div>
        </div>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
