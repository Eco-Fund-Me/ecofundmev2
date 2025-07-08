"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  MessageSquare,
  Bell,
  Users,
  Calendar,
  Search,
  Plus,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Leaf,
  Zap,
  TrendingUp,
  Volume2,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { useMatrix } from "@/hooks/useMatrix"
import { Modal } from "@/components/ui/Modal"
import { AuthFlowModal } from "@/components/social/auth/AuthFlowModal"

interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
    isCreator: boolean
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  category: string
  campaign?: {
    name: string
    progress: number
  }
}


const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Ocean Cleanup Initiative",
      username: "oceancleanup",
      avatar: "/ocean-cleanup.png",
      verified: true,
      isCreator: true,
    },
    content:
      "🌊 Amazing milestone! We've removed 2,500 pounds of plastic from the Pacific this month. Every donation brings us closer to cleaner oceans. Thank you to our incredible community!",
    timestamp: "2 hours ago",
    likes: 234,
    comments: 45,
    shares: 67,
    category: "Environment",
    campaign: {
      name: "Pacific Ocean Cleanup",
      progress: 78,
    },
  },
  {
    id: "2",
    author: {
      name: "Sarah Martinez",
      username: "saraheco",
      avatar: "/placeholder.svg",
      verified: false,
      isCreator: false,
    },
    content:
      "Just installed solar panels on my roof through the Solar Schools program! The process was seamless and I'm already seeing savings. Highly recommend! ☀️",
    timestamp: "4 hours ago",
    likes: 89,
    comments: 23,
    shares: 12,
    category: "Energy",
  },
  {
    id: "3",
    author: {
      name: "Urban Forest Project",
      username: "urbanforest",
      avatar: "/reforestation-effort.png",
      verified: true,
      isCreator: true,
    },
    content:
      "🌳 This weekend we planted 500 trees across downtown! Air quality improvements are already measurable. Join our next planting event - link in bio!",
    timestamp: "6 hours ago",
    likes: 156,
    comments: 34,
    shares: 28,
    category: "Environment",
    campaign: {
      name: "City Tree Planting",
      progress: 65,
    },
  },
]

const sidebarItems = [
  { icon: Home, label: "Feed", href: "/social", active: true },
  { icon: Users, label: "Communities", href: "/social/servers", badge: 0 },
  { icon: Volume2, label: "Spaces", href: "/social/spaces", badge: 2 },
  { icon: MessageSquare, label: "Messages", href: "/social/dm", badge: 3 },
  { icon: Bell, label: "Notifications", href: "/social/notifications", badge: 7 },
  { icon: Calendar, label: "Events", href: "/social/events" },
  { icon: TrendingUp, label: "Trending", href: "/social/trending" },
]

const trendingTopics = [
  { tag: "OceanCleanup", posts: "2.3K" },
  { tag: "SolarEnergy", posts: "1.8K" },
  { tag: "UrbanGardening", posts: "1.2K" },
  { tag: "ClimateAction", posts: "890" },
]

const activeCommunities = [
  {
    id: "ocean-cleanup",
    name: "Ocean Cleanup",
    avatar: "/ocean-cleanup.png",
    members: "12.8K",
    online: 234,
    category: "Environment",
  },
  {
    id: "solar-schools",
    name: "Solar Schools",
    avatar: "/solar-panels-school.png",
    members: "8.9K",
    online: 156,
    category: "Energy",
  },
  {
    id: "urban-gardens",
    name: "Urban Gardens",
    avatar: "/sustainable-garden.png",
    members: "6.7K",
    online: 89,
    category: "Community",
  },
]

