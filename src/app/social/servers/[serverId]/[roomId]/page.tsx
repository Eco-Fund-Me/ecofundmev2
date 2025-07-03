"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Mic,
  MicOff,
  Headphones,
  HeadphonesIcon,
  Volume2,
  VolumeX,
  Settings,
  UserPlus,
  Hand,
  Users,
  PhoneOff,
  MoreVertical,
  Crown,
  Shield,
  Star,
} from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"

interface VoiceParticipant {
  id: string
  name: string
  username: string
  avatar: string
  role: "admin" | "moderator" | "donor" | "member"
  isSpeaking: boolean
  isMuted: boolean
  isDeafened: boolean
  joinedAt: string
  handRaised: boolean
}

const mockParticipants: VoiceParticipant[] = [
  {
    id: "1",
    name: "Dr. Marina Ocean",
    username: "marina_ocean",
    avatar: "/placeholder.svg",
    role: "admin",
    isSpeaking: true,
    isMuted: false,
    isDeafened: false,
    joinedAt: "45m ago",
    handRaised: false,
  },
  {
    id: "2",
    name: "Captain Clean",
    username: "captain_clean",
    avatar: "/placeholder.svg",
    role: "moderator",
    isSpeaking: false,
    isMuted: false,
    isDeafened: false,
    joinedAt: "30m ago",
    handRaised: false,
  },
  {
    id: "3",
    name: "Eco Sarah",
    username: "eco_sarah",
    avatar: "/placeholder.svg",
    role: "donor",
    isSpeaking: false,
    isMuted: true,
    isDeafened: false,
    joinedAt: "20m ago",
    handRaised: true,
  },
  {
    id: "4",
    name: "Green Guardian",
    username: "green_guardian",
    avatar: "/placeholder.svg",
    role: "member",
    isSpeaking: false,
    isMuted: false,
    isDeafened: false,
    joinedAt: "15m ago",
    handRaised: false,
  },
  {
    id: "5",
    name: "Ocean Lover",
    username: "ocean_lover",
    avatar: "/placeholder.svg",
    role: "member",
    isSpeaking: false,
    isMuted: true,
    isDeafened: true,
    joinedAt: "10m ago",
    handRaised: false,
  },
]

export default function VoiceRoomPage() {
  const params = useParams()
  const [participants, setParticipants] = useState<VoiceParticipant[]>(mockParticipants)
  const [isConnected, setIsConnected] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [handRaised, setHandRaised] = useState(false)

  const speakers = participants.filter((p) => p.role === "admin" || p.role === "moderator" || p.isSpeaking)
  const listeners = participants.filter((p) => p.role !== "admin" && p.role !== "moderator" && !p.isSpeaking)

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-500" />
      case "donor":
        return <Star className="h-4 w-4 text-[#00EE7D]" />
      default:
        return null
    }
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleToggleDeafen = () => {
    setIsDeafened(!isDeafened)
    if (!isDeafened) setIsMuted(true) // Deafening also mutes
  }

  const handleRaiseHand = () => {
    setHandRaised(!handRaised)
  }

  const handleLeaveRoom = () => {
    setIsConnected(false)
    // Navigate back to server
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SocialNavigation />

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Room Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="h-6 w-6 text-[#00EE7D]" />
                <div>
                  <CardTitle className="text-xl">Live Updates</CardTitle>
                  <p className="text-sm text-gray-600">Ocean Cleanup Initiative • Voice Channel</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className="bg-green-500 text-white">
                  <Users className="h-3 w-3 mr-1" />
                  {participants.length} connected
                </Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite People
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Room Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Voice Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Speakers Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Speakers ({speakers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {speakers.map((participant) => (
                    <div key={participant.id} className="text-center">
                      <div className="relative mb-2">
                        <Avatar
                          className={`h-16 w-16 mx-auto border-4 ${
                            participant.isSpeaking ? "border-green-500 animate-pulse" : "border-gray-200"
                          }`}
                        >
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>

                        {/* Role Icon */}
                        <div className="absolute -top-1 -right-1">{getRoleIcon(participant.role)}</div>

                        {/* Mic Status */}
                        <div className="absolute -bottom-1 -right-1">
                          {participant.isMuted ? (
                            <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
                              <MicOff className="h-3 w-3 text-white" />
                            </div>
                          ) : (
                            <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Mic className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Hand Raised */}
                        {participant.handRaised && (
                          <div className="absolute -top-2 -left-2">
                            <Hand className="h-6 w-6 text-yellow-500" />
                          </div>
                        )}
                      </div>

                      <div className="text-sm font-medium truncate">{participant.name}</div>
                      <div className="text-xs text-gray-500">{participant.joinedAt}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Listeners Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  Listeners ({listeners.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {listeners.map((participant) => (
                    <div key={participant.id} className="text-center">
                      <div className="relative mb-1">
                        <Avatar className="h-12 w-12 mx-auto">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>

                        {/* Status Icons */}
                        <div className="absolute -bottom-1 -right-1 flex gap-1">
                          {participant.isMuted && (
                            <div className="h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                              <MicOff className="h-2 w-2 text-white" />
                            </div>
                          )}
                          {participant.isDeafened && (
                            <div className="h-4 w-4 bg-gray-500 rounded-full flex items-center justify-center">
                              <HeadphonesIcon className="h-2 w-2 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Hand Raised */}
                        {participant.handRaised && (
                          <div className="absolute -top-1 -left-1">
                            <Hand className="h-4 w-4 text-yellow-500" />
                          </div>
                        )}

                        {/* Role Icon */}
                        {participant.role !== "member" && (
                          <div className="absolute -top-1 -right-1">{getRoleIcon(participant.role)}</div>
                        )}
                      </div>

                      <div className="text-xs font-medium truncate">{participant.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Sidebar */}
          <div className="space-y-6">
            {/* Voice Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Voice Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleToggleMute} variant={isMuted ? "destructive" : "outline"} className="w-full">
                  {isMuted ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isMuted ? "Unmute" : "Mute"}
                </Button>

                <Button
                  onClick={handleToggleDeafen}
                  variant={isDeafened ? "destructive" : "outline"}
                  className="w-full"
                >
                  {isDeafened ? <VolumeX className="h-4 w-4 mr-2" /> : <Volume2 className="h-4 w-4 mr-2" />}
                  {isDeafened ? "Undeafen" : "Deafen"}
                </Button>

                <Button
                  onClick={handleRaiseHand}
                  variant={handRaised ? "default" : "outline"}
                  className={`w-full ${handRaised ? "bg-yellow-500 hover:bg-yellow-600" : ""}`}
                >
                  <Hand className="h-4 w-4 mr-2" />
                  {handRaised ? "Lower Hand" : "Raise Hand"}
                </Button>

                <Button onClick={handleLeaveRoom} variant="destructive" className="w-full">
                  <PhoneOff className="h-4 w-4 mr-2" />
                  Leave Room
                </Button>
              </CardContent>
            </Card>

            {/* Room Info */}
            <Card>
              <CardHeader>
                <CardTitle>Room Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium">Topic</div>
                  <div className="text-gray-600">Live updates and discussions about our ocean cleanup progress</div>
                </div>

                <div className="text-sm">
                  <div className="font-medium">Started by</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>MO</AvatarFallback>
                    </Avatar>
                    <span>Dr. Marina Ocean</span>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="font-medium">Duration</div>
                  <div className="text-gray-600">45 minutes</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Friends
                </Button>

                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Audio Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
