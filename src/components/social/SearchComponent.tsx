"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search, User, Users, FileText, Crown, Verified, Command, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface SearchUser {
  type: "user"
  id: string
  username: string
  displayName: string
  avatar: string
  bio: string
  verified: boolean
  isCreator: boolean
  followers: number
  powerLevel: number
  campaigns?: string[]
}

interface SearchCampaign {
  type: "campaign"
  id: string
  title: string
  description: string
  category: string
  creator: string
  creatorAvatar: string
  raised: number
  goal: number
  backers: number
  status: "active" | "completed" | "paused"
  image: string
}

interface SearchPost {
  type: "post"
  id: string
  content: string
  author: {
    username: string
    displayName: string
    avatar: string
    verified: boolean
  }
  timestamp: string
  likes: number
  comments: number
  tags: string[]
}

type SearchResult = SearchUser | SearchCampaign | SearchPost

const mockSearchData: SearchResult[] = [
  // Users
  {
    type: "user",
    id: "oceanmaster",
    username: "oceanmaster",
    displayName: "Dr. Marina Ocean",
    avatar: "/placeholder.svg",
    bio: "Marine biologist & ocean conservation advocate",
    verified: true,
    isCreator: true,
    followers: 12400,
    powerLevel: 89,
    campaigns: ["Pacific Ocean Cleanup", "Marine Life Protection"],
  },
  {
    type: "user",
    id: "solarschools",
    username: "solarschools",
    displayName: "Solar Schools Project",
    avatar: "/solar-panels-school.png",
    bio: "Bringing renewable energy to educational institutions",
    verified: true,
    isCreator: true,
    followers: 8900,
    powerLevel: 76,
    campaigns: ["Solar Power for Schools"],
  },
  {
    type: "user",
    id: "sarahgreen",
    username: "sarahgreen",
    displayName: "Sarah Green",
    avatar: "/placeholder.svg",
    bio: "Environmental activist and urban gardening enthusiast",
    verified: false,
    isCreator: false,
    followers: 1200,
    powerLevel: 34,
  },
  {
    type: "user",
    id: "urbanforest",
    username: "urbanforest",
    displayName: "Urban Forest Initiative",
    avatar: "/reforestation-effort.png",
    bio: "Creating green spaces in urban environments",
    verified: true,
    isCreator: true,
    followers: 5600,
    powerLevel: 67,
    campaigns: ["City Tree Planting", "Urban Air Quality"],
  },

  // Campaigns
  {
    type: "campaign",
    id: "ocean-cleanup",
    title: "Pacific Ocean Cleanup",
    description: "Large-scale plastic removal from the Pacific Ocean using innovative technology",
    category: "Environment",
    creator: "Dr. Marina Ocean",
    creatorAvatar: "/placeholder.svg",
    raised: 245000,
    goal: 500000,
    backers: 1234,
    status: "active",
    image: "/ocean-cleanup.png",
  },
  {
    type: "campaign",
    id: "solar-schools",
    title: "Solar Power for Schools",
    description: "Installing solar panels in schools to reduce energy costs and teach sustainability",
    category: "Education",
    creator: "Solar Schools Project",
    creatorAvatar: "/solar-panels-school.png",
    raised: 189000,
    goal: 300000,
    backers: 890,
    status: "active",
    image: "/solar-panels-school.png",
  },
  {
    type: "campaign",
    id: "urban-trees",
    title: "City Tree Planting",
    description: "Planting trees throughout urban areas to improve air quality and reduce heat",
    category: "Environment",
    creator: "Urban Forest Initiative",
    creatorAvatar: "/reforestation-effort.png",
    raised: 67000,
    goal: 100000,
    backers: 456,
    status: "active",
    image: "/lush-forest-stream.png",
  },
  {
    type: "campaign",
    id: "wildlife-protection",
    title: "Wildlife Conservation Fund",
    description: "Protecting endangered species through habitat preservation and research",
    category: "Wildlife",
    creator: "Wildlife Protection Society",
    creatorAvatar: "/wildlife-conservation-mosaic.png",
    raised: 123000,
    goal: 200000,
    backers: 678,
    status: "active",
    image: "/wildlife-conservation-mosaic.png",
  },

  // Posts
  {
    type: "post",
    id: "post1",
    content:
      "🌊 Amazing progress update! We've removed over 2,000 pounds of plastic from the Pacific this month. Every donation counts towards a cleaner ocean.",
    author: {
      username: "oceanmaster",
      displayName: "Dr. Marina Ocean",
      avatar: "/placeholder.svg",
      verified: true,
    },
    timestamp: "2h",
    likes: 234,
    comments: 45,
    tags: ["OceanCleanup", "PlasticFree", "EcoFriendly"],
  },
  {
    type: "post",
    id: "post2",
    content:
      "🎉 MILESTONE ACHIEVED! We've now installed solar panels in 50 schools across the region. Thank you to all our supporters!",
    author: {
      username: "solarschools",
      displayName: "Solar Schools Project",
      avatar: "/solar-panels-school.png",
      verified: true,
    },
    timestamp: "6h",
    likes: 456,
    comments: 78,
    tags: ["SolarEnergy", "Education", "Sustainability"],
  },
  {
    type: "post",
    id: "post3",
    content:
      "🌳 This week we planted 500 trees across downtown! Air quality improvements are already measurable. Join our next planting event!",
    author: {
      username: "urbanforest",
      displayName: "Urban Forest Initiative",
      avatar: "/reforestation-effort.png",
      verified: true,
    },
    timestamp: "12h",
    likes: 345,
    comments: 67,
    tags: ["UrbanForest", "CleanAir", "CommunityAction"],
  },
]

