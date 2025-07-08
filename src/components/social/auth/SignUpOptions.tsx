"use client"

import { motion } from "framer-motion"
import { User, Briefcase } from "lucide-react"

interface SignupOptionsProps {
  onSwitchToSignIn: () => void // Callback to switch to the Sign In flow
  onSelectIndividual: () => void // Callback to proceed to Individual Sign Up form
  onSelectBusiness: () => void // Callback to proceed to Business Sign Up form
  // Removed onCloseModal as it's no longer directly used by this component
}

export const SignupOptions: React.FC<SignupOptionsProps> = ({
  onSwitchToSignIn,
  onSelectIndividual,
  onSelectBusiness,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 p-6 sm:p-8" // Added padding for better spacing within the modal
    >
      <h2 className="text-3xl font-bold text-center text-[#00EE7D]">Create your account</h2>
      <p className="text-white/70 text-center mb-6">Choose your account type to get started.</p>

      <div className="grid grid-cols-1 gap-6"> {/* Increased gap for better spacing */}
        <button
          onClick={onSelectIndividual}
          className="w-full bg-[#0A1612] hover:bg-[#0A1612]/80 border border-[#00EE7D]/20 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-[#00EE7D]/50 group"
        >
          <div className="w-16 h-16 rounded-full bg-[#00EE7D]/10 flex items-center justify-center group-hover:bg-[#00EE7D]/20 transition-all duration-300">
            <User className="h-8 w-8 text-[#00EE7D]" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-white">Private (Individual)</p>
            <p className="text-white/60 text-sm">Fund projects and track your impact personally.</p>
          </div>
        </button>

        <button
          onClick={onSelectBusiness}
          className="w-full bg-[#0A1612] hover:bg-[#0A1612]/80 border border-[#00EE7D]/20 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-[#00EE7D]/50 group"
        >
          <div className="w-16 h-16 rounded-full bg-[#00EE7D]/10 flex items-center justify-center group-hover:bg-[#00EE7D]/20 transition-all duration-300">
            <Briefcase className="h-8 w-8 text-[#00EE7D]" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-white">Business (Organization)</p>
            <p className="text-white/60 text-sm">Register your organization to launch campaigns.</p>
          </div>
        </button>
      </div>

      <div className="text-center text-white/60 pt-4">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="text-[#00EE7D] hover:underline focus:outline-none"
        >
          Sign in here
        </button>
      </div>
    </motion.div>
  )
}
