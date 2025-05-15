"use client"

import { useEffect, useRef } from "react"
import { useRouter,useSearchParams } from "next/navigation"
import { useUserAuth } from "@/context/AuthContext"
import { useUserAddress } from "@/hooks/useUserAddress"
import { addUser, getUserByAddress } from "@/app/actions/user"

export default function AuthCallback() {
  const router = useRouter()
  const { session } = useUserAuth()
  const walletAddress = useUserAddress()
  const hasHandled = useRef(false)
  const searchParams = useSearchParams()
const provider = searchParams.get("provider") as "google" | "apple" | null

  useEffect(() => {
    const processUser = async () => {
      if (hasHandled.current || !session?.user?.email || !walletAddress) return
      hasHandled.current = true

      const { email, id: userId } = session.user

      const existing = await getUserByAddress(undefined, userId)
      if (!existing.success || !existing.user) {
        await addUser({
          userID: userId,
          user_type: "individual",
          address: walletAddress,
          email,
        })
      }
      await connectWithThirdweb(provider ?? "google", "oauth")

      router.replace("/campaigns")
    }

    processUser()
  }, [session?.user?.email, walletAddress])

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-green-500">Logging you in…</p>
    </div>
  )
}

// "use client"

// import { useEffect, useRef } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useUserAuth } from "@/context/AuthContext"
// import { useThirdwebAuth } from "@/hooks/useThirdwebAuth"
// import { useUserAddress } from "@/hooks/useUserAddress"
// import { addUser, getUserByAddress } from "@/app/actions/user"

// export default function AuthCallbackPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const provider = searchParams.get("provider") as "google" | "apple" | null
//   const { session } = useUserAuth()
//   const { connectWithThirdweb } = useThirdwebAuth()
//   const walletAddress = useUserAddress()
//   const hasHandled = useRef(false)

//   useEffect(() => {
//     const handleOAuthCallback = async () => {
//       try {
//          if (!session?.user?.email || !walletAddress || hasHandled.current) return

//         hasHandled.current = true

//      const { email, id: userId } = session.user

//         // Check if user exists in your DB
//         const existing = await getUserByAddress(undefined, userId)

//         if (!existing.success || !existing.user) {
//           // New user - add user to DB
//           await addUser({
//             userID: userId,
//             user_type: "individual",
//             address: walletAddress,
//             email,
//           })

//           // Connect wallet with the correct OAuth provider
//           await connectWithThirdweb(provider ?? "google", "oauth")
//         }

//         router.replace("/campaigns")
//       } catch (err) {
//         console.error("OAuth callback error:", err)
//         router.replace("/signin?error=oauth_failed")
//       }
//     }

//     handleOAuthCallback()
//   }, [session?.user?.email, walletAddress, router, connectWithThirdweb, provider])

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <p className="text-green-500 text-lg">Finalizing login...</p>
//     </div>
//   )
// }
