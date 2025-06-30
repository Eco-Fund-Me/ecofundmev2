"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
  VoteIcon as Poll,
  TrendingUpIcon as Trending,
  Verified,
  Zap,
  Crown,
} from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { SocialSidebar } from "@/components/social/SocialSidebar"
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
    campaigns?: string[]
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  hashtags: string[]
  images?: string[]
  campaign?: {
    id: string
    title: string
    category: string
  }
  boosted?: boolean
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
      campaigns: ["Pacific Ocean Cleanup", "Marine Life Protection"],
    },
    content:
      "🌊 Amazing progress update! We've removed over 2,000 pounds of plastic from the Pacific this month. Every donation counts towards a cleaner ocean. #OceanCleanup #PlasticFree #EcoFriendly",
    timestamp: "2h",
    likes: 234,
    comments: 45,
    shares: 67,
    hashtags: ["OceanCleanup", "PlasticFree", "EcoFriendly"],
    images: ["/ocean-cleanup-effort.png"],
    campaign: {
      id: "1",
      title: "Pacific Ocean Cleanup",
      category: "Environment",
    },
    boosted: true,
  },
  {
    id: "2",
    author: {
      name: "Sarah Green",
      username: "sarahgreen",
      avatar: "/placeholder.svg",
      verified: false,
      isCreator: false,
    },
    content:
      "Just backed the urban gardening project! 🌱 Can't wait to see more green spaces in our city. Who else is supporting local environmental initiatives?",
    timestamp: "4h",
    likes: 89,
    comments: 23,
    shares: 12,
    hashtags: ["UrbanGardening", "GreenCity"],
  },
  {
    id: "3",
    author: {
      name: "Solar Schools Project",
      username: "solarschools",
      avatar: "/solar-panels-school.png",
      verified: true,
      isCreator: true,
      campaigns: ["Solar Power for Schools", "Green Energy Education"],
    },
    content:
      "🎉 MILESTONE ACHIEVED! We've now installed solar panels in 50 schools across the region. Thank you to all our supporters! Next goal: 100 schools by year-end. #SolarEnergy #Education #Sustainability",
    timestamp: "6h",
    likes: 456,
    comments: 78,
    shares: 123,
    hashtags: ["SolarEnergy", "Education", "Sustainability"],
    campaign: {
      id: "2",
      title: "Solar Power for Schools",
      category: "Education",
    },
  },
  {
    id: "4",
    author: {
      name: "Dr. Marina Ocean",
      username: "oceanmaster",
      avatar: "/placeholder.svg",
      verified: true,
      isCreator: true,
      campaigns: ["Whale Migration Study", "Coral Reef Restoration"],
    },
    content:
      "🐋 Incredible breakthrough in our whale tracking research! We've discovered a new migration pattern that could revolutionize marine conservation efforts. Science + community = change! 🌊",
    timestamp: "8h",
    likes: 567,
    comments: 89,
    shares: 134,
    hashtags: ["MarineScience", "WhaleResearch", "Conservation"],
  },
  {
    id: "5",
    author: {
      name: "Urban Forest Initiative",
      username: "urbanforest",
      avatar: "/reforestation-effort.png",
      verified: true,
      isCreator: true,
      campaigns: ["City Tree Planting", "Urban Air Quality"],
    },
    content:
      "🌳 This week we planted 500 trees across downtown! Air quality improvements are already measurable. Join our next planting event this Saturday! #UrbanForest #CleanAir #CommunityAction",
    timestamp: "12h",
    likes: 345,
    comments: 67,
    shares: 89,
    hashtags: ["UrbanForest", "CleanAir", "CommunityAction"],
    images: ["/lush-forest-stream.png"],
    campaign: {
      id: "3",
      title: "City Tree Planting",
      category: "Environment",
    },
  },
  {
    id: "6",
    author: {
      name: "Alex Rivera",
      username: "alexrivera",
      avatar: "/placeholder.svg",
      verified: false,
      isCreator: false,
    },
    content:
      "Attended the climate action workshop today. So inspired by all the young activists! We're the generation that will solve this crisis. 💪 #ClimateAction #YouthActivism #Hope",
    timestamp: "1d",
    likes: 123,
    comments: 34,
    shares: 45,
    hashtags: ["ClimateAction", "YouthActivism", "Hope"],
  },
]

