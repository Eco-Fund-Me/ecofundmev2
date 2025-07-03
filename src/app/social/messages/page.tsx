"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Search, Plus, MessageSquare, MoreVertical, Phone, Video, Info, Leaf } from "lucide-react"
import Link from "next/link"
import { useMatrix } from "@/hooks/useMatrix"
interface DirectMessage {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    status: "online" | "away" | "offline"
  }
  lastMessage: {
    content: string
    timestamp: string
    isRead: boolean
  }
  unreadCount: number
}

const mockDMs: DirectMessage[] = [
  {
    id: "1",
    user: {
      name: "Dr. Marina Ocean",
      username: "oceanmaster",
      avatar: "/placeholder.svg",
      status: "online",
    },
    lastMessage: {
      content: "Thanks for supporting our ocean cleanup initiative! 🌊",
      timestamp: "2m ago",
      isRead: false,
    },
    unreadCount: 2,
  },
  {
    id: "2",
    user: {
      name: "Solar Solutions Team",
      username: "solarsolutions",
      avatar: "/solar-panels-school.png",
      status: "online",
    },
    lastMessage: {
      content: "Your solar panel installation is scheduled for next week",
      timestamp: "1h ago",
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "3",
    user: {
      name: "Green Thumb Collective",
      username: "greenthumb",
      avatar: "/sustainable-garden.png",
      status: "away",
    },
    lastMessage: {
      content: "The urban gardening workshop was amazing! When's the next one?",
      timestamp: "3h ago",
      isRead: true,
    },
    unreadCount: 0,
  },
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDM, setSelectedDM] = useState<string | null>(null)
  const { isConnected, user, rooms } = useMatrix()

  const filteredDMs = mockDMs.filter(
    (dm) =>
      dm.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dm.user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/social" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00EE7D] rounded-lg flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-black" />
                </div>
                <span className="font-bold text-xl text-gray-900">EcoFundMe</span>
              </Link>
              <div className="flex items-center gap-1">
                <Link href="/social">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Feed
                  </Button>
                </Link>
                <Link href="/social/servers">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Communities
                  </Button>
                </Link>
                <Link href="/social/spaces">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                    Spaces
                  </Button>
                </Link>
                <Button variant="ghost" className="bg-[#00EE7D]/10 text-[#00EE7D]">
                  Messages
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Messages Sidebar */}
          <div className="col-span-4">
            <Card className="h-full border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Messages
                  </CardTitle>
                  <Button size="sm" className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
              </CardHeader>

              <Separator />

              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredDMs.map((dm) => (
                    <div
                      key={dm.id}
                      onClick={() => setSelectedDM(dm.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedDM === dm.id ? "bg-[#00EE7D]/10" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={dm.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{dm.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(
                            dm.user.status,
                          )}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 truncate">{dm.user.name}</span>
                          <span className="text-xs text-gray-500">{dm.lastMessage.timestamp}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm truncate ${
                              dm.lastMessage.isRead ? "text-gray-600" : "text-gray-900 font-medium"
                            }`}
                          >
                            {dm.lastMessage.content}
                          </p>
                          {dm.unreadCount > 0 && (
                            <Badge className="bg-[#00EE7D] text-black text-xs h-5 w-5 p-0 flex items-center justify-center">
                              {dm.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="col-span-8">
            {selectedDM ? (
              <Card className="h-full border border-gray-200 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={filteredDMs.find((dm) => dm.id === selectedDM)?.user.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {filteredDMs.find((dm) => dm.id === selectedDM)?.user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(
                            filteredDMs.find((dm) => dm.id === selectedDM)?.user.status || "offline",
                          )}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {filteredDMs.find((dm) => dm.id === selectedDM)?.user.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @{filteredDMs.find((dm) => dm.id === selectedDM)?.user.username}
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
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        This is the beginning of your conversation with{" "}
                        {filteredDMs.find((dm) => dm.id === selectedDM)?.user.name}
                      </p>
                    </div>

                    {/* Sample messages */}
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={filteredDMs.find((dm) => dm.id === selectedDM)?.user.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{filteredDMs.find((dm) => dm.id === selectedDM)?.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                          <p className="text-sm">
                            {filteredDMs.find((dm) => dm.id === selectedDM)?.lastMessage.content}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {filteredDMs.find((dm) => dm.id === selectedDM)?.lastMessage.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input placeholder="Type a message..." className="flex-1" />
                    <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">Send</Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full border border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose from your existing conversations or start a new one</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
