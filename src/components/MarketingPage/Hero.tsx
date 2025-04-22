// "use client"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Compass, ArrowRight } from "lucide-react"
// import Link from "next/link"
// import { useState, useEffect, Suspense } from "react"
// import { HeroLoading } from "../HeroLoading"
// import { motion } from "framer-motion"

// function HeroContent() {
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) return null

//   return (
//     <div className="relative min-h-[90vh] container overflow-hidden">
//       <div className="absolute inset-0 bg-[#040B08]" style={{ minHeight: "90vh" }} />
//       <Image
//         src="hero-banner.png"
//         alt="Hero Banner"
//         fill
//         className="object-cover brightness-75"
//         priority
//         quality={100}
//         sizes="100vw"
//         style={{
//           objectFit: "cover",
//           minHeight: "90vh",
//         }}
//       />
//       <div
//         className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60"
//         style={{ minHeight: "90vh" }}
//       />

//       {/* Animated overlay elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 left-10 w-64 h-64 bg-[#00EE7D]/10 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute bottom-20 right-10 w-80 h-80 bg-[#00EE7D]/5 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         />
//       </div>

//       <div className="container relative h-full min-h-[90vh] flex flex-col justify-center px-4 sm:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-2xl space-y-8 md:space-y-10"
//         >
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
//           >
//             Funding Green Projects with{" "}
//             <span className="text-[#00EE7D] relative">
//               Trust & Transparency
//               <span className="absolute bottom-1 left-0 w-full h-1 bg-[#00EE7D]/30 rounded-full"></span>
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="text-xl md:text-2xl text-white/90 leading-relaxed"
//           >
//             EcofundMe is a Web3-powered, tokenized climate financing platform that connects donors with impactful carbon
//             mitigation projects—ensuring transparency, accountability, and rewards for every contribution.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//             className="flex flex-col sm:flex-row gap-6 pt-8"
//           >
//             <Link href="/campaigns" className="w-full sm:w-auto">
//               <Button
//                 className="w-full sm:w-auto bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 hover:scale-105 
//                   transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full 
//                   shadow-lg shadow-[#00EE7D]/20 flex items-center justify-center"
//               >
//                 <Compass className="w-5 h-5 mr-2" />
//                 Explore Campaigns
//               </Button>
//             </Link>

//             <Link href="/business-verification" className="w-full sm:w-auto">
//               <Button
//                 variant="outline"
//                 className="w-full sm:w-auto border-white/30 text-emerald-700 hover:bg-white/10 hover:scale-105 
//                   transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full 
//                   backdrop-blur-sm flex items-center justify-center"
//               >
//                 Sign Up Now
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </Button>
//             </Link>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 1 }}
//             className="flex items-center gap-4 pt-8"
//           >
//             <div className="flex -space-x-3">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="w-10 h-10 rounded-full border-2 border-[#00EE7D] overflow-hidden">
//                   <Image
//                     src={`/placeholder-avatar-${i}.jpg`}
//                     alt="Supporter"
//                     width={40}
//                     height={40}
//                     className="object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//             <p className="text-white/80 text-sm">
//               <span className="font-bold text-[#00EE7D]">1,200+</span> people already joined
//             </p>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5, duration: 1 }}
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
//       >
//         <p className="text-white/60 text-sm mb-2">Scroll to explore</p>
//         <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
//           <motion.div
//             animate={{
//               y: [0, 12, 0],
//             }}
//             transition={{
//               repeat: Number.POSITIVE_INFINITY,
//               duration: 1.5,
//             }}
//             className="w-2 h-2 bg-white/60 rounded-full"
//           />
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default function Hero() {
//   return (
//     <Suspense fallback={<HeroLoading />}>
//       <HeroContent />
//     </Suspense>
//   )
// }

"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Compass, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, Suspense } from "react"
import { HeroLoading } from "../HeroLoading"
import { motion } from "framer-motion"

function HeroContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen container overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[#1E3A29]" style={{ minHeight: "100vh" }} />
      <Image
        src="/hero-banner.png"
        alt="Hero Banner"
        fill
        className="object-cover brightness-75"
        priority
        quality={100}
        sizes="100vw"
        style={{
          objectFit: "cover",
          minHeight: "100vh",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#1E3A29]/70 via-[#1E3A29]/50 to-[#1E3A29]/60"
        style={{ minHeight: "100vh" }}
      />

      {/* Animated overlay elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container relative h-full min-h-screen flex flex-col justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-8 md:space-y-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-block px-4 py-1.5 bg-[#4CAF50]/10 text-[#4CAF50] text-sm font-medium rounded-full"
          >
            Sustainable Investing Platform
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Funding Green Projects with{" "}
            <span className="text-[#4CAF50] relative">
              Trust & Transparency
              <span className="absolute bottom-1 left-0 w-full h-1 bg-[#4CAF50]/30 rounded-full"></span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 leading-relaxed"
          >
            EcoFundMe is a Web3-powered, tokenized climate financing platform that connects donors with impactful carbon
            mitigation projects—ensuring transparency, accountability, and rewards for every contribution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 pt-8"
          >
            <Link href="/campaigns" className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90 hover:scale-105 
                  transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full 
                  flex items-center justify-center"
              >
                <Compass className="w-5 h-5 mr-2" />
                Explore Campaigns
              </Button>
            </Link>

            <Link href="/business-verification" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:scale-105 
                  transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full 
                  backdrop-blur-sm flex items-center justify-center bg-white/5"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center gap-4 pt-8"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#4CAF50] overflow-hidden">
                  <Image
                    src={`/supporter-${i}.jpg`}
                    alt="Supporter"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-white/80 text-sm">
              <span className="font-bold text-[#4CAF50]">1,200+</span> people already joined
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <p className="text-white/60 text-sm mb-2">Scroll to explore</p>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
            }}
            className="w-2 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <Suspense fallback={<HeroLoading />}>
      <HeroContent />
    </Suspense>
  )
}
