// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"
// import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Users, Search, TrendingUp, Star, MessageCircle, Target, Crown, Plus, MapPin } from "lucide-react"
// import { SocialNavigation } from "@/components/social/SocialNavigation"
// import { MobileBottomNav } from "@/components/social/MobileBottomNav"
// import Link from "next/link"
// import { CreateSpaceModal } from "@/components/social/modals/CreateSpaceModal"

// interface CampaignServer {
//   id: string
//   name: string
//   description: string
//   avatar: string
//   banner?: string
//   category: string
//   members: number
//   onlineMembers: number
//   totalMessages: number
//   goalAmount: number
//   raisedAmount: number
//   isVerified: boolean
//   isTrending: boolean
//   isFeatured: boolean
//   location?: string
//   creator: {
//     name: string
//     username: string
//     avatar: string
//     verified: boolean
//   }
//   lastActivity: string
//   channels: {
//     text: number
//     voice: number
//   }
//   memberGrowth: number
// }

// const featuredServers: CampaignServer[] = [
//   {
//     id: "ocean-cleanup",
//     name: "Ocean Cleanup Initiative",
//     description:
//       "Join our global mission to remove plastic waste from oceans. Share updates, connect with volunteers, and track our progress in real-time.",
//     avatar: "/ocean-cleanup.png",
//     banner: "/ocean-cleanup-effort.png",
//     category: "Environment",
//     members: 12847,
//     onlineMembers: 1234,
//     totalMessages: 45678,
//     goalAmount: 500000,
//     raisedAmount: 387500,
//     isVerified: true,
//     isTrending: true,
//     isFeatured: true,
//     location: "Pacific Ocean",
//     creator: {
//       name: "Dr. Marina Ocean",
//       username: "oceanmaster",
//       avatar: "/placeholder.svg",
//       verified: true,
//     },
//     lastActivity: "2 minutes ago",
//     channels: {
//       text: 8,
//       voice: 3,
//     },
//     memberGrowth: 15.3,
//   },
//   {
//     id: "solar-schools",
//     name: "Solar Power for Schools",
//     description:
//       "Bringing renewable energy to educational institutions. Discuss installations, share success stories, and plan new projects.",
//     avatar: "/solar-panels-school.png",
//     banner: "/solar-energy-learning.png",
//     category: "Energy",
//     members: 8934,
//     onlineMembers: 567,
//     totalMessages: 23456,
//     goalAmount: 300000,
//     raisedAmount: 245000,
//     isVerified: true,
//     isTrending: false,
//     isFeatured: true,
//     location: "California, USA",
//     creator: {
//       name: "Solar Solutions Team",
//       username: "solarsolutions",
//       avatar: "/placeholder.svg",
//       verified: true,
//     },
//     lastActivity: "5 minutes ago",
//     channels: {
//       text: 6,
//       voice: 2,
//     },
//     memberGrowth: 8.7,
//   },
//   {
//     id: "urban-gardens",
//     name: "Urban Gardening Network",
//     description:
//       "Transform cities with green spaces. Share gardening tips, organize community plots, and grow together.",
//     avatar: "/sustainable-garden.png",
//     banner: "/garden-plot.png",
//     category: "Gardening",
//     members: 6789,
//     onlineMembers: 234,
//     totalMessages: 18934,
//     goalAmount: 150000,
//     raisedAmount: 89000,
//     isVerified: false,
//     isTrending: true,
//     isFeatured: true,
//     location: "San Francisco, CA",
//     creator: {
//       name: "Green Thumb Collective",
//       username: "greenthumb",
//       avatar: "/placeholder.svg",
//       verified: false,
//     },
//     lastActivity: "1 hour ago",
//     channels: {
//       text: 5,
//       voice: 1,
//     },
//     memberGrowth: 12.1,
//   },
// ]

