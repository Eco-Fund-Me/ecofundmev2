"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  UserPlus,
  MessageCircle,
  MoreHorizontal,
  Zap,
  Trophy,
  ArrowUp,
  ArrowDown,
  Share2,
  Flag,
  Star,
  Calendar,
  MapPin,
  LinkIcon,
  Crown,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface PublicUserProfile {
  username: string
  displayName: string
  avatar: string
  bio: string
  location?: string
  website?: string
  joinDate: string
  powerLevel: number
  reputation: number
  followers: number
  following: number
  postsCount: number
  totalEarnings: number
  isFollowing: boolean
  isVerified: boolean
  isCreator: boolean
  badges: string[]
  campaigns?: Campaign[]
}

interface Campaign {
  id: string
  title: string
  description: string
  category: string
  raised: number
  goal: number
  backers: number
  status: "active" | "completed" | "paused"
  image: string
}

interface UserPost {
  id: string
  content: string
  timestamp: string
  upvotes: number
  downvotes: number
  earnings: number
  comments: number
  shares: number
  tags: string[]
  userVote?: "up" | "down" | null
  images?: string[]
}

const userProfile: PublicUserProfile = {
  username: "oceanmaster",
  displayName: "Dr. Marina Ocean",
  avatar: "/placeholder.svg",
  bio: "🌊 Marine biologist & ocean conservation advocate | 🐋 Protecting marine life for future generations | 🌱 Sustainable living enthusiast | Leading the fight against ocean pollution",
  location: "California, USA",
  website: "oceanconservation.org",
  joinDate: "March 2023",
  powerLevel: 89,
  reputation: 4567,
  followers: 12400,
  following: 890,
  postsCount: 234,
  totalEarnings: 8934.56,
  isFollowing: false,
  isVerified: true,
  isCreator: true,
  badges: ["Eco Legend", "Top Contributor", "Community Leader", "Ocean Guardian"],
  campaigns: [
    {
      id: "1",
      title: "Pacific Ocean Cleanup",
      description: "Large-scale plastic removal from the Pacific Ocean using innovative technology",
      category: "Environment",
      raised: 245000,
      goal: 500000,
      backers: 1234,
      status: "active",
      image: "/ocean-cleanup.png",
    },
    {
      id: "2",
      title: "Marine Life Protection",
      description: "Protecting endangered marine species through research and conservation",
      category: "Wildlife",
      raised: 89000,
      goal: 150000,
      backers: 567,
      status: "active",
      image: "/wildlife-conservation-mosaic.png",
    },
    {
      id: "3",
      title: "Coral Reef Restoration",
      description: "Restoring damaged coral reefs using advanced marine biology techniques",
      category: "Environment",
      raised: 125000,
      goal: 100000,
      backers: 890,
      status: "completed",
      image: "/placeholder.svg",
    },
  ],
}

