"use client"
import {client} from "@/app/client"
import { ConnectButton } from "thirdweb/react";
import {inAppWallet} from "thirdweb/wallets"
import {chain, chainId} from "@/app/chain"
interface Email{
    label:string
}
export default function EmailLogin({label}: Email) {
  return (
    <div className="flex items-center">
          <ConnectButton
              client={client} 
                wallets={[inAppWallet({
                    auth:{options:["email"]}
                })]}
                  chain={chain}
        supportedTokens={{
          [chainId]: [
            {
              name: "ECO Coin",
              address: "0xf85aab5cd1029c8b3f765e4d3e5c871843e25740",
              symbol: "eco",
             icon:""
            },
          ],
        }}
              theme={"light"}
              connectButton={{
                  className: "email-wallet",
                  label: label,
                  style: {
                    border: "1px solid #4CAF50",
                    color: "#4CAF50",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "9999px", // rounded-full
                    paddingLeft: "1.25rem", // px-5
                    paddingRight: "1.25rem",
                    alignItems: "center",
                    position: "relative",
                    height: "38px",
                    width: "106.4px",
                    transition: "all 0.3s ease", // for hover effects

                  }
              }}
          />
    </div>
  );
}