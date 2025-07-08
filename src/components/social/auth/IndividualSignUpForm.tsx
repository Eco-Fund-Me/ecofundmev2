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
import { addUser, checkEmailExists } from "@/app/actions/user" // Assuming this path is correct

interface IndividualSignUpFormProps {
  onClose: () => void // Callback to close the modal
  onSuccess: (email: string) => void // Callback on successful sign-up (to handle redirect to verify)
  onSwitchToBusinessSignUp: () => void // Callback to switch to business sign-up within the modal
  onSwitchToSignInFlow: () => void // Callback to switch to general sign-in options within the modal
}

export const IndividualSignUpForm: React.FC<IndividualSignUpFormProps> = ({
  onClose,
  onSuccess,
  onSwitchToBusinessSignUp,
  onSwitchToSignInFlow,
}) => {
  const router = useRouter()
  const { signUpNewUser, signInWithOAuth } = useUserAuth()
  const { connectWithThirdweb, isConnecting, error: thirdwebError } = useThirdwebAuth()
  const walletAddress = useUserAddress()

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
      const emailExists = await checkEmailExists(email)
      if (emailExists) {
        setError("This email is already registered. Please sign in instead.")
        setIsSubmitting(false)
        return
      }

      const result = await signUpNewUser(email, password, "individual")

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

      // Add user to your database
      const userAdder = await addUser({
        user_type: "individual",
        userID: userId,
        email,
        business_name: "", // Not applicable for individual
        first_name: firstName,
        last_name: lastName,
        address: walletAddress || "", // Use walletAddress if available, otherwise empty
      })
      console.log("addUser log:", userAdder)

      // Update Supabase user metadata
      await supabase.auth.updateUser({
        data: {
          user_type: "individual",
          first_name: firstName,
          last_name: lastName,
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

  const handleGoogleSignup = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      await signInWithOAuth("google", "/social/oauth/callback") // Assuming signUpNewUser can handle OAuth
      // await connectWithThirdweb("google", "oauth"); // If thirdweb connection is handled after OAuth
      onSuccess(email) // Pass email for verification redirect
    } catch (err) {
      console.error("Google signup error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign up with Google")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAppleSignup = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      await signUpNewUser(email, password, "individual", ) // Assuming signUpNewUser can handle OAuth
      await connectWithThirdweb() // Assuming thirdweb connection is needed after Apple OAuth
      onSuccess(email) // Pass email for verification redirect
    } catch (err) {
      console.error("Apple signup error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign up with Apple")
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
        <h2 className="text-3xl font-bold text-[#00EE7D] mb-2">Create Individual Account</h2>
        <p className="text-white/70">Join EcoFundMe to fund Green Projects with Trust & Transparency.</p>
      </div>

      {/* Account Type Selector (now buttons with callbacks) */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Current (Individual) - highlighted */}
        <button className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-[#00EE7D] bg-[#00EE7D]/10 transition-all cursor-default">
          <User className="h-6 w-6 mb-2 text-[#00EE7D]" />
          <span className="text-[#00EE7D]">Individual</span>
        </button>
        {/* Switch to Business - uses callback */}
        <button
          onClick={onSwitchToBusinessSignUp}
          className="w-full flex flex-col items-center justify-center p-4 rounded-lg border border-white/10 hover:border-white/30 transition-all text-white/60 hover:text-white"
        >
          <Briefcase className="h-6 w-6 mb-2" />
          <span>Business</span>
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
          </div>
        )}

        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white placeholder-white/50"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white placeholder-white/50"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
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
            className="mt-1 mr-2 accent-[#00EE7D]" // Added accent color for checkbox
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
            <path d="M17.05 20.28c-.98.95-2.05.86-3.08.38-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.38C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.68 1.39-1.51 2.76-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          Continue with Apple
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
