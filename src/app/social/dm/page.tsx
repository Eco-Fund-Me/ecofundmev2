"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, MessageSquare, Leaf, Menu, X } from "lucide-react"
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
  {
    id: "4",
    user: {
      name: "Wildlife Guardian",
      username: "wildlifeguardian",
      avatar: "/wildlife-conservation-mosaic.png",
      status: "offline",
    },
    lastMessage: {
      content: "Check out our latest conservation efforts in the Amazon",
      timestamp: "1d ago",
      isRead: true,
    },
    unreadCount: 0,
  },
]

// Mobile Bottom Navigation Component
const MobileBottomNav = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
    <div className="grid grid-cols-5 py-2">
      <Link href="/social">
        <div className="flex flex-col items-center gap-1 py-2 px-1">
          <MessageSquare className="h-5 w-5 text-gray-600" />
          <span className="text-xs text-gray-600">Feed</span>
        </div>
      </Link>
      <Link href="/social/servers">
        <div className="flex flex-col items-center gap-1 py-2 px-1">
          <MessageSquare className="h-5 w-5 text-gray-600" />
          <span className="text-xs text-gray-600">Communities</span>
        </div>
      </Link>
      <Link href="/social/spaces">
        <div className="flex flex-col items-center gap-1 py-2 px-1">
          <MessageSquare className="h-5 w-5 text-gray-600" />
          <span className="text-xs text-gray-600">Spaces</span>
        </div>
      </Link>
      <Link href="/social/dm">
        <div className="flex flex-col items-center gap-1 py-2 px-1">
          <div className="relative">
            <MessageSquare className="h-5 w-5 text-[#00EE7D]" />
            <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500">
              3
            </Badge>
          </div>
          <span className="text-xs text-[#00EE7D]">Messages</span>
        </div>
      </Link>
      <Link href="/social/notifications">
        <div className="flex flex-col items-center gap-1 py-2 px-1">
          <MessageSquare className="h-5 w-5 text-gray-600" />
          <span className="text-xs text-gray-600">Notifications</span>
        </div>
      </Link>
    </div>
  </div>
)

export default function DirectMessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              <Link href="/social" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00EE7D] rounded-lg flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-black" />
                </div>
                <span className="font-bold text-xl text-gray-900 hidden sm:block">EcoFundMe</span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
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
              <Button size="sm" className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 hidden sm:flex">
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
              <Button size="sm" className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 sm:hidden p-2">
                <Plus className="h-4 w-4" />
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Messages Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Connect with campaign creators and community members</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200"
              />
            </div>
          </div>

          {/* Messages List */}
          <Card className="border border-gray-200 mb-20 lg:mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Direct Messages
                {mockDMs.filter((dm) => dm.unreadCount > 0).length > 0 && (
                  <Badge className="bg-red-500 text-white">{mockDMs.filter((dm) => dm.unreadCount > 0).length}</Badge>
                )}
              </CardTitle>
            </CardHeader>

            <ScrollArea className="max-h-[600px]">
              <div className="divide-y divide-gray-100">
                {filteredDMs.map((dm) => (
                  <Link key={dm.id} href={`/social/dm/${dm.id}`}>
                    <div className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="relative">
                        <Avatar className="h-12 w-12 sm:h-14 sm:w-14">
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
                          <span className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                            {dm.user.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{dm.lastMessage.timestamp}</span>
                            {dm.unreadCount > 0 && (
                              <Badge className="bg-[#00EE7D] text-black text-xs h-5 w-5 p-0 flex items-center justify-center">
                                {dm.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p
                            className={`text-sm truncate ${
                              dm.lastMessage.isRead ? "text-gray-600" : "text-gray-900 font-medium"
                            }`}
                          >
                            {dm.lastMessage.content}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">@{dm.user.username}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>

            {filteredDMs.length === 0 && (
              <div className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages found</h3>
                <p className="text-gray-600">
                  {searchQuery ? "Try adjusting your search terms" : "Start a conversation with campaign creators"}
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
