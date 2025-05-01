// import { useActiveAccount } from "thirdweb/react"

// export function useUserAddress() {
//   const account = useActiveAccount();
//   return account?.address || "";
// }


"use client";

import { useActiveAccount } from "thirdweb/react";

export function useUserAddress() {
  const account = useActiveAccount();
  return account?.address || "";
}