// const trendingServers: CampaignServer[] = [
//   {
//     id: "wildlife-conservation",
//     name: "Wildlife Conservation Alliance",
//     description:
//       "Protecting endangered species and their habitats. Join conservation efforts and wildlife protection initiatives.",
//     avatar: "/wildlife-conservation-mosaic.png",
//     category: "Wildlife",
//     members: 4567,
//     onlineMembers: 189,
//     totalMessages: 12345,
//     goalAmount: 200000,
//     raisedAmount: 123000,
//     isVerified: true,
//     isTrending: true,
//     isFeatured: false,
//     location: "Amazon Rainforest",
//     creator: {
//       name: "Wildlife Guardian",
//       username: "wildlifeguardian",
//       avatar: "/placeholder.svg",
//       verified: true,
//     },
//     lastActivity: "30 minutes ago",
//     channels: {
//       text: 4,
//       voice: 2,
//     },
//     memberGrowth: 22.5,
//   },
//   {
//     id: "reforestation",
//     name: "Global Reforestation Project",
//     description:
//       "Plant trees, restore forests, combat climate change. Every tree counts in our mission to green the planet.",
//     avatar: "/reforestation-effort.png",
//     category: "Forestry",
//     members: 3456,
//     onlineMembers: 145,
//     totalMessages: 8765,
//     goalAmount: 100000,
//     raisedAmount: 67000,
//     isVerified: false,
//     isTrending: true,
//     isFeatured: false,
//     location: "Global",
//     creator: {
//       name: "Forest Revival Initiative",
//       username: "forestrevival",
//       avatar: "/placeholder.svg",
//       verified: false,
//     },
//     lastActivity: "45 minutes ago",
//     channels: {
//       text: 3,
//       voice: 1,
//     },
//     memberGrowth: 18.9,
//   },
// ]

// const allServers = [...featuredServers, ...trendingServers]

// export default function ServersPage() {

//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [activeTab, setActiveTab] = useState("featured")
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const isVerifiedBusiness = true;
//   const categories = ["all", "Environment", "Energy", "Gardening", "Wildlife", "Forestry", "Climate"]

//   const filterServers = (servers: CampaignServer[]) => {
//     return servers.filter((server) => {
//       const matchesSearch =
//         server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         server.creator.name.toLowerCase().includes(searchQuery.toLowerCase())

//       const matchesCategory = selectedCategory === "all" || server.category === selectedCategory

//       return matchesSearch && matchesCategory
//     })
//   }


//   const ServerCard = ({ server }: { server: CampaignServer }) => (
//     <Card className="hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200">
//       {server.banner && (
//         <div className="h-32 bg-gradient-to-r from-blue-500 to-green-500 relative overflow-hidden">
//           <img src={server.banner || "/placeholder.svg"} alt={server.name} className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-black/20" />
//           <div className="absolute top-3 right-3 flex gap-2">
//             {server.isFeatured && (
//               <Badge className="bg-yellow-500 text-black font-medium">
//                 <Crown className="h-3 w-3 mr-1" />
//                 Featured
//               </Badge>
//             )}
//             {server.isTrending && (
//               <Badge className="bg-red-500 text-white font-medium">
//                 <TrendingUp className="h-3 w-3 mr-1" />
//                 Trending
//               </Badge>
//             )}
//           </div>
//         </div>
//       )}

//       <CardContent className="p-6">
//         <div className="flex items-start gap-4 mb-4">
//           <Avatar className="h-16 w-16 border-4 border-white -mt-8 relative z-10 shadow-lg">
//             <AvatarImage src={server.avatar || "/placeholder.svg"} />
//             <AvatarFallback className="text-lg font-semibold">{server.name[0]}</AvatarFallback>
//           </Avatar>

//           <div className="flex-1 min-w-0 mt-2">
//             <div className="flex items-center gap-2 mb-2">
//               <h3 className="font-bold text-lg truncate text-gray-900">{server.name}</h3>
//               {server.isVerified && <Star className="h-5 w-5 text-blue-500" />}
//             </div>

