"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { AuthHero } from "@/components/auth/AuthHero"
import { useUserAuth } from "@/context/AuthContext"


export default function ResetPasswordPage() {
  const router = useRouter()
  const { updatePassword } = useUserAuth()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const isLoaded = true
  const [hasResetToken, setHasResetToken] = useState(false)

  // Check if the URL contains the reset token
  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.includes("type=recovery")) {
      setHasResetToken(true)
    } else {
      // If no token is present, show an error
      setError("Invalid or expired password reset link. Please request a new password reset.")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Update password
      const result = await updatePassword(password)

      if (!result.success) {
        throw new Error(result.error || "Failed to update password")
      }

      setSuccess(true)
    } catch (err) {
      console.error("Password update error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Hero Image */}
      <div className="hidden md:block bg-[#1E3A29]">
        <AuthHero title="Reset your password" subtitle="Create a new password for your account" />
      </div>

      {/* Right side - Reset Password Form */}
      <div className="bg-[#040B08] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile hero text */}
          <div className="md:hidden text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 text-[#00EE7D]">Reset your password</h1>
            <p className="text-white/80">Create a new password for your account</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {success ? (
              <div className="text-center space-y-6">
                <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500">
                  <h3 className="text-lg font-semibold mb-2">Password updated successfully!</h3>
                  <p>Your password has been reset. You can now sign in with your new password.</p>
                </div>

                <button
                  onClick={() => router.push("/signin")}
                  className="w-full py-3 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors"
                >
                  Sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Create new password</h2>
                <p className="text-white/60 mb-4">Your new password must be at least 6 characters long.</p>

                {error && (
                  <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                {hasResetToken ? (
                  <>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="New password"
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

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-transparent border border-[#00EE7D]/20 rounded-md focus:outline-none focus:border-[#00EE7D] text-white pr-10"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Updating..." : "Reset password"}
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <Link href="/forgot-password">
                      <button
                        type="button"
                        className="w-full py-3 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors"
                      >
                        Request new password reset
                      </button>
                    </Link>
                  </div>
                )}

                <div className="text-center text-white/60">
                  Remember your password?{" "}
                  <Link href="/signin" className="text-[#00EE7D] hover:underline">
                    Sign in
                  </Link>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
