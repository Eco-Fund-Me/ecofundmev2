// import { useActiveAccount } from "thirdweb/react"

// export function useUserAddress() {
//   const account = useActiveAccount();
//   return account?.address || "";
// }


"use client";

import { useActiveAccount } from "thirdweb/react";
import { useActiveWallet } from "thirdweb/react";



export function useUserAddress() {
  const account = useActiveAccount();
  return account?.address || "";
}


export function useUserWallet()
{
  const wallet = useActiveWallet()
  const walletId = wallet?.id
  return walletId || ""
}