interface SearchComponentProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchComponent({ isOpen, onClose }: SearchComponentProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true)
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockSearchData.filter((item) => {
          const searchTerm = query.toLowerCase()
          switch (item.type) {
            case "user":
              return (
                item.displayName.toLowerCase().includes(searchTerm) ||
                item.username.toLowerCase().includes(searchTerm) ||
                item.bio.toLowerCase().includes(searchTerm)
              )
            case "campaign":
              return (
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm) ||
                item.creator.toLowerCase().includes(searchTerm)
              )
            case "post":
              return (
                item.content.toLowerCase().includes(searchTerm) ||
                item.author.displayName.toLowerCase().includes(searchTerm) ||
                item.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
              )
            default:
              return false
          }
        })
        setResults(filtered)
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [query])

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case "user":
        router.push(`/social/profile/${result.username}`)
        break
      case "campaign":
        router.push(`/campaigns/${result.id}`)
        break
      case "post":
        router.push(`/social/feed`) // Could navigate to specific post
        break
    }
    onClose()
  }

  const getFilteredResults = () => {
    if (activeTab === "all") return results
    return results.filter((result) => result.type === activeTab)
  }

  const getResultCounts = () => {
    const counts = { all: results.length, user: 0, campaign: 0, post: 0 }
    results.forEach((result) => {
      counts[result.type]++
    })
    return counts
  }

  if (!isOpen) return null

  const counts = getResultCounts()
  const filteredResults = getFilteredResults()

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        <CardContent className="p-0">
          {/* Search Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users, campaigns, or posts..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 pr-10"
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd className="px-2 py-1 text-xs bg-gray-100 border rounded">
                    <Command className="h-3 w-3 inline mr-1" />K
                  </kbd>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {query.length > 2 && (
            <div className="max-h-[60vh] overflow-y-auto">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all" className="text-xs">
                      All ({counts.all})
                    </TabsTrigger>
                    <TabsTrigger value="user" className="text-xs">
                      Users ({counts.user})
                    </TabsTrigger>
                    <TabsTrigger value="campaign" className="text-xs">
                      Campaigns ({counts.campaign})
                    </TabsTrigger>
                    <TabsTrigger value="post" className="text-xs">
                      Posts ({counts.post})
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value={activeTab} className="mt-0">
                  <div className="p-4 space-y-3">
                    {isLoading ? (
                      <div className="text-center py-8 text-gray-500">Searching...</div>
                    ) : filteredResults.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No results found for "{query}"</div>
                    ) : (
                      filteredResults.map((result, index) => (
                        <div
                          key={index}
                          onClick={() => handleResultClick(result)}
                          className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          {/* Result Content */}
                          {result.type === "user" && (
                            <>
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={result.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{result.displayName[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold truncate">{result.displayName}</span>
                                  {result.verified && <Verified className="h-4 w-4 text-blue-500" />}
                                  {result.isCreator && <Crown className="h-4 w-4 text-[#00EE7D]" />}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">@{result.username}</div>
                                <div className="text-sm text-gray-500 truncate mb-2">{result.bio}</div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>{result.followers.toLocaleString()} followers</span>
                                  <span>Level {result.powerLevel}</span>
                                  {result.campaigns && result.campaigns.length > 0 && (
                                    <span>{result.campaigns.length} campaigns</span>
                                  )}
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                <User className="h-3 w-3 mr-1" />
                                User
                              </Badge>
                            </>
                          )}

                          {result.type === "campaign" && (
                            <>
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={result.image || "/placeholder.svg"} />
                                <AvatarFallback>{result.title[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold truncate">{result.title}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {result.category}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600 mb-1">by {result.creator}</div>
                                <div className="text-sm text-gray-500 truncate mb-2">{result.description}</div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>${result.raised.toLocaleString()} raised</span>
                                  <span>{result.backers} backers</span>
                                  <span>{Math.round((result.raised / result.goal) * 100)}% funded</span>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                Campaign
                              </Badge>
                            </>
                          )}

                          {result.type === "post" && (
                            <>
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={result.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{result.author.displayName[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold truncate">{result.author.displayName}</span>
                                  {result.author.verified && <Verified className="h-4 w-4 text-blue-500" />}
                                  <span className="text-gray-500 text-sm">@{result.author.username}</span>
                                  <span className="text-gray-500">·</span>
                                  <span className="text-gray-500 text-sm">{result.timestamp}</span>
                                </div>
                                <div className="text-sm text-gray-700 mb-2 line-clamp-2">{result.content}</div>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>{result.likes} likes</span>
                                  <span>{result.comments} comments</span>
                                  <div className="flex gap-1">
                                    {result.tags.slice(0, 2).map((tag) => (
                                      <span key={tag}>#{tag}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                Post
                              </Badge>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Search Tips */}
          {query.length <= 2 && (
            <div className="p-6 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="font-semibold mb-2">Search EcoFundMe</h3>
              <p className="text-sm mb-4">Find users, campaigns, and posts across the platform</p>
              <div className="text-xs space-y-1">
                <div>• Type at least 3 characters to search</div>
                <div>• Use hashtags to find posts by topic</div>
                <div>• Search by username with @username</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
