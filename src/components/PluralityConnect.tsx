"use client";

import { useEffect } from "react";
import { PluralitySocialConnect } from "@plurality-network/smart-profile-wallet";
import { pluralityConfig } from "@/lib/plurality";

const PluralityConnect = () => {
  const handleDataReturned = (data: any) => {
    const receivedData = JSON.parse(JSON.stringify(data));
    console.log("Login info callback data (Inside dApp)::", receivedData);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginInfo = await PluralitySocialConnect.getLoginInfo();
        if (loginInfo) {
          handleDataReturned(loginInfo);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="inline-block">
      <PluralitySocialConnect
        options={pluralityConfig}
        onDataReturned={handleDataReturned}
      />
    </div>
  );
};

export default PluralityConnect;
