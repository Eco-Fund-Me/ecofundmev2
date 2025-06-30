"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, TrendingUp, Star, MessageCircle, Calendar, Target, Crown, Plus } from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { SocialSidebar } from "@/components/social/SocialSidebar"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"
import Link from "next/link"

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
  tags: string[]
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
  memberGrowth: number // percentage
}

const featuredServers: CampaignServer[] = [
  {
    id: "ocean-cleanup",
    name: "Ocean Cleanup Initiative",
    description:
      "Join our global mission to remove plastic waste from oceans. Share updates, connect with volunteers, and track our progress in real-time.",
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
    tags: ["OceanCleanup", "PlasticFree", "MarineLife", "Volunteers"],
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
  },
  {
    id: "solar-schools",
    name: "Solar Power for Schools",
    description:
      "Bringing renewable energy to educational institutions. Discuss installations, share success stories, and plan new projects.",
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
    tags: ["Solar", "Education", "RenewableEnergy", "Schools"],
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
  },
  {
    id: "urban-gardens",
    name: "Urban Gardening Network",
    description:
      "Transform cities with green spaces. Share gardening tips, organize community plots, and grow together.",
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
    tags: ["UrbanGardening", "Community", "GreenSpaces", "Sustainability"],
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
  },
]

const trendingServers: CampaignServer[] = [
  {
    id: "wildlife-conservation",
    name: "Wildlife Conservation Alliance",
    description:
      "Protecting endangered species and their habitats. Join conservation efforts and wildlife protection initiatives.",
    avatar: "/wildlife-conservation-mosaic.png",
    category: "Wildlife",
    members: 4567,
    onlineMembers: 189,
    totalMessages: 12345,
    goalAmount: 200000,
    raisedAmount: 123000,
    isVerified: true,
    isTrending: true,
    isFeatured: false,
    tags: ["Wildlife", "Conservation", "EndangeredSpecies", "Habitat"],
    creator: {
      name: "Wildlife Guardian",
      username: "wildlifeguardian",
      avatar: "/placeholder.svg",
      verified: true,
    },
    lastActivity: "30 minutes ago",
    channels: {
      text: 4,
      voice: 2,
    },
    memberGrowth: 22.5,
  },
  {
    id: "reforestation",
    name: "Global Reforestation Project",
    description:
      "Plant trees, restore forests, combat climate change. Every tree counts in our mission to green the planet.",
    avatar: "/reforestation-effort.png",
    category: "Forestry",
    members: 3456,
    onlineMembers: 145,
    totalMessages: 8765,
    goalAmount: 100000,
    raisedAmount: 67000,
    isVerified: false,
    isTrending: true,
    isFeatured: false,
    tags: ["Reforestation", "TreePlanting", "ClimateAction", "Forests"],
    creator: {
      name: "Forest Revival Initiative",
      username: "forestrevival",
      avatar: "/placeholder.svg",
      verified: false,
    },
    lastActivity: "45 minutes ago",
    channels: {
      text: 3,
      voice: 1,
    },
    memberGrowth: 18.9,
  },
]

const allServers = [...featuredServers, ...trendingServers]

export default function ServersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("featured")

  const categories = ["all", "Environment", "Energy", "Gardening", "Wildlife", "Forestry", "Climate"]

  const filterServers = (servers: CampaignServer[]) => {
    return servers.filter((server) => {
      const matchesSearch =
        server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        server.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || server.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }

  const ServerCard = ({ server }: { server: CampaignServer }) => (
    <Card className="hover:shadow-lg transition-all duration-200 overflow-hidden">
      {server.banner && (
        <div className="h-32 bg-gradient-to-r from-blue-500 to-green-500 relative overflow-hidden">
          <img src={server.banner || "/placeholder.svg"} alt={server.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-2 right-2 flex gap-2">
            {server.isFeatured && (
              <Badge className="bg-yellow-500 text-black">
                <Crown className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {server.isTrending && (
              <Badge className="bg-red-500 text-white">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-12 w-12 border-2 border-white -mt-6 relative z-10">
            <AvatarImage src={server.avatar || "/placeholder.svg"} />
            <AvatarFallback>{server.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg truncate">{server.name}</h3>
              {server.isVerified && <Star className="h-4 w-4 text-blue-500" />}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{server.category}</Badge>
              <span className="text-sm text-gray-600">by {server.creator.name}</span>
              {server.creator.verified && <Star className="h-3 w-3 text-blue-500" />}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{server.description}</p>

        {/* Campaign Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Campaign Progress</span>
            <span className="text-sm text-gray-600">
              ${server.raisedAmount.toLocaleString()} / ${server.goalAmount.toLocaleString()}
            </span>
          </div>
          <Progress value={(server.raisedAmount / server.goalAmount) * 100} className="h-2" />
          <div className="text-xs text-gray-500 mt-1">
            {((server.raisedAmount / server.goalAmount) * 100).toFixed(1)}% funded
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
          <div>
            <div className="font-semibold text-sm">{server.members.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Members</div>
          </div>
          <div>
            <div className="font-semibold text-sm text-green-600">{server.onlineMembers}</div>
            <div className="text-xs text-gray-600">Online</div>
          </div>
          <div>
            <div className="font-semibold text-sm text-blue-600">{server.channels.text + server.channels.voice}</div>
            <div className="text-xs text-gray-600">Channels</div>
          </div>
        </div>

        {/* Activity */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            {server.totalMessages.toLocaleString()} messages
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {server.lastActivity}
          </div>
        </div>

        {/* Growth indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-green-600 font-medium">+{server.memberGrowth}%</span>
            <span className="text-gray-600">this month</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {server.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
          {server.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{server.tags.length - 3} more
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link href={`/social/servers/${server.id}`} className="flex-1">
            <Button className="w-full bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">Join Server</Button>
          </Link>
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <SocialNavigation />

      <div className="flex">
        <SocialSidebar className="hidden lg:block" />

        <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Campaign Servers</h1>
            <p className="text-gray-600">Join communities around environmental campaigns and causes</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search servers, campaigns, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-[#00EE7D] text-black" : ""}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </div>

          {/* Create Server Button */}
          <div className="mb-6">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign Server
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="featured" className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                Featured ({filterServers(featuredServers).length})
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending ({filterServers(trendingServers).length})
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                All Servers ({filterServers(allServers).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterServers(featuredServers).map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterServers(trendingServers).map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterServers(allServers).map((server) => (
                  <ServerCard key={server.id} server={server} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