// Mobile Bottom Navigation Component
const MobileBottomNav = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
    <div className="grid grid-cols-5 py-2">
      {sidebarItems.slice(0, 5).map((item) => (
        <Link key={item.href} href={item.href}>
          <div className="flex flex-col items-center gap-1 py-2 px-1">
            <div className="relative">
              <item.icon className={`h-5 w-5 ${item.active ? "text-[#00EE7D]" : "text-gray-600"}`} />
              {item.badge && item.badge > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500">
                  {item.badge}
                </Badge>
              )}
            </div>
            <span className={`text-xs ${item.active ? "text-[#00EE7D]" : "text-gray-600"}`}>{item.label}</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default function SocialHomePage() {
  const {  isConnected, user} = useMatrix()
  const [filterBy, setFilterBy] = useState("all")
  const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true)
  }

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>

              <Link href="/social" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#00EE7D] rounded-lg flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-black" />
                </div>
                <span className="font-bold text-xl text-gray-900 hidden sm:block">EcoFundMe</span>
              </Link>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search..." className="pl-10 bg-gray-50 border-gray-200 focus:bg-white text-sm" />
              </div>
            </div>

 {isConnected ? (
        <div className="flex items-center gap-2">
          {/* Post Button (visible when connected) */}
          <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 font-medium hidden sm:flex">
            <Plus className="h-4 w-4 mr-2" />
            Post
          </Button>
          <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 font-medium sm:hidden p-2">
            <Plus className="h-4 w-4" />
          </Button>
          
          {/* User Avatar */}
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src="/placeholder.svg" /> {/* Replace with actual user avatar */}
            <AvatarFallback>{user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        // Sign In Button (visible when not connected)
        <Button variant="outline" className="hidden sm:flex bg-transparent" onClick={handleOpenAuthModal}>
          Sign In
        </Button>
      )}
      <Modal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} size="md"> {/* Use size="lg" for larger modal */}
        {/* Render the new AuthFlowModal component */}
        <AuthFlowModal onClose={handleCloseAuthModal} initialView="signin" />
      </Modal>
           
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="fixed left-0 top-16 bottom-0 w-80 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-4">
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}>
                    <div
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                        item.active
                          ? "bg-[#00EE7D]/10 text-[#00EE7D]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <Badge className="bg-red-500 text-white text-xs h-5 w-5 p-0 flex items-center justify-center">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Active Communities</h3>
                {activeCommunities.map((community) => (
                  <Link
                    key={community.id}
                    href={`/social/servers/${community.id}`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={community.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{community.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{community.name}</div>
                        <div className="text-xs text-gray-500">{community.online} online</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        item.active
                          ? "bg-[#00EE7D]/10 text-[#00EE7D]"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <Badge className="bg-red-500 text-white text-xs h-5 w-5 p-0 flex items-center justify-center">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Active Communities</h3>
                {activeCommunities.map((community) => (
                  <Link key={community.id} href={`/social/servers/${community.id}`}>
                    <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={community.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{community.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{community.name}</div>
                        <div className="text-xs text-gray-500">{community.online} online</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Quick Actions</h3>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Join Community
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Start Space
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6">
            {/* Filter Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">Filter by</span>
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {["All", "Environment", "Energy", "Community"].map((filter) => (
                    <Button
                      key={filter}
                      variant={filterBy === filter.toLowerCase() ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterBy(filter.toLowerCase())}
                      className={
                        filterBy === filter.toLowerCase()
                          ? "bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 whitespace-nowrap"
                          : "bg-transparent whitespace-nowrap"
                      }
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6 pb-20 lg:pb-6">
              {mockPosts.map((post) => (
                <Card key={post.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-3 sm:gap-4">
                      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">{post.author.name}</span>
                          {post.author.verified && <Zap className="h-4 w-4 text-blue-500" />}
                          {post.author.isCreator && (
                            <Badge className="bg-[#00EE7D]/10 text-[#00EE7D] text-xs">Creator</Badge>
                          )}
                          <span className="text-gray-500 text-sm hidden sm:inline">@{post.author.username}</span>
                          <span className="text-gray-400 hidden sm:inline">·</span>
                          <span className="text-gray-500 text-sm">{post.timestamp}</span>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-gray-800 mb-4 leading-relaxed text-sm sm:text-base">{post.content}</p>

                        {post.campaign && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-4 border-l-4 border-[#00EE7D]">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-900">{post.campaign.name}</span>
                              <span className="text-sm text-gray-600">{post.campaign.progress}% funded</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-[#00EE7D] h-2 rounded-full"
                                style={{ width: `${post.campaign.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4 sm:gap-6 text-gray-500">
                          <Button variant="ghost" size="sm" className="hover:text-red-500 p-0">
                            <Heart className="h-4 w-4 mr-1" />
                            <span className="text-sm">{post.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-blue-500 p-0">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span className="text-sm">{post.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:text-green-500 p-0">
                            <Share2 className="h-4 w-4 mr-1" />
                            <span className="text-sm">{post.shares}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="space-y-6 sticky top-24">
              {/* Live Spaces */}
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-[#00EE7D]" />
                    Live Spaces
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/social/spaces/ocean-cleanup-qa">
                    <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Ocean Cleanup Q&A</span>
                      </div>
                      <div className="text-xs text-gray-500">234 listening</div>
                    </div>
                  </Link>
                  <Link href="/social/spaces/solar-workshop">
                    <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-100">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Solar Workshop</span>
                      </div>
                      <div className="text-xs text-gray-500">89 listening</div>
                    </div>
                  </Link>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#00EE7D]" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                    >
                      <div>
                        <div className="font-medium text-gray-900">#{topic.tag}</div>
                        <div className="text-sm text-gray-500">{topic.posts} posts</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Your Impact */}
              <Card className="border border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">Your Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Campaigns Supported</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Donated</span>
                    <span className="font-semibold text-[#00EE7D]">$2,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Community Rank</span>
                    <span className="font-semibold">#156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Power Level</span>
                    <span className="font-semibold text-blue-600">Champion (67)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