const userPosts: UserPost[] = [
  {
    id: "1",
    content:
      "🐋 Incredible news! Our whale tracking project has identified 3 new migration routes. This data will help create better protected marine corridors. Science + community action = real change! #MarineConservation #WhaleProtection",
    timestamp: "4 hours ago",
    upvotes: 456,
    downvotes: 8,
    earnings: 89.34,
    comments: 67,
    shares: 23,
    tags: ["MarineConservation", "WhaleProtection", "Science"],
    userVote: null,
    images: ["/ocean-cleanup-effort.png"],
  },
  {
    id: "2",
    content:
      "Beach cleanup results from this weekend: 🗑️ 200kg plastic removed ♻️ 50kg recycled materials 🌊 2km of coastline restored. Thank you to all 150 volunteers! Together we're making a difference.",
    timestamp: "2 days ago",
    upvotes: 789,
    downvotes: 12,
    earnings: 134.67,
    comments: 89,
    shares: 45,
    tags: ["BeachCleanup", "PlasticFree", "Community"],
    userVote: "up",
  },
  {
    id: "3",
    content:
      "🌊 Just published our latest research on microplastics in marine food chains. The results are concerning but actionable. Link to full paper in bio. We need policy changes NOW! #MarineScience #PlasticPollution",
    timestamp: "5 days ago",
    upvotes: 234,
    downvotes: 5,
    earnings: 67.89,
    comments: 45,
    shares: 78,
    tags: ["MarineScience", "PlasticPollution", "Research"],
    userVote: null,
  },
]

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const [isFollowing, setIsFollowing] = useState(userProfile.isFollowing)
  const [posts, setPosts] = useState(userPosts)
  const [activeTab, setActiveTab] = useState("posts")

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleVote = (postId: string, voteType: "up" | "down") => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const currentVote = post.userVote
          let newUpvotes = post.upvotes
          let newDownvotes = post.downvotes
          let newUserVote: "up" | "down" | null = voteType

          // Remove previous vote
          if (currentVote === "up") newUpvotes--
          if (currentVote === "down") newDownvotes--

          // Add new vote or remove if same
          if (currentVote === voteType) {
            newUserVote = null
          } else {
            if (voteType === "up") newUpvotes++
            if (voteType === "down") newDownvotes++
          }

          return {
            ...post,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote,
          }
        }
        return post
      }),
    )
  }

  const getPowerLevelColor = (level: number) => {
    if (level >= 80) return "text-purple-600 bg-purple-100"
    if (level >= 60) return "text-blue-600 bg-blue-100"
    if (level >= 40) return "text-green-600 bg-green-100"
    if (level >= 20) return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }

  const getPowerLevelTitle = (level: number) => {
    if (level >= 80) return "Eco Legend"
    if (level >= 60) return "Eco Champion"
    if (level >= 40) return "Eco Advocate"
    if (level >= 20) return "Eco Supporter"
    return "Eco Newcomer"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SocialNavigation />

      <div className="max-w-4xl mx-auto px-4 py-6 pb-20 lg:pb-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">{userProfile.displayName[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold">{userProfile.displayName}</h1>
                    {userProfile.isVerified && <Star className="h-5 w-5 text-blue-500" />}
                    {userProfile.isCreator && <Crown className="h-5 w-5 text-[#00EE7D]" />}
                  </div>
                  <p className="text-gray-600 mb-2">@{userProfile.username}</p>
                  <Badge className={`mb-3 ${getPowerLevelColor(userProfile.powerLevel)}`}>
                    <Zap className="h-3 w-3 mr-1" />
                    Level {userProfile.powerLevel} - {getPowerLevelTitle(userProfile.powerLevel)}
                  </Badge>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.badges.map((badge) => (
                      <Badge key={badge} variant="outline" className="text-xs">
                        <Trophy className="h-3 w-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile Info and Actions */}
              <div className="flex-1">
                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                  <Button
                    onClick={handleFollow}
                    className={
                      isFollowing
                        ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        : "bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
                    }
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Flag className="h-4 w-4 mr-2" />
                        Report User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00EE7D]">{userProfile.followers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userProfile.following}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{userProfile.postsCount}</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{userProfile.reputation}</div>
                    <div className="text-sm text-gray-600">Reputation</div>
                  </div>
                </div>

                {/* Power Level Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Power Level</span>
                    <span className="text-sm text-gray-600">{userProfile.powerLevel}/100</span>
                  </div>
                  <Progress value={userProfile.powerLevel} className="h-2" />
                </div>

                {/* Bio and Details */}
                <p className="text-gray-700 mb-3">{userProfile.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {userProfile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {userProfile.location}
                    </div>
                  )}
                  {userProfile.website && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <a href={`https://${userProfile.website}`} className="text-blue-600 hover:underline">
                        {userProfile.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {userProfile.joinDate}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{userProfile.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{userProfile.displayName}</span>
                        {userProfile.isVerified && <Star className="h-4 w-4 text-blue-500" />}
                        {userProfile.isCreator && <Crown className="h-4 w-4 text-[#00EE7D]" />}
                        <span className="text-gray-500">@{userProfile.username}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500 text-sm">{post.timestamp}</span>
                      </div>

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

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleVote(post.id, "up")}
                              className={`h-8 px-2 ${
                                post.userVote === "up"
                                  ? "text-green-600 bg-green-50"
                                  : "text-gray-600 hover:text-green-600"
                              }`}
                            >
                              <ArrowUp className="h-4 w-4 mr-1" />
                              {post.upvotes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleVote(post.id, "down")}
                              className={`h-8 px-2 ${
                                post.userVote === "down" ? "text-red-600 bg-red-50" : "text-gray-600 hover:text-red-600"
                              }`}
                            >
                              <ArrowDown className="h-4 w-4 mr-1" />
                              {post.downvotes}
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                            <Share2 className="h-4 w-4 mr-1" />
                            {post.shares}
                          </Button>
                        </div>
                        <div className="font-medium text-green-600">${post.earnings}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <div className="space-y-4">
              {userProfile.campaigns && userProfile.campaigns.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="h-5 w-5 text-[#00EE7D]" />
                    <h3 className="text-lg font-semibold">Campaigns by {userProfile.displayName}</h3>
                  </div>
                  {userProfile.campaigns.map((campaign) => (
                    <Card key={campaign.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="w-32 h-32 flex-shrink-0">
                            <img
                              src={campaign.image || "/placeholder.svg"}
                              alt={campaign.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <Link
                                  href={`/campaigns/${campaign.id}`}
                                  className="font-semibold text-lg hover:underline"
                                >
                                  {campaign.title}
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{campaign.category}</Badge>
                                  <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium">
                                  ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}
                                </span>
                              </div>
                              <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {campaign.backers} backers
                                </div>
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="h-4 w-4" />
                                  {Math.round((campaign.raised / campaign.goal) * 100)}% funded
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />${Math.round(campaign.raised / campaign.backers)}{" "}
                                  avg
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Crown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Campaigns Yet</h3>
                    <p className="text-gray-600">This user hasn&apos;t created any campaigns yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Public Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProfile.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border">
                      <Trophy className="h-6 w-6 text-yellow-600" />
                      <div>
                        <div className="font-semibold">{badge}</div>
                        <div className="text-sm text-gray-600">Earned through exceptional contributions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Earnings</span>
                      <span className="font-bold text-green-600">${userProfile.totalEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Post Score</span>
                      <span className="font-bold">87.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engagement Rate</span>
                      <span className="font-bold text-blue-600">12.4%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Impact</span>
                      <span className="font-bold text-purple-600">High</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Campaigns Created</span>
                      <span className="font-bold">{userProfile.campaigns?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Raised</span>
                      <span className="font-bold text-green-600">
                        $
                        {userProfile.campaigns?.reduce((sum, campaign) => sum + campaign.raised, 0).toLocaleString() ||
                          0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Backers</span>
                      <span className="font-bold text-blue-600">
                        {userProfile.campaigns?.reduce((sum, campaign) => sum + campaign.backers, 0) || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate</span>
                      <span className="font-bold text-purple-600">
                        {userProfile.campaigns
                          ? Math.round(
                              (userProfile.campaigns.filter((c) => c.status === "completed").length /
                                userProfile.campaigns.length) *
                                100,
                            )
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MobileBottomNav className="lg:hidden" />
    </div>
  )
}
