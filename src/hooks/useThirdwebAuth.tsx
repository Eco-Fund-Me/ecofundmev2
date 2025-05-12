// import { useState } from "react";
// import { inAppWallet } from "thirdweb/wallets";
// import { useConnect } from "thirdweb/react";
// import { client } from "@/app/client";
// import { useUserAuth } from "@/context/AuthContext";

// type LoginMethod = "google" | "apple" | "custom";

// export function useThirdwebAuth() {
//   const { session, signInUser, signOut } = useUserAuth();
//   const { connect } = useConnect();
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const connectWithThirdweb = async (method: LoginMethod, email?:string, password?:string) => {
//     setIsConnecting(true);
//     setError(null);

//     try {
//       if (method === "custom") {
//         // Ensure Supabase session
//         if (!session) {
//           const result = await signInUser(email!, password!); 
//           if (!result.success) throw new Error(result.error || "Failed to sign in");
//         }

//         const userId = session?.user?.id;
//         if (!userId) throw new Error("No user ID found in session");

//         await connect(async () => {
//             const wallet = inAppWallet();
//             await wallet.connect({
//               client,
//               strategy: "auth_endpoint",
//               payload: JSON.stringify({ userId }),
//             });
//             return wallet;
//           });
          
//       } else {
//         // Google or Apple
//         await connect(async () => {
//             const wallet = inAppWallet();
//             await wallet.connect({
//               client,
//               strategy: method,
//             });
//             return wallet;
//           });
          
//       }
//     } catch (err) {
//       console.error("Wallet connection error:", err);
//       setError(err instanceof Error ? err.message : "An unexpected error occurred");
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   return {
//     connectWithThirdweb,
//     signOut,
//     isConnecting,
//     error,
//     session,
//   };
// }


"use client"

import { useState } from "react"
import { inAppWallet } from "thirdweb/wallets"
import { useConnect, useActiveAccount } from "thirdweb/react"
import { client } from "@/app/client"
import { useUserAuth } from "@/context/AuthContext"
import { addUser } from "@/app/actions/user" 
import { chain } from "@/app/chain"

type LoginMethod = "google" | "apple" | "custom"

export function useThirdwebAuth() {
  const { session, signInUser, signOut } = useUserAuth()
  const { connect } = useConnect()
  const account = useActiveAccount() // Get the active account
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectWithThirdweb = async (method: LoginMethod, email?: string, password?: string, userData?: any) => {
    setIsConnecting(true)
    setError(null)

    try {
      if (method === "custom") {
        // Ensure Supabase session
        if (!session) {
          const result = await signInUser(email!, password!)
          if (!result.success) throw new Error(result.error || "Failed to sign in")
        }

        const userId = session?.user?.id
        if (!userId) throw new Error("No user ID found in session")

        // Connect wallet
        await connect(async () => {
          const wallet = inAppWallet()
          await wallet.connect({
            client,
            strategy: "auth_endpoint",
            payload: JSON.stringify({ userId }),
            chain:chain
             
          })
          return wallet
        })

        // Get wallet address after connection
        const address = account?.address
        if (address && userData) {
          // Add user to database with wallet address
          await addUser({
            userID:session.user.id,
            user_type: userData.user_type,
            address,
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            business_name: userData.business_name,
            business_id: userData.business_id,
          })
        }
      } else {
        // Google or Apple
        let walletId 
        await connect(async () => {
          const wallet = inAppWallet()
          await wallet.connect({

            client,
            strategy: method,
            chain:chain

          })
           walletId = wallet.id
          return wallet
         
        })

        // Get wallet address after connection
        const address = account?.address
        if (address && userData) {
          // Add user to database with wallet address
          await addUser({
            userID:  walletId || "",
            user_type: "individual",
            address,
            email: userData.email || `${method}_user@example.com`, // Placeholder if email not available
          })
        }
      }
    } catch (err) {
      console.error("Wallet connection error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsConnecting(false)
    }
  }

  // Helper function to get the current wallet address
  const getWalletAddress = () => {
    return account ? account.address : ""
  }

  return {
    connectWithThirdweb,
    signOut,
    isConnecting,
    error,
    session,
    getWalletAddress,
  }
}