"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, User, Briefcase } from "lucide-react"
import { useThirdwebAuth } from "@/hooks/useThirdwebAuth" // Assuming this path is correct
import { supabase } from "@/lib/supabaseClient" // Assuming this path is correct
import { useUserAuth } from "@/context/AuthContext" // Assuming this path is correct
import { useUserAddress } from "@/hooks/useUserAddress" // Assuming this path is correct
import { addUser, checkEmailExists, isBusinessEmail } from "@/app/actions/user" // Assuming this path is correct

interface BusinessSignUpFormProps {
  onClose: () => void // Callback to close the modal
  onSuccess: (email: string) => void // Callback on successful sign-up (to handle redirect to verify)
  onSwitchToIndividualSignUp: () => void // Callback to switch to individual sign-up within the modal
  onSwitchToSignInFlow: () => void // Callback to switch to general sign-in options within the modal
}

export const BusinessSignUpForm: React.FC<BusinessSignUpFormProps> = ({
  onClose,
  onSuccess,
  onSwitchToIndividualSignUp,
  onSwitchToSignInFlow,
}) => {
  const router = useRouter()
  const { signUpNewUser } = useUserAuth()
  const {  isConnecting, error: thirdwebError } = useThirdwebAuth()
  const walletAddress = useUserAddress()

  const [businessName, setBusinessName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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

    const isBizEmail = await isBusinessEmail(email)
    if (!isBizEmail) {
      setError("Please use a valid business email address to sign up.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const emailExists = await checkEmailExists(email)
      if (emailExists) {
        setError("This email is already registered. Please sign in instead.")
        setIsSubmitting(false)
        return
      }

      const result = await signUpNewUser(email, password, "business")

      if (!result.success) {
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

      const userAdder = await addUser({
        user_type: "business",
        userID: userId,
        email,
        business_name: businessName,
        first_name: "", // Not applicable for business in this form
        last_name: "", // Not applicable for business in this form
        address: walletAddress || "", // Use walletAddress if available, otherwise empty
      })
      console.log("addUser log:", userAdder)

      await supabase.auth.updateUser({
        data: {
          user_type: "business",
          business_name: businessName,
        },
      })

      // Connect with Thirdweb (if not already connected by useUserAuth or handled elsewhere)
      // await connectWithThirdweb(); // Uncomment if needed here

      onSuccess(email) // Pass email for verification redirect
    } catch (err) {
      console.error("Signup error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
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
        <h2 className="text-3xl font-bold text-[#00EE7D] mb-2">Create Business Account</h2>
        <p className="text-white/70">Register your organization to fund Green Projects.</p>
      </div>

      {/* Account Type Selector (now buttons with callbacks) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Switch to Individual - uses callback */}
        <button
          onClick={onSwitchToIndividualSignUp}
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
          <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            <p className="font-medium">{error || thirdwebError}</p>
            {(error?.includes("already registered") || error?.includes("already in use")) && (
              <div className="mt-2">
                <p className="text-sm text-blue-700">Would you like to:</p>
                <div className="mt-2 flex gap-3">
                  <button type="button" onClick={() => { onClose(); router.push("/social/signin"); }} className="text-sm text-[#00EE7D] hover:underline">
                    Sign in instead
                  </button>
                  <Link href="/forgot-password" onClick={onClose} className="text-sm text-[#00EE7D] hover:underline">
                    Reset your password
                  </Link>
                </div>
              </div>
            )}
            {(error?.includes("use a valid business email") || error?.includes("valid business email address")) && (
              <div className="mt-2">
                <p className="text-sm text-blue-700">Please use a valid business email address to sign up.</p>
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
            className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white placeholder-white/50"
          />
        </div>

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

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mt-1 mr-2 accent-[#00EE7D]"
          />
          <label htmlFor="terms" className="text-sm text-white/60">
            I agree to EcoFundMe{" "}
            <Link href="/terms" onClick={onClose} className="text-[#00EE7D] hover:underline">
              Terms of service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" onClick={onClose} className="text-[#00EE7D] hover:underline">
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

        <div className="text-center text-white/60 pt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignInFlow}
            className="text-[#00EE7D] hover:underline focus:outline-none"
          >
            Sign in here
          </button>
        </div>
      </form>
    </motion.div>
  )
}
