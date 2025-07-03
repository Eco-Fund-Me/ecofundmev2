"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Radio, Users, Clock, Calendar, Search, Volume2, Mic, Star, Lock, MapPin } from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"
import Link from "next/link"

interface Space {
  id: string
  title: string
  description: string
  host: {
    name: string
    username: string
    avatar: string
    verified: boolean
    location?: string
  }
  status: "live" | "scheduled" | "ended"
  participants: number
  maxParticipants?: number
  startTime: string
  duration?: string
  category: string
  tags: string[]
  isPrivate: boolean
  requiresDonation?: boolean
  minDonation?: number
  campaignId?: string
  listeners: number
  speakers: number
}

const liveSpaces: Space[] = [
  {
    id: "1",
    title: "Ocean Cleanup Progress Update",
    description:
      "Join Dr. Marina as she shares the latest results from our Pacific cleanup mission and answers your questions about marine conservation.",
    host: {
      name: "Dr. Marina Ocean",
      username: "oceanmaster",
      avatar: "/placeholder.svg",
      verified: true,
      location: "Pacific Research Station",
    },
    status: "live",
    participants: 234,
    maxParticipants: 500,
    startTime: "Started 45 minutes ago",
    category: "Environment",
    tags: ["OceanCleanup", "MarineLife", "Conservation"],
    isPrivate: false,
    listeners: 230,
    speakers: 4,
  },
  {
    id: "2",
    title: "Solar Energy Q&A Session",
    description:
      "Ask our solar experts anything about renewable energy, installation costs, and government incentives.",
    host: {
      name: "Solar Solutions Team",
      username: "solarsolutions",
      avatar: "/solar-panels-school.png",
      verified: true,
      location: "California, USA",
    },
    status: "live",
    participants: 156,
    maxParticipants: 300,
    startTime: "Started 20 minutes ago",
    category: "Energy",
    tags: ["Solar", "RenewableEnergy", "QA"],
    isPrivate: false,
    listeners: 152,
    speakers: 4,
  },
  {
    id: "3",
    title: "Donors Only: Wildlife Conservation Strategy",
    description: "Exclusive discussion for campaign supporters about our upcoming wildlife protection initiatives.",
    host: {
      name: "Wildlife Guardian",
      username: "wildlifeguardian",
      avatar: "/wildlife-conservation-mosaic.png",
      verified: true,
      location: "Amazon Rainforest",
    },
    status: "live",
    participants: 45,
    maxParticipants: 100,
    startTime: "Started 1 hour ago",
    category: "Wildlife",
    tags: ["Wildlife", "Conservation", "Strategy"],
    isPrivate: true,
    requiresDonation: true,
    minDonation: 25,
    campaignId: "wildlife-protection",
    listeners: 42,
    speakers: 3,
  },
]

const scheduledSpaces: Space[] = [
  {
    id: "4",
    title: "Urban Gardening Workshop",
    description: "Learn how to start your own urban garden with limited space and budget. Perfect for beginners!",
    host: {
      name: "Green Thumb Collective",
      username: "greenthumb",
      avatar: "/sustainable-garden.png",
      verified: false,
      location: "San Francisco, CA",
    },
    status: "scheduled",
    participants: 0,
    maxParticipants: 200,
    startTime: "Today at 3:00 PM",
    duration: "1 hour",
    category: "Gardening",
    tags: ["UrbanGardening", "Sustainability", "Workshop"],
    isPrivate: false,
    listeners: 0,
    speakers: 0,
  },
  {
    id: "5",
    title: "Climate Action Town Hall",
    description: "Community discussion about local climate initiatives and how you can get involved in your area.",
    host: {
      name: "Climate Action Network",
      username: "climateaction",
      avatar: "/placeholder.svg",
      verified: true,
      location: "Global",
    },
    status: "scheduled",
    participants: 0,
    maxParticipants: 1000,
    startTime: "Tomorrow at 7:00 PM",
    duration: "2 hours",
    category: "Climate",
    tags: ["ClimateAction", "Community", "TownHall"],
    isPrivate: false,
    listeners: 0,
    speakers: 0,
  },
]

const endedSpaces: Space[] = [
  {
    id: "6",
    title: "Reforestation Success Stories",
    description: "Celebrating our tree planting milestones and sharing impact stories from around the world.",
    host: {
      name: "Forest Revival Initiative",
      username: "forestrevival",
      avatar: "/reforestation-effort.png",
      verified: true,
      location: "Global",
    },
    status: "ended",
    participants: 345,
    startTime: "Yesterday at 2:00 PM",
    duration: "1.5 hours",
    category: "Forestry",
    tags: ["Reforestation", "TreePlanting", "Impact"],
    isPrivate: false,
    listeners: 341,
    speakers: 4,
  },
]