//             <div className="flex items-center gap-2 mb-2 flex-wrap">
//               <Badge variant="outline" className="border-[#00EE7D]/30 text-[#00EE7D] bg-[#00EE7D]/5">
//                 {server.category}
//               </Badge>
//               {server.location && (
//                 <div className="flex items-center gap-1 text-sm text-gray-500">
//                   <MapPin className="h-3 w-3" />
//                   {server.location}
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <span>by {server.creator.name}</span>
//               {server.creator.verified && <Star className="h-3 w-3 text-blue-500" />}
//             </div>
//           </div>
//         </div>

//         <p className="text-gray-700 mb-4 leading-relaxed">{server.description}</p>

//         {/* Campaign Progress */}
//         <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm font-medium text-gray-900">Campaign Progress</span>
//             <span className="text-sm font-semibold text-gray-900">
//               ${server.raisedAmount.toLocaleString()} / ${server.goalAmount.toLocaleString()}
//             </span>
//           </div>
//           <Progress value={(server.raisedAmount / server.goalAmount) * 100} className="h-2 mb-2" />
//           <div className="text-xs text-gray-600">
//             {((server.raisedAmount / server.goalAmount) * 100).toFixed(1)}% funded • {server.members.toLocaleString()}{" "}
//             supporters
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-white border border-gray-100 rounded-lg">
//           <div className="text-center">
//             <div className="font-bold text-lg text-gray-900">{server.members.toLocaleString()}</div>
//             <div className="text-xs text-gray-500">Members</div>
//           </div>
//           <div className="text-center">
//             <div className="font-bold text-lg text-green-600">{server.onlineMembers}</div>
//             <div className="text-xs text-gray-500">Online</div>
//           </div>
//           <div className="text-center">
//             <div className="font-bold text-lg text-blue-600">{server.channels.text + server.channels.voice}</div>
//             <div className="text-xs text-gray-500">Channels</div>
//           </div>
//         </div>

//         {/* Activity Info */}
//         <div className="flex items-center justify-between mb-4 text-sm">
//           <div className="flex items-center gap-1 text-gray-600">
//             <MessageCircle className="h-4 w-4" />
//             {server.totalMessages.toLocaleString()} messages
//           </div>
//           <div className="text-gray-500">Active {server.lastActivity}</div>
//         </div>

//         {/* Growth indicator */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-1 text-sm">
//             <TrendingUp className="h-4 w-4 text-green-600" />
//             <span className="text-green-600 font-semibold">+{server.memberGrowth}%</span>
//             <span className="text-gray-600">growth this month</span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3">
//           <Link href={`/social/servers/${server.id}`} className="flex-1">
//             <Button className="w-full bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 font-medium">Join Community</Button>
//           </Link>
//           <Button variant="outline" size="sm" className="px-3 bg-transparent">
//             <Target className="h-4 w-4" />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <SocialNavigation />

//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-3">Campaign Communities</h1>
//           <p className="text-gray-600 text-lg">Join communities around environmental campaigns and causes</p>
//         </div>

//         {/* Search and Filters */}
//         <div className="flex flex-col lg:flex-row gap-4 mb-6">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search communities..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-white border-gray-200"
//             />
//           </div>

//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {categories.map((category) => (
//               <Button
//                 key={category}
//                 variant={selectedCategory === category ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setSelectedCategory(category)}
//                 className={
//                   selectedCategory === category
//                     ? "bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 whitespace-nowrap"
//                     : "whitespace-nowrap"
//                 }
//               >
//                 {category === "all" ? "All Categories" : category}
//               </Button>
//             ))}
//           </div>
//         </div>

//         {/* Create Community Button */}
// <div className="p-6">
//       <div className="mb-6">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
//         >
//           <Plus className="h-4 w-4" />
//           <span>Create Community</span>
//         </button>
//       </div>

//       <CreateSpaceModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         isVerifiedBusiness={isVerifiedBusiness}
//       />
//     </div>

