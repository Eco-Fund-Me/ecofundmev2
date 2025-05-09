// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { motion } from "framer-motion"
// import { Eye, EyeOff, User, Briefcase } from "lucide-react"
// import { AuthHero } from "@/components/auth/AuthHero"
// import { useThirdwebAuth } from "@/hooks/useThirdwebAuth"
// import { useUserAuth } from "@/context/AuthContext"

// export default function IndividualSigninPage() {
//   const router = useRouter()
//   const { signInUser } = useUserAuth()
//   const { connectWithThirdweb, isConnecting, error: thirdwebError } = useThirdwebAuth()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Form validation
//     if (!email || !password) {
//       setError("Email and password are required")
//       return
//     }

//     setIsSubmitting(true)
//     setError(null)

//     try {
//       // Sign in with Supabase
//       const result = await signInUser(email, password)

//       if (!result.success) {
//         throw new Error(result.error || "Failed to sign in")
//       }

//       // Connect with Thirdweb
//       await connectWithThirdweb("custom", email, password)

//       // Redirect to home page
//     //   router.push("/")
//     } catch (err) {
//       console.error("Signin error:", err)
//       setError(err instanceof Error ? err.message : "Invalid email or password")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleGoogleSignin = async () => {
//     try {
//       await connectWithThirdweb("google")
//       router.push("/")
//     } catch (err) {
//       console.error("Google signin error:", err)
//       setError(err instanceof Error ? err.message : "Failed to sign in with Google")
//     }
//   }

//   const handleAppleSignin = async () => {
//     try {
//       await connectWithThirdweb("apple")
//       router.push("/")
//     } catch (err) {
//       console.error("Apple signin error:", err)
//       setError(err instanceof Error ? err.message : "Failed to sign in with Apple")
//     }
//   }

//   return (
//     <div className="min-h-screen mt-16 grid grid-cols-1 md:grid-cols-2">
//       {/* Left side - Hero Image */}
//       <div className="hidden md:block bg-[#1E3A29]">
//         <AuthHero
//           title="Welcome back"
//           subtitle="Sign in to continue funding Green Projects with Trust & Transparency"
//         />
//       </div>

//       {/* Right side - Sign In Form */}
//       <div className="bg-[#040B08] flex flex-col items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           {/* Mobile hero text */}
//           <div className="md:hidden text-center mb-10">
//             <h1 className="text-3xl font-bold mb-2 text-[#00EE7D]">Welcome back</h1>
//             <p className="text-white/80">Sign in to continue funding Green Projects</p>
//           </div>

//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             {/* Account Type Selector */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <Link href="/signin/individual" className="w-full">
//                 <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all">
//                   <User className="h-6 w-6 mb-2 text-[#00EE7D]" />
//                   <span className="text-[#00EE7D]">Sign in as Individual</span>
//                 </button>
//               </Link>
//               <Link href="/signin/business" className="w-full">
//                 <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all">
//                   <Briefcase className="h-6 w-6 mb-2 text-white/60" />
//                   <span className="text-white/60">Sign in as Business</span>
//                 </button>
//               </Link>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {(error || thirdwebError) && (
//                 <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
//                   {error || thirdwebError}
//                 </div>
//               )}

//               <div>
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white"
//                 />
//               </div>

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white pr-10"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>

//               <div className="flex justify-end">
//                 <Link href="/forgot-password" className="text-sm text-[#00EE7D] hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting || isConnecting}
//                 className="w-full py-3 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting || isConnecting ? "Signing in..." : "Sign in"}
//               </button>

//               <div className="relative flex items-center justify-center">
//                 <div className="border-t border-white/10 w-full absolute"></div>
//                 <span className="bg-[#040B08] px-4 relative text-white/60 text-sm">or</span>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleGoogleSignin}
//                 disabled={isSubmitting || isConnecting}
//                 className="w-full py-3 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24">
//                   <path
//                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                     fill="#4285F4"
//                   />
//                   <path
//                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                     fill="#34A853"
//                   />
//                   <path
//                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                     fill="#FBBC05"
//                   />
//                   <path
//                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                     fill="#EA4335"
//                   />
//                 </svg>
//                 Continue with Google
//               </button>

