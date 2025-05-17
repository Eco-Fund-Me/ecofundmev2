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


// "use client"

// import { useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
// import { useUserAuth } from "@/context/AuthContext"
// import { useUserAddress } from "@/hooks/useUserAddress"
// import { addUser, getUserByAddress } from "@/app/actions/user"
// import { useThirdwebAuth } from "@/hooks/useThirdwebAuth"

// export default function AuthCallback() {
//   const router = useRouter()
//   const { session } = useUserAuth()
//   const walletAddress = useUserAddress()
//   const { connectWithThirdweb } = useThirdwebAuth()

//   const hasHandled = useRef(false)

//   useEffect(() => {
//     const processUser = async () => {
//       if (hasHandled.current || !session?.user?.email || !walletAddress) return
//       hasHandled.current = true

//       const { email, id: userId } = session.user

//       try {
//         // Check if user exists
//         const existing = await getUserByAddress(undefined, userId)
//         if (!existing.success || !existing.user) {
//           await addUser({
//             userID: userId,
//             user_type: "individual",
//             address: walletAddress,
//             email,
//           })
//         }

//         // 🔐 Connect to thirdweb wallet using userId from session
//         await connectWithThirdweb()

//         // ✅ Redirect to dashboard
//         router.replace("/campaigns")
//       } catch (error) {
//         console.error("Auth callback error:", error)
//       }
//     }

//     processUser()
//   }, [session?.user, walletAddress])

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <p className="text-green-500">Logging you in now…</p>
//     </div>
//   )
// }


"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUserAuth } from "@/context/AuthContext"
import { useUserAddress } from "@/hooks/useUserAddress"
import { addUser, getUserByAddress, updateUser } from "@/app/actions/user"
import { useThirdwebAuth } from "@/hooks/useThirdwebAuth"
import {  checkUserWallet } from "@/app/actions/wallet";

export default function AuthCallback() {
  const router = useRouter()
  const { session } = useUserAuth()
  const walletAddress = useUserAddress()
  const { connectWithThirdweb } = useThirdwebAuth()

  const hasHandled = useRef(false)
  async function waitForWalletCheck(userId: string, maxRetries = 5, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    const { hasWallet } = await checkUserWallet(userId);
    if (hasWallet !== undefined) {
      return hasWallet;
    }
    await new Promise((res) => setTimeout(res, delay));
  }
  return false; // fallback if retries exhausted
}

  useEffect(() => {
    const processUser = async () => {
      if (hasHandled.current) return
      if (!session?.user?.id || !session.user.email) return

      hasHandled.current = true

      const userId = session.user.id
      const email = session.user.email

      try {
        // 1️⃣ Check if user exists
        const existing = await getUserByAddress(undefined, userId)

        if (!existing.success || !existing.user) {
          // 2️⃣ If not, add user to DB
          await addUser({
            userID: userId,
            user_type: "individual", // or dynamically detect later
            address: walletAddress,
            email,
          })
        }

        // 3️⃣ Connect to Thirdweb
        await connectWithThirdweb()
      //   // 4️⃣ Assign wallet address if not already assigned
      //   console.log(walletAddress)
      //   const { hasWallet } = await checkUserWallet(userId)
      //    console.log("haswallet",hasWallet)
      //   if (!hasWallet && walletAddress) {
      //       const updateResult = await updateUser({
      //             address: walletAddress,
      //             user_id: userId
      //           })
      //           if (updateResult.success) {
      //   console.log("User updated:", updateResult.updatedUser)
      // } else {
      //   console.error("Update failed:", updateResult.error)
      // }

      //   }

      console.log(walletAddress)

const hasWallet = await waitForWalletCheck(userId);
console.log("hasWallet", hasWallet)

if (!hasWallet && walletAddress) {
  const updateResult = await updateUser({
    address: walletAddress,
    user_id: userId,
  });

  if (updateResult.success) {
    console.log("User updated:", updateResult.updatedUser);
  } else {
    console.error("Update failed:", updateResult.error);
  }
}

        // 4️⃣ Redirect
        router.replace("/campaigns")
      } catch (error) {
        console.error("Auth callback error:", error)
      }
    }

    processUser()
  }, [session?.user, walletAddress,connectWithThirdweb,router])

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-green-500">Logging you in…</p>
    </div>
  )
}
