/* eslint-disable */
//@ts-nocheck
import { PluralitySocialConnect } from "@plurality-network/smart-profile-wallet";
import type { ConnectedAccountDataType } from "@plurality-network/smart-profile-wallet";

export const pluralityConfig = {
  clientId: process.env.NEXT_PUBLIC_PLURALITY_CLIENT_ID || "6bda3a8f-aac6-4175-a199-c8b73e670dbc",
  theme: "dark",
  text: "Login",
};

export const pluralityHelpers = {
  getSmartProfileData: async () => {
    try {
      const response = await PluralitySocialConnect.getSmartProfileData();
      console.log("Smart Profile Data:", response);
      if (response?.data) {
        return {
          name: response.data.username || "Anonymous",
          avatar: response.data.avatar || "/avatar.png",
        };
      }
      return null;
    } catch (error) {
      console.error("Error getting smart profile data:", error);
      return null;
    }
  },

  getAllAccounts: async () => {
    try {
      const response = await PluralitySocialConnect.getLoginInfo();
      console.log("Raw Login Info:", response);

      if (response?.status && response?.pluralityToken) {
        // Get profile data after successful login
        const profileData = await PluralitySocialConnect.getSmartProfileData();
        console.log("Profile Data after login:", profileData);

        if (profileData?.data?.rows?.[0]) {
          const userData = profileData.data.rows[0];
          return {
            name: userData.username || "Anonymous",
            avatar: userData.avatar || "/avatar.png",
            bio: userData.bio,
            connectedPlatforms: userData.connectedPlatforms,
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error getting accounts:", error);
      return null;
    }
  },

  getConnectedAccount: async () => {
    try {
      const response = await PluralitySocialConnect.getConnectedAccount();
      console.log("Connected Account Response:", response);
      return response?.data?.address || null;
    } catch (error) {
      console.error("Error getting connected account:", error);
      return null;
    }
  },

  getBalance: async () => {
    try {
      const response = await PluralitySocialConnect.getBalance();
      console.log("Balance Response:", response);
      return response?.data || "0";
    } catch (error) {
      console.error("Error getting balance:", error);
      return "0";
    }
  },

  getMessageSignature: async (message: string) => {
    try {
      const response =
        await PluralitySocialConnect.getMessageSignature(message);
      console.log("Message Signature Response:", response);
      return response?.data || null;
    } catch (error) {
      console.error("Error getting message signature:", error);
      return null;
    }
  },
};
