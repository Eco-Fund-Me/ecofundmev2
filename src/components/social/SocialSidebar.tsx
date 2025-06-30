"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Users, MessageSquare, Calendar, Plus, Hash, Volume2, Star, Clock } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SocialSidebarProps {
  className?: string
}

const quickNavItems = [
  {
    href: "/social/feed",
    label: "Home Feed",
    icon: Home,
  },
  {
    href: "/social/servers",
    label: "Campaign Discovery",
    icon: Users,
  },
  {
    href: "/social/spaces",
    label: "Live Spaces",
    icon: MessageSquare,
  },
  {
    href: "/social/dm",
    label: "Direct Messages",
    icon: MessageSquare,
    badge: 3,
  },
]

const followedCampaigns = [
  {
    id: "1",
    name: "Ocean Cleanup",
    avatar: "/ocean-cleanup.png",
    unread: 2,
    lastActivity: "5m",
  },
  {
    id: "2",
    name: "Solar Schools",
    avatar: "/solar-panels-school.png",
    unread: 0,
    lastActivity: "1h",
  },
  {
    id: "3",
    name: "Urban Gardens",
    avatar: "/sustainable-garden.png",
    unread: 1,
    lastActivity: "2h",
  },
]

const suggestedCampaigns = [
  {
    id: "4",
    name: "Wildlife Conservation",
    avatar: "/wildlife-conservation-mosaic.png",
    category: "Wildlife",
    members: "3.2k",
  },
  {
    id: "5",
    name: "Reforestation Alliance",
    avatar: "/reforestation-effort.png",
    category: "Environment",
    members: "2.1k",
  },
]

const upcomingEvents = [
  {
    id: "1",
    title: "Ocean Cleanup Q&A",
    time: "Today 3:00 PM",
    type: "space",
  },
  {
    id: "2",
    title: "Solar Panel Workshop",
    time: "Tomorrow 2:00 PM",
    type: "meeting",
  },
]

export function SocialSidebar({ className }: SocialSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn("w-64 bg-white border-r border-gray-200 h-screen sticky top-16", className)}>
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* User Profile Section */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-medium">Your Name</div>
                  <div className="text-sm text-gray-500">@username</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="font-semibold text-sm">12</div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
                <div>
                  <div className="font-semibold text-sm">156</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div>
                  <div className="font-semibold text-sm">$2.3k</div>
                  <div className="text-xs text-gray-500">Donated</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Quick Navigation</h3>
            <div className="space-y-1">
              {quickNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href ? "bg-[#00EE7D]/10 text-[#00EE7D]" : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    <item.icon className="h-4 w-4 mr-3" />
                    {item.label}
                    {item.badge && (
                      <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Followed Campaigns */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-gray-900">Followed Campaigns</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {followedCampaigns.map((campaign) => (
                <Link key={campaign.id} href={`/social/servers/${campaign.id}`}>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={campaign.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{campaign.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{campaign.name}</div>
                      <div className="text-xs text-gray-500">{campaign.lastActivity} ago</div>
                    </div>
                    {campaign.unread > 0 && (
                      <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-[#00EE7D] text-black">
                        {campaign.unread}
                      </Badge>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Suggested Campaigns */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Suggested for You</h3>
            <div className="space-y-3">
              {suggestedCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={campaign.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{campaign.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{campaign.name}</div>
                      <div className="text-xs text-gray-500">{campaign.members} members</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {campaign.category}
                  </Badge>
                  <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
                    Join Campaign
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Upcoming Events</h3>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    {event.type === "space" ? (
                      <Volume2 className="h-3 w-3 text-blue-500" />
                    ) : (
                      <Calendar className="h-3 w-3 text-green-500" />
                    )}
                    <span className="font-medium text-sm">{event.title}</span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {event.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 mb-3">Recent Activity</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>You donated to Ocean Cleanup</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Hash className="h-3 w-3 text-blue-500" />
                <span>New post in Solar Schools</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-3 w-3 text-green-500" />
                <span>Joined Urban Gardens</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
