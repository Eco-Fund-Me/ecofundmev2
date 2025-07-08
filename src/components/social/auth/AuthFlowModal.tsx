"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { BusinessSignUpForm } from "./BusinessSignUpForm"
import { IndividualSignUpForm } from "./IndividualSignUpForm"
import { IndividualSignInForm } from "./IndividualSignInForm"
import { BusinessSignInForm } from "./BusinessSignInForm"
import { SignupOptions } from "./SignUpOptions"
import { SigninOptions } from "./SigninOptions"

// Import all the form components


// Define possible views within the authentication flow
type AuthView =
  | "initial-choice-signin" // Shows SigninOptions (Individual/Business choice)
  | "initial-choice-signup" // Shows SignupOptions (Individual/Business choice)
  | "individual-signin"
  | "business-signin"
  | "individual-signup"
  | "business-signup"

interface AuthFlowModalProps {
  onClose: () => void // Callback to close the entire modal
  initialView?: "signin" | "signup" // Optional prop to start with signin or signup options
}

export const AuthFlowModal: React.FC<AuthFlowModalProps> = ({ onClose, initialView = "signin" }) => {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<AuthView>(
    initialView === "signin" ? "initial-choice-signin" : "initial-choice-signup"
  )

  // Callbacks for navigation within the modal
  const handleSuccess = (redirectPath: string = "/campaigns") => {
    onClose() // Close the modal on successful authentication
    router.push(redirectPath) // Redirect to the specified path
  }

  const handleVerifyEmailRedirect = (email: string) => {
    onClose() // Close the modal
    router.push(`/signup/verify?email=${encodeURIComponent(email)}`) // Redirect to verification page
  }

  // Render the appropriate component based on currentView
  const renderAuthComponent = () => {
    switch (currentView) {
      case "initial-choice-signin":
        return (
          <SigninOptions
            onSwitchToSignUp={() => setCurrentView("initial-choice-signup")}
            onSelectIndividual={() => setCurrentView("individual-signin")}
            onSelectBusiness={() => setCurrentView("business-signin")}
          />
        )
      case "initial-choice-signup":
        return (
          <SignupOptions
            onSwitchToSignIn={() => setCurrentView("initial-choice-signin")}
            onSelectIndividual={() => setCurrentView("individual-signup")}
            onSelectBusiness={() => setCurrentView("business-signup")}
          />
        )
      case "individual-signin":
        return (
          <IndividualSignInForm
            onClose={onClose}
            onSuccess={() => handleSuccess("/campaigns")} // Redirect individual to campaigns
            onSwitchToBusinessSignIn={() => setCurrentView("business-signin")}
            onSwitchToSignUpFlow={() => setCurrentView("initial-choice-signup")}
          />
        )
      case "business-signin":
        return (
          <BusinessSignInForm
            onClose={onClose}
            onSuccess={() => handleSuccess("/organization/dashboard")} // Redirect business to dashboard
            onSwitchToIndividualSignIn={() => setCurrentView("individual-signin")}
            onSwitchToSignUpFlow={() => setCurrentView("initial-choice-signup")}
          />
        )
      case "individual-signup":
        return (
          <IndividualSignUpForm
            onClose={onClose}
            onSuccess={handleVerifyEmailRedirect} // Redirect to email verification
            onSwitchToBusinessSignUp={() => setCurrentView("business-signup")}
            onSwitchToSignInFlow={() => setCurrentView("initial-choice-signin")}
          />
        )
      case "business-signup":
        return (
          <BusinessSignUpForm
            onClose={onClose}
            onSuccess={handleVerifyEmailRedirect} // Redirect to email verification
            onSwitchToIndividualSignUp={() => setCurrentView("individual-signup")}
            onSwitchToSignInFlow={() => setCurrentView("initial-choice-signin")}
          />
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView} // Key is crucial for AnimatePresence to detect changes
        initial={{ opacity: 0, x: currentView.includes("signup") ? 50 : -50 }} // Simple slide animation
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: currentView.includes("signup") ? -50 : 50 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full flex items-center justify-center" // Ensure content is centered
      >
        {renderAuthComponent()}
      </motion.div>
    </AnimatePresence>
  )
}
