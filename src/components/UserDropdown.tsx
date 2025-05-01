"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  Building,
  BarChart3,
  FileText,
  PlusCircle,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface UserDropdownProps {
  type: "individual" | "business"
  verificationStatus?: "verified" | "pending" | "not_started" | "in_progress" | "rejected"
  name: string
  profileImage?: string
  onLogout?: () => Promise<void>
}

export function UserDropdown({ type, verificationStatus, name, profileImage, onLogout }: UserDropdownProps) {
  const [open, setOpen] = useState(false)

  // Get status emoji and color based on user type and verification status
  const getStatusInfo = () => {
    if (type === "business") {
      if (verificationStatus === "verified") {
        return { emoji: "🟢", color: "green" }
      }
      return { emoji: "🟠", color: "amber" }
    }
    return { emoji: "🔵", color: "blue" }
  }

  const statusInfo = getStatusInfo()

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Handle logout
  const handleLogout = async () => {
    if (onLogout) {
      await onLogout()
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-[#4CAF50]/10">
          <span className="text-lg mr-1">{statusInfo.emoji}</span>
          <span className="font-medium text-sm text-white">{name}</span>
          <ChevronDown className="h-4 w-4 text-[#4CAF50] opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {profileImage ? <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} /> : null}
            <AvatarFallback className={`bg-${statusInfo.color}-500/20 text-${statusInfo.color}-500`}>
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-medium text-sm">{name}</p>
            <Badge
              variant="outline"
              className={`bg-${statusInfo.color}-500/10 text-xs border-${statusInfo.color}-500/20 w-fit`}
            >
              {type === "business" ? "Business Account" : "Individual Account"}
            </Badge>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* Menu Items based on user type */}
          {type === "individual" ? (
            <>
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/contributions">
                <DropdownMenuItem className="cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>My Contributions</span>
                </DropdownMenuItem>
              </Link>
            </>
          ) : type === "business" && verificationStatus === "verified" ? (
            <>
              <Link href="/organization/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <Building className="mr-2 h-4 w-4" />
                  <span>Organization Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/organization/dashboard">
                <DropdownMenuItem className="cursor-pointer">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Campaign Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/create-campaign">
                <DropdownMenuItem className="cursor-pointer">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Create Campaign</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/organization/analytics">
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </DropdownMenuItem>
              </Link>
            </>
          ) : (
            <Link href="/business-verification">
              <DropdownMenuItem className="cursor-pointer">
                <Building className="mr-2 h-4 w-4" />
                <span>Business Profile</span>
              </DropdownMenuItem>
            </Link>
          )}

          {/* Common menu items */}
          <Link href="/settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
