// "use client"

// import { useEffect, useState, useRef } from "react"
// import { motion } from "framer-motion"
// import { CampaignCard } from "@/components/Campaign/CampaignCard"

// import { Leaf, Droplets, Recycle, Building2, Trash2, Coins, Palette } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useCampaignStore } from "@/hooks/useCampignStore"
// import { getUserByAddress } from "../actions/user"
// import { useUserAddress } from "@/hooks/useUserAddress"
// // Helper function to capitalize each word
// function capitalizeEachWord(str: string) {
//   return str
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(" ")
// }

// export default function CampaignsPage() {
//   const { campaigns, selectedCategory, setSelectedCategory, fetchCampaigns } = useCampaignStore()
//   const [isLoaded, setIsLoaded] = useState(false)
//   const scrollContainerRef = useRef<HTMLDivElement>(null)
//   const [userType, setUserType] = useState<"business" | "individual" >()
//   const address = useUserAddress()
//   useEffect(() => {
//     fetchCampaigns()
//     const timer = setTimeout(() => setIsLoaded(true), 500)
//     return () => clearTimeout(timer)
//   }, [fetchCampaigns])

//     useEffect(() => {
//     const getUserType = async () =>  {
//       const userType = await getUserByAddress(address)
//       setUserType(userType.user?.user_type)
//     }

//     getUserType()
//   }, [address])
//   const filteredCampaigns =
//     selectedCategory === "All Categories"
//       ? campaigns
//       : campaigns.filter((campaign) => campaign.category === selectedCategory)

//   const categoryIcons = {
//     "Renewable Energy": <Leaf className="h-5 w-5" />,
//     "Blue economy": <Droplets className="h-5 w-5" />,
//     "Circular economy": <Recycle className="h-5 w-5" />,
//     "green infrastructure": <Building2 className="h-5 w-5" />,
//     "Waste Management and Recycling": <Trash2 className="h-5 w-5" />,
//     "De-Fi": <Coins className="h-5 w-5" />,
//     "NFTs & Collectibles": <Palette className="h-5 w-5" />,
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F2EA]">
//       {/* Hero Section */}
//       <div className="relative w-full bg-[#1E3A29] text-white py-16 md:py-24 overflow-hidden">
//         {/* Background decorative elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-3xl animate-pulse" />
//           <div
//             className="absolute bottom-20 right-10 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl animate-pulse"
//             style={{ animationDelay: "1s" }}
//           />

//           {/* Subtle leaf pattern */}
//           <div className="absolute top-20 right-20 opacity-10">
//             <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path
//                 d="M100 0C100 55.2285 55.2285 100 0 100C55.2285 100 100 144.772 100 200C100 144.772 144.772 100 200 100C144.772 100 100 55.2285 100 0Z"
//                 fill="white"
//               />
//             </svg>
//           </div>
//         </div>

//         <div className="container px-4 mx-auto relative">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center"
//           >
//             <span className="inline-block px-3 py-1 bg-[#4CAF50]/20 text-[#4CAF50] text-sm font-medium rounded-full mb-4">
//               Explore Projects
//             </span>
//             <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Discover Campaigns</h1>
//             <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
//               Support innovative green projects that are making a real impact on our planet&apos;s future.
//             </p>

//             {/* Create Campaign Button */}
           
//            {
//               userType === "business" &&
//             <Link href="/create-campaign">
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 transition={{ duration: 0.2 }}
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#4CAF50] text-white font-medium rounded-full shadow-lg hover:bg-[#3d9140] transition-colors duration-300"
//               >
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="stroke-current"
//                 >
//                   <path d="M12 5V19M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//                 Create Campaign
//               </motion.button>
//             </Link>
//             }
//           </motion.div>
//         </div>
//       </div>

//       <div className="container px-4 py-12 md:py-16 mx-auto">
//         {/* Category Selection with Horizontal Scroll */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="mb-12"
//         >
//           <div className="relative">
//             <div
//               ref={scrollContainerRef}
//               className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide"
//               style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//             >
//               <motion.button
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
//                 transition={{ duration: 0.4, delay: 0.1 }}
//                 onClick={() => setSelectedCategory("All Categories")}
//                 className={`relative overflow-hidden rounded-xl p-4 h-24 flex flex-col items-center justify-center transition-all duration-300 min-w-[150px] ${
//                   selectedCategory === "All Categories"
//                     ? "bg-[#4CAF50] text-white"
//                     : "bg-[#E8E4D8] text-[#1E3A29] hover:bg-[#E8E4D8]/80"
//                 }`}
//               >
//                 <div className="absolute inset-0 opacity-10">
//                   <Image
//                     src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-banner-IdzKCRG8YsfDo4cjGM4GSg5oH5qkz4.png"
//                     alt="Nature"
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//                 <span className="font-semibold text-center z-10">All Projects</span>
//               </motion.button>

//               {Object.entries(categoryIcons).map(([category, icon], index) => (
//                 <motion.button
//                   key={category}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
//                   transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`relative overflow-hidden rounded-xl p-4 h-24 flex flex-col items-center justify-center gap-2 transition-all duration-300 min-w-[150px] ${
//                     selectedCategory === category
//                       ? "bg-[#4CAF50] text-white"
//                       : "bg-[#E8E4D8] text-[#1E3A29] hover:bg-[#E8E4D8]/80"
//                   }`}
//                 >
//                   <div className="z-10">{icon}</div>
//                   <span className="text-xs text-center z-10 capitalize">{capitalizeEachWord(category)}</span>
//                 </motion.button>
//               ))}
//             </div>