//               <button
//                 type="button"
//                 onClick={handleAppleSignin}
//                 disabled={isSubmitting || isConnecting}
//                 className="w-full py-3 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
//                   <path d="M16.7 7.1c-1.3 0-2.4.7-3.1 1.6-.7-.9-1.8-1.6-3.1-1.6-2.1 0-3.9 1.7-3.9 3.9 0 3.3 5.9 8.4 7 8.4 1.1 0 7-5.1 7-8.4 0-2.2-1.8-3.9-3.9-3.9z" />
//                 </svg>
//                 Continue with Apple
//               </button>

//               <div className="text-center text-white/60">
//                 Don&apos;t have an account?{" "}
//                 <Link href="/signup" className="text-[#00EE7D] hover:underline">
//                   Sign up here
//                 </Link>
//               </div>
//             </form>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, User, Briefcase } from "lucide-react"
import { AuthHero } from "@/components/auth/AuthHero"
import { useThirdwebAuth } from "@/hooks/useThirdwebAuth"
import { useUserAuth } from "@/context/AuthContext"
import { updateUser } from "@/app/actions/user"


export default function IndividualSigninPage() {
  const router = useRouter()
  const { signInUser } = useUserAuth()
  const { connectWithThirdweb, isConnecting, error: thirdwebError } = useThirdwebAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Sign in with Supabase
      const result = await signInUser(email, password)

      if (!result.success) {
        console.log("failed to sign in email and pass:individual")
        throw new Error(result.error || "Failed to sign in")
      }

      // Connect with Thirdweb
      await connectWithThirdweb("custom", email, password)
      
      const updateResult = await updateUser({
        address:
        
      })

      if (updateResult.success) {
        console.log("User updated:", updateResult.updatedUser)
      } else {
        console.error("Update failed:", updateResult.error)
      }

      // Redirect to campaigns page
      router.push("/campaigns")
    } catch (err) {
      console.error("Signin error:", err)
      setError(err instanceof Error ? err.message : "Invalid email or password")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignin = async () => {
    try {
      await connectWithThirdweb("google")
      router.push("/campaigns")
    } catch (err) {
      console.error("Google signin error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign in with Google")
    }
  }

  const handleAppleSignin = async () => {
    try {
      await connectWithThirdweb("apple")
      router.push("/campaigns")
    } catch (err) {
      console.error("Apple signin error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign in with Apple")
    }
  }

  return (
    <div className="min-h-screen mt-16 grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Hero Image */}
      <div className="hidden md:block bg-[#1E3A29]">
        <AuthHero
          title="Welcome back"
          subtitle="Sign in to continue funding Green Projects with Trust & Transparency"
        />
      </div>

      {/* Right side - Sign In Form */}
      <div className="bg-[#040B08] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile hero text */}
          <div className="md:hidden text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 text-[#00EE7D]">Welcome back</h1>
            <p className="text-white/80">Sign in to continue funding Green Projects</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Account Type Selector */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Link href="/signin/individual" className="w-full">
                <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all">
                  <User className="h-6 w-6 mb-2 text-[#00EE7D]" />
                  <span className="text-[#00EE7D]">Sign in as Individual</span>
                </button>
              </Link>
              <Link href="/signin/business" className="w-full">
                <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all">
                  <Briefcase className="h-6 w-6 mb-2 text-white/60" />
                  <span className="text-white/60">Sign in as Business</span>
                </button>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {(error || thirdwebError) && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                  {error || thirdwebError}
                  {(error?.includes("Email not confirmed") || error?.includes("not confirmed")) && (
                    <div className="mt-2">
                      <p className="text-sm text-blue-700">Would you like to:</p>
                      <div className="mt-2 flex gap-3">
                        <Link href={`/signup/verify?email=${encodeURIComponent(email)}`} className="text-sm text-[#00EE7D] hover:underline">
                          Comfirm Email
                        </Link>
                        <Link href="/signin/individual" className="text-sm text-[#00EE7D] hover:underline">
                          Sign in with another email
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-[#00EE7D] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isConnecting}
                className="w-full py-3 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting || isConnecting ? "Signing in..." : "Sign in"}
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/10 w-full absolute"></div>
                <span className="bg-[#040B08] px-4 relative text-white/60 text-sm">or</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignin}
                disabled={isSubmitting || isConnecting}
                className="w-full py-3 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={handleAppleSignin}
                disabled={isSubmitting || isConnecting}
                className="w-full py-3 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.68 1.39-1.51 2.76-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Continue with Apple
              </button>

              <div className="text-center text-white/60">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#00EE7D] hover:underline">
                  Sign up here
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
