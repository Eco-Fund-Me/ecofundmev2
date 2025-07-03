"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  ImageIcon,
  Video,
  MapPin,
  TrendingUp,
  Verified,
  Crown,
  Camera,
  Smile,
} from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"
import Link from "next/link"

interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
    isCreator: boolean
    location?: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  images?: string[]
  campaign?: {
    id: string
    title: string
    category: string
  }
  isLiked?: boolean
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
      location: "Pacific Ocean",
    },
    content:
      "🌊 Amazing progress update! We've removed over 2,000 pounds of plastic from the Pacific this month. Every donation counts towards a cleaner ocean. Thank you to our incredible community! #OceanCleanup #PlasticFree",
    timestamp: "2h",
    likes: 234,
    comments: 45,
    shares: 67,
    images: ["/ocean-cleanup-effort.png"],
    campaign: {
      id: "1",
      title: "Pacific Ocean Cleanup",
      category: "Environment",
    },
    isLiked: false,
  },
  {
    id: "2",
    author: {
      name: "Sarah Green",
      username: "sarahgreen",
      avatar: "/placeholder.svg",
      verified: false,
      isCreator: false,
      location: "San Francisco, CA",
    },
    content:
      "Just backed the urban gardening project! 🌱 Can't wait to see more green spaces in our city. Who else is supporting local environmental initiatives? The community garden near my house is already showing amazing results!",
    timestamp: "4h",
    likes: 89,
    comments: 23,
    shares: 12,
    isLiked: true,
  },
  {
    id: "3",
    author: {
      name: "Solar Schools Project",
      username: "solarschools",
      avatar: "/solar-panels-school.png",
      verified: true,
      isCreator: true,
      location: "California",
    },
    content:
      "🎉 MILESTONE ACHIEVED! We've now installed solar panels in 50 schools across the region. Thank you to all our supporters! Next goal: 100 schools by year-end. Together we're powering education with clean energy! ☀️",
    timestamp: "6h",
    likes: 456,
    comments: 78,
    shares: 123,
    campaign: {
      id: "2",
      title: "Solar Power for Schools",
      category: "Education",
    },
    isLiked: false,
  },
  {
    id: "4",
    author: {
      name: "Dr. Marina Ocean",
      username: "oceanmaster",
      avatar: "/placeholder.svg",
      verified: true,
      isCreator: true,
      location: "Marine Research Station",
    },
    content:
      "🐋 Incredible breakthrough in our whale tracking research! We've discovered a new migration pattern that could revolutionize marine conservation efforts. Science + community = real change! 🌊 #MarineScience #Conservation",
    timestamp: "8h",
    likes: 567,
    comments: 89,
    shares: 134,
    isLiked: true,
  },
]

const trendingTopics = [
  { tag: "OceanCleanup", posts: "2.3K" },
  { tag: "SolarEnergy", posts: "1.8K" },
  { tag: "PlasticFree", posts: "1.2K" },
  { tag: "UrbanGardening", posts: "890" },
  { tag: "ClimateAction", posts: "756" },
]

const suggestedCampaigns = [
  {
    id: "reforestation",
    name: "Reforestation Project",
    description: "Plant 10,000 trees worldwide",
    avatar: "/reforestation-effort.png",
    progress: 67,
    backers: "2.1K",
  },
  {
    id: "wildlife",
    name: "Wildlife Conservation",
    description: "Protect endangered species",
    avatar: "/wildlife-conservation-mosaic.png",
    progress: 45,
    backers: "1.8K",
  },
]

