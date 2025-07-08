"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, User, Briefcase } from "lucide-react"
import { useThirdwebAuth } from "@/hooks/useThirdwebAuth" // Assuming this path is correct
import { useUserAuth } from "@/context/AuthContext" // Assuming this path is correct
import { isBusinessEmail } from "@/app/actions/user" // Assuming this path is correct

interface BusinessSignInFormProps {
  onClose: () => void // Callback to close the modal
  onSuccess: () => void // Callback on successful sign-in (to handle redirect)
  onSwitchToIndividualSignIn: () => void // Callback to switch to individual sign-in within the modal
  onSwitchToSignUpFlow: () => void // Callback to switch to general sign-up options within the modal
}

export const BusinessSignInForm: React.FC<BusinessSignInFormProps> = ({
  onClose,
  onSuccess,
  onSwitchToIndividualSignIn,
  onSwitchToSignUpFlow,
}) => {
 
  const { signInUser } = useUserAuth()
  const { connectWithThirdweb, isConnecting, error: thirdwebError } = useThirdwebAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    // Client-side validation for business email
    const isBizEmail = await isBusinessEmail(email) // Assuming this is a client-side check or an API call
    if (!isBizEmail) {
      setError("Please use a valid business email address to sign in.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await signInUser(email, password)

      if (!result.success) {
        throw new Error(result.error || "Failed to sign in")
      }

      await connectWithThirdweb()
      onSuccess() // Call success handler, which closes modal and redirects
    } catch (err) {
      console.error("Signin error:", err)
      setError(err instanceof Error ? err.message : "Invalid email or password")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#040B08] p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-lg mx-auto border border-[#00EE7D]/20 text-white"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#00EE7D] mb-2">Sign In as Business</h2>
        <p className="text-white/70">Access your organization&apos;s account to fund Green Projects.</p>
      </div>

      {/* Account Type Selector (now buttons with callbacks) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Switch to Individual - uses callback */}
        <button
          onClick={onSwitchToIndividualSignIn}
          className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all text-white/60 hover:text-white"
        >
          <User className="h-6 w-6 mb-2" />
          <span>Individual</span>
        </button>
        {/* Current (Business) - highlighted */}
        <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all cursor-default">
          <Briefcase className="h-6 w-6 mb-2 text-[#00EE7D]" />
          <span className="text-[#00EE7D]">Business</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {(error || thirdwebError) && (
          <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            {error || thirdwebError}
            {(error?.includes("Email not confirmed") || error?.includes("not confirmed")) && (
              <div className="mt-2">
                <p className="text-sm text-blue-700">Would you like to:</p>
                <div className="mt-2 flex gap-3">
                  <Link href={`/signup/verify?email=${encodeURIComponent(email)}`} onClick={onClose} className="text-sm text-[#00EE7D] hover:underline">
                    Confirm Email
                  </Link>
                  <Link href="/social/signin/business" onClick={onClose} className="text-sm text-[#00EE7D] hover:underline">
                    Sign in with another email
                  </Link>
                </div>
              </div>
            )}
            {(error?.includes("use a valid business email") || error?.includes("valid business email address")) && (
              <div className="mt-2">
                <p className="text-sm text-blue-700">Please use a valid business email address to sign in.</p>
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
            className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white placeholder-white/50"
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white pr-10 placeholder-white/50"
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
          <Link href="/forgot-password" onClick={onClose} className="text-sm text-[#00EE7D] hover:underline">
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

        <div className="text-center text-white/60 pt-4">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignUpFlow}
            className="text-[#00EE7D] hover:underline focus:outline-none"
          >
            Sign up here
          </button>
        </div>
      </form>
    </motion.div>
  )
}
