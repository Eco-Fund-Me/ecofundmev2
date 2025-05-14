"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/AuthContext";
import { useThirdwebAuth } from "@/hooks/useThirdwebAuth";
import { useUserAddress } from "@/hooks/useUserAddress";
import { addUser } from "@/app/actions/user";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { session } = useUserAuth();
  const { connectWithThirdweb } = useThirdwebAuth();
  const walletAddress = useUserAddress();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Wait for session
        if (!session?.user?.email) return;

        const email = session.user.email;

        // Connect wallet using Thirdweb (strategy: Google)
        await connectWithThirdweb("google", "oauth", undefined, undefined,);

        const address = walletAddress;
        if (!address) {
          console.warn("No wallet address available after Thirdweb connection");
          return;
        }

        // Add user to DB (if not exists)
        await addUser({
          userID: session.user.id, // or use a UUID or supabase id if preferred
          user_type: "individual",
          address,
          email,
        });

        // Redirect after everything is set up
        router.replace("/campaigns");
      } catch (err) {
        console.error("OAuth callback error:", err);
        router.replace("/signin?error=oauth_failed");
      }
    };

    handleOAuthCallback();
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-green-500">Finalizing login...</p>
    </div>
  );
}
