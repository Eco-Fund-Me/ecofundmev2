"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Hash,
  Volume2,
  Users,
  Settings,
  Send,
  Smile,
  Paperclip,
  Crown,
  Shield,
  Star,
  Mic,
  MicOff,
  Headphones,
  HeadphonesIcon,
  MoreVertical,
} from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"

interface Channel {
  id: string
  name: string
  type: "text" | "voice"
  description?: string
  memberCount?: number
  isPrivate?: boolean
}

interface Member {
  id: string
  username: string
  displayName: string
  avatar: string
  status: "online" | "away" | "busy" | "offline"
  role: "admin" | "moderator" | "donor" | "member"
  joinDate: string
  isInVoice?: boolean
  isMuted?: boolean
  isDeafened?: boolean
}

interface Message {
  id: string
  author: Member
  content: string
  timestamp: string
  reactions?: { emoji: string; count: number; users: string[] }[]
  isCommand?: boolean
}

const channels: Channel[] = [
  { id: "announcements", name: "announcements", type: "text", description: "Official updates and news" },
  { id: "general", name: "general", type: "text", description: "General discussion" },
  { id: "donors", name: "donors", type: "text", description: "Donor-only channel", isPrivate: true },
  { id: "progress-updates", name: "progress-updates", type: "text", description: "Campaign progress" },
  { id: "media", name: "media", type: "text", description: "Photos and videos" },
  { id: "general-voice", name: "General Voice", type: "voice", memberCount: 3 },
  { id: "donor-lounge", name: "Donor Lounge", type: "voice", memberCount: 0, isPrivate: true },
]

const members: Member[] = [
  {
    id: "1",
    username: "oceanmaster",
    displayName: "Dr. Marina Ocean",
    avatar: "/placeholder.svg",
    status: "online",
    role: "admin",
    joinDate: "2023-03-15",
    isInVoice: true,
  },
  {
    id: "2",
    username: "ecowarrior",
    displayName: "Eco Warrior",
    avatar: "/placeholder.svg",
    status: "online",
    role: "moderator",
    joinDate: "2023-04-20",
  },
  {
    id: "3",
    username: "cleanocean",
    displayName: "Captain Clean",
    avatar: "/placeholder.svg",
    status: "online",
    role: "donor",
    joinDate: "2023-05-10",
    isInVoice: true,
    isMuted: true,
  },
  {
    id: "4",
    username: "greenfuture",
    displayName: "Green Future",
    avatar: "/placeholder.svg",
    status: "away",
    role: "member",
    joinDate: "2023-06-01",
  },
  {
    id: "5",
    username: "plasticfree",
    displayName: "Plastic Free Life",
    avatar: "/placeholder.svg",
    status: "online",
    role: "donor",
    joinDate: "2023-05-25",
    isInVoice: true,
  },
]

const messages: Message[] = [
  {
    id: "1",
    author: members[0],
    content:
      "🌊 Great news everyone! We've successfully removed another 500kg of plastic from the Pacific this week. Our total is now at 15,000kg! Thank you all for your continued support.",
    timestamp: "10:30 AM",
    reactions: [
      { emoji: "🎉", count: 12, users: ["user1", "user2"] },
      { emoji: "🌊", count: 8, users: ["user3", "user4"] },
    ],
  },
  {
    id: "2",
    author: members[1],
    content: "That's incredible progress! The before/after photos from last week's cleanup were amazing to see.",
    timestamp: "10:32 AM",
    reactions: [{ emoji: "👏", count: 5, users: ["user1"] }],
  },
  {
    id: "3",
    author: members[2],
    content: "/fund 100 - Happy to contribute to this amazing cause! Keep up the great work team! 💚",
    timestamp: "10:35 AM",
    isCommand: true,
    reactions: [
      { emoji: "💚", count: 15, users: ["user1", "user2"] },
      { emoji: "🙏", count: 7, users: ["user3"] },
    ],
  },
  {
    id: "4",
    author: members[3],
    content: "When is the next volunteer cleanup session? I'd love to join in person!",
    timestamp: "10:38 AM",
  },
  {
    id: "5",
    author: members[0],
    content:
      "We have a cleanup scheduled for this Saturday at Marina Bay. I'll post the details in #announcements shortly. Thanks for wanting to help! 🙌",
    timestamp: "10:40 AM",
  },
]

