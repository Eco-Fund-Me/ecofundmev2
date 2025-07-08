// components/ui/Modal.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
  size?: "sm" | "md" | "lg" // New size prop
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  size = "md", // Default size
}) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl", // Slightly larger for forms
    lg: "max-w-3xl", // Even larger if needed for complex layouts
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose} // Close when clicking outside
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`relative bg-[#040B08] text-white rounded-xl shadow-2xl w-full p-6 sm:p-8 border border-[#00EE7D]/20 ${sizeClasses[size]} ${className}`}
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-[#00EE7D] transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
            {title && (
              <h2 className="text-3xl font-bold text-center text-[#00EE7D] mb-8">
                {title}
              </h2>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
