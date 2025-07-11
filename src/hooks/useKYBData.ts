"use client"

import { useState, useEffect } from "react"
import { getMockKYBData, type MockKYBData, type KYBStatus } from "@/data/kybData"

// This hook simulates fetching KYB data from a database
export function useKYBData(userAddress: string | undefined, demoStatus?: KYBStatus) {
  const [kybData, setKYBData] = useState<MockKYBData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call with a timeout
    const timer = setTimeout(() => {
      try {
        if (!userAddress) {
          setKYBData(null)
          setIsLoading(false)
          return
        }

        // For demo purposes, we'll use the provided status or determine based on address
        let status: KYBStatus = demoStatus || "pending"

        // If no demo status is provided, use the last character of the address to determine status
        if (!demoStatus) {
          const lastChar = userAddress.slice(-1).toLowerCase()
          if (lastChar >= "a" && lastChar <= "d") {
            status = "approved"
          } else if (lastChar >= "e" && lastChar <= "j") {
            status = "pending"
          } else if (lastChar >= "k" && lastChar <= "p") {
            status = "rejected"
          } else {
            status = "not_started"
          }
        }

        // Get mock data based on status
        const mockData = getMockKYBData(status)

        // Update the address to match the user's address
        mockData.userAddress = userAddress

        setKYBData(mockData)
        setIsLoading(false)
      } catch (err) {
        console.error("Error in useKYBData:", err)
        setError("An unexpected error occurred")
        setIsLoading(false)
      }
    }, 1000) // Simulate network delay

    return () => clearTimeout(timer)
  }, [userAddress, demoStatus])

  return { kybData, isLoading, error }
}