//         {/* Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
//           <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
//             <TabsTrigger
//               value="featured"
//               className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D] flex items-center gap-2"
//             >
//               <Crown className="h-4 w-4" />
//               Featured ({filterServers(featuredServers).length})
//             </TabsTrigger>
//             <TabsTrigger
//               value="trending"
//               className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D] flex items-center gap-2"
//             >
//               <TrendingUp className="h-4 w-4" />
//               Trending ({filterServers(trendingServers).length})
//             </TabsTrigger>
//             <TabsTrigger
//               value="all"
//               className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D] flex items-center gap-2"
//             >
//               <Users className="h-4 w-4" />
//               All ({filterServers(allServers).length})
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="featured">
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filterServers(featuredServers).map((server) => (
//                 <ServerCard key={server.id} server={server} />
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="trending">
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filterServers(trendingServers).map((server) => (
//                 <ServerCard key={server.id} server={server} />
//               ))}
//             </div>
//           </TabsContent>

//           <TabsContent value="all">
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filterServers(allServers).map((server) => (
//                 <ServerCard key={server.id} server={server} />
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>

//       <MobileBottomNav className="lg:hidden" />
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, TrendingUp, Star, MessageCircle, Target, Crown, Plus, MapPin, Building, Heart } from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"
// import Link from "next/link"
import { CreateSpaceModal } from "@/components/social/modals/CreateSpaceModal"
import { useMatrix } from "@/hooks/useMatrix" 
import JoinServerButton from "@/components/social/buttons/JoinServeButton"

interface CampaignServer {
  id: string
  name: string
  description: string
  avatar: string
  banner?: string
  category: string
  members: number
  onlineMembers: number
  totalMessages: number
  goalAmount: number
  raisedAmount: number
  isVerified: boolean
  isTrending: boolean
  isFeatured: boolean
  location?: string
  creator: {
    name: string
    username: string
    avatar: string
    verified: boolean
  }
  lastActivity: string
  channels: {
    text: number
    voice: number
  }
  memberGrowth: number
  type: 'campaign' | 'general'
}

// General communities dummy data
const generalCommunities: CampaignServer[] = [
  {
    id: "tech-enthusiasts",
    name: "Tech Enthusiasts Hub",
    description: "A community for technology lovers to discuss the latest trends, share projects, and network with like-minded individuals.",
    avatar: "/tech-hub.png",
    banner: "/tech-banner.png",
    category: "Technology",
    members: 15420,
    onlineMembers: 1876,
    totalMessages: 89432,
    goalAmount: 0,
    raisedAmount: 0,
    isVerified: true,
    isTrending: true,
    isFeatured: true,
    location: "Global",
    creator: {
      name: "TechMaster",
      username: "techmaster",
      avatar: "/placeholder.svg",
      verified: true,
    },
    lastActivity: "1 minute ago",
    channels: {
      text: 12,
      voice: 5,
    },
    memberGrowth: 8.5,
    type: 'general'
  },
  {
    id: "creative-writers",
    name: "Creative Writers Circle",
    description: "A supportive community for writers of all levels. Share your work, get feedback, and participate in writing challenges.",
    avatar: "/writers-circle.png",
    category: "Literature",
    members: 8934,
    onlineMembers: 456,
    totalMessages: 34567,
    goalAmount: 0,
    raisedAmount: 0,
    isVerified: false,
    isTrending: false,
    isFeatured: true,
    location: "Worldwide",
    creator: {
      name: "WordSmith",
      username: "wordsmith",
      avatar: "/placeholder.svg",
      verified: false,
    },
    lastActivity: "15 minutes ago",
    channels: {
      text: 8,
      voice: 2,
    },
    memberGrowth: 12.3,
    type: 'general'
  },
  {
    id: "fitness-motivation",
    name: "Fitness Motivation Station",
    description: "Get motivated, share your fitness journey, and connect with others who are committed to a healthy lifestyle.",
    avatar: "/fitness-station.png",
    category: "Health",
    members: 12567,
    onlineMembers: 789,
    totalMessages: 56789,
    goalAmount: 0,
    raisedAmount: 0,
    isVerified: true,
    isTrending: true,
    isFeatured: false,
    location: "Global",
    creator: {
      name: "FitGuru",
      username: "fitguru",
      avatar: "/placeholder.svg",
      verified: true,
    },
    lastActivity: "5 minutes ago",
    channels: {
      text: 10,
      voice: 4,
    },
    memberGrowth: 15.7,
    type: 'general'
  }
]

// Campaign communities dummy data (keeping your existing data)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const campaignCommunities: CampaignServer[] = [
  {
    id: "ocean-cleanup",
    name: "Ocean Cleanup Initiative",
    description: "Join our global mission to remove plastic waste from oceans. Share updates, connect with volunteers, and track our progress in real-time.",
    avatar: "/ocean-cleanup.png",
    banner: "/ocean-cleanup-effort.png",
    category: "Environment",
    members: 12847,
    onlineMembers: 1234,
    totalMessages: 45678,
    goalAmount: 500000,
    raisedAmount: 387500,
    isVerified: true,
    isTrending: true,
    isFeatured: true,
    location: "Pacific Ocean",
    creator: {
      name: "Dr. Marina Ocean",
      username: "oceanmaster",
      avatar: "/placeholder.svg",
      verified: true,
    },
    lastActivity: "2 minutes ago",
    channels: {
      text: 8,
      voice: 3,
    },
    memberGrowth: 15.3,
    type: 'campaign'
  },
  {
    id: "solar-schools",
    name: "Solar Power for Schools",
    description: "Bringing renewable energy to educational institutions. Discuss installations, share success stories, and plan new projects.",
    avatar: "/solar-panels-school.png",
    banner: "/solar-energy-learning.png",
    category: "Energy",
    members: 8934,
    onlineMembers: 567,
    totalMessages: 23456,
    goalAmount: 300000,
    raisedAmount: 245000,
    isVerified: true,
    isTrending: false,
    isFeatured: true,
    location: "California, USA",
    creator: {
      name: "Solar Solutions Team",
      username: "solarsolutions",
      avatar: "/placeholder.svg",
      verified: true,
    },
    lastActivity: "5 minutes ago",
    channels: {
      text: 6,
      voice: 2,
    },
    memberGrowth: 8.7,
    type: 'campaign'
  },
  {
    id: "urban-gardens",
    name: "Urban Gardening Network",
    description: "Transform cities with green spaces. Share gardening tips, organize community plots, and grow together.",
    avatar: "/sustainable-garden.png",
    banner: "/garden-plot.png",
    category: "Gardening",
    members: 6789,
    onlineMembers: 234,
    totalMessages: 18934,
    goalAmount: 150000,
    raisedAmount: 89000,
    isVerified: false,
    isTrending: true,
    isFeatured: true,
    location: "San Francisco, CA",
    creator: {
      name: "Green Thumb Collective",
      username: "greenthumb",
      avatar: "/placeholder.svg",
      verified: false,
    },
    lastActivity: "1 hour ago",
    channels: {
      text: 5,
      voice: 1,
    },
    memberGrowth: 12.1,
    type: 'campaign'
  },
]

export default function ServersPage() {
  const { getPublicCampaignSpaces } = useMatrix()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("featured")
  const [communityType, setCommunityType] = useState<'campaign' | 'general'>('campaign')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [liveCampaignSpaces, setLiveCampaignSpaces] = useState<CampaignServer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const isVerifiedBusiness = true

  const categories = ["all", "Environment", "Energy", "Gardening", "Wildlife", "Forestry", "Climate", "Technology", "Literature", "Health"]

  // Load live campaign spaces when component mounts or when switching to campaign tab
 useEffect(() => {
  if (communityType === 'campaign' && getPublicCampaignSpaces) {
    setIsLoading(true)

    getPublicCampaignSpaces()
      .then((spaces) => {
        console.log("✅ Raw spaces returned from Matrix:", spaces);

        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const transformedSpaces: CampaignServer[] = spaces.map((space: any) => ({
            id: space.id || space.roomId || space.room_id,
            name: space.name || space.displayName || 'Unnamed Campaign',
            description: space.topic || space.description || 'No description available',
            avatar: space.avatar || '/placeholder.svg',
            banner: space.banner || space.avatar,
            category: space.category || 'Campaign',
            members: space.memberCount || space.num_joined_members || 0,
            onlineMembers: space.onlineMembers || Math.floor((space.memberCount || 0) * 0.1),
            totalMessages: space.totalMessages || 0,
            goalAmount: space.goalAmount || 0,
            raisedAmount: space.raisedAmount || 0,
            isVerified: space.isVerified || false,
            isTrending: space.isTrending || false,
            isFeatured: space.isFeatured || false,
            location: space.location || 'Global',
            creator: {
              name: space.creator?.name || space.creator?.displayName || 'Unknown',
              username: space.creator?.username || space.creator?.id || 'unknown',
              avatar: space.creator?.avatar || '/placeholder.svg',
              verified: space.creator?.verified || false,
            },
            lastActivity: space.lastActivity || 'Recently',
            channels: {
              text: space.channels?.text || 1,
              voice: space.channels?.voice || 0,
            },
            memberGrowth: space.memberGrowth || 0,
            type: 'campaign'
          }))

          console.log("✅ Transformed campaign spaces for UI:", transformedSpaces);
          setLiveCampaignSpaces(transformedSpaces);

        } catch (transformErr) {
          console.error("❌ Error transforming campaign spaces:", transformErr);
          setLiveCampaignSpaces([]);
        }
      })
      .catch((error) => {
        console.error("❌ Failed to load campaign spaces:", error);
        setLiveCampaignSpaces([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
}, [communityType, getPublicCampaignSpaces])


  // Get current communities based on type
  const getCurrentCommunities = () => {
    if (communityType === 'campaign') {
      return liveCampaignSpaces
    }
    return generalCommunities
  }

  const filterServers = (servers: CampaignServer[]) => {
    return servers.filter((server) => {
      const matchesSearch =
        server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.creator.name.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || server.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }

  const currentCommunities = getCurrentCommunities()
  const featuredServers = currentCommunities.filter(server => server.isFeatured)
  const trendingServers = currentCommunities.filter(server => server.isTrending)
  const allServers = currentCommunities

  const ServerCard = ({ server }: { server: CampaignServer }) => (
    <Card className="hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200">
      {server.banner && (
        <div className="h-32 bg-gradient-to-r from-blue-500 to-green-500 relative overflow-hidden">
          <img src={server.banner || "/placeholder.svg"} alt={server.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-3 right-3 flex gap-2">
            {server.isFeatured && (
              <Badge className="bg-yellow-500 text-black font-medium">
                <Crown className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {server.isTrending && (
              <Badge className="bg-red-500 text-white font-medium">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
            {server.type === 'campaign' && (
              <Badge className="bg-green-500 text-white font-medium">
                <Target className="h-3 w-3 mr-1" />
                Campaign
              </Badge>
            )}
          </div>
        </div>
      )}

      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16 border-4 border-white -mt-8 relative z-10 shadow-lg">
            <AvatarImage src={server.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-lg font-semibold">{server.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg truncate text-gray-900">{server.name}</h3>
              {server.isVerified && <Star className="h-5 w-5 text-blue-500" />}
              {server.type === 'general' && <Building className="h-4 w-4 text-gray-500" />}
              {server.type === 'campaign' && <Heart className="h-4 w-4 text-green-500" />}
            </div>

            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className="border-[#00EE7D]/30 text-[#00EE7D] bg-[#00EE7D]/5">
                {server.category}
              </Badge>
              {server.location && (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {server.location}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>by {server.creator.name}</span>
              {server.creator.verified && <Star className="h-3 w-3 text-blue-500" />}
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4 leading-relaxed">{server.description}</p>

        {/* Campaign Progress - Only show for campaign communities */}
        {server.type === 'campaign' && server.goalAmount > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Campaign Progress</span>
              <span className="text-sm font-semibold text-gray-900">
                ${server.raisedAmount.toLocaleString()} / ${server.goalAmount.toLocaleString()}
              </span>
            </div>
            <Progress value={(server.raisedAmount / server.goalAmount) * 100} className="h-2 mb-2" />
            <div className="text-xs text-gray-600">
              {((server.raisedAmount / server.goalAmount) * 100).toFixed(1)}% funded • {server.members.toLocaleString()}{" "}
              supporters
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-white border border-gray-100 rounded-lg">
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900">{server.members.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Members</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-green-600">{server.onlineMembers}</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-blue-600">{server.channels.text + server.channels.voice}</div>
            <div className="text-xs text-gray-500">Channels</div>
          </div>
        </div>

        {/* Activity Info */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <MessageCircle className="h-4 w-4" />
            {server.totalMessages.toLocaleString()} messages
          </div>
          <div className="text-gray-500">Active {server.lastActivity}</div>
        </div>

        {/* Growth indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600 font-semibold">+{server.memberGrowth}%</span>
            <span className="text-gray-600">growth this month</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* <Link href={`/social/servers/${server.id}`} className="flex-1">
            <Button className="w-full bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 font-medium">
              {server.type === 'campaign' ? 'Join Campaign' : 'Join Community'}
            </Button>
          </Link> */}
          <JoinServerButton server={server} />
          <Button variant="outline" size="sm" className="px-3 bg-transparent">
            <Target className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <SocialNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Communities</h1>
          <p className="text-gray-600 text-lg">
            {communityType === 'campaign' 
              ? 'Join communities around environmental campaigns and causes' 
              : 'Connect with like-minded people in various interest-based communities'}
          </p>
        </div>

        {/* Community Type Toggle */}
        <div className="mb-6">
          <div className="flex bg-white border border-gray-200 rounded-lg p-1 max-w-md">
            <button
              onClick={() => setCommunityType('campaign')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                communityType === 'campaign'
                  ? 'bg-[#00EE7D] text-black shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Heart className="h-4 w-4" />
              Campaign Communities
            </button>
            <button
              onClick={() => setCommunityType('general')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                communityType === 'general'
                  ? 'bg-[#00EE7D] text-black shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Building className="h-4 w-4" />
              General Communities
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 whitespace-nowrap"
                    : "whitespace-nowrap"
                }
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Create Community Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Create {communityType === 'campaign' ? 'Campaign' : 'Community'}</span>
          </button>
        </div>

        <CreateSpaceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isVerifiedBusiness={isVerifiedBusiness}
        />

        {/* Loading State */}
        {isLoading && communityType === 'campaign' && (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading campaign spaces...</div>
          </div>
        )}

        {/* Empty State for Campaign */}
        {communityType === 'campaign' && !isLoading && liveCampaignSpaces.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-500 mb-2">No campaign spaces found</div>
            <div className="text-sm text-gray-400">Check your Matrix connection or try again later</div>
          </div>
        )}

        {/* Tabs */}
        {((communityType === 'campaign' && !isLoading && liveCampaignSpaces.length > 0) || 
          (communityType === 'general')) && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
              <TabsTrigger
                value="featured"
                className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D] flex items-center gap-2"
              >
                <Crown className="h-4 w-4" />
                Featured ({filterServers(featuredServers).length})
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D] flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Trending ({filterServers(trendingServers).length})
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D] flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                All ({filterServers(allServers).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filterServers(featuredServers).map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filterServers(trendingServers).map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filterServers(allServers).map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}