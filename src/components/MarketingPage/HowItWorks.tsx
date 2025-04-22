// "use client"

// import { motion } from "framer-motion"
// import { Leaf, Shield, BarChart, Coins } from "lucide-react"

// const steps = [
//   {
//     icon: <Leaf className="w-8 h-8 text-[#00EE7D]" />,
//     title: "Choose a Project",
//     description:
//       "Browse through our curated list of verified green projects that align with your values and interests.",
//   },
//   {
//     icon: <Shield className="w-8 h-8 text-[#00EE7D]" />,
//     title: "Make a Contribution",
//     description: "Fund projects with confidence knowing that every transaction is secure, transparent, and traceable.",
//   },
//   {
//     icon: <BarChart className="w-8 h-8 text-[#00EE7D]" />,
//     title: "Track Impact",
//     description: "Monitor the real-world impact of your contribution with verifiable data and regular project updates.",
//   },
//   {
//     icon: <Coins className="w-8 h-8 text-[#00EE7D]" />,
//     title: "Earn Rewards",
//     description: "Receive tokenized rewards for your contributions that can be used within our ecosystem.",
//   },
// ]

// export default function HowItWorks() {
//   return (
//     <div className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
//       {/* Background decorative elements */}
//       <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />
//       <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl" />
//       <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl" />

//       <div className="container px-4 sm:px-6 relative">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="inline-block px-3 py-1 bg-[#00EE7D]/10 text-[#00EE7D] text-sm font-medium rounded-full mb-4">
//             Simple Process
//           </span>
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             EcofundMe makes it easy to support green initiatives with a simple, transparent process.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 * index }}
//               className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
//             >
//               <div className="w-16 h-16 rounded-full bg-[#00EE7D]/10 flex items-center justify-center mb-6">
//                 {step.icon}
//               </div>
//               <h3 className="text-xl font-bold mb-3">{step.title}</h3>
//               <p className="text-gray-600">{step.description}</p>
//               <div className="mt-6 flex items-center">
//                 <div className="w-8 h-8 rounded-full bg-[#00EE7D] text-white flex items-center justify-center font-bold">
//                   {index + 1}
//                 </div>
//                 <div className="h-1 flex-grow bg-[#00EE7D]/20 ml-2"></div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { motion } from "framer-motion"
import { Leaf, Shield, BarChart, Coins } from "lucide-react"

const steps = [
  {
    icon: <Leaf className="w-8 h-8 text-white" />,
    title: "Choose a Project",
    description:
      "Browse through our curated list of verified green projects that align with your values and interests.",
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "Make a Contribution",
    description: "Fund projects with confidence knowing that every transaction is secure, transparent, and traceable.",
  },
  {
    icon: <BarChart className="w-8 h-8 text-white" />,
    title: "Track Impact",
    description: "Monitor the real-world impact of your contribution with verifiable data and regular project updates.",
  },
  {
    icon: <Coins className="w-8 h-8 text-white" />,
    title: "Earn Rewards",
    description: "Receive tokenized rewards for your contributions that can be used within our ecosystem.",
  },
]

export default function HowItWorks() {
  return (
    <div className="py-24 md:py-32 bg-[#F5F2EA] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl" />

        {/* Subtle leaf pattern in background */}
        <div className="absolute top-20 left-20 opacity-5">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.772 100 200C100 144.772 144.772 100 200 100C144.772 100 100 55.2285 100 0Z"
              fill="#1E3A29"
            />
          </svg>
        </div>
        <div className="absolute bottom-20 right-20 opacity-5">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.772 100 200C100 144.772 144.772 100 200 100C144.772 100 100 55.2285 100 0Z"
              fill="#1E3A29"
            />
          </svg>
        </div>
      </div>

      <div className="container px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-[#4CAF50]/10 text-[#4CAF50] text-sm font-medium rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1E3A29]">How It Works</h2>
          <p className="text-lg text-[#5A7D6A] max-w-2xl mx-auto">
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
              className="bg-white rounded-2xl border border-[#E8E4D8] h-full flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="w-16 h-16 rounded-full bg-[#1E3A29] flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1E3A29]">{step.title}</h3>
                <p className="text-[#5A7D6A]">{step.description}</p>
              </div>
              <div className="p-6 pt-0 border-t border-[#E8E4D8]">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#4CAF50] text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="h-1 flex-grow bg-[#E8E4D8] ml-2"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section inspired by ecohome5.jpg */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-[#E8E4D8] p-6 rounded-xl text-center">
            <div className="mb-2">
              <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center mx-auto">
                <Leaf className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A29]">120+</p>
            <p className="text-[#5A7D6A]">Projects Funded</p>
          </div>
          <div className="bg-[#E8E4D8] p-6 rounded-xl text-center">
            <div className="mb-2">
              <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center mx-auto">
                <Coins className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A29]">$2.4M</p>
            <p className="text-[#5A7D6A]">Total Raised</p>
          </div>
          <div className="bg-[#E8E4D8] p-6 rounded-xl text-center">
            <div className="mb-2">
              <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center mx-auto">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A29]">15K+</p>
            <p className="text-[#5A7D6A]">Contributors</p>
          </div>
          <div className="bg-[#E8E4D8] p-6 rounded-xl text-center">
            <div className="mb-2">
              <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center mx-auto">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#1E3A29]">40+</p>
            <p className="text-[#5A7D6A]">Countries</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
