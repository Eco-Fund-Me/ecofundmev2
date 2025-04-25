import { useState } from "react";
import { inAppWallet } from "thirdweb/wallets";
import { useConnect } from "thirdweb/react";
import { client } from "@/app/client";
import { useUserAuth } from "@/context/AuthContext";

type LoginMethod = "google" | "apple" | "custom";

export function useThirdwebAuth() {
  const { session, signInUser, signOut } = useUserAuth();
  const { connect } = useConnect();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWithThirdweb = async (method: LoginMethod, email?:string, password?:string) => {
    setIsConnecting(true);
    setError(null);

    try {
      if (method === "custom") {
        // Ensure Supabase session
        if (!session) {
          const result = await signInUser(email!, password!); 
          if (!result.success) throw new Error(result.error || "Failed to sign in");
        }

        const userId = session?.user?.id;
        if (!userId) throw new Error("No user ID found in session");

        await connect(async () => {
            const wallet = inAppWallet();
            await wallet.connect({
              client,
              strategy: "auth_endpoint",
              payload: JSON.stringify({ userId }),
            });
            return wallet;
          });
          
      } else {
        // Google or Apple
        await connect(async () => {
            const wallet = inAppWallet();
            await wallet.connect({
              client,
              strategy: method,
            });
            return wallet;
          });
          
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    connectWithThirdweb,
    signOut,
    isConnecting,
    error,
    session,
  };
}
