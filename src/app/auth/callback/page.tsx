


// "use client"

// import { useEffect, useRef } from "react"
// import { useRouter } from "next/navigation"
// import { useUserAuth } from "@/context/AuthContext"
// import { useUserAddress } from "@/hooks/useUserAddress"
// import { addUser, getUserByAddress, updateUser } from "@/app/actions/user"
// import { useThirdwebAuth} from "@/hooks/useThirdwebAuth"
// import {  checkUserWallet } from "@/app/actions/wallet";
// import {
//   trackUserLoggedIn,
//   trackUserSignedUp,
//   trackWalletConnected,
//   trackWalletReconnected,
//   trackAuthCallbackError,
//   trackWalletConnectionFailed
// } from '../../../utils/mixpanel/mixpanelAuthTracker';
// import { useMatrix } from "@/hooks/useMatrix"

// export default function AuthCallback() {
//   const { register } = useMatrix()
//   const router = useRouter()
//   const { session } = useUserAuth()
//   const walletAddress = useUserAddress()
//   const { connectWithThirdweb,getWalletAddress } = useThirdwebAuth()
//   const safeAddress = getWalletAddress()

//   const hasHandled = useRef(false)
//   async function waitForWalletCheck(userId: string, maxRetries = 5, delay = 1000) {
//   for (let i = 0; i < maxRetries; i++) {
//     const { hasWallet } = await checkUserWallet(userId);
//     if (hasWallet !== undefined) {
//       return hasWallet;
//     }
//     await new Promise((res) => setTimeout(res, delay));
//   }
//   return false; // fallback if retries exhausted
// }

//   useEffect(() => {
//     const processUser = async () => {
//       if (hasHandled.current) return
//       if (!session?.user?.id || !session.user.email) return

//       hasHandled.current = true

//       const userId = session.user.id
//       const email = session.user.email
//        const loginMethod = 'OAuth';
//       const userType = 'individual'; 

//       try {
//         // 1️⃣ Check if user exists
//         const existing = await getUserByAddress(undefined, userId)

//         if (!existing.success || !existing.user) {
//           // 2️⃣ If not, add user to DB
//           await addUser({
//             userID: userId,
//             user_type: "individual", // or dynamically detect later
//             address: walletAddress,
//             email,
//           })   
//           trackUserSignedUp({ userId, email, loginMethod, userType });
//         } else {
//           // Mixpanel: Track user login
//           trackUserLoggedIn({ userId, email, loginMethod });
//         }
//         // 3️⃣ Connect to Thirdweb
//         const wallet = await connectWithThirdweb()
      

//       console.log("walletAddress",walletAddress)
//       console.log("safeAddress",safeAddress)
//        const userAddress = wallet?.getAccount()?.address
//        const userMetadata = session.user.user_metadata;
// let firstName = userMetadata?.firstName || "";
// let lastName = userMetadata?.lastName || "";

// // If a fullName exists but individual names don't, try to parse
//     if (!firstName && !lastName && userMetadata?.fullName) {
//       const nameParts = userMetadata.fullName.split(' ');
//       firstName = nameParts[0] || "";
//       lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : "";
//     }

//     // Then use these variables in your register call
//     await register({
//       userId,
//       address: userAddress || walletAddress,
//       email: session.user.email,
//       firstName: firstName,
//       lastName: lastName,
//     });

//       const hasWallet = await waitForWalletCheck(userId);
//       console.log("hasWallet", hasWallet)

//     if (!hasWallet && safeAddress) {
//           const updateResult = await updateUser({
//             address: safeAddress,
//             user_id: userId,
//           });

//           if (updateResult.success) {
//             // Mixpanel: Track wallet connected
//             trackWalletConnected({
//               userId,
//               walletAddress: safeAddress,
//               connectionMethod: 'OAuth Callback Auto-Connect',
//             });
//           } else {
//             console.error("Update failed:", updateResult.error);
//             // Mixpanel: Track wallet connection failed
//             trackWalletConnectionFailed(new Error(updateResult.error), 'OAuth Callback Auto-Connect', userId);
//           }
//         } else if (hasWallet && safeAddress && existing.user && existing.user.address !== safeAddress) {
//             // Mixpanel: Track wallet reconnected
//             trackWalletReconnected({
//                 userId,
//                 walletAddress: safeAddress,
//                 oldWalletAddress: existing.user.address,
//                 connectionMethod: 'OAuth Callback Re-Connect',
//             });
//         }

//         // 4️⃣ Redirect
//         router.replace("/campaigns")
//       } catch (error) {
//         console.error("Auth callback error:", error)
//         trackAuthCallbackError(error as Error, loginMethod, userId);
//       }
//     }

//     processUser()
//   }, [session?.user, walletAddress,connectWithThirdweb,router])

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <p className="text-green-500">Logging you in…</p>
//     </div>
//   )
// }



"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUserAuth } from "@/context/AuthContext"
import { addUser, getUserByAddress } from "@/app/actions/user"
import { trackUserLoggedIn, trackUserSignedUp, trackAuthCallbackError } from '../../../utils/mixpanel/mixpanelAuthTracker'
import { useMatrix } from "@/hooks/useMatrix"


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
        router.replace("/campaigns")
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