"use client"

import { useState, useEffect } from "react"
// import { useUserAuth } from "@/context/AuthContext"
import { isAddress } from "thirdweb"
import { supabase } from "@/lib/supabaseClient"
import { useActiveWallet, useActiveWalletConnectionStatus } from "thirdweb/react"
import { useUserAddress } from "./useUserAddress"

type VerificationStatus = "pending" | "verified" | "not_started" | "in_progress" | "rejected" | undefined
type UserType = "individual" | "business" | null

interface NavUserState {
  isLoading: boolean
  isLoggedIn: boolean
  userType: UserType
  verificationStatus: VerificationStatus
  userName: string
  businessName: string
  balance: string
  address: string
}

export function useNavUser() {
  // const { session } = useUserAuth()
  const address = useUserAddress()
  const [mounted, setMounted] = useState(false)
  const wallet = useActiveWallet()
  const walletConnectionStatus = useActiveWalletConnectionStatus()
  const [state, setState] = useState<NavUserState>({
    isLoading: true,
    isLoggedIn: false,
    userType: null,
    verificationStatus: undefined,
    userName: "",
    businessName: "",
    balance: "0.00",
    address: "",
  })

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // First effect: Get wallet address as early as possible
  useEffect(() => {
    const getAddress = async () => {
      if (!mounted) return

      // Try to get address from multiple sources
  

      // First try from localStorage (most reliable across refreshes)
      try {
        const storedAddress = localStorage.getItem("userWalletAddress")
        if (storedAddress && isAddress(storedAddress)) {
          
          console.log("Got address from localStorage:", address)
        }
      } catch (err) {
        console.error("Error accessing localStorage:", err)
      }

      // Then try from wallet if connected
      if (!address && walletConnectionStatus === "connected" && wallet) {
        try {
          
          console.log("Got address from wallet:", address)
          // Store for future use
          try {
            localStorage.setItem("userWalletAddress", address)
          } catch (err) {
            console.error("Error storing address in localStorage:", err)
          }
        } catch (err) {
          console.error("Error getting address from wallet:", err)
        }
      }

      // If no address from wallet, try from GetUserAddress
      if (!address) {
      
        console.log("no address", address)
        if (address) {
          // Store for future use
          try {
            localStorage.setItem("userWalletAddress", address)
          } catch (err) {
            console.error("Error storing address in localStorage:", err)
          }
        }
      }

      // If we have a valid address, update state immediately
      if (address && isAddress(address)) {
        setState((prev) => ({
          ...prev,
          address,
          isLoggedIn: true,
        }))
      }
    }

    getAddress()
  }, [mounted, wallet, walletConnectionStatus])

  // Second effect: Fetch user data once we have an address
  useEffect(() => {
    const fetchUserData = async () => {
      // Don't proceed if not mounted yet or no address
      if (!mounted || !state.address) return

      console.log("useNavUser: Fetching user data for address:", state.address)

      try {
        // Get user data from Supabase
        const { data: userData, error } = await supabase.from("users").select("*").eq("address", state.address).single()

        if (error) {
          console.error("Error fetching user data:", error)
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }))
          return
        }

        if (userData) {
          let verificationStatus: VerificationStatus = undefined

          // Set user type specific data
          if (userData.user_type === "individual") {
            const userName = `${userData.first_name || ""} ${userData.last_name || ""}`.trim() || "User"

            setState((prev) => ({
              ...prev,
              userType: "individual",
              userName,
              isLoading: false,
            }))
          } else if (userData.user_type === "business") {
            const businessName = userData.business_name || "Business"

            // Fetch business verification status
            if (userData.business_id) {
              const { data: businessData, error: businessError } = await supabase
                .from("kyb")
                .select("status")
                .eq("id", userData.business_id)
                .single()

              if (!businessError && businessData) {
                verificationStatus = businessData.status as VerificationStatus
              }
            }

            setState((prev) => ({
              ...prev,
              userType: "business",
              businessName,
              verificationStatus,
              isLoading: false,
            }))
          } else {
            // Default case if user_type is not set
            setState((prev) => ({
              ...prev,
              isLoading: false,
            }))
          }
        } else {
          // User is logged in but no user data found
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }))
        }
      } catch (err) {
        console.error("Error in fetchUserData:", err)
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }))
      }
    }

    fetchUserData()
  }, [mounted, state.address,address])

  // Handle logout - clear stored address
  useEffect(() => {
    const handleLogout = () => {
      try {
        localStorage.removeItem("userWalletAddress")
      } catch (err) {
        console.error("Error removing address from localStorage:", err)
      }
    }

    // Listen for logout events
    window.addEventListener("logout", handleLogout)
    return () => window.removeEventListener("logout", handleLogout)
  }, [])

  return {
    ...state,
    isMounted: mounted,
  }
}
