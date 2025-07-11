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

export function useThirdwebAuth() {
  const { session} = useUserAuth()
  const { connect } = useConnect()
  const account = useActiveAccount()

  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

const connectWithThirdweb = async () => {
  setIsConnecting(true)
  setError(null)

  try {
    const userId = session?.user?.id
    if (!userId) throw new Error("Session missing user ID")
      

    // Connect thirdweb wallet
   const wallet = await connect(async () => {
      const wallet = inAppWallet()
      await wallet.connect({
        client,
        strategy: "auth_endpoint",
        payload: JSON.stringify({ userId }),
        chain,
      })
      return wallet
    })

    return wallet
  } catch (err) {
    console.error("Thirdweb connection error:", err)
    setError(err instanceof Error ? err.message : "Unexpected error")
  } finally {
    setIsConnecting(false)
  }
}

  const getWalletAddress = () => account?.address ?? ""

  return {
    connectWithThirdweb,
    isConnecting,
    error,
    session,
    getWalletAddress,
  }
}