export default function ServerPage({ params }: { params: { serverId: string } }) {
  const [selectedChannel, setSelectedChannel] = useState("general")
  const [newMessage, setNewMessage] = useState("")
  const [showMembers, setShowMembers] = useState(true)

  const currentChannel = channels.find((c) => c.id === selectedChannel)
  const isVoiceChannel = currentChannel?.type === "voice"

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-3 w-3 text-yellow-500" />
      case "moderator":
        return <Shield className="h-3 w-3 text-blue-500" />
      case "donor":
        return <Star className="h-3 w-3 text-green-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Handle message sending logic here
    setNewMessage("")
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <SocialNavigation />

      <div className="flex flex-1 overflow-hidden">
        {/* Server Sidebar */}
        <div className="w-60 bg-gray-800 text-white flex flex-col">
          {/* Server Header */}
          <div className="p-4 border-b border-gray-700">
            <h2 className="font-bold text-lg truncate">Ocean Cleanup Initiative</h2>
            <p className="text-sm text-gray-300">12,847 members</p>
          </div>

          {/* Channels */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-1">Text Channels</div>
              {channels
                .filter((c) => c.type === "text")
                .map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left hover:bg-gray-700 ${
                      selectedChannel === channel.id ? "bg-gray-700 text-white" : "text-gray-300"
                    }`}
                  >
                    <Hash className="h-4 w-4" />
                    <span className="truncate">{channel.name}</span>
                    {channel.isPrivate && <Star className="h-3 w-3 text-yellow-500" />}
                  </button>
                ))}

              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-1 mt-4">
                Voice Channels
              </div>
              {channels
                .filter((c) => c.type === "voice")
                .map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left hover:bg-gray-700 ${
                      selectedChannel === channel.id ? "bg-gray-700 text-white" : "text-gray-300"
                    }`}
                  >
                    <Volume2 className="h-4 w-4" />
                    <span className="truncate">{channel.name}</span>
                    {channel.memberCount! > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {channel.memberCount}
                      </Badge>
                    )}
                    {channel.isPrivate && <Star className="h-3 w-3 text-yellow-500" />}
                  </button>
                ))}
            </div>
          </ScrollArea>

          {/* User Panel */}
          <div className="p-3 bg-gray-900 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Your Name</div>
                <div className="text-xs text-gray-400">#1234</div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Channel Header */}
          <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              {isVoiceChannel ? (
                <Volume2 className="h-5 w-5 text-gray-600" />
              ) : (
                <Hash className="h-5 w-5 text-gray-600" />
              )}
              <span className="font-semibold">{currentChannel?.name}</span>
              {currentChannel?.description && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-sm text-gray-600">{currentChannel.description}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Users className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            {/* Messages/Voice Area */}
            <div className="flex-1 flex flex-col">
              {isVoiceChannel ? (
                /* Voice Channel UI */
                <div className="flex-1 p-6 bg-gray-100">
                  <div className="text-center mb-8">
                    <Volume2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{currentChannel?.name}</h3>
                    <p className="text-gray-600">Join the voice channel to start talking</p>
                  </div>

                  {/* Voice participants */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {members
                      .filter((m) => m.isInVoice)
                      .map((member) => (
                        <Card key={member.id} className="p-4 text-center">
                          <div className="relative mb-3">
                            <Avatar className="h-16 w-16 mx-auto">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{member.displayName[0]}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                            />
                          </div>
                          <div className="font-medium text-sm mb-1">{member.displayName}</div>
                          <div className="flex justify-center gap-1">
                            {member.isMuted && <MicOff className="h-3 w-3 text-red-500" />}
                            {member.isDeafened && <HeadphonesIcon className="h-3 w-3 text-gray-500" />}
                            {getRoleIcon(member.role)}
                          </div>
                        </Card>
                      ))}
                  </div>

                  {/* Voice controls */}
                  <div className="fixed bottom-20 lg:bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 bg-white rounded-full p-2 shadow-lg">
                      <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                        <Headphones className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="rounded-full">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Text Channel UI */
                <>
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className="flex gap-3 hover:bg-gray-50 p-2 rounded">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={message.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{message.author.displayName[0]}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{message.author.displayName}</span>
                              {getRoleIcon(message.author.role)}
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>

                            <div
                              className={`${message.isCommand ? "bg-blue-50 border-l-4 border-blue-500 pl-3 py-1" : ""}`}
                            >
                              <p className={message.isCommand ? "font-mono text-sm" : ""}>{message.content}</p>
                            </div>

                            {message.reactions && (
                              <div className="flex gap-1 mt-2">
                                {message.reactions.map((reaction, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="h-6 px-2 text-xs bg-transparent"
                                  >
                                    {reaction.emoji} {reaction.count}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder={`Message #${currentChannel?.name}`}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="pr-20"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Smile className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button onClick={handleSendMessage} className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Use /fund [amount] to donate, /join to join campaign, /help for commands
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Members Sidebar */}
            {showMembers && (
              <div className="w-60 bg-gray-50 border-l border-gray-200">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-sm">Members — {members.length}</h3>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-2">
                    {/* Group by role */}
                    {["admin", "moderator", "donor", "member"].map((role) => {
                      const roleMembers = members.filter((m) => m.role === role)
                      if (roleMembers.length === 0) return null

                      return (
                        <div key={role} className="mb-4">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1 flex items-center gap-1">
                            {getRoleIcon(role)}
                            {role}s — {roleMembers.length}
                          </div>
                          <div className="space-y-1">
                            {roleMembers.map((member) => (
                              <div
                                key={member.id}
                                className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                              >
                                <div className="relative">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>{member.displayName[0]}</AvatarFallback>
                                  </Avatar>
                                  <div
                                    className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium truncate">{member.displayName}</div>
                                  {member.isInVoice && (
                                    <div className="text-xs text-green-600 flex items-center gap-1">
                                      <Volume2 className="h-3 w-3" />
                                      In voice
                                    </div>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                                >
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
