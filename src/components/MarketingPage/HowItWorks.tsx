"use client"

import { motion } from "framer-motion"
import { Leaf, Shield, BarChart, Coins } from "lucide-react"

const steps = [
  {
    icon: <Leaf className="w-8 h-8 text-[#00EE7D]" />,
    title: "Choose a Project",
    description:
      "Browse through our curated list of verified green projects that align with your values and interests.",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#00EE7D]" />,
    title: "Make a Contribution",
    description: "Fund projects with confidence knowing that every transaction is secure, transparent, and traceable.",
  },
  {
    icon: <BarChart className="w-8 h-8 text-[#00EE7D]" />,
    title: "Track Impact",
    description: "Monitor the real-world impact of your contribution with verifiable data and regular project updates.",
  },
  {
    icon: <Coins className="w-8 h-8 text-[#00EE7D]" />,
    title: "Earn Rewards",
    description: "Receive tokenized rewards for your contributions that can be used within our ecosystem.",
  },
]

export default function HowItWorks() {
  return (
    <div className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl" />

      <div className="container px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-[#00EE7D]/10 text-[#00EE7D] text-sm font-medium rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            EcofundMe makes it easy to support green initiatives with a simple, transparent process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[#00EE7D]/10 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="mt-6 flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#00EE7D] text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="h-1 flex-grow bg-[#00EE7D]/20 ml-2"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
