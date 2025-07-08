

// "use client"

// import { useState } from "react"
// import { useSearchParams } from "next/navigation"
// import { motion } from "framer-motion"
// import { AuthHero } from "@/components/auth/AuthHero"
// import { Button } from "@/components/ui/button"
// import { supabase } from "@/lib/supabaseClient"

// export default function VerifyPage() {
//   const searchParams = useSearchParams()
//   const email = searchParams.get("email") || ""
//   const maskedEmail = email ? maskEmail(email) : "your email"
//   const [isResending, setIsResending] = useState(false)
//   const [resendSuccess, setResendSuccess] = useState(false)

//   function maskEmail(email: string) {
//     const [username, domain] = email.split("@")
//     const maskedUsername = username.charAt(0) + "*".repeat(username.length - 2) + username.charAt(username.length - 1)
//     return `${maskedUsername}@${domain}`
//   }

//   const handleResendEmail = async () => {
//     if (!email) return

//     setIsResending(true)
//     setResendSuccess(false)

//     try {
//       await supabase.auth.resend({
//         type: "signup",
//         email,
//       })
//       setResendSuccess(true)

//       // Reset success message after 5 seconds
//       setTimeout(() => {
//         setResendSuccess(false)
//       }, 5000)
//     } catch (error) {
//       console.error("Error resending verification email:", error)
//     } finally {
//       setIsResending(false)
//     }
//   }

//   return (
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
//       {/* Left side - Hero Image */}
//       <div className="hidden md:block bg-[#1E3A29]">
//         <AuthHero title="Create your account" subtitle="To fund Green Projects with Trust & Transparency" />
//       </div>

//       {/* Right side - Verification */}
//       <div className="bg-[#040B08] flex flex-col items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           {/* Mobile hero text */}
//           <div className="md:hidden text-center mb-10">
//             <h1 className="text-3xl font-bold mb-2 text-[#00EE7D]">Create your account</h1>
//             <p className="text-white/80">To fund Green Projects with Trust & Transparency</p>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="text-center space-y-6"
//           >
//             <h2 className="text-3xl font-bold text-[#00EE7D]">Verify your Email</h2>
//             <p className="text-white/80">
//               We have sent a verification email to <span className="text-white font-medium">{maskedEmail}</span>.
//             </p>

//             <div className="py-6">
//               <p className="text-white/60 mb-4">Didn&apos;t receive the email? Check spam or promotion folder or</p>

//               {resendSuccess && (
//                 <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 text-sm mb-4">
//                   Verification email resent successfully!
//                 </div>
//               )}

//               <Button
//                 onClick={handleResendEmail}
//                 disabled={isResending}
//                 className="w-full py-6 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors"
//               >
//                 {isResending ? "Resending..." : "Resend Email"}
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AuthHero } from "@/components/auth/AuthHero"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { getUserByAddress } from "@/app/actions/user"


export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || ""
  const maskedEmail = email ? maskEmail(email) : "your email"

  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  // Mask email helper
  function maskEmail(email: string) {
    const [username, domain] = email.split("@")
    const maskedUsername =
      username.charAt(0) + "*".repeat(username.length - 2) + username.charAt(username.length - 1)
    return `${maskedUsername}@${domain}`
  }

  // Resend logic
  const handleResendEmail = async () => {
    if (!email) return
    setIsResending(true)
    setResendSuccess(false)

    try {
      await supabase.auth.resend({ type: "signup", email })
      setResendSuccess(true)
      setTimeout(() => setResendSuccess(false), 5000)
    } catch (error) {
      console.error("Error resending verification email:", error)
    } finally {
      setIsResending(false)
    }
  }

  // Auto-redirect on verification
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const session = sessionData?.session

      if (!session) return

      const user_id = session.user.id

      const { success, user } = await getUserByAddress(user_id )
      if (!success || !user) return

      // You can now route based on user details
      if (user.user_type === "business") {
        if (!user.kyc_status || user.kyc_status === "pending") {
          router.push("/business-verification")
        } else {
          router.push("/dashboard")
        }
      } else {
        router.push("/dashboard")
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:block bg-[#1E3A29]">
        <AuthHero title="Create your account" subtitle="To fund Green Projects with Trust & Transparency" />
      </div>

      <div className="bg-[#040B08] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 text-[#00EE7D]">Create your account</h1>
            <p className="text-white/80">To fund Green Projects with Trust & Transparency</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-[#00EE7D]">Verify your Email</h2>
            <p className="text-white/80">
              We have sent a verification email to <span className="text-white font-medium">{maskedEmail}</span>.
            </p>

            <div className="py-6">
              <p className="text-white/60 mb-4">Didn&apos;t receive the email? Check spam or promotion folder or</p>

              {resendSuccess && (
                <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-500 text-sm mb-4">
                  Verification email resent successfully!
                </div>
              )}

              <Button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full py-6 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors"
              >
                {isResending ? "Resending..." : "Resend Email"}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
