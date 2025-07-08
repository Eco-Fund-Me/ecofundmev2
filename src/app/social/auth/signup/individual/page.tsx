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


// export default function IndividualSignupPage() {
//   const router = useRouter()
//   const { signUpNewUser } = useUserAuth()
//   const { connectWithThirdweb, isConnecting, error: thirdwebError } = useThirdwebAuth()
//   const [firstName, setFirstName] = useState("")
//   const [lastName, setLastName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [agreeToTerms, setAgreeToTerms] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Form validation
//     if (!firstName || !lastName || !email || !password) {
//       setError("All fields are required")
//       return
//     }

//     if (!agreeToTerms) {
//       setError("You must agree to the terms of service and privacy policy")
//       return
//     }

//     if (password.length < 6) {
//       setError("Password must be at least 6 characters")
//       return
//     }

//     setIsSubmitting(true)
//     setError(null)

//     try {
//       // Sign up with Supabase
//       const result = await signUpNewUser(email, password)

//       if (!result.success) {
//         throw new Error(result.error || "Failed to create account")
//       }

//       // Connect with Thirdweb
//       await connectWithThirdweb("custom", email, password)

//       // Redirect to verification page
//       router.push(`/signup/verify?email=${encodeURIComponent(email)}`)
//     } catch (err) {
//       console.error("Signup error:", err)
//       setError(err instanceof Error ? err.message : "An unexpected error occurred")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleGoogleSignup = async () => {
//     try {
//       await connectWithThirdweb("google")
//     } catch (err) {
//       console.error("Google signup error:", err)
//       setError(err instanceof Error ? err.message : "Failed to sign up with Google")
//     }
//   }

//   const handleAppleSignup = async () => {
//     try {
//       await connectWithThirdweb("apple")
//     } catch (err) {
//       console.error("Apple signup error:", err)
//       setError(err instanceof Error ? err.message : "Failed to sign up with Apple")
//     }
//   }

//   return (
//     <div className="min-h-screen mt-16 grid grid-cols-1 md:grid-cols-2">
//       {/* Left side - Hero Image */}
//       <div className="hidden md:block bg-[#1E3A29]">
//         <AuthHero title="Create your account" subtitle="To fund Green Projects with Trust & Transparency" />
//       </div>

//       {/* Right side - Sign Up Form */}
//       <div className="bg-[#040B08] flex flex-col items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           {/* Mobile hero text */}
//           <div className="md:hidden text-center mb-10">
//             <h1 className="text-3xl font-bold mb-2 text-[#00EE7D]">Create your account</h1>
//             <p className="text-white/80">To fund Green Projects with Trust & Transparency</p>
//           </div>

//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             {/* Account Type Selector */}
//             <div className="grid grid-cols-2 gap-4 mb-8">
//               <Link href="/signup/individual" className="w-full">
//                 <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all">
//                   <User className="h-6 w-6 mb-2 text-[#00EE7D]" />
//                   <span className="text-[#00EE7D]">Sign up as Individual</span>
//                 </button>
//               </Link>
//               <Link href="/signup/business" className="w-full">
//                 <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all">
//                   <Briefcase className="h-6 w-6 mb-2 text-white/60" />
//                   <span className="text-white/60">Sign up as Business</span>
//                 </button>
//               </Link>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {(error || thirdwebError) && (
//                 <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
//                   {error || thirdwebError}
//                 </div>
//               )}

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white"
//                   />
//                 </div>
//               </div>

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

//               <div className="flex items-start">
//                 <input
//                   type="checkbox"
//                   id="terms"
//                   checked={agreeToTerms}
//                   onChange={(e) => setAgreeToTerms(e.target.checked)}
//                   className="mt-1 mr-2"
//                 />
//                 <label htmlFor="terms" className="text-sm text-white/60">
//                   I agree to EcofundMe{" "}
//                   <Link href="/terms" className="text-[#00EE7D] hover:underline">
//                     Terms of service
//                   </Link>{" "}
//                   and{" "}
//                   <Link href="/privacy" className="text-[#00EE7D] hover:underline">
//                     Privacy policy
//                   </Link>
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting || isConnecting}
//                 className="w-full py-3 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting || isConnecting ? "Creating Account..." : "Create Account"}
//               </button>

//               <div className="relative flex items-center justify-center">
//                 <div className="border-t border-white/10 w-full absolute"></div>
//                 <span className="bg-[#040B08] px-4 relative text-white/60 text-sm">or</span>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleGoogleSignup}
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
//                 onClick={handleAppleSignup}
//                 disabled={isSubmitting || isConnecting}
//                 className="w-full py-3 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
//                   <path d="M16.7 7.1c-1.3 0-2.4.7-3.1 1.6-.7-.9-1.8-1.6-3.1-1.6-2.1 0-3.9 1.7-3.9 3.9 0 3.3 5.9 8.4 7 8.4 1.1 0 7-5.1 7-8.4 0-2.2-1.8-3.9-3.9-3.9z" />
//                 </svg>
//                 Continue with Apple
//               </button>

