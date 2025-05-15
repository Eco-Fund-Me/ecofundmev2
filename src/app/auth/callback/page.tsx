// "use client"

// import { useEffect, useRef } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useUserAuth } from "@/context/AuthContext"
// import { useUserAddress } from "@/hooks/useUserAddress"
// import { addUser, getUserByAddress } from "@/app/actions/user"
// // import { useThirdwebAuth } from "@/hooks/useThirdwebAuth"

// export default function AuthCallback() {
//   const router = useRouter()
//   const { session } = useUserAuth()
//   const walletAddress = useUserAddress()
//   const hasHandled = useRef(false)

//   const searchParams = useSearchParams()
//   const rawProvider = searchParams.get("provider")
//   const provider = (rawProvider === "google" || rawProvider === "apple") ? rawProvider : "google"

//   // const { connectWithThirdweb, error } = useThirdwebAuth()

//   useEffect(() => {
//     const processUser = async () => {
//       if (hasHandled.current || !session?.user?.email || !walletAddress) return
//       hasHandled.current = true

//       const { email, id: userId } = session.user

//       try {
//         const existing = await getUserByAddress(undefined, userId)
//         if (!existing.success || !existing.user) {
//           await addUser({
//             userID: userId,
//             user_type: "individual",
//             address: walletAddress,
//             email,
//           })
//         }

//         // ✅ Connect wallet after user exists
//         // await connectWithThirdweb(provider, "oauth")

//         // ✅ Navigate only after connection
//         router.replace("/campaigns")
//       } catch (err) {
//         console.error("Auth callback error:", err)
//       }
//     }

//     processUser()
//   }, [session?.user?.email, walletAddress])

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="text-center">
//         <p className="text-green-500">Logging you in…</p>
//         {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
//       </div>
//     </div>
//   )
// }


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

