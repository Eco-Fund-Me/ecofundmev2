
"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUserAuth } from "@/context/AuthContext"
import {  updateUser } from "@/app/actions/user"
import { useThirdwebAuth} from "@/hooks/useThirdwebAuth"
import {  checkUserWallet } from "@/app/actions/wallet";
import { useActiveWallet } from "thirdweb/react"

export default function AuthCallback() {
  const router = useRouter()
  const { session } = useUserAuth()
  const wallet = useActiveWallet()

  
  const { connectWithThirdweb,getWalletAddress } = useThirdwebAuth()
  const safeAddress = getWalletAddress()

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



        // 3️⃣ Connect to Thirdweb
        await connectWithThirdweb()
       

      
      console.log("safeAddress",safeAddress)

const hasWallet = await waitForWalletCheck(userId);
 const walletAddress =  wallet?.getAccount()?.address
 console.log("walletAddress",walletAddress) 
    console.log("hasWallet", hasWallet)

    if (!hasWallet && walletAddress) {
    const updateResult = await updateUser({
        address: safeAddress,
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
        router.replace("/organization/dashboard")
      } catch (error) {
        console.error("Auth callback error:", error)
      }
    }

    processUser()
  }, [session?.user,connectWithThirdweb,router, wallet,safeAddress])

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-green-500">Logging you in…</p>
    </div>
  )
}

