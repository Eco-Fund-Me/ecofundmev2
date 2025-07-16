// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"
// import {
//   Hash,
//   Volume2,
//   Users,
//   Settings,
//   Send,
//   Smile,
//   Paperclip,
//   Crown,
//   Shield,
//   Star,
//   Mic,
//   MicOff,
//   Headphones,
//   HeadphonesIcon,
//   MoreVertical,
// } from "lucide-react"
// import { SocialNavigation } from "@/components/social/SocialNavigation"
// import { MobileBottomNav } from "@/components/social/MobileBottomNav"

// interface Channel {
//   id: string
//   name: string
//   type: "text" | "voice"
//   description?: string
//   memberCount?: number
//   isPrivate?: boolean
// }

// interface Member {
//   id: string
//   username: string
//   displayName: string
//   avatar: string
//   status: "online" | "away" | "busy" | "offline"
//   role: "admin" | "moderator" | "donor" | "member"
//   joinDate: string
//   isInVoice?: boolean
//   isMuted?: boolean
//   isDeafened?: boolean
// }

// interface Message {
//   id: string
//   author: Member
//   content: string
//   timestamp: string
//   reactions?: { emoji: string; count: number; users: string[] }[]
//   isCommand?: boolean
// }

// const channels: Channel[] = [
//   { id: "announcements", name: "announcements", type: "text", description: "Official updates and news" },
//   { id: "general", name: "general", type: "text", description: "General discussion" },
//   { id: "donors", name: "donors", type: "text", description: "Donor-only channel", isPrivate: true },
//   { id: "progress-updates", name: "progress-updates", type: "text", description: "Campaign progress" },
//   { id: "media", name: "media", type: "text", description: "Photos and videos" },
//   { id: "general-voice", name: "General Voice", type: "voice", memberCount: 3 },
//   { id: "donor-lounge", name: "Donor Lounge", type: "voice", memberCount: 0, isPrivate: true },
// ]

// const members: Member[] = [
//   {
//     id: "1",
//     username: "oceanmaster",
//     displayName: "Dr. Marina Ocean",
//     avatar: "/placeholder.svg",
//     status: "online",
//     role: "admin",
//     joinDate: "2023-03-15",
//     isInVoice: true,
//   },
//   {
//     id: "2",
//     username: "ecowarrior",
//     displayName: "Eco Warrior",
//     avatar: "/placeholder.svg",
//     status: "online",
//     role: "moderator",
//     joinDate: "2023-04-20",
//   },
//   {
//     id: "3",
//     username: "cleanocean",
//     displayName: "Captain Clean",
//     avatar: "/placeholder.svg",
//     status: "online",
//     role: "donor",
//     joinDate: "2023-05-10",
//     isInVoice: true,
//     isMuted: true,
//   },
//   {
//     id: "4",
//     username: "greenfuture",
//     displayName: "Green Future",
//     avatar: "/placeholder.svg",
//     status: "away",
//     role: "member",
//     joinDate: "2023-06-01",
//   },
//   {
//     id: "5",
//     username: "plasticfree",
//     displayName: "Plastic Free Life",
//     avatar: "/placeholder.svg",
//     status: "online",
//     role: "donor",
//     joinDate: "2023-05-25",
//     isInVoice: true,
//   },
// ]

// const messages: Message[] = [
//   {
//     id: "1",
//     author: members[0],
//     content:
//       "🌊 Great news everyone! We've successfully removed another 500kg of plastic from the Pacific this week. Our total is now at 15,000kg! Thank you all for your continued support.",
//     timestamp: "10:30 AM",
//     reactions: [
//       { emoji: "🎉", count: 12, users: ["user1", "user2"] },
//       { emoji: "🌊", count: 8, users: ["user3", "user4"] },
//     ],
//   },
//   {
//     id: "2",
//     author: members[1],
//     content: "That's incredible progress! The before/after photos from last week's cleanup were amazing to see.",
//     timestamp: "10:32 AM",
//     reactions: [{ emoji: "👏", count: 5, users: ["user1"] }],
//   },
//   {
//     id: "3",
//     author: members[2],
//     content: "/fund 100 - Happy to contribute to this amazing cause! Keep up the great work team! 💚",
//     timestamp: "10:35 AM",
//     isCommand: true,
//     reactions: [
//       { emoji: "💚", count: 15, users: ["user1", "user2"] },
//       { emoji: "🙏", count: 7, users: ["user3"] },
//     ],
//   },
//   {
//     id: "4",
//     author: members[3],
//     content: "When is the next volunteer cleanup session? I'd love to join in person!",
//     timestamp: "10:38 AM",
//   },
//   {
//     id: "5",
//     author: members[0],
//     content:
//       "We have a cleanup scheduled for this Saturday at Marina Bay. I'll post the details in #announcements shortly. Thanks for wanting to help! 🙌",
//     timestamp: "10:40 AM",
//   },
// ]

