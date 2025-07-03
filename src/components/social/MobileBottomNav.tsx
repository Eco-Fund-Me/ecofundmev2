"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Users, Radio, MessageCircle, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MobileBottomNavProps {
  className?: string
}

export function MobileBottomNav({ className }: MobileBottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/social/feed",
      label: "Feed",
      icon: Home,
      active: pathname === "/social/feed",
    },
    {
      href: "/social/servers",
      label: "Communities",
      icon: Users,
      active: pathname.startsWith("/social/servers"),
    },
    {
      href: "/social/spaces",
      label: "Spaces",
      icon: Radio,
      active: pathname.startsWith("/social/spaces"),
    },
    {
      href: "/social/dm",
      label: "Messages",
      icon: MessageCircle,
      active: pathname.startsWith("/social/dm"),
      badge: 3,
    },
    {
      href: "/social/notifications",
      label: "Notifications",
      icon: Bell,
      active: pathname.startsWith("/social/notifications"),
      badge: 2,
    },
  ]

  return (
    <nav className={cn("fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50", className)}>
      <div className="grid grid-cols-5 py-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-1 w-full rounded-none",
                item.active ? "text-[#00EE7D]" : "text-gray-600",
              )}
            >
              <div className="relative">
                <item.icon className="h-5 w-5" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  )
}