//               <div className="text-center text-white/60">
//                 Already have an account?{" "}
//                 <Link href="/signin" className="text-[#00EE7D] hover:underline">
//                   Sign in here
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
import { useUserAddress } from "@/hooks/useUserAddress"
import { useUserAuth } from "@/context/AuthContext"
import { addUser, checkEmailExists } from "@/app/actions/user"
// import { getUserEmail } from "thirdweb/wallets"
// import { client } from "@/app/client"
export default function IndividualSignupPage() {
  const router = useRouter()
  // const  userEmail = getUserEmail({client})
  const { session,signUpNewUser, signInWithOAuth} = useUserAuth()
  const {  connectWithThirdweb,isConnecting, error: thirdwebError } = useThirdwebAuth()
  const walletAddress =useUserAddress()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required")
      return
    }
  
    setIsSubmitting(true)
    setError(null)
  
    try {
      // 1. Check if email is already in auth.users
      const emailExists = await checkEmailExists(email)
      if (emailExists) {
        setError("This email is already registered. Please sign in instead.")
        setIsSubmitting(false)
        return
      }
  
      // 2. Sign up via Supabase
      const result = await signUpNewUser(email, password,"individual")
      if (!result.success) {
        throw new Error(result.error || "Failed to create account")
      }
  
      const userId = result.data?.user?.id
      if (!userId) {
        throw new Error("Missing user ID after sign-up")
      }
  
      // 4. Redirect to verification page
      router.push(`/signup/verify?email=${encodeURIComponent(email)}`)
  
    } catch (err) {
      console.error("Signup error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }
  

  const handleGoogleSignup = async () => {
    try {
    await signInWithOAuth("google")
  
    } catch (err) {
      console.error("Google signup error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign up with Google")
    }
  }

  const handleAppleSignup = async () => {
    try {
        await signInWithOAuth("apple")
      await connectWithThirdweb()
      

      
      const email = session?.user.email
      
      const address = walletAddress
            await addUser({
            userID:  address,
            user_type: "individual",
            address,
            email: email || `google_user@example.com`, // Placeholder if email not available
            
          })
      if (address) {
        router.push("/campaigns")
      }
    } catch (err) {
      console.error("Apple signup error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign up with Apple")
    }
  }

  // Rest of your component...

  // const handleGoogleSignup = async () => {
  //   try {
  //     await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         redirectTo: `${window.location.origin}/auth/callback`,
  //         queryParams: {
  //           user_type: "individual",
  //         },
  //       },
  //     })
  //   } catch (err) {
  //     console.error("Google signup error:", err)
  //     setError(err instanceof Error ? err.message : "Failed to sign up with Google")
  //   }
  // }

  // const handleAppleSignup = async () => {
  //   try {
  //     await supabase.auth.signInWithOAuth({
  //       provider: "apple",
  //       options: {
  //         redirectTo: `${window.location.origin}/auth/callback`,
  //         queryParams: {
  //           user_type: "individual",
  //         },
  //       },
  //     })
  //   } catch (err) {
  //     console.error("Apple signup error:", err)
  //     setError(err instanceof Error ? err.message : "Failed to sign up with Apple")
  //   }
  // }

  return (
    <div className="min-h-screen mt-16 grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Hero Image */}
      <div className="hidden md:block bg-[#1E3A29]">
        <AuthHero title="Create your account" subtitle="To fund Green Projects with Trust & Transparency" />
      </div>

      {/* Right side - Sign Up Form */}
      <div className="bg-[#040B08] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile hero text */}
          <div className="md:hidden text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 text-[#00EE7D]">Create your account</h1>
            <p className="text-white/80">To fund Green Projects with Trust & Transparency</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Account Type Selector */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Link href="/signup/individual" className="w-full">
                <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all">
                  <User className="h-6 w-6 mb-2 text-[#00EE7D]" />
                  <span className="text-[#00EE7D]">Sign up as Individual</span>
                </button>
              </Link>
              <Link href="/signup/business" className="w-full">
                <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all">
                  <Briefcase className="h-6 w-6 mb-2 text-white/60" />
                  <span className="text-white/60">Sign up as Business</span>
                </button>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {(error || thirdwebError) && (
                <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                  <p className="font-medium">{error || thirdwebError}</p>
                  {(error?.includes("already registered") || error?.includes("already in use")) && (
                    <div className="mt-2">
                      <p className="text-sm text-blue-700">Would you like to:</p>
                      <div className="mt-2 flex gap-3">
                        <Link href="/signin" className="text-sm text-[#00EE7D] hover:underline">
                          Sign in instead
                        </Link>
                        <Link href="/forgot-password" className="text-sm text-[#00EE7D] hover:underline">
                          Reset your password
                        </Link>
                      </div>
                    </div>
                  )}

                 
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white"
                  />
                </div>
              </div>

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

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 mr-2"
                />
                <label htmlFor="terms" className="text-sm text-white/60">
                  I agree to EcofundMe{" "}
                  <Link href="/terms" className="text-[#00EE7D] hover:underline">
                    Terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#00EE7D] hover:underline">
                    Privacy policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isConnecting}
                className="w-full py-3 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting || isConnecting ? "Creating Account..." : "Create Account"}
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/10 w-full absolute"></div>
                <span className="bg-[#040B08] px-4 relative text-white/60 text-sm">or</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignup}
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
                onClick={handleAppleSignup}
                disabled={isSubmitting || isConnecting}
                className="w-full py-3 bg-transparent border border-white/20 text-white rounded-full hover:bg-white/5 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Continue with Apple
              </button>

              <div className="text-center text-white/60">
                Already have an account?{" "}
                <Link href="/signin" className="text-[#00EE7D] hover:underline">
                  Sign in here
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