// export default function ServerPage({ params }: { params: { serverId: string } }) {
//   const [selectedChannel, setSelectedChannel] = useState("general")
//   const [newMessage, setNewMessage] = useState("")
//   const [showMembers, setShowMembers] = useState(true)

//   const currentChannel = channels.find((c) => c.id === selectedChannel)
//   const isVoiceChannel = currentChannel?.type === "voice"

//   const getRoleIcon = (role: string) => {
//     switch (role) {
//       case "admin":
//         return <Crown className="h-3 w-3 text-yellow-500" />
//       case "moderator":
//         return <Shield className="h-3 w-3 text-blue-500" />
//       case "donor":
//         return <Star className="h-3 w-3 text-green-500" />
//       default:
//         return null
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "online":
//         return "bg-green-500"
//       case "away":
//         return "bg-yellow-500"
//       case "busy":
//         return "bg-red-500"
//       default:
//         return "bg-gray-400"
//     }
//   }

//   const handleSendMessage = () => {
//     if (!newMessage.trim()) return
//     // Handle message sending logic here
//     setNewMessage("")
//   }

//   return (
//     <div className="h-screen bg-gray-50 flex flex-col">
//       <SocialNavigation />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Server Sidebar */}
//         <div className="w-60 bg-gray-800 text-white flex flex-col">
//           {/* Server Header */}
//           <div className="p-4 border-b border-gray-700">
//             <h2 className="font-bold text-lg truncate">Ocean Cleanup Initiative</h2>
//             <p className="text-sm text-gray-300">12,847 members</p>
//           </div>

//           {/* Channels */}
//           <ScrollArea className="flex-1 p-2">
//             <div className="space-y-1">
//               <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-1">Text Channels</div>
//               {channels
//                 .filter((c) => c.type === "text")
//                 .map((channel) => (
//                   <button
//                     key={channel.id}
//                     onClick={() => setSelectedChannel(channel.id)}
//                     className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left hover:bg-gray-700 ${
//                       selectedChannel === channel.id ? "bg-gray-700 text-white" : "text-gray-300"
//                     }`}
//                   >
//                     <Hash className="h-4 w-4" />
//                     <span className="truncate">{channel.name}</span>
//                     {channel.isPrivate && <Star className="h-3 w-3 text-yellow-500" />}
//                   </button>
//                 ))}

//               <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-2 py-1 mt-4">
//                 Voice Channels
//               </div>
//               {channels
//                 .filter((c) => c.type === "voice")
//                 .map((channel) => (
//                   <button
//                     key={channel.id}
//                     onClick={() => setSelectedChannel(channel.id)}
//                     className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left hover:bg-gray-700 ${
//                       selectedChannel === channel.id ? "bg-gray-700 text-white" : "text-gray-300"
//                     }`}
//                   >
//                     <Volume2 className="h-4 w-4" />
//                     <span className="truncate">{channel.name}</span>
//                     {channel.memberCount! > 0 && (
//                       <Badge variant="secondary" className="text-xs">
//                         {channel.memberCount}
//                       </Badge>
//                     )}
//                     {channel.isPrivate && <Star className="h-3 w-3 text-yellow-500" />}
//                   </button>
//                 ))}
//             </div>
//           </ScrollArea>

