"use client"

import Link from "next/link"
import { ChevronDown, LogOut, Settings, User, BarChart3, PlusCircle, FileText, CreditCard } from 'lucide-react'
import { truncateAddress } from "@/lib/utils"
import { supabase } from "@/lib/supabaseClient"
import { useActiveWallet, useDisconnect } from "thirdweb/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserDropdownProps {
  type: "individual" | "business"
  verificationStatus?: "pending" | "verified" | "not_started" | "in_progress" | "rejected"
  name: string
  walletAddress?: string
  balance?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function UserDropdown({ type, verificationStatus, name, walletAddress, balance }: UserDropdownProps) {
  const wallet = useActiveWallet()
  const { disconnect } = useDisconnect()

  // Determine the status emoji based on user type and verification status
  const getStatusEmoji = () => {
    if (type === "individual") return "🔵"
    if (type === "business" && verificationStatus === "verified") return "🟢"
    return "🟠" // Business pending or other states
  }

  // Handle logout - both Supabase and Thirdweb
  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut()

      // Disconnect from Thirdweb if wallet exists
      if (wallet) await disconnect(wallet)

      // Redirect to home page
      window.location.href = "/"
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-x-1.5 text-sm font-medium">
          <span className="mr-1">{getStatusEmoji()}</span>
          {name}
          <ChevronDown className="h-4 w-4 opacity-60" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* Always display wallet address if available */}
        {walletAddress && (
          <>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <p className="text-sm text-muted-foreground">Wallet</p>
                <p className="font-mono">{truncateAddress(walletAddress)}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Individual user menu items */}
        {type === "individual" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/contributions" className="flex items-center cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>My Contributions</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        )}

        {/* Business user menu items - verified */}
        {type === "business" && verificationStatus === "verified" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/organization/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Organization Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/organization/dashboard" className="flex items-center cursor-pointer">
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>Campaign Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/create-campaign" className="flex items-center cursor-pointer">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Create Campaign</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/organization/analytics" className="flex items-center cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        )}

        {/* Business user menu items - not verified */}
        {type === "business" && verificationStatus !== "verified" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/business-verification" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Business Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
