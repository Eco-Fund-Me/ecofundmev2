"use client"

import { useState, useEffect } from "react"

export interface User {
  user_id: string
  address: string
  created_at: string
  business_id: string | null
  kyc_status: string | null
  kyc_verified_at: string | null
  kyc_verification_id: string | null
  kyc_rejection_reason: string | null
  document_type: string | null
  document_country: string | null
  document_number: string | null
  user_type: "individual" | "business"
  wallet_assigned_at: string | null
  oauth_provider: string | null
  first_name: string | null
  last_name: string | null
  email: string
  business_name: string | null
}

// Mock user data
const mockUser: User = {
  user_id: "user_123456",
  address: "0x1234567890abcdef1234567890abcdef12345678",
  created_at: "2023-01-01T00:00:00Z",
  business_id: "business_123456",
  kyc_status: "verified",
  kyc_verified_at: "2023-01-15T00:00:00Z",
  kyc_verification_id: "kyc_123456",
  kyc_rejection_reason: null,
  document_type: "passport",
  document_country: "US",
  document_number: "123456789",
  user_type: "business",
  wallet_assigned_at: "2023-01-02T00:00:00Z",
  oauth_provider: null,
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  business_name: "Green Earth Solutions",
}

export function useNavUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call with a timeout
    const timer = setTimeout(() => {
      try {
        setUser(mockUser)
        setIsLoading(false)
      } catch (err) {
        console.error("Error in useNavUser:", err)
        setError("An unexpected error occurred")
        setIsLoading(false)
      }
    }, 800) // Simulate network delay

    return () => clearTimeout(timer)
  }, [])

  return { user, isLoading, error }
}
