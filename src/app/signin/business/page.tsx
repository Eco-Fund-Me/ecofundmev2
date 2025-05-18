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

// export default function BusinessSigninPage() {
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
//       router.push("/")
//     } catch (err) {
//       console.error("Signin error:", err)
//       setError(err instanceof Error ? err.message : "Invalid email or password")
//     } finally {
//       setIsSubmitting(false)
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
//                 <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all">
//                   <User className="h-6 w-6 mb-2 text-white/60" />
//                   <span className="text-white/60">Sign in as Individual</span>
//                 </button>
//               </Link>
//               <Link href="/signin/business" className="w-full">
//                 <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all">
//                   <Briefcase className="h-6 w-6 mb-2 text-[#00EE7D]" />
//                   <span className="text-[#00EE7D]">Sign in as Business</span>
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
//                   placeholder="Business Email"
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
import { isBusinessEmail } from "@/app/actions/user"
// import { useUserAddress } from "@/hooks/useUserAddress"

export default function BusinessSigninPage() {
  const router = useRouter()
  const { signInUser } = useUserAuth()
  // const  userAddress = useUserAddress()
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

        if (!isBusinessEmail(email)) {
          setError("Please use a valid business email address to sign up.")
          return
        }

    setIsSubmitting(true)
    setError(null)

    try {
      // Sign in with Supabase
      const result = await signInUser(email, password)

      if (!result.success) {
        throw new Error(result.error || "Failed to sign in")
      }

      // Connect with Thirdweb
      await connectWithThirdweb()
      // const updateResult = await updateUser({
      //   address: userAddress,
      //   user_id: result.data?.user?.id
      // })

      // if (updateResult.success) {
      //   console.log("User updated:", updateResult.updatedUser)
      // } else {
      //   console.error("Update failed:", updateResult.error)
      // }
      router.push("/organization/dashboard")
      
    } catch (err) {
      console.error("Signin error:", err)
      setError(err instanceof Error ? err.message : "Invalid email or password")
    } finally {
      setIsSubmitting(false)
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
                <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all">
                  <User className="h-6 w-6 mb-2 text-white/60" />
                  <span className="text-white/60">Sign in as Individual</span>
                </button>
              </Link>
              <Link href="/signin/business" className="w-full">
                <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all">
                  <Briefcase className="h-6 w-6 mb-2 text-[#00EE7D]" />
                  <span className="text-[#00EE7D]">Sign in as Business</span>
                </button>
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {(error || thirdwebError) && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                  {error || thirdwebError}
                  {(error?.includes("Email not confirmed") || error?.includes("not confirmed")) && (
                    <div className="mt-2">
                      <p className="text-sm text-blue-500">Would you like to:</p>
                      <div className="mt-2 flex gap-3">
                        <Link href={`/signup/verify?email=${encodeURIComponent(email)}`} className="text-sm text-[#00EE7D] hover:underline">
                          Comfirm Email
                        </Link>
                        <Link href="/signin/business" className="text-sm text-[#00EE7D] hover:underline">
                          Sign in with another email
                        </Link>
                      </div>
                    </div>
                  )}

                  {(error?.includes("use a valid business email") || error?.includes("valid business email address")) && (
                    <div className="mt-2">
                      <p className="text-sm text-blue-700">Please use a valid business email address to sign in.</p>
                      {/* <div className="mt-2 flex gap-3">
                        <Link href="/signin" className="text-sm text-[#00EE7D] hover:underline">
                          Sign in instead
                        </Link>
                        <Link href="/forgot-password" className="text-sm text-[#00EE7D] hover:underline">
                          Reset your password
                        </Link>
                      </div> */}
                    </div>
                  )}
                </div>
                
              )}

              

              <div>
                <input
                  type="email"
                  placeholder="Business Email"
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
