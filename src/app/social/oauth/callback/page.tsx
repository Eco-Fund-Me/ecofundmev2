
"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUserAuth } from "@/context/AuthContext"
import { addUser, getUserByAddress } from "@/app/actions/user"
import { useMatrix } from "@/hooks/useMatrix"
import { trackAuthCallbackError, trackUserLoggedIn, trackUserSignedUp } from "@/utils/mixpanel/mixpanelAuthTracker"


export default function AuthCallback() {
  const { register, login } = useMatrix()
  const router = useRouter()
  const { session } = useUserAuth()
  const hasHandled = useRef(false)

  useEffect(() => {
    const processUser = async () => {
      if (hasHandled.current) return
      if (!session?.user?.id || !session.user.email) return

      hasHandled.current = true

      const userId = session.user.id
      const email = session.user.email
      const loginMethod = 'OAuth'
      const userType = 'individual'

      try {
        // 1️⃣ Check if user exists
        const existing = await getUserByAddress(undefined,userId)

        if (!existing.success || !existing.user) {
          // 2️⃣ If not, add user to DB and register with Matrix
          await addUser({
            userID: userId,
            user_type: "individual",
            email,
          })

          const userMetadata = session.user.user_metadata
          let firstName = userMetadata?.firstName || ""
          let lastName = userMetadata?.lastName || ""

          // If a fullName exists but individual names don't, try to parse
          if (!firstName && !lastName && userMetadata?.fullName) {
            const nameParts = userMetadata.fullName.split(' ')
            firstName = nameParts[0] || ""
            lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ""
          }

          // Register new user with Matrix
          await register({
            address:"",
            userId,
            email: session.user.email,
            firstName,
            lastName,
          })

          trackUserSignedUp({ userId, email, loginMethod, userType })
        } else if (existing.user.matrix_user_id) {
          // 3️⃣ If user exists and has a Matrix user ID, log them in
          await login({ userId })
          trackUserLoggedIn({ userId, email, loginMethod })
        } else {
          // 4️⃣ If user exists but no Matrix user ID, register with Matrix
          const userMetadata = session.user.user_metadata
          let firstName = userMetadata?.firstName || ""
          let lastName = userMetadata?.lastName || ""

          if (!firstName && !lastName && userMetadata?.fullName) {
            const nameParts = userMetadata.fullName.split(' ')
            firstName = nameParts[0] || ""
            lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ""
          }

          await register({
            address: "",
            userId,
            email: session.user.email,
            firstName,
            lastName,
          })

          trackUserSignedUp({ userId, email, loginMethod, userType })
        }

        // 5️⃣ Redirect
        router.replace("/social")
      } catch (error) {
        console.error("Auth callback error:", error)
        trackAuthCallbackError(error as Error, loginMethod, userId)
      }
    }

    processUser()
  }, [session?.user, router, register, login])

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-green-500">Logging you in…</p>
    </div>
  )
}