//           {/* User Panel */}
//           <div className="p-3 bg-gray-900 border-t border-gray-700">
//             <div className="flex items-center gap-2">
//               <div className="relative">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="/placeholder.svg" />
//                   <AvatarFallback>You</AvatarFallback>
//                 </Avatar>
//                 <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-900" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-sm font-medium truncate">Your Name</div>
//                 <div className="text-xs text-gray-400">#1234</div>
//               </div>
//               <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
//                 <Settings className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Channel Header */}
//           <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
//             <div className="flex items-center gap-2">
//               {isVoiceChannel ? (
//                 <Volume2 className="h-5 w-5 text-gray-600" />
//               ) : (
//                 <Hash className="h-5 w-5 text-gray-600" />
//               )}
//               <span className="font-semibold">{currentChannel?.name}</span>
//               {currentChannel?.description && (
//                 <>
//                   <Separator orientation="vertical" className="h-4" />
//                   <span className="text-sm text-gray-600">{currentChannel.description}</span>
//                 </>
//               )}
//             </div>

//             <div className="flex items-center gap-2">
//               <Button variant="ghost" size="sm">
//                 <Users className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="sm">
//                 <Settings className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="flex-1 flex">
//             {/* Messages/Voice Area */}
//             <div className="flex-1 flex flex-col">
//               {isVoiceChannel ? (
//                 /* Voice Channel UI */
//                 <div className="flex-1 p-6 bg-gray-100">
//                   <div className="text-center mb-8">
//                     <Volume2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-xl font-semibold mb-2">{currentChannel?.name}</h3>
//                     <p className="text-gray-600">Join the voice channel to start talking</p>
//                   </div>

//                   {/* Voice participants */}
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {members
//                       .filter((m) => m.isInVoice)
//                       .map((member) => (
//                         <Card key={member.id} className="p-4 text-center">
//                           <div className="relative mb-3">
//                             <Avatar className="h-16 w-16 mx-auto">
//                               <AvatarImage src={member.avatar || "/placeholder.svg"} />
//                               <AvatarFallback>{member.displayName[0]}</AvatarFallback>
//                             </Avatar>
//                             <div
//                               className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
//                             />
//                           </div>
//                           <div className="font-medium text-sm mb-1">{member.displayName}</div>
//                           <div className="flex justify-center gap-1">
//                             {member.isMuted && <MicOff className="h-3 w-3 text-red-500" />}
//                             {member.isDeafened && <HeadphonesIcon className="h-3 w-3 text-gray-500" />}
//                             {getRoleIcon(member.role)}
//                           </div>
//                         </Card>
//                       ))}
//                   </div>

//                   {/* Voice controls */}
//                   <div className="fixed bottom-20 lg:bottom-6 left-1/2 transform -translate-x-1/2">
//                     <div className="flex items-center gap-2 bg-white rounded-full p-2 shadow-lg">
//                       <Button size="sm" variant="outline" className="rounded-full bg-transparent">
//                         <Mic className="h-4 w-4" />
//                       </Button>
//                       <Button size="sm" variant="outline" className="rounded-full bg-transparent">
//                         <Headphones className="h-4 w-4" />
//                       </Button>
//                       <Button size="sm" variant="destructive" className="rounded-full">
//                         Disconnect
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* Text Channel UI */
//                 <>
//                   {/* Messages */}
//                   <ScrollArea className="flex-1 p-4">
//                     <div className="space-y-4">
//                       {messages.map((message) => (
//                         <div key={message.id} className="flex gap-3 hover:bg-gray-50 p-2 rounded">
//                           <Avatar className="h-10 w-10">
//                             <AvatarImage src={message.author.avatar || "/placeholder.svg"} />
//                             <AvatarFallback>{message.author.displayName[0]}</AvatarFallback>
//                           </Avatar>

//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-semibold">{message.author.displayName}</span>
//                               {getRoleIcon(message.author.role)}
//                               <span className="text-xs text-gray-500">{message.timestamp}</span>
//                             </div>

//                             <div
//                               className={`${message.isCommand ? "bg-blue-50 border-l-4 border-blue-500 pl-3 py-1" : ""}`}
//                             >
//                               <p className={message.isCommand ? "font-mono text-sm" : ""}>{message.content}</p>
//                             </div>

//                             {message.reactions && (
//                               <div className="flex gap-1 mt-2">
//                                 {message.reactions.map((reaction, index) => (
//                                   <Button
//                                     key={index}
//                                     variant="outline"
//                                     size="sm"
//                                     className="h-6 px-2 text-xs bg-transparent"
//                                   >
//                                     {reaction.emoji} {reaction.count}
//                                   </Button>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </ScrollArea>

//                   {/* Message Input */}
//                   <div className="p-4 bg-white border-t border-gray-200">
//                     <div className="flex gap-2">
//                       <div className="flex-1 relative">
//                         <Input
//                           placeholder={`Message #${currentChannel?.name}`}
//                           value={newMessage}
//                           onChange={(e) => setNewMessage(e.target.value)}
//                           onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                           className="pr-20"
//                         />
//                         <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
//                           <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
//                             <Paperclip className="h-4 w-4" />
//                           </Button>
//                           <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
//                             <Smile className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </div>
//                       <Button onClick={handleSendMessage} className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
//                         <Send className="h-4 w-4" />
//                       </Button>
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1">
//                       Use /fund [amount] to donate, /join to join campaign, /help for commands
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Members Sidebar */}
//             {showMembers && (
//               <div className="w-60 bg-gray-50 border-l border-gray-200">
//                 <div className="p-3 border-b border-gray-200">
//                   <h3 className="font-semibold text-sm">Members — {members.length}</h3>
//                 </div>

