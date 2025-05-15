"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUserAuth } from "@/context/AuthContext"
import { useUserAddress } from "@/hooks/useUserAddress"
import { addUser, getUserByAddress } from "@/app/actions/user"

export default function AuthCallback() {
  const router = useRouter()
  const { session } = useUserAuth()
  const walletAddress = useUserAddress()
  const hasHandled = useRef(false)

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
