"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/AuthContext";
import { useThirdwebAuth } from "@/hooks/useThirdwebAuth";
import { useUserAddress } from "@/hooks/useUserAddress";
import { addUser, getUserByAddress } from "@/app/actions/user";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { session } = useUserAuth();
  const { connectWithThirdweb, getWalletAddress } = useThirdwebAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      if (isProcessing) return;

      // Wait until session is ready
      if (!session?.user?.email || !session.user?.id) return;

      setIsProcessing(true);

      try {
        const email = session.user.email;
        const userId = session.user.id;

        // 1. Connect to Thirdweb wallet (Google OAuth strategy)
        await connectWithThirdweb("google", "oauth");

        // 2. Wait and get wallet address from Thirdweb
        const address = getWalletAddress();
        if (!address) {
          throw new Error("Wallet address unavailable after Thirdweb connection");
        }

        // 3. Check if user exists
        const existing = await getUserByAddress(undefined, userId);

        if (!existing.success || !existing.user) {
          // 4. Add to DB if not found
          await addUser({
            userID: userId,
            user_type: "individual",
            address,
            email,
          });
        }

        // 5. Redirect
        router.replace("/campaigns");
      } catch (err) {
        console.error("OAuth callback error:", err);
        router.replace("/signin?error=oauth_failed");
      } finally {
        setIsProcessing(false);
      }
    };

    handleOAuthCallback();
  }, [session]); // Only react to session change

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-green-500">Finalizing login...</p>
    </div>
  );
}