//                 <ScrollArea className="flex-1">
//                   <div className="p-2">
//                     {/* Group by role */}
//                     {["admin", "moderator", "donor", "member"].map((role) => {
//                       const roleMembers = members.filter((m) => m.role === role)
//                       if (roleMembers.length === 0) return null

//                       return (
//                         <div key={role} className="mb-4">
//                           <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1 flex items-center gap-1">
//                             {getRoleIcon(role)}
//                             {role}s — {roleMembers.length}
//                           </div>
//                           <div className="space-y-1">
//                             {roleMembers.map((member) => (
//                               <div
//                                 key={member.id}
//                                 className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
//                               >
//                                 <div className="relative">
//                                   <Avatar className="h-8 w-8">
//                                     <AvatarImage src={member.avatar || "/placeholder.svg"} />
//                                     <AvatarFallback>{member.displayName[0]}</AvatarFallback>
//                                   </Avatar>
//                                   <div
//                                     className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}
//                                   />
//                                 </div>
//                                 <div className="flex-1 min-w-0">
//                                   <div className="text-sm font-medium truncate">{member.displayName}</div>
//                                   {member.isInVoice && (
//                                     <div className="text-xs text-green-600 flex items-center gap-1">
//                                       <Volume2 className="h-3 w-3" />
//                                       In voice
//                                     </div>
//                                   )}
//                                 </div>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
//                                 >
//                                   <MoreVertical className="h-3 w-3" />
//                                 </Button>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )
//                     })}
//                   </div>
//                 </ScrollArea>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <MobileBottomNav className="lg:hidden" />
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  Plus,
  Search,
  Bell,
  Pin,
  UserPlus,
  MessageSquare,
  Phone,
  Video,
} from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"
import { useMatrix } from "@/hooks/useMatrix" // Assuming this is where your hook is

interface MatrixRoom {
  // Define the structure based on your Matrix room type
  roomId: string
  name?: string
  topic?: string
  avatar?: string
  // Add other properties as needed
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

const mockMembers: Member[] = [
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
]

const mockMessages: Message[] = [
  {
    id: "1",
    author: mockMembers[0],
    content: "🌊 Great news everyone! We've successfully removed another 500kg of plastic from the Pacific this week. Our total is now at 15,000kg! Thank you all for your continued support.",
    timestamp: "10:30 AM",
    reactions: [
      { emoji: "🎉", count: 12, users: ["user1", "user2"] },
      { emoji: "🌊", count: 8, users: ["user3", "user4"] },
    ],
  },
  {
    id: "2",
    author: mockMembers[1],
    content: "That's incredible progress! The before/after photos from last week's cleanup were amazing to see.",
    timestamp: "10:32 AM",
    reactions: [{ emoji: "👏", count: 5, users: ["user1"] }],
  },
]

export default function ServerPage({ params }: { params: { serverId: string } }) {

  const { getRoomsInSpace, isConnected} = useMatrix()
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showMembers, setShowMembers] = useState(true)
  const [rooms, setRooms] = useState<MatrixRoom[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true)
        console.log("Fetching rooms for server ID:", params.serverId)
        if (!isConnected) {
          console.error("Matrix client is not connected")
          return
        }
        
        
        const spaceRooms = getRoomsInSpace(params.serverId)
        setRooms(spaceRooms)
        