//             {/* Scroll indicators */}
//             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F5F2EA] to-transparent pointer-events-none" />
//             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F5F2EA] to-transparent pointer-events-none" />
//           </div>
//         </motion.div>

//         {/* Campaign Cards */}
//         {filteredCampaigns.length === 0 ? (
//           <div className="text-center py-16 bg-[#E8E4D8] rounded-2xl">
//             <p className="text-[#5A7D6A]">No campaigns found in this category</p>
//           </div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={isLoaded ? { opacity: 1 } : {}}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredCampaigns.map((campaign, index) => (
//                 <motion.div
//                   key={campaign.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.5, delay: 0.1 * index }}
//                   className="w-full h-full transform transition-all duration-300"
//                 >
//                   <CampaignCard {...campaign} />
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//         {/* Floating Action Button for Mobile */}
//         <div className="md:hidden fixed bottom-6 right-6 z-10">
//           <Link href="/create-campaign">
//             <motion.button
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center justify-center w-14 h-14 rounded-full bg-[#4CAF50] text-white shadow-lg"
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="stroke-current"
//               >
//                 <path d="M12 5V19M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </motion.button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { CampaignCard } from "@/components/Campaign/CampaignCard"
import { Leaf, Droplets, Recycle, Building2, Trash2, Coins, Palette } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCampaignStore } from "@/hooks/useCampignStore"
import { getUserByAddress } from "../actions/user"
import { useUserAddress } from "@/hooks/useUserAddress"

// Helper function to capitalize each word
function capitalizeEachWord(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export default function CampaignsPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { campaigns, selectedCategory, setSelectedCategory, fetchCampaigns, categories } = useCampaignStore()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userType, setUserType] = useState<"business" | "individual" >()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const address =  useUserAddress()
  useEffect(() => {
    fetchCampaigns()
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [fetchCampaigns])

     useEffect(() => {
    const getUserType = async () =>  {
      const userType = await getUserByAddress(address)
      setUserType(userType.user?.user_type)
    }

    getUserType()
  }, [address])

  const filteredCampaigns =
    selectedCategory === "All Categories"
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === selectedCategory)



  const categoryIcons = {
    "Renewable Energy": <Leaf className="h-5 w-5" />,
    "Blue economy": <Droplets className="h-5 w-5" />,
    "Circular economy": <Recycle className="h-5 w-5" />,
    "green infrastructure": <Building2 className="h-5 w-5" />,
    "Waste Management and Recycling": <Trash2 className="h-5 w-5" />,
    "De-Fi": <Coins className="h-5 w-5" />,
    "NFTs & Collectibles": <Palette className="h-5 w-5" />,
  }

  return (
    <div className="min-h-screen bg-[#F5F2EA]">
      {/* Hero Section */}
      <div className="relative w-full bg-[#1E3A29] text-white py-16 md:py-24 overflow-hidden">
        {/* Background decorative elements */}
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
        </div>

        <div className="container px-4 mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 bg-[#4CAF50]/20 text-[#4CAF50] text-sm font-medium rounded-full mb-4">
              Explore Projects
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Discover Campaigns</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Support innovative green projects that are making a real impact on our planet&apos;s future.
            </p>

            {/* Create Campaign Button */}

            {
            userType === "business" &&
            <Link href="/create-campaign">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4CAF50] text-white font-medium rounded-full shadow-lg hover:bg-[#3d9140] transition-colors duration-300"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current"
                >
                  <path d="M12 5V19M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Create Campaign
              </motion.button>
            </Link>}
          </motion.div>
        </div>
      </div>

      <div className="container px-4 py-12 md:py-16 mx-auto">
        {/* Category Selection with Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                onClick={() => setSelectedCategory("All Categories")}
                className={`relative overflow-hidden rounded-xl p-4 h-24 flex flex-col items-center justify-center transition-all duration-300 min-w-[150px] ${
                  selectedCategory === "All Categories"
                    ? "bg-[#4CAF50] text-white"
                    : "bg-[#E8E4D8] text-[#1E3A29] hover:bg-[#E8E4D8]/80"
                }`}
              >
                <div className="absolute inset-0 opacity-10">
                  <Image src="/lush-forest-stream.png" alt="Nature" fill className="object-cover" />
                </div>
                <span className="font-semibold text-center z-10">All Projects</span>
              </motion.button>

              {Object.entries(categoryIcons).map(([category, icon], index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative overflow-hidden rounded-xl p-4 h-24 flex flex-col items-center justify-center gap-2 transition-all duration-300 min-w-[150px] ${
                    selectedCategory === category
                      ? "bg-[#4CAF50] text-white"
                      : "bg-[#E8E4D8] text-[#1E3A29] hover:bg-[#E8E4D8]/80"
                  }`}
                >
                  <div className="z-10">{icon}</div>
                  <span className="text-xs text-center z-10 capitalize">{capitalizeEachWord(category)}</span>
                </motion.button>
              ))}
            </div>

            {/* Scroll indicators */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F5F2EA] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F5F2EA] to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Campaign Cards */}
        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-16 bg-[#E8E4D8] rounded-2xl">
            <p className="text-[#5A7D6A]">No campaigns found in this category</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="w-full h-full transform transition-all duration-300"
                >
                  <CampaignCard {...campaign} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {/* Floating Action Button for Mobile */}
        <div className="md:hidden fixed bottom-6 right-6 z-10">
          {
        userType === "business" &&
          <Link href="/create-campaign">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-[#4CAF50] text-white shadow-lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current"
              >
                <path d="M12 5V19M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </Link>}
        </div>
      </div>
    </div>
  )
}
