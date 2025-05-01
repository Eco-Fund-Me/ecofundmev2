"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Menu, UserPlus, X, Wallet, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { useActiveAccount, useDisconnect, useActiveWallet } from "thirdweb/react"
import { isAddress } from "thirdweb"
import { UserDropdown } from "@/components/UserDropdown"
import { supabase } from "@/lib/supabaseClient"
import { Badge } from "@/components/ui/badge"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null)
const wallet = useActiveWallet()
  // Get wallet address directly
  const account = useActiveAccount()
  const address = account?.address || ""
  const { disconnect } = useDisconnect()

  // Get balance
  const balanceData = "2881.281"
  const formattedBalance = balanceData ? Number.parseFloat(balanceData).toFixed(2) : "0.00"

  // Simple authentication check based on address only
  const isAuthenticated = isAddress(address)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fetch user data when we have an address
  useEffect(() => {
    const fetchUserData = async () => {
      if (!address || !isAuthenticated) {
        return
      }

      try {
        // Get user data from Supabase
        const { data, error } = await supabase.from("users").select("*").eq("address", address).single()

        if (error) {
          console.error("Error fetching user data:", error)
          return
        }

        if (data) {
          // If user has a business_id, fetch business verification status
          if (data.user_type === "business" && data.business_id) {
            const { data: businessData, error: businessError } = await supabase
              .from("kyb")
              .select("status")
              .eq("id", data.business_id)
              .single()

            if (!businessError && businessData) {
              setUserData({
                ...data,
                verificationStatus: businessData.status,
              })
            } else {
              setUserData(data)
            }
          } else {
            setUserData(data)
          }
        }
      } catch (err) {
        console.error("Error in fetchUserData:", err)
      }
    }

    fetchUserData()
  }, [address, isAuthenticated])

  // Simple logout function
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      if (wallet) await disconnect(wallet)
      window.location.reload()
    } catch (err) {
      console.error("Error during logout:", err)
      window.location.reload()
    }
  }

  const navLinks = [
    { href: "/campaigns", label: "Campaigns" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#about", label: "About Us" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      setIsOpen(false)
    }
  }

  if (!mounted) return null

  // Extract user data for display
  const userType = userData?.user_type || "individual"
  const verificationStatus = userData?.verificationStatus
  const userName = userData ? `${userData.first_name || ""} ${userData.last_name || ""}`.trim() || "User" : ""
  const businessName = userData?.business_name || "Business"

  // Determine what name to display in the dropdown
  const displayName = userType === "business" ? businessName : userName

  // Fallback name if user data isn't fully loaded yet
  const fallbackName = address ? truncateAddress(address) : "User"

  // Check if business verification is pending
  const isBusinessPending = userType === "business" && verificationStatus !== "verified"

  return (
    <>
      {/* Spacer div to push content down - only visible on pages that need it */}
      <div className="h-16"></div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#1E3A29] shadow-md" : "bg-[#1E3A29]"
        }`}
      >
        <nav className="w-full border-b border-[#4CAF50]/10">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center hover:text-[#4CAF50]/80 text-[#4CAF50] space-x-2">
              <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" priority />
              <span className="text-xl font-bold tracking-tight">EcoFundMe</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center md:space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-[#4CAF50] hover:text-[#4CAF50]/80 transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}

              {/* Authentication State */}
              <div className="flex items-center space-x-3">
                {!isAuthenticated ? (
                  // Logged Out State
                  <>
                    <Link href="/signup">
                      <Button
                        variant="outline"
                        className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 hover:text-[#4CAF50] rounded-full px-5 bg-white/5"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/signin">
                      <Button
                        variant="outline"
                        className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 hover:text-[#4CAF50] rounded-full px-5 bg-white/5"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </>
                ) : (
                  // Logged In States
                  <>
                    {/* Wallet Balance */}
                    <div className="flex items-center bg-[#4CAF50]/10 px-3 py-1 rounded-full">
                      <Wallet className="h-4 w-4 text-[#4CAF50] mr-2" />
                      <span className="text-sm text-white">${formattedBalance}</span>
                    </div>

                    {/* Business Pending Verification Button */}
                    {isBusinessPending && (
                      <Link href="/business-verification">
                        <Button
                          variant="outline"
                          className="border-amber-500 text-amber-500 hover:bg-amber-500/10 hover:text-amber-500 rounded-full px-4 bg-white/5 relative"
                        >
                          Complete Verification
                          <Badge className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-1.5 py-0.5">
                            !
                          </Badge>
                        </Button>
                      </Link>
                    )}

                    {/* User Dropdown */}
                    <UserDropdown
                      walletAddress={address}
                      type={userType as "individual" | "business"}
                      verificationStatus={verificationStatus}
                      name={displayName || fallbackName}
                      onLogout={handleLogout}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="text-[#4CAF50] hover:text-[#4CAF50]/80 hover:bg-transparent">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85%] max-h-screen overflow-y-auto bg-[#1E3A29] border-[#4CAF50]/20"
                >
                  <SheetHeader className="absolute top-6 right-4">
                    <SheetClose asChild>
                      <Button variant="ghost" className="text-[#4CAF50] hover:text-[#4CAF50]/80 hover:bg-transparent">
                        <X className="h-6 w-6" />
                      </Button>
                    </SheetClose>
                  </SheetHeader>
                  <div className="flex flex-col items-start justify-center space-y-6 w-full px-4 pt-16">
                    <Link href="/" className="flex items-center hover:text-[#4CAF50]/80 text-[#4CAF50] space-x-2 mb-6">
                      <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
                      <span className="text-xl font-bold tracking-tight">EcoFundMe</span>
                    </Link>

                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleScroll(e, link.href)}
                        className="text-[#4CAF50] hover:text-[#4CAF50]/80 transition-colors 
                          py-3 text-xl font-medium w-full border-b border-[#4CAF50]/10"
                      >
                        {link.label}
                      </Link>
                    ))}

                    {/* Mobile Authentication State */}
                    <div className="pt-6 w-full space-y-4">
                      {!isAuthenticated ? (
                        // Logged Out State - Mobile
                        <>
                          <Link href="/signup" className="w-full block">
                            <Button
                              variant="outline"
                              className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 hover:text-[#4CAF50] w-full rounded-full bg-white/5"
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Sign Up
                            </Button>
                          </Link>
                          <Link href="/signin" className="w-full block">
                            <Button
                              variant="outline"
                              className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 hover:text-[#4CAF50] w-full rounded-full bg-white/5"
                            >
                              Sign In
                            </Button>
                          </Link>
                        </>
                      ) : (
                        // Logged In States - Mobile
                        <div className="w-full">
                          {/* User Info */}
                          <div className="flex items-center space-x-3 text-white mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#4CAF50]/20 flex items-center justify-center text-[#4CAF50] font-bold">
                              {userType === "business" ? (verificationStatus === "verified" ? "🟢" : "🟠") : "🔵"}
                            </div>
                            <div>
                              <p className="font-medium">{displayName || fallbackName}</p>
                              <p className="text-sm text-white/60">
                                {userType === "business" ? "Business Account" : "Individual Account"}
                              </p>
                            </div>
                          </div>

                          {/* Wallet Balance - Mobile */}
                          <div className="p-3 bg-white/5 rounded-md flex justify-between items-center mb-4">
                            <div>
                              <p className="text-sm text-white/60">Wallet Balance</p>
                              <p className="text-white">${formattedBalance}</p>
                            </div>
                            <Wallet className="h-5 w-5 text-[#4CAF50]" />
                          </div>

                          {/* Business Pending Verification Button - Mobile */}
                          {isBusinessPending && (
                            <Link href="/business-verification" className="block w-full mb-4">
                              <Button
                                variant="outline"
                                className="border-amber-500 text-amber-500 hover:bg-amber-500/10 hover:text-amber-500 w-full rounded-full bg-white/5 relative"
                              >
                                Complete Verification
                                <Bell className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          )}

                          {/* Navigation Links based on user type */}
                          {userType === "individual" ? (
                            <>
                              <Link href="/profile" className="block w-full py-3 text-white hover:text-[#4CAF50]">
                                Profile
                              </Link>
                              <Link href="/contributions" className="block w-full py-3 text-white hover:text-[#4CAF50]">
                                My Contributions
                              </Link>
                            </>
                          ) : userType === "business" && verificationStatus === "verified" ? (
                            <>
                              <Link
                                href="/organization/profile"
                                className="block w-full py-3 text-white hover:text-[#4CAF50]"
                              >
                                Organization Profile
                              </Link>
                              <Link
                                href="/organization/dashboard"
                                className="block w-full py-3 text-white hover:text-[#4CAF50]"
                              >
                                Campaign Dashboard
                              </Link>
                              <Link
                                href="/create-campaign"
                                className="block w-full py-3 text-white hover:text-[#4CAF50]"
                              >
                                Create Campaign
                              </Link>
                              <Link
                                href="/organization/analytics"
                                className="block w-full py-3 text-white hover:text-[#4CAF50]"
                              >
                                Analytics
                              </Link>
                            </>
                          ) : (
                            <Link
                              href="/business-verification"
                              className="block w-full py-3 text-white hover:text-[#4CAF50]"
                            >
                              Business Profile
                            </Link>
                          )}

                          {/* Common links for all logged in users */}
                          <Link href="/settings" className="block w-full py-3 text-white hover:text-[#4CAF50]">
                            Settings
                          </Link>

                          <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full border-white/20 text-white hover:bg-white/10 mt-4"
                          >
                            Logout
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

// Helper function to truncate address
function truncateAddress(address: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
