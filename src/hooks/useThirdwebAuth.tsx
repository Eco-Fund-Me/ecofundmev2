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
import { chain } from "@/app/chain"

type LoginMethod = "google" | "apple" | undefined
type AuthOption = "email-password" | "oauth" | undefined

export function useThirdwebAuth() {
  const { session, signInUser, signOut, signInWithOAuth } = useUserAuth()
  const { connect } = useConnect()
  const account = useActiveAccount()

  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connectWithThirdweb = async (
    OAuthMethod: LoginMethod,
    authOption: AuthOption,
    email?: string,
    password?: string
  ) => {
    setIsConnecting(true)
    setError(null)

    try {
      let userId: string | null = null
      // 1. Authenticate with Supabase (if not already)
      if (!session) {
        if (authOption === "oauth") {
          const result = await signInWithOAuth(OAuthMethod)
          if (!result.success || !result.data?.user?.id) {
            throw new Error(result.error || "OAuth sign-in failed or missing user")
          }
          userId = session?.user?.id;
       
        } else if (authOption === "email-password") {
          if (!email || !password) throw new Error("Missing email or password")
          const result = await signInUser(email, password)
          if (!result.success || !result.data?.user?.id) {
            throw new Error(result.error || "Email/password sign-in failed")
          }
          userId = session?.user?.id;
       
        } else {
          throw new Error("Invalid auth method")
        }
      } else {
        userId = session.user?.id ?? null
      }

      if (!userId) throw new Error("User ID is missing")

      // 2. Connect wallet using Thirdweb (inAppWallet + auth)
      await connect(async () => {
        const wallet = inAppWallet()
        await wallet.connect({
          client,
          strategy: "auth_endpoint",
          payload: JSON.stringify({ userId }),
          chain,
        })
        return wallet
      })
    } catch (err) {
      console.error("Thirdweb wallet connection error:", err)
      setError(err instanceof Error ? err.message : "Unexpected connection error")
    } finally {
      setIsConnecting(false)
    }
  }

  const getWalletAddress = () => account?.address ?? ""

  return {
    connectWithThirdweb,
    signOut,
    isConnecting,
    error,
    session,
    getWalletAddress,
  }
}
