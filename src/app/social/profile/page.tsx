"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Edit,
  Settings,
  Zap,
  Trophy,
  ArrowUp,
  ArrowDown,
  Share2,
  Star,
  Calendar,
  MapPin,
  LinkIcon,
  Crown,
  Camera,
  Save,
  X,
} from "lucide-react"
import { SocialNavigation } from "@/components/social/SocialNavigation"
import { MobileBottomNav } from "@/components/social/MobileBottomNav"
import Link from "next/link"

interface UserProfile {
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

const userProfile: UserProfile = {
  username: "you",
  displayName: "Your Name",
  avatar: "/placeholder.svg",
  bio: "Environmental enthusiast and sustainability advocate. Passionate about making a positive impact on our planet through community action and innovation.",
  location: "San Francisco, CA",
  website: "yourwebsite.com",
  joinDate: "January 2024",
  powerLevel: 45,
  reputation: 1234,
  followers: 567,
  following: 234,
  postsCount: 89,
  totalEarnings: 234.56,
  isVerified: false,
  isCreator: false,
  badges: ["Eco Supporter", "Community Member", "Early Adopter"],
  campaigns: [],
}

const userPosts: UserPost[] = [
  {
    id: "1",
    content:
      "Just backed the urban gardening project! 🌱 Can't wait to see more green spaces in our city. Who else is supporting local environmental initiatives?",
    timestamp: "4 hours ago",
    upvotes: 23,
    downvotes: 1,
    earnings: 12.34,
    comments: 8,
    shares: 3,
    tags: ["UrbanGardening", "GreenCity", "Community"],
    userVote: null,
  },
  {
    id: "2",
    content:
      "Attended the climate action workshop today. So inspired by all the young activists! We're the generation that will solve this crisis. 💪 #ClimateAction #YouthActivism #Hope",
    timestamp: "2 days ago",
    upvotes: 45,
    downvotes: 2,
    earnings: 23.67,
    comments: 12,
    shares: 7,
    tags: ["ClimateAction", "YouthActivism", "Hope"],
    userVote: null,
  },
]

export default function MyProfilePage() {
  const [profile, setProfile] = useState(userProfile)
  const [posts, setPosts] = useState(userPosts)
  const [activeTab, setActiveTab] = useState("posts")
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    displayName: profile.displayName,
    bio: profile.bio,
    location: profile.location || "",
    website: profile.website || "",
  })

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

  const handleSaveProfile = () => {
    setProfile({
      ...profile,
      ...editForm,
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditForm({
      displayName: profile.displayName,
      bio: profile.bio,
      location: profile.location || "",
      website: profile.website || "",
    })
    setIsEditing(false)
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
                <div className="relative">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">{profile.displayName[0]}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-1">
                    {isEditing ? (
                      <Input
                        value={editForm.displayName}
                        onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                        className="text-2xl font-bold h-auto p-1 border-dashed"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                    )}
                    {profile.isVerified && <Star className="h-5 w-5 text-blue-500" />}
                    {profile.isCreator && <Crown className="h-5 w-5 text-[#00EE7D]" />}
                  </div>
                  <p className="text-gray-600 mb-2">@{profile.username}</p>
                  <Badge className={`mb-3 ${getPowerLevelColor(profile.powerLevel)}`}>
                    <Zap className="h-3 w-3 mr-1" />
                    Level {profile.powerLevel} - {getPowerLevelTitle(profile.powerLevel)}
                  </Badge>
                  <div className="flex flex-wrap gap-2">
                    {profile.badges.map((badge) => (
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
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile} className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => setIsEditing(true)} variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00EE7D]">{profile.followers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{profile.following}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{profile.postsCount}</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{profile.reputation}</div>
                    <div className="text-sm text-gray-600">Reputation</div>
                  </div>
                </div>

                {/* Power Level Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Power Level</span>
                    <Link href="/social/power-levels" className="text-sm text-blue-600 hover:underline">
                      Learn more
                    </Link>
                  </div>
                  <Progress value={profile.powerLevel} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">
                    {profile.powerLevel}/100 - {100 - profile.powerLevel} points to next level
                  </div>
                </div>

                {/* Bio and Details */}
                {isEditing ? (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Tell us about yourself..."
                      value={editForm.bio}
                      onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      className="min-h-[80px]"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Location"
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      />
                      <Input
                        placeholder="Website"
                        value={editForm.website}
                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 mb-3">{profile.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {profile.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {profile.location}
                        </div>
                      )}
                      {profile.website && (
                        <div className="flex items-center gap-1">
                          <LinkIcon className="h-4 w-4" />
                          <a href={`https://${profile.website}`} className="text-blue-600 hover:underline">
                            {profile.website}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {profile.joinDate}
                      </div>
                    </div>
                  </>
                )}
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
            {posts.length > 0 ? (
              posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{profile.displayName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{profile.displayName}</span>
                          {profile.isVerified && <Star className="h-4 w-4 text-blue-500" />}
                          {profile.isCreator && <Crown className="h-4 w-4 text-[#00EE7D]" />}
                          <span className="text-gray-500">@{profile.username}</span>
                          <span className="text-gray-500">·</span>
                          <span className="text-gray-500 text-sm">{post.timestamp}</span>
                        </div>

                        <p className="mb-3">{post.content}</p>

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
                                  post.userVote === "down"
                                    ? "text-red-600 bg-red-50"
                                    : "text-gray-600 hover:text-red-600"
                                }`}
                              >
                                <ArrowDown className="h-4 w-4 mr-1" />
                                {post.downvotes}
                              </Button>
                            </div>
                            <span className="text-gray-600 text-sm">{post.comments} comments</span>
                            <span className="text-gray-600 text-sm">{post.shares} shares</span>
                          </div>
                          <div className="font-medium text-green-600">${post.earnings}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">📝</div>
                  <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                  <p className="text-gray-600 mb-4">Share your thoughts and start earning from your content!</p>
                  <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">Create your first post</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <Card>
              <CardContent className="p-8 text-center">
                <Crown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Campaigns Yet</h3>
                <p className="text-gray-600 mb-4">
                  Ready to make a difference? Create your first campaign and start raising funds for your cause.
                </p>
                <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
                  <Link href="/create-campaign">Create Campaign</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border">
                      <Trophy className="h-6 w-6 text-yellow-600" />
                      <div>
                        <div className="font-semibold">{badge}</div>
                        <div className="text-sm text-gray-600">Earned through community participation</div>
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
                      <span className="font-bold text-green-600">${profile.totalEarnings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Post Score</span>
                      <span className="font-bold">23.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engagement Rate</span>
                      <span className="font-bold text-blue-600">8.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Impact</span>
                      <span className="font-bold text-purple-600">Growing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Posts This Month</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Comments Made</span>
                      <span className="font-bold">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Votes Cast</span>
                      <span className="font-bold">234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Days</span>
                      <span className="font-bold text-green-600">18/30</span>
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
