"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { AuthHero } from "@/components/auth/AuthHero"
import { useUserAuth } from "@/context/AuthContext"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { resetPassword } = useUserAuth()

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const isLoaded = true

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!email) {
      setError("Email is required")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Send password reset email
      const result = await resetPassword(email)

      if (!result.success) {
        throw new Error(result.error || "Failed to send reset email")
      }

      setSuccess(true)
    } catch (err) {
      console.error("Password reset error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Hero Image */}
      <div className="hidden md:block bg-[#1E3A29]">
        <AuthHero title="Reset your password" subtitle="We'll send you instructions to reset your password" />
      </div>

      {/* Right side - Forgot Password Form */}
      <div className="bg-[#040B08] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile hero text */}
          <div className="md:hidden text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 text-[#00EE7D]">Reset your password</h1>
            <p className="text-white/80">We&apos;ll send you instructions to reset your password</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <Link href="/signin" className="inline-flex items-center text-white/60 hover:text-[#00EE7D]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to sign in
              </Link>
            </div>

            {success ? (
              <div className="text-center space-y-6">
                <div className="p-4 rounded-md bg-green-500/10 border border-green-500/20 text-green-500">
                  <h3 className="text-lg font-semibold mb-2">Check your email</h3>
                  <p>
                    We&apos;ve sent password reset instructions to <span className="font-medium">{email}</span>. Please check
                    your inbox and spam folder.
                  </p>
                </div>

                <button
                  onClick={() => router.push("/signin")}
                  className="w-full py-3 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors"
                >
                  Return to sign in
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">Forgot your password?</h2>
                <p className="text-white/60 mb-4">
                  Enter your email address and we&apos;ll send you instructions to reset your password.
                </p>

                {error && (
                  <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {error}
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send reset instructions"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
