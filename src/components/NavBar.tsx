"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, UserPlus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { UserDropdown } from "@/components/UserDropdown"
import { supabase } from "@/lib/supabaseClient"
import { useActiveAccount, useDisconnect, useActiveWallet } from "thirdweb/react"
import { Badge } from "@/components/ui/badge"
import { isAddress } from "thirdweb"

export default function NavBar() {
  const wallet = useActiveWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [storedAddress, setStoredAddress] = useState<string>("")

  // Get wallet address directly from useActiveAccount
  const account = useActiveAccount()
  const activeAddress = account?.address || ""
  const { disconnect } = useDisconnect()

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)

    // Try to get stored address from localStorage on mount
    try {
      const savedAddress = localStorage.getItem("userWalletAddress")
      if (savedAddress && isAddress(savedAddress)) {
        console.log("Found stored address:", savedAddress)
        setStoredAddress(savedAddress)
      }
    } catch (err) {
      console.error("Error accessing localStorage:", err)
    }
  }, [])

  // Update stored address when active address changes
  useEffect(() => {
    if (activeAddress && isAddress(activeAddress)) {
      console.log("Storing active address:", activeAddress)
      try {
        localStorage.setItem("userWalletAddress", activeAddress)
        setStoredAddress(activeAddress)
      } catch (err) {
        console.error("Error storing address in localStorage:", err)
      }
    }
  }, [activeAddress])

  // Use either active address or stored address
  const address = activeAddress || storedAddress

  // Determine if user is authenticated - ONLY check address
  const isAuthenticated = !!address && isAddress(address)

  // For debugging - log the authentication state
  useEffect(() => {
    console.log("Auth state:", {
      activeAddress,
      storedAddress,
      address,
      isAuthenticated,
      isMounted,
    })
  }, [activeAddress, storedAddress, address, isAuthenticated, isMounted])

  // Fetch user data when we have an address
  useEffect(() => {
    const fetchUserData = async () => {
      if (!address || !isAuthenticated) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        // Get user data from Supabase
        const { data, error } = await supabase.from("users").select("*").eq("address", address).single()

        if (error) {
          console.error("Error fetching user data:", error)
          setIsLoading(false)
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
        setIsLoading(false)
      } catch (err) {
        console.error("Error in fetchUserData:", err)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [address, isAuthenticated])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle logout - clear stored address
  const handleLogout = async () => {
    try {
      // Clear stored address
      localStorage.removeItem("userWalletAddress")
      setStoredAddress("")

      // Sign out from Supabase
      await supabase.auth.signOut()

      // Disconnect wallet
      if (wallet) await disconnect(wallet)

      // Redirect to home page
      window.location.href = "/"
    } catch (err) {
      console.error("Error during logout:", err)
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

  // Don't render anything until mounted
  if (!isMounted) return null

  // Show loading state during initial page load if we have a stored address
  const showLoading = isLoading && (!!storedAddress || !!activeAddress)

  // Extract user data for display
  const userType = userData?.user_type || null
  const verificationStatus = userData?.verificationStatus
  const userName = userData ? `${userData.first_name || ""} ${userData.last_name || ""}`.trim() || "User" : ""
  const businessName = userData?.business_name || "Business"
  const balance = "0.00" // You can implement actual balance fetching if needed

  // Determine what name to display in the dropdown
  const displayName = userType === "business" ? businessName : userName

  // Fallback name if user data isn't fully loaded yet
  const fallbackName = address ? truncateAddress(address) : "User"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1E3A29] shadow-md" : "bg-[#1E3A29]"
      }`}
    >
      <nav className="w-full border-b border-[#4CAF50]/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
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

            {/* Auth State Dependent UI */}
            <div className="flex items-center space-x-3">
              {showLoading ? (
                // Loading state
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-[#4CAF50]" />
                  <span className="text-sm text-[#4CAF50]">Loading...</span>
                </div>
              ) : !isAuthenticated ? (
                // Logged Out State
                <>
                  <Link href="/signup">
                    <Button
                      variant="outline"
                      className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50]/10 hover:text-[#4CAF50] rounded-full px-3 sm:px-5 bg-white/5"
                    >
                      <UserPlus className="mr-1 sm:mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Sign Up</span>
                      <span className="sm:hidden">Sign Up</span>
                    </Button>
                  </Link>
                  <Link href="/signin">
                    <Button className="bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90 rounded-full px-3 sm:px-5">
                      <span>Sign In</span>
                    </Button>
                  </Link>
                </>
              ) : (
                // Logged In States
                <>
                  {/* Business Pending Verification */}
                  {userType === "business" && verificationStatus !== "verified" && (
                    <Link href="/business-verification">
                      <Button className="bg-amber-500 text-white hover:bg-amber-600 rounded-full px-5">
                        Complete Verification
                      </Button>
                    </Link>
                  )}

                  {/* Wallet Connected Badge */}
                  {isAuthenticated && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Wallet Connected
                    </Badge>
                  )}

                  {/* Wallet Balance (for Individual or Verified Business) */}
                  {(userType === "individual" || (userType === "business" && verificationStatus === "verified")) && (
                    <div className="text-sm font-medium text-[#4CAF50]">Wallet: {balance} ETH</div>
                  )}

                  {/* Always show UserDropdown when authenticated */}
                  <UserDropdown
                    type={userType || "individual"} // Default to individual if userType is not set yet
                    verificationStatus={verificationStatus}
                    name={displayName || fallbackName}
                    walletAddress={address}
                    balance={balance}
                  />
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="hover:bg-transparent text-[#4CAF50]">
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

                  {/* Mobile Auth State UI */}
                  <div className="pt-6 w-full space-y-4">
                    {showLoading ? (
                      // Loading state - Mobile
                      <div className="flex items-center justify-center space-x-2 py-4">
                        <Loader2 className="h-5 w-5 animate-spin text-[#4CAF50]" />
                        <span className="text-[#4CAF50]">Loading...</span>
                      </div>
                    ) : !isAuthenticated ? (
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
                          <Button className="bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90 w-full rounded-full">
                            Sign In
                          </Button>
                        </Link>
                      </>
                    ) : (
                      // Logged In States - Mobile
                      <div className="space-y-4">
                        {/* User Info */}
                        <div className="flex items-center space-x-3 text-white">
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

                        {/* Wallet Connected Indicator */}
                        {isAuthenticated && (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-green-500 text-sm">Wallet Connected</span>
                          </div>
                        )}

                        {/* Wallet Address */}
                        {address && (
                          <div className="p-3 bg-white/5 rounded-md">
                            <p className="text-sm text-white/60">Wallet Address</p>
                            <p className="text-white font-mono text-sm break-all">{address}</p>
                          </div>
                        )}

                        {/* Business Pending Verification */}
                        {userType === "business" && verificationStatus !== "verified" && (
                          <Link href="/business-verification" className="w-full block">
                            <Button className="bg-amber-500 text-white hover:bg-amber-600 w-full">
                              Complete Verification
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
                            <Link href="/create-campaign" className="block w-full py-3 text-white hover:text-[#4CAF50]">
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
                          className="w-full border-white/20 text-white hover:bg-white/10"
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
  )
}

// Helper function to truncate address (in case it's not imported)
function truncateAddress(address: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
