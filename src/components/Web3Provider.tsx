"use client";

import { ThirdwebProvider, AutoConnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { client } from "@/app/client";
import { chain } from "@/app/chain";

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  const wallets = [inAppWallet()];

  return (
    <ThirdwebProvider>
      <AutoConnect client={client} chain={chain} wallets={wallets} />
      {children}
    </ThirdwebProvider>
  );
}
