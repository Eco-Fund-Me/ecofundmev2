// "use client"

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
// import type { Session } from "@supabase/supabase-js"
// import { supabase } from "@/lib/supabaseClient"

// interface AuthContextType {
//   session: Session | null | undefined
//   signUpNewUser: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>
//   signInUser: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>
//   resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
//   updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>
//   signOut: () => Promise<void>
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
//   const [session, setSession] = useState<Session | null | undefined>(undefined)

//   // Sign up
//   const signUpNewUser = async (
//     email: string,
//     password: string,
//   ): Promise<{ success: boolean; data?: any; error?: string }> => {
//     const { data, error } = await supabase.auth.signUp({
//       email: email.toLowerCase(),
//       password,
//     })

//     if (error) {
//       console.error("Error signing up:", error.message)
//       return { success: false, error: error.message }
//     }

//     return { success: true, data }
//   }

//   // Sign in
//   const signInUser = async (
//     email: string,
//     password: string,
//   ): Promise<{ success: boolean; data?: any; error?: string }> => {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email.toLowerCase(),
//         password,
//       })

//       if (error) {
//         console.error("Sign-in error:", error.message)
//         return { success: false, error: error.message }
//       }

//       return { success: true, data }
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       console.error("Unexpected error during sign-in:", err.message)
//       return {
//         success: false,
//         error: "An unexpected error occurred. Please try again.",
//       }
//     }
//   }

//   // Reset password (send reset email)
//   const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
//     try {
//       const { error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: `${window.location.origin}/reset-password`,
//       })

//       if (error) {
//         console.error("Reset password error:", error.message)
//         return { success: false, error: error.message }
//       }

//       return { success: true }
//     } catch (err: any) {
//       console.error("Unexpected error during password reset:", err.message)
//       return {
//         success: false,
//         error: "An unexpected error occurred. Please try again.",
//       }
//     }
//   }

//   // Update password (after reset)
//   const updatePassword = async (password: string): Promise<{ success: boolean; error?: string }> => {
//     try {
//       const { error } = await supabase.auth.updateUser({
//         password,
//       })

//       if (error) {
//         console.error("Update password error:", error.message)
//         return { success: false, error: error.message }
//       }

//       return { success: true }
//     } catch (err: any) {
//       console.error("Unexpected error during password update:", err.message)
//       return {
//         success: false,
//         error: "An unexpected error occurred. Please try again.",
//       }
//     }
//   }

//   // Sign out
//   const signOut = async () => {
//     const { error } = await supabase.auth.signOut()
//     if (error) console.error("Error signing out:", error.message)
//   }

//   // On mount, set session
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     })

//     return () => subscription.unsubscribe()
//   }, [])

//   return (
//     <AuthContext.Provider value={{ session, signUpNewUser, signInUser, resetPassword, updatePassword, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// // ---------------------
// // Context Hook
// // ---------------------
// export const useUserAuth = (): AuthContextType => {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useUserAuth must be used within an AuthContextProvider")
//   }
//   return context
// }


"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"
import { assignWalletAddress, checkUserWallet } from "@/app/actions/wallet"
import { useUserAddress } from "@/hooks/useUserAddress"


interface AuthContextType {
  session: Session | null | undefined
  signUpNewUser: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>
  signInUser: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  userType: "individual" | "business" | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [userType, setUserType] = useState<"individual" | "business" | null>(null)
  const walletAddress =useUserAddress()
  // Sign up
  const signUpNewUser = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    })

    if (error) {
      console.error("Error signing up:", error.message)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  }

  // Sign in
  const signInUser = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
     
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      })

      if (error) {
        console.error("Sign-in error:", error.message)
        return { success: false, error: error.message }
      }

      // Check user type after successful login
      if (data.user) {
        const { data: userData } = await supabase.from("users").select("user_type").eq("id", data.user.id).single()

        if (userData) {
          setUserType(userData.user_type as "individual" | "business" | null)

          // If individual user, check and assign wallet if needed
          if (userData.user_type === "individual") {
            
            if (walletAddress) {
              const { hasWallet } = await checkUserWallet(data.user.id)

              if (!hasWallet) {
                // Assign wallet to user
                await assignWalletAddress(data.user.id, walletAddress)
              }
            }
          }
        }
      }

      return { success: true, data }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Unexpected error during sign-in:", err.message)
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      }
    }
  }

  // Reset password (send reset email)
  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        console.error("Reset password error:", error.message)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (err: any) {
      console.error("Unexpected error during password reset:", err.message)
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      }
    }
  }

  // Update password (after reset)
  const updatePassword = async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        console.error("Update password error:", error.message)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (err: any) {
      console.error("Unexpected error during password update:", err.message)
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      }
    }
  }

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error("Error signing out:", error.message)
    setUserType(null)
  }

  // On mount, set session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)

      // Get user type if session exists
      if (session?.user) {
        supabase
          .from("users")
          .select("user_type")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUserType(data.user_type as "individual" | "business" | null)
            }
          })
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      // Get user type if session exists
      if (session?.user) {
        supabase
          .from("users")
          .select("user_type")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUserType(data.user_type as "individual" | "business" | null)
            }
          })
      } else {
        setUserType(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signInUser, resetPassword, updatePassword, signOut, userType }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ---------------------
// Context Hook
// ---------------------
export const useUserAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useUserAuth must be used within an AuthContextProvider")
  }
  return context
}
