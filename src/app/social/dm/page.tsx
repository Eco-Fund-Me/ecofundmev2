"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreVertical, MessageCircle, Users, Archive, Trash2, Pin } from "lucide-react"
import Link from "next/link"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { SocialSidebar } from "@/components/social/SocialSidebar"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"


interface Conversation {
  id: string
  type: "direct" | "group"
  participants: Array<{
    id: string
    name: string
    username: string
    avatar: string
    status: "online" | "away" | "offline"
  }>
  lastMessage: {
    content: string
    sender: string
    timestamp: string
    unread: boolean
  }
  unreadCount: number
  isPinned: boolean
  isArchived: boolean
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    type: "direct",
    participants: [
      {
        id: "1",
        name: "Dr. Marina Ocean",
        username: "marina_ocean",
        avatar: "/placeholder.svg",
        status: "online",
      },
    ],
    lastMessage: {
      content:
        "Thanks for your support on the ocean cleanup project! Would love to discuss collaboration opportunities.",
      sender: "Dr. Marina Ocean",
      timestamp: "2m ago",
      unread: true,
    },
    unreadCount: 2,
    isPinned: true,
    isArchived: false,
  },
  {
    id: "2",
    type: "group",
    participants: [
      {
        id: "2",
        name: "Captain Clean",
        username: "captain_clean",
        avatar: "/placeholder.svg",
        status: "online",
      },
      {
        id: "3",
        name: "Eco Sarah",
        username: "eco_sarah",
        avatar: "/placeholder.svg",
        status: "away",
      },
      {
        id: "4",
        name: "Green Guardian",
        username: "green_guardian",
        avatar: "/placeholder.svg",
        status: "offline",
      },
    ],
    lastMessage: {
      content: "Let's coordinate the next cleanup session for this weekend",
      sender: "Captain Clean",
      timestamp: "1h ago",
      unread: false,
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
  },
  {
    id: "3",
    type: "direct",
    participants: [
      {
        id: "5",
        name: "Solar Sam",
        username: "solar_sam",
        avatar: "/placeholder.svg",
        status: "away",
      },
    ],
    lastMessage: {
      content: "The solar panel installation went great! Here are some photos from today.",
      sender: "Solar Sam",
      timestamp: "3h ago",
      unread: false,
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
  },
  {
    id: "4",
    type: "direct",
    participants: [
      {
        id: "6",
        name: "Tree Planter",
        username: "tree_planter",
        avatar: "/placeholder.svg",
        status: "offline",
      },
    ],
    lastMessage: {
      content: "We've planted 500 trees this month! The reforestation project is going amazing.",
      sender: "Tree Planter",
      timestamp: "1d ago",
      unread: false,
    },
    unreadCount: 0,
    isPinned: false,
    isArchived: false,
  },
]

export default function DirectMessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.participants.some(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.username.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || conv.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === "unread") return conv.unreadCount > 0 && matchesSearch
    if (activeFilter === "pinned") return conv.isPinned && matchesSearch
    if (activeFilter === "archived") return conv.isArchived && matchesSearch
    return !conv.isArchived && matchesSearch
  })

  const getConversationName = (conversation: Conversation) => {
    if (conversation.type === "group") {
      return conversation.participants.map((p) => p.name).join(", ")
    }
    return conversation.participants[0]?.name || "Unknown"
  }

  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.type === "group") {
      return conversation.participants[0]?.avatar || "/placeholder.svg"
    }
    return conversation.participants[0]?.avatar || "/placeholder.svg"
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

  const handlePinConversation = (conversationId: string) => {
    setConversations(
      conversations.map((conv) => (conv.id === conversationId ? { ...conv, isPinned: !conv.isPinned } : conv)),
    )
  }

  const handleArchiveConversation = (conversationId: string) => {
    setConversations(
      conversations.map((conv) => (conv.id === conversationId ? { ...conv, isArchived: !conv.isArchived } : conv)),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SocialNavigation />

      <div className="flex">
        <SocialSidebar className="hidden lg:block" />

        <main className="flex-1 max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Direct Messages</h1>
              <p className="text-gray-600">Private conversations with other users</p>
            </div>

            <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={activeFilter === "unread" ? "default" : "outline"}
                onClick={() => setActiveFilter("unread")}
                size="sm"
              >
                Unread
              </Button>
              <Button
                variant={activeFilter === "pinned" ? "default" : "outline"}
                onClick={() => setActiveFilter("pinned")}
                size="sm"
              >
                Pinned
              </Button>
              <Button
                variant={activeFilter === "archived" ? "default" : "outline"}
                onClick={() => setActiveFilter("archived")}
                size="sm"
              >
                Archived
              </Button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <Card key={conversation.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link href={`/social/dm/${conversation.participants[0]?.id || conversation.id}`}>
                    <div className="flex items-center gap-4 p-4 hover:bg-gray-50">
                      {/* Avatar */}
                      <div className="relative">
                        {conversation.type === "group" ? (
                          <div className="flex -space-x-2">
                            {conversation.participants.slice(0, 2).map((participant, index) => (
                              <Avatar key={index} className="h-12 w-12 border-2 border-white">
                                <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{participant.name[0]}</AvatarFallback>
                              </Avatar>
                            ))}
                            {conversation.participants.length > 2 && (
                              <div className="h-12 w-12 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center text-sm font-medium">
                                +{conversation.participants.length - 2}
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={getConversationAvatar(conversation) || "/placeholder.svg"} />
                              <AvatarFallback>{getConversationName(conversation)[0]}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(
                                conversation.participants[0]?.status || "offline",
                              )}`}
                            />
                          </>
                        )}
                      </div>

                      {/* Conversation Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{getConversationName(conversation)}</h3>
                          {conversation.type === "group" && (
                            <Badge variant="secondary" className="text-xs">
                              <Users className="h-3 w-3 mr-1" />
                              {conversation.participants.length}
                            </Badge>
                          )}
                          {conversation.isPinned && <Pin className="h-4 w-4 text-gray-500" />}
                        </div>

                        <div className="flex items-center gap-2">
                          <p
                            className={`text-sm truncate flex-1 ${
                              conversation.lastMessage.unread ? "font-medium text-black" : "text-gray-600"
                            }`}
                          >
                            {conversation.type === "group" && (
                              <span className="font-medium">{conversation.lastMessage.sender}: </span>
                            )}
                            {conversation.lastMessage.content}
                          </p>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-gray-500">{conversation.lastMessage.timestamp}</span>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-[#00EE7D] text-black text-xs">{conversation.unreadCount}</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={(e) => e.preventDefault()}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handlePinConversation(conversation.id)}>
                            <Pin className="h-4 w-4 mr-2" />
                            {conversation.isPinned ? "Unpin" : "Pin"} Conversation
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleArchiveConversation(conversation.id)}>
                            <Archive className="h-4 w-4 mr-2" />
                            {conversation.isArchived ? "Unarchive" : "Archive"} Conversation
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Conversation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredConversations.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No conversations found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? "Try adjusting your search terms" : "Start a new conversation to get started"}
                </p>
                <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