        // Log room properties for debugging
        console.log("Server ID:", params.serverId)
        console.log("Total rooms found:", spaceRooms.length)
        console.log("Rooms in space:", spaceRooms)
        
        spaceRooms.forEach((room, index) => {
          console.log(`\n--- Room ${index + 1} ---`)
          console.log("Room object:", room)
          console.log("Room properties:", Object.keys(room))
          console.log("Room ID:", room.roomId)
          console.log("Room name:", room.name)
          console.log("Room topic:", room.topic)
          
          // Log any other properties that might exist
          Object.entries(room).forEach(([key, value]) => {
            console.log(`${key}:`, value)
          })
        })
        
        // Select first room by default
        if (spaceRooms.length > 0) {
          setSelectedRoom(spaceRooms[0].roomId)
          console.log("Selected room:", spaceRooms[0].roomId)
        }
      } catch (error) {
        console.error("Error fetching rooms for server:", params.serverId, error)
      } finally {
        setLoading(false)
      }
    }

    if (params.serverId) {
      fetchRooms()
    }
  }, [params.serverId, getRoomsInSpace,isConnected])

  const currentRoom = rooms.find(room => room.roomId === selectedRoom)
  const isVoiceChannel = currentRoom?.name?.toLowerCase().includes('voice') || false

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
    if (!newMessage.trim() || !selectedRoom) return
    console.log("Sending message to room:", selectedRoom, "Message:", newMessage)
    setNewMessage("")
  }

  const textRooms = rooms.filter(room => !room.name?.toLowerCase().includes('voice'))
  const voiceRooms = rooms.filter(room => room.name?.toLowerCase().includes('voice'))

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading server {params.serverId}...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <SocialNavigation />

      <div className="flex flex-1 overflow-hidden">
        {/* Server Sidebar */}
        <div className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
          {/* Server Header */}
          <div className="p-4 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg truncate">Server: {params.serverId}</h2>
                <p className="text-sm text-gray-300">{rooms.length} rooms</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Channels */}
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-4">
              {/* Text Channels */}
              {textRooms.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Text Channels</h3>
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-white">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  {textRooms.map((room) => (
                    <button
                      key={room.roomId}
                      onClick={() => setSelectedRoom(room.roomId)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        selectedRoom === room.roomId
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <Hash className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-medium">{room.name || "Unnamed Room"}</div>
                        {room.topic && (
                          <div className="text-xs text-gray-400 truncate">{room.topic}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Voice Channels */}
              {voiceRooms.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Voice Channels</h3>
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-white">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  {voiceRooms.map((room) => (
                    <button
                      key={room.roomId}
                      onClick={() => setSelectedRoom(room.roomId)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        selectedRoom === room.roomId
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <Volume2 className="h-4 w-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-medium">{room.name || "Unnamed Voice Room"}</div>
                        {room.topic && (
                          <div className="text-xs text-gray-400 truncate">{room.topic}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {rooms.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">No rooms found in this space</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* User Panel */}
          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-gray-800" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">Your Name</div>
                <div className="text-xs text-gray-400">#1234</div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                  <Headphones className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Channel Header */}
          <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-3">
              {isVoiceChannel ? (
                <Volume2 className="h-6 w-6 text-gray-600" />
              ) : (
                <Hash className="h-6 w-6 text-gray-600" />
              )}
              <div>
                <h1 className="font-bold text-lg">{currentRoom?.name || "Select a Room"}</h1>
                {currentRoom?.topic && (
                  <p className="text-sm text-gray-600">{currentRoom.topic}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Pin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Users className="h-4 w-4" />
              </Button>
              <div className="relative">
                <Input
                  placeholder="Search"
                  className="w-48 h-8 bg-gray-100 border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            {/* Messages/Voice Area */}
            <div className="flex-1 flex flex-col">
              {!currentRoom ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-gray-600">Welcome to Server</h3>
                    <p className="text-gray-500">Select a room from the sidebar to start chatting</p>
                    <p className="text-xs text-gray-400 mt-2">Server ID: {params.serverId}</p>
                  </div>
                </div>
              ) : isVoiceChannel ? (
                /* Voice Channel UI */
                <div className="flex-1 p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="text-center mb-12">
                    <div className="bg-white rounded-full p-6 inline-block shadow-lg mb-6">
                      <Volume2 className="h-20 w-20 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{currentRoom.name}</h3>
                    <p className="text-gray-600 mb-6">Join the voice channel to start talking</p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                      Join Voice Channel
                    </Button>
                  </div>

                  {/* Voice participants */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {mockMembers
                      .filter((m) => m.isInVoice)
                      .map((member) => (
                        <Card key={member.id} className="p-6 text-center bg-white shadow-md hover:shadow-lg transition-shadow">
                          <div className="relative mb-4">
                            <Avatar className="h-20 w-20 mx-auto">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-lg">{member.displayName[0]}</AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-2 -right-2 h-6 w-6 rounded-full border-3 border-white ${getStatusColor(member.status)}`} />
                          </div>
                          <div className="font-semibold text-gray-800 mb-2">{member.displayName}</div>
                          <div className="flex justify-center gap-2">
                            {member.isMuted && <MicOff className="h-4 w-4 text-red-500" />}
                            {member.isDeafened && <HeadphonesIcon className="h-4 w-4 text-gray-500" />}
                            {getRoleIcon(member.role)}
                          </div>
                        </Card>
                      ))}
                  </div>
                </div>
              ) : (
                /* Text Channel UI */
                <>
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6 max-w-4xl">
                      {mockMessages.map((message) => (
                        <div key={message.id} className="flex gap-4 group hover:bg-gray-50 p-4 rounded-lg transition-colors">
                          <Avatar className="h-12 w-12 flex-shrink-0">
                            <AvatarImage src={message.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{message.author.displayName[0]}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-bold text-gray-800">{message.author.displayName}</span>
                              {getRoleIcon(message.author.role)}
                              <span className="text-sm text-gray-500">{message.timestamp}</span>
                            </div>

                            <div className={`${message.isCommand ? "bg-blue-50 border border-blue-200 rounded-lg p-3" : ""}`}>
                              <p className={`text-gray-700 leading-relaxed ${message.isCommand ? "font-mono text-sm" : ""}`}>
                                {message.content}
                              </p>
                            </div>

                            {message.reactions && (
                              <div className="flex gap-2 mt-3">
                                {message.reactions.map((reaction, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-3 text-sm bg-gray-50 hover:bg-gray-100 border-gray-200"
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
                  <div className="p-6 bg-white border-t border-gray-200">
                    <div className="flex gap-3 max-w-4xl">
                      <div className="flex-1 relative">
                        <Input
                          placeholder={`Message ${currentRoom?.name || "this room"}`}
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="h-12 pl-4 pr-24 bg-gray-50 border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                            <Paperclip className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                            <Smile className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button 
                        onClick={handleSendMessage} 
                        className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Members Sidebar */}
            {showMembers && currentRoom && (
              <div className="w-72 bg-white border-l border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-800">Members</h3>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Search members"
                      className="h-8 bg-gray-50 border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500"
                    />
                    <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  {["admin", "moderator", "donor", "member"].map((role) => {
                    const roleMembers = mockMembers.filter((m) => m.role === role)
                    if (roleMembers.length === 0) return null

                    return (
                      <div key={role} className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          {getRoleIcon(role)}
                          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                            {role}s — {roleMembers.length}
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {roleMembers.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                            >
                              <div className="relative">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{member.displayName[0]}</AvatarFallback>
                                </Avatar>
                                <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-800 truncate">{member.displayName}</div>
                                <div className="text-sm text-gray-500">@{member.username}</div>
                                {member.isInVoice && (
                                  <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                    <Volume2 className="h-3 w-3" />
                                    In voice channel
                                  </div>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
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