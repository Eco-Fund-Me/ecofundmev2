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
  const { connectWithThirdweb } = useThirdwebAuth();
  const walletAddress = useUserAddress();
  const [hasHandled, setHasHandled] = useState(false);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        if (hasHandled) return;
        if (!session?.user?.email || !walletAddress) return;

        setHasHandled(true); // Prevent double invocation

        const email = session.user.email;
        const userId = session.user.id;

        // Connect Thirdweb wallet (Google OAuth)
        await connectWithThirdweb("google", "oauth");

        // Check if user already exists in DB
        const existing = await getUserByAddress(userId); // or walletAddress
        if (!existing.user) {
          await addUser({
            userID: userId,
            user_type: "individual",
            address: walletAddress,
            email,
          });
        }

        router.replace("/campaigns");
      } catch (err) {
        console.error("OAuth callback error:", err);
        router.replace("/signin?error=oauth_failed");
      }
    };

    handleOAuthCallback();
  }, [session, walletAddress, hasHandled]); // 👈 properly scoped deps

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-green-500">Finalizing login...</p>
    </div>
  );
}
