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

// export default function BusinessSignupPage() {
//   const router = useRouter()
//   const { signUpNewUser } = useUserAuth()
//   const { connectWithThirdweb, isConnecting, error: thirdwebError } = useThirdwebAuth()

//   const [businessName, setBusinessName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [agreeToTerms, setAgreeToTerms] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Form validation
//     if (!businessName || !email || !password) {
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

//       // Redirect to business verification page
//       router.push("/business-verification")
//     } catch (err) {
//       console.error("Signup error:", err)
//       setError(err instanceof Error ? err.message : "An unexpected error occurred")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen mt-16  grid grid-cols-1 md:grid-cols-2">
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
//                 <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all">
//                   <User className="h-6 w-6 mb-2 text-white/60" />
//                   <span className="text-white/60">Sign up as Individual</span>
//                 </button>
//               </Link>
//               <Link href="/signup/business" className="w-full">
//                 <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all">
//                   <Briefcase className="h-6 w-6 mb-2 text-[#00EE7D]" />
//                   <span className="text-[#00EE7D]">Sign up as Business</span>
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
//                   type="text"
//                   placeholder="Business Name"
//                   value={businessName}
//                   onChange={(e) => setBusinessName(e.target.value)}
//                   className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white"
//                 />
//               </div>

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
import { supabase } from "@/lib/supabaseClient"
import { useUserAuth } from "@/context/AuthContext"
import { useUserAddress } from "@/hooks/useUserAddress"
import { addUser, checkEmailExists, isBusinessEmail } from "@/app/actions/user"


export default function BusinessSignupPage() {
  const router = useRouter()
  const { signUpNewUser } = useUserAuth()
  const { isConnecting, error: thirdwebError } = useThirdwebAuth()
  const walletAddress =useUserAddress()
  const [businessName, setBusinessName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isBusinessEmail(email)) {
      setError("Please use a valid business email address to sign up.")
      return
    }
    // Form validation
    if (!businessName || !email || !password) {
      setError("All fields are required")
      return
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms of service and privacy policy")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
     
      const isbusinessEmail = await  isBusinessEmail(email)
      if (!isbusinessEmail) {
        setError("Please use a valid business email address to sign up.")
        return
      }
      // Check if email already exists BEFORE attempting sign-up
      const emailExists = await checkEmailExists(email)


      if (emailExists) {
        setError("This email is already registered. Please sign in instead.")
        setIsSubmitting(false)
        return
      }

      // Sign up with Supabase
      const result = await signUpNewUser(email, password)

      if (!result.success) {
        // Double-check for email already exists error from Supabase
        if (
          result.error?.includes("already registered") ||
          result.error?.includes("already in use") ||
          result.error?.includes("already exists")
        ) {
          throw new Error("This email is already registered. Please sign in instead.")
        }
        throw new Error(result.error || "Failed to create account")
      }

        
      const userId = result.data?.user?.id
      if (!userId) {
        throw new Error("Missing user ID after sign-up")
      }

            await addUser({
              user_type: "business",
              userID: userId,
              email,
              business_name:businessName,
              first_name: "",
              last_name: "",
              address: "", // Wallet will be assigned after login
            })
      // Store user type in metadata
      await supabase.auth.updateUser({
        data: {
          user_type: "business",
          business_name: businessName,
        },
      })

      // Generate a unique business ID
      

      // Connect with Thirdweb and add user to database
 
      // Get the wallet address
      const address = walletAddress
      if (!address) {
        console.warn("No wallet address available after connection")
      }

      // Redirect to business verification page
      router.push(`/signup/verify?email=${encodeURIComponent(email)}`)
      // router.push("/business-verification")

    } catch (err) {
      console.error("Signup error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

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
                <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all">
                  <User className="h-6 w-6 mb-2 text-white/60" />
                  <span className="text-white/60">Sign up as Individual</span>
                </button>
              </Link>
              <Link href="/signup/business" className="w-full">
                <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all">
                  <Briefcase className="h-6 w-6 mb-2 text-[#00EE7D]" />
                  <span className="text-[#00EE7D]">Sign up as Business</span>
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

                   {(error?.includes("use a valid business email") || error?.includes("valid business email address")) && (
                    <div className="mt-2">
                      <p className="text-sm text-blue-700">Please use a valid business email address to sign up.</p>
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
                  type="text"
                  placeholder="Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white"
                />
              </div>

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
