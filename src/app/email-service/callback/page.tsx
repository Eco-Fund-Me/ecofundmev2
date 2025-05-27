
"use client"

import { useEffect, useRef } from "react"
import { useRouter,  useSearchParams  } from "next/navigation"
import { useUserAuth } from "@/context/AuthContext"
import {  updateUser } from "@/app/actions/user"
import { useThirdwebAuth} from "@/hooks/useThirdwebAuth"
import {  checkUserWallet } from "@/app/actions/wallet";



export default function AuthCallback() {
  const router = useRouter()
  const { session } = useUserAuth()
  const searchParams =  useSearchParams()
  const userType = searchParams.get("userType")
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

      try {


        const redirectLink =  userType == "business"?  "/organization/dashboard": "/campaign"

        // 3️⃣ Connect to Thirdweb
       const wallet = await connectWithThirdweb()
       
        const walletAddress = wallet?.getAccount()?.address
      
      

const hasWallet = await waitForWalletCheck(userId);

    if (!hasWallet && walletAddress) {
    const updateResult = await updateUser({
        address: walletAddress,
        user_id: userId,
    });

    console.log("updateResult:", updateResult)
  if (updateResult.success) {
    console.log("User updated:", updateResult.updatedUser);
  } else {
    console.error("Update failed:", updateResult.error);
  }
}

        // 4️⃣ Redirect
        router.replace(redirectLink)
      } catch (error) {
        console.error("Auth callback error:", error)
      }
    }

    processUser()
  }, [session?.user,connectWithThirdweb,router])

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-green-500">Logging you in…</p>
    </div>
  )
}