export default function SocialFeedPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState("")
  const [activeTab, setActiveTab] = useState("for-you")

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handleCreatePost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        username: "you",
        avatar: "/placeholder.svg",
        verified: false,
        isCreator: false,
        location: "Your Location",
      },
      content: newPost,
      timestamp: "now",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SocialNavigation />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              {/* User Profile Card */}
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Your Name</div>
                      <div className="text-sm text-gray-500">@username</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="font-semibold text-[#00EE7D]">12</div>
                      <div className="text-gray-500">Following</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600">156</div>
                      <div className="text-gray-500">Followers</div>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-600">$2.3k</div>
                      <div className="text-gray-500">Donated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Trending Topics
                  </h3>
                  <div className="space-y-2">
                    {trendingTopics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center hover:bg-gray-50 p-2 rounded cursor-pointer"
                      >
                        <div>
                          <div className="font-medium text-sm">#{topic.tag}</div>
                          <div className="text-xs text-gray-500">{topic.posts} posts</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6">
            {/* Create Post */}
            <Card className="mb-6 border border-gray-200">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's happening in your eco journey?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[80px] border-none resize-none focus:ring-0 text-base"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#00EE7D]">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#00EE7D]">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#00EE7D]">
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#00EE7D]">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        onClick={handleCreatePost}
                        className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 font-medium"
                        disabled={!newPost.trim()}
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feed Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
                <TabsTrigger
                  value="for-you"
                  className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D]"
                >
                  For You
                </TabsTrigger>
                <TabsTrigger
                  value="following"
                  className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D]"
                >
                  Following
                </TabsTrigger>
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-[#00EE7D]/10 data-[state=active]:text-[#00EE7D]"
                >
                  Trending
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-3">
                      <Link href={`/social/profile/${post.author.username}`}>
                        <Avatar className="h-12 w-12 cursor-pointer hover:opacity-80 transition-opacity">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                      </Link>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Link
                            href={`/social/profile/${post.author.username}`}
                            className="font-semibold hover:underline cursor-pointer text-gray-900"
                          >
                            {post.author.name}
                          </Link>
                          {post.author.verified && <Verified className="h-4 w-4 text-blue-500" />}
                          {post.author.isCreator && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-[#00EE7D]/10 text-[#00EE7D] border-[#00EE7D]/20"
                            >
                              <Crown className="h-3 w-3 mr-1" />
                              Creator
                            </Badge>
                          )}
                          <span className="text-gray-500 text-sm">@{post.author.username}</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-gray-500 text-sm">{post.timestamp}</span>
                          {post.author.location && (
                            <>
                              <span className="text-gray-400">·</span>
                              <div className="flex items-center gap-1 text-gray-500 text-sm">
                                <MapPin className="h-3 w-3" />
                                {post.author.location}
                              </div>
                            </>
                          )}

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/social/profile/${post.author.username}`}>View Profile</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>Follow @{post.author.username}</DropdownMenuItem>
                              <DropdownMenuItem>Save Post</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Report Post</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="mb-4 text-gray-900 leading-relaxed">{post.content}</p>

                        {post.images && (
                          <div className="mb-4 rounded-xl overflow-hidden">
                            <img
                              src={post.images[0] || "/placeholder.svg"}
                              alt="Post image"
                              className="w-full h-64 sm:h-80 object-cover"
                            />
                          </div>
                        )}

                        {post.campaign && (
                          <Card className="mb-4 border-l-4 border-l-[#00EE7D] bg-[#00EE7D]/5">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="border-[#00EE7D]/30 text-[#00EE7D]">
                                  {post.campaign.category}
                                </Badge>
                                <Link
                                  href={`/campaigns/${post.campaign.id}`}
                                  className="font-medium text-sm hover:underline text-gray-900"
                                >
                                  {post.campaign.title}
                                </Link>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        <div className="flex items-center justify-between text-gray-500 pt-2 border-t border-gray-100">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={`hover:bg-red-50 hover:text-red-500 ${
                              post.isLiked ? "text-red-500 bg-red-50" : ""
                            }`}
                          >
                            <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-500">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-500">
                            <Share2 className="h-4 w-4 mr-2" />
                            {post.shares}
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
            <div className="sticky top-24 space-y-4">
              {/* Suggested Campaigns */}
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Suggested Campaigns</h3>
                  <div className="space-y-4">
                    {suggestedCampaigns.map((campaign) => (
                      <div key={campaign.id} className="flex gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={campaign.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{campaign.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-1">{campaign.name}</div>
                          <div className="text-xs text-gray-500 mb-2">{campaign.description}</div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-[#00EE7D] h-1.5 rounded-full"
                                style={{ width: `${campaign.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{campaign.progress}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{campaign.backers} backers</span>
                            <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                              Support
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
