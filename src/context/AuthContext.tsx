/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { assignWalletAddress, checkUserWallet } from "@/app/actions/wallet";
import { useActiveAccount } from "thirdweb/react";
// import { headers } from "next/headers";

interface AuthContextType {
  session: Session | null | undefined;
  signUpNewUser: (
    email: string,
    password: string,
    userType: "business" | "individual"
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  signInUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  signInWithOAuth: (provider: "google" | "apple" | undefined, callbackPath?:string) => Promise<{ success: boolean; data?: any; error?: string }>;

  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  userType: "individual" | "business" | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [userType, setUserType] = useState<"individual" | "business" | null>(null);
  const [isMounted, setIsMounted] = useState(false);


  const account = useActiveAccount();
  const walletAddress = account?.address || "";

  // ---------- AUTH FUNCTIONS ----------

  const signUpNewUser = async (
    email: string,
    password: string,
    userType:"business" | "individual"
  ): Promise<{ success: boolean; data?: any; error?: string }> => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options:{
        emailRedirectTo:`${location.origin}/email-service/callback?userType=${userType}`,
      }
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  };

const signInUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error) {
      console.error("Sign-in error:", error.message);
      return { success: false, error: error.message };
    }

    if (data.user) {
      const { data: userData } = await supabase
        .from("users")
        .select("user_type")
        .eq("user_id", data.user.id) // ✅ FIXED HERE
        .single();

      if (userData) {
        setUserType(userData.user_type as "individual" | "business");

        if (userData.user_type === "individual" && walletAddress) {
          const { hasWallet } = await checkUserWallet(data.user.id);
          if (!hasWallet) {
            await assignWalletAddress(data.user.id, walletAddress);
          }
        }
      }
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Unexpected sign-in error:", err.message);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};


  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error("Reset password error:", error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Unknown error" };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Unknown error" };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Sign-out error:", error.message);
    setUserType(null);
  };

  
//   const signInWithOAuth = async (
//   provider: "google" | "apple" | undefined
// ): Promise<{ success: boolean; data?: any; error?: string }> => {
  
//   if(provider === undefined){
//     throw Error("Oauth Provider is Undefined")
//   }
//   try {
//         // const origin = (await headers()).get("origin");
//     const { data, error } = await supabase.auth.signInWithOAuth({
//       provider,
//       options: {
//         redirectTo: `${window.location.origin}/auth/callback`, // Handle it after redirect
//         // redirectTo: `${origin}/auth/callback`, // Handle it after redirect
//       },
//     });

//     if (error) {
//       console.error("OAuth error:", error.message);
//       return { success: false, error: error.message };
//     }

//     return { success: true, data };
//   } catch (err: any) {
//     console.error("Unexpected OAuth error:", err.message);
//     return {
//       success: false,
//       error: "An unexpected error occurred. Please try again.",
//     };
//   }
// };

const signInWithOAuth = async (
  provider: "google" | "apple" | undefined,
  // Allow the caller to specify a custom callback path, defaulting to '/auth/callback'
  callbackPath: string = '/auth/callback'
): Promise<{ success: boolean; data?: any; error?: string }> => {

  if (provider === undefined) {
    console.error("OAuth Provider is Undefined");
    // It's better to return an error object than throw a generic Error here
    // to match the Promise<{ success: boolean; data?: any; error?: string }> signature.
    return { success: false, error: "OAuth Provider is Undefined" };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // It dynamically constructs the redirectTo URL using the provided callbackPath.
        redirectTo: `${window.location.origin}${callbackPath}`,
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Unexpected OAuth error:", err.message);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
};

  // ---------- INIT SESSION ----------

  useEffect(() => {
    setIsMounted(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (session?.user) {
        supabase
          .from("users")
          .select("user_type")
          .eq("user_id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUserType(data.user_type as "individual" | "business");
            }
          });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (session?.user) {
        supabase
          .from("users")
          .select("user_type")
          .eq("user_id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUserType(data.user_type as "individual" | "business");
            }
          });
      } else {
        setUserType(null);
      }
    });


    return () => subscription.unsubscribe();
  }, []);

  // ---------- PROVIDER ----------

  if (!isMounted) return null;

  return (
    <AuthContext.Provider
      value={{
        session,
        signUpNewUser,
        signInUser,
        signInWithOAuth,
        resetPassword,
        updatePassword,
        signOut,
        userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export const useUserAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within AuthContextProvider");
  }
  return context;
};
