// "use client"

// import { motion } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { ArrowRight } from "lucide-react"

// export default function CallToAction() {
//   return (
//     <div className="py-24 md:py-32 bg-[#040B08] relative overflow-hidden">
//       {/* Animated overlay elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-64 h-64 bg-[#00EE7D]/10 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute bottom-20 right-10 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         />
//       </div>

//       <div className="container px-4 sm:px-6 relative">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="max-w-3xl mx-auto text-center"
//         >
//           <span className="inline-block px-3 py-1 bg-[#00EE7D]/20 text-[#00EE7D] text-sm font-medium rounded-full mb-6">
//             Join the Movement
//           </span>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
//             Ready to Make a <span className="text-[#00EE7D]">Difference?</span>
//           </h2>
//           <p className="text-xl text-white/80 mb-10">
//             Whether you&apos;re a project creator or a contributor, EcofundMe provides the platform you need to make a
//             positive impact on our planet.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <Link href="/campaigns">
//               <Button
//                 className="w-full sm:w-auto bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 hover:scale-105 
//                   transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full 
//                   shadow-lg shadow-[#00EE7D]/20 flex items-center justify-center"
//               >
//                 Explore Projects
//               </Button>
//             </Link>

//             <Link href="/create-campaign">
//               <Button
//                 variant="outline"
//                 className="w-full sm:w-auto border-white/30 text-green-600 hover:bg-white/10 hover:scale-105 
//                   transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full 
//                   backdrop-blur-sm flex items-center justify-center"
//               >
//                 Start a Project
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </Button>
//             </Link>
//           </div>

//           <div className="mt-16 pt-16 border-t border-white/10">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-[#00EE7D]">100%</p>
//                 <p className="text-white/70 mt-2">Transparent</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-[#00EE7D]">Web3</p>
//                 <p className="text-white/70 mt-2">Powered</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-[#00EE7D]">Verified</p>
//                 <p className="text-white/70 mt-2">Projects</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-3xl font-bold text-[#00EE7D]">Tokenized</p>
//                 <p className="text-white/70 mt-2">Rewards</p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
  return (
    <div className="py-24 md:py-32 bg-[#1E3A29] relative overflow-hidden">
      {/* Animated overlay elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Subtle leaf pattern */}
        <div className="absolute top-20 right-20 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.772 100 200C100 144.772 144.772 100 200 100C144.772 100 100 55.2285 100 0Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="absolute bottom-20 left-20 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.772 100 200C100 144.772 144.772 100 200 100C144.772 100 100 55.2285 100 0Z"
              fill="white"
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
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block px-3 py-1 bg-[#4CAF50]/20 text-[#4CAF50] text-sm font-medium rounded-full mb-6">
            Join the Movement
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            Ready to Make a <span className="text-[#4CAF50]">Difference?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Whether you&apos;re a project creator or a contributor, EcofundMe provides the platform you need to make a
            positive impact on our planet.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/campaigns">
              <Button
                className="w-full sm:w-auto bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90 hover:scale-105 
                  transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full 
                  flex items-center justify-center"
              >
                Explore Projects
              </Button>
            </Link>

            <Link href="/create-campaign">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-gray-400 hover:bg-white/10 hover:scale-105 
                  transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full 
                  backdrop-blur-sm flex items-center justify-center"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-16 pt-16 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4CAF50]">100%</p>
                <p className="text-white/70 mt-2">Transparent</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4CAF50]">Web3</p>
                <p className="text-white/70 mt-2">Powered</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4CAF50]">Verified</p>
                <p className="text-white/70 mt-2">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#4CAF50]">Tokenized</p>
                <p className="text-white/70 mt-2">Rewards</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