const trendingTopics = [
  { tag: "OceanCleanup", posts: "2.3K" },
  { tag: "SolarEnergy", posts: "1.8K" },
  { tag: "PlasticFree", posts: "1.2K" },
  { tag: "UrbanGardening", posts: "890" },
  { tag: "ClimateAction", posts: "756" },
  { tag: "MarineScience", posts: "634" },
  { tag: "GreenEnergy", posts: "567" },
]

const suggestedCampaigns = [
  {
    id: "reforestation",
    name: "Reforestation Project",
    description: "Plant 10,000 trees",
    avatar: "/reforestation-effort.png",
    category: "Environment",
    progress: 67,
  },
  {
    id: "wildlife",
    name: "Wildlife Conservation",
    description: "Protect endangered species",
    avatar: "/wildlife-conservation-mosaic.png",
    category: "Wildlife",
    progress: 45,
  },
]

export default function SocialFeedPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState("")
  const [activeTab, setActiveTab] = useState("for-you")

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
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
      },
      content: newPost,
      timestamp: "now",
      likes: 0,
      comments: 0,
      shares: 0,
      hashtags: [],
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SocialNavigation />

      <div className="flex">
        <SocialSidebar className="hidden lg:block" />

        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
          {/* Create Post */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="What's happening in your eco journey?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px] border-none resize-none focus:ring-0"
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Poll className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handleCreatePost}
                      className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="for-you">For You</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                {post.boosted && (
                  <div className="bg-[#00EE7D]/10 px-4 py-2 border-b">
                    <div className="flex items-center gap-2 text-sm text-[#00EE7D]">
                      <Zap className="h-4 w-4" />
                      <span>Boosted Post</span>
                    </div>
                  </div>
                )}

                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Link href={`/social/profile/${post.author.username}`}>
                      <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                    </Link>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Link
                          href={`/social/profile/${post.author.username}`}
                          className="font-semibold hover:underline cursor-pointer"
                        >
                          {post.author.name}
                        </Link>
                        {post.author.verified && <Verified className="h-4 w-4 text-blue-500" />}
                        {post.author.isCreator && (
                          <Badge variant="secondary" className="text-xs bg-[#00EE7D]/10 text-[#00EE7D]">
                            <Crown className="h-3 w-3 mr-1" />
                            Creator
                          </Badge>
                        )}
                        <Link
                          href={`/social/profile/${post.author.username}`}
                          className="text-gray-500 text-sm hover:underline"
                        >
                          @{post.author.username}
                        </Link>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500 text-sm">{post.timestamp}</span>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-auto">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                              <Link href={`/social/profile/${post.author.username}`}>View Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Follow @{post.author.username}</DropdownMenuItem>
                            <DropdownMenuItem>Mute @{post.author.username}</DropdownMenuItem>
                            <DropdownMenuItem>Report post</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Campaign Host Indicator */}
                      {post.author.campaigns && post.author.campaigns.length > 0 && (
                        <div className="mb-2">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Crown className="h-3 w-3" />
                            <span>Hosting: </span>
                            <div className="flex gap-1 flex-wrap">
                              {post.author.campaigns.slice(0, 2).map((campaign, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {campaign}
                                </Badge>
                              ))}
                              {post.author.campaigns.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{post.author.campaigns.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="mb-3">{post.content}</p>

                      {post.images && (
                        <div className="mb-3 rounded-lg overflow-hidden">
                          <img
                            src={post.images[0] || "/placeholder.svg"}
                            alt="Post image"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}

                      {post.campaign && (
                        <Card className="mb-3 border-l-4 border-l-[#00EE7D]">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{post.campaign.category}</Badge>
                              <Link
                                href={`/campaigns/${post.campaign.id}`}
                                className="font-medium text-sm hover:underline"
                              >
                                {post.campaign.title}
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <div className="flex items-center gap-6 text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="hover:text-red-500"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:text-blue-500">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:text-green-500">
                          <Share2 className="h-4 w-4 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Trending */}
        <aside className="hidden xl:block w-80 p-6">
          <Card className="mb-6">
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Trending className="h-5 w-5" />
                Trending Topics
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center hover:bg-gray-50 p-2 rounded cursor-pointer"
                >
                  <div>
                    <div className="font-medium">#{topic.tag}</div>
                    <div className="text-sm text-gray-500">{topic.posts} posts</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold">Suggested Campaigns</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedCampaigns.map((campaign) => (
                <div key={campaign.id} className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={campaign.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{campaign.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{campaign.name}</div>
                    <div className="text-xs text-gray-500 mb-2">{campaign.description}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1">
                        <div className="bg-[#00EE7D] h-1 rounded-full" style={{ width: `${campaign.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{campaign.progress}%</span>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