export default function SpacesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("live")

  const categories = ["all", "Environment", "Energy", "Wildlife", "Gardening", "Climate", "Forestry"]

  const filterSpaces = (spaces: Space[]) => {
    return spaces.filter((space) => {
      const matchesSearch =
        space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || space.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }

  const SpaceCard = ({ space }: { space: Space }) => (
    <Card className="hover:shadow-lg transition-shadow border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={space.host.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-lg font-semibold">{space.host.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge
                className={
                  space.status === "live"
                    ? "bg-red-500 text-white animate-pulse font-medium"
                    : space.status === "scheduled"
                      ? "bg-blue-500 text-white font-medium"
                      : "bg-gray-500 text-white font-medium"
                }
              >
                {space.status === "live" && <Radio className="h-3 w-3 mr-1" />}
                {space.status === "scheduled" && <Calendar className="h-3 w-3 mr-1" />}
                {space.status === "ended" && <Clock className="h-3 w-3 mr-1" />}
                {space.status.toUpperCase()}
              </Badge>

              {space.isPrivate && (
                <Badge variant="outline" className="border-gray-300">
                  <Lock className="h-3 w-3 mr-1" />
                  Private
                </Badge>
              )}

              <Badge variant="outline" className="border-[#00EE7D]/30 text-[#00EE7D] bg-[#00EE7D]/5">
                {space.category}
              </Badge>
            </div>

            <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-2">{space.title}</h3>

            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 flex-wrap">
              <span className="font-medium">{space.host.name}</span>
              {space.host.verified && <Star className="h-3 w-3 text-blue-500" />}
              {space.host.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {space.host.location}
                  </div>
                </>
              )}
              <span>•</span>
              <span>{space.startTime}</span>
              {space.duration && (
                <>
                  <span>•</span>
                  <span>{space.duration}</span>
                </>
              )}
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed line-clamp-2">{space.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{space.participants}</span>
                  {space.maxParticipants && <span>/{space.maxParticipants}</span>}
                </div>

                {space.status === "live" && (
                  <>
                    <div className="flex items-center gap-1">
                      <Volume2 className="h-4 w-4" />
                      <span className="font-medium">{space.listeners}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mic className="h-4 w-4" />
                      <span className="font-medium">{space.speakers}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                {space.requiresDonation && (
                  <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700 bg-yellow-50">
                    Min ${space.minDonation}
                  </Badge>
                )}

                <Link href={`/social/spaces/${space.id}`}>
                  <Button size="sm" className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 font-medium">
                    {space.status === "live" ? "Join Now" : space.status === "scheduled" ? "Set Reminder" : "Listen"}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {space.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Live Audio Spaces</h1>
          <p className="text-gray-600 text-lg">Join live conversations about environmental topics and campaigns</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search spaces, topics, or hosts..."
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger
              value="live"
              className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D] flex items-center gap-2"
            >
              <Radio className="h-4 w-4" />
              Live ({filterSpaces(liveSpaces).length})
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D] flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Scheduled ({filterSpaces(scheduledSpaces).length})
            </TabsTrigger>
            <TabsTrigger
              value="ended"
              className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D] flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              Ended ({filterSpaces(endedSpaces).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-4">
            {filterSpaces(liveSpaces).length > 0 ? (
              filterSpaces(liveSpaces).map((space) => <SpaceCard key={space.id} space={space} />)
            ) : (
              <Card className="border border-gray-200">
                <CardContent className="p-12 text-center">
                  <Radio className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No live spaces found</h3>
                  <p className="text-gray-600">Try adjusting your search or check back later for new live spaces.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            {filterSpaces(scheduledSpaces).length > 0 ? (
              filterSpaces(scheduledSpaces).map((space) => <SpaceCard key={space.id} space={space} />)
            ) : (
              <Card className="border border-gray-200">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No scheduled spaces found</h3>
                  <p className="text-gray-600">Check back later for upcoming scheduled spaces.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ended" className="space-y-4">
            {filterSpaces(endedSpaces).length > 0 ? (
              filterSpaces(endedSpaces).map((space) => <SpaceCard key={space.id} space={space} />)
            ) : (
              <Card className="border border-gray-200">
                <CardContent className="p-12 text-center">
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No ended spaces found</h3>
                  <p className="text-gray-600">Recordings of past spaces will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
