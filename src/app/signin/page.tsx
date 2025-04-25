"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { User, Briefcase } from "lucide-react"
import { AuthHero } from "@/components/auth/AuthHero"

export default function SigninPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Hero Image */}
      <div className="hidden md:block bg-[#1E3A29]">
        <AuthHero
          title="Welcome back"
          subtitle="Sign in to continue funding Green Projects with Trust & Transparency"
        />
      </div>

      {/* Right side - Sign In Options */}
      <div className="bg-[#040B08] flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile hero text */}
          <div className="md:hidden text-center mb-10">
            <h1 className="text-3xl font-bold mb-2 text-[#00EE7D]">Welcome back</h1>
            <p className="text-white/80">Sign in to continue funding Green Projects</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-center text-[#00EE7D]">Sign in</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/signin/individual">
                <div className="bg-[#0A1612] hover:bg-[#0A1612]/80 border border-[#00EE7D]/20 rounded-xl p-6 h-40 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-[#00EE7D]/50 group">
                  <div className="w-16 h-16 rounded-full bg-[#00EE7D]/10 flex items-center justify-center group-hover:bg-[#00EE7D]/20 transition-all duration-300">
                    <User className="h-8 w-8 text-[#00EE7D]" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-white">Private (Individual)</p>
                    <p className="text-white/60 text-sm">Account</p>
                  </div>
                </div>
              </Link>

              <Link href="/signin/business">
                <div className="bg-[#0A1612] hover:bg-[#0A1612]/80 border border-[#00EE7D]/20 rounded-xl p-6 h-40 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-[#00EE7D]/50 group">
                  <div className="w-16 h-16 rounded-full bg-[#00EE7D]/10 flex items-center justify-center group-hover:bg-[#00EE7D]/20 transition-all duration-300">
                    <Briefcase className="h-8 w-8 text-[#00EE7D]" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-white">Business (Organization)</p>
                    <p className="text-white/60 text-sm">Account</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="text-center text-white/60">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#00EE7D] hover:underline">
                Sign up here
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
