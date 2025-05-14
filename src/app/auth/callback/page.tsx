"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUserAuth } from "@/context/AuthContext"
import { useThirdwebAuth } from "@/hooks/useThirdwebAuth"
import { useUserAddress } from "@/hooks/useUserAddress"
import { addUser, getUserByAddress } from "@/app/actions/user"

export default function AuthCallbackPage() {
  const router = useRouter()
  const { session } = useUserAuth()
  const { connectWithThirdweb } = useThirdwebAuth()
  const walletAddress = useUserAddress()
  const [hasHandled, setHasHandled] = useState(false)

  useEffect(() => {
    if (!session?.user?.email || !walletAddress || hasHandled) return

    const handleOAuthCallback = async () => {
      try {
        setHasHandled(true)

        const email = session.user.email
        const userId = session.user.id

        // Connect Thirdweb wallet (Google OAuth)
        await connectWithThirdweb("google", "oauth")

        // Check if user exists in Supabase
        const existing = await getUserByAddress(undefined, userId)

        if (!existing.success || !existing.user) {
          await addUser({
            userID: userId,
            user_type: "individual",
            address: walletAddress,
            email,
          })
        }

        router.replace("/campaigns")
      } catch (err) {
        console.error("OAuth callback error:", err)
        router.replace("/signin?error=oauth_failed")
      }
    }

    handleOAuthCallback()
  }, [session?.user?.email, walletAddress, hasHandled])

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-green-500">Finalizing login...</p>
    </div>
  )
}
