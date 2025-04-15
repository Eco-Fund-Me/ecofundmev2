// "use client";

// import Link from "next/link";
// import { useEffect } from "react";
// import { useCampaignStore } from "@/hooks/useCampignStore";
// import { CampaignCard } from "@/components/Campaign/CampaignCard";

// const categories = [
//   "All Categories",
//   "Renewable Energy",
//   "Blue economy",
//   "Circular economy",
//   "green infrastructure",
//   "Waste Management and Recycling",
//   "De-Fi",
//   "NFTs & Collectibles",
// ];

// export default function HeroCampaigns() {
//   const { campaigns, selectedCategory, setSelectedCategory, fetchCampaigns } =
//     useCampaignStore();

//   useEffect(() => {
//     fetchCampaigns();
//   }, [fetchCampaigns]);

//   // Filter campaigns based on selected category and limit to 3
//   const filteredCampaigns =
//     selectedCategory === "All Categories"
//       ? campaigns.slice(0, 3)
//       : campaigns
//           .filter((campaign) => campaign.category === selectedCategory)
//           .slice(0, 3);

//   return (
//     <div id="how-it-works" className="bg-white py-16 md:py-24">
//       <div className="container px-4 sm:px-6">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
//             Campaigns
//           </h2>
//         </div>

//         {/* Categories */}
//         <div className="relative overflow-x-auto mb-8 -mx-4 px-4">
//           <div className="flex flex-nowrap space-x-4 sm:space-x-6 pb-2">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-sm sm:text-base transition-all duration-200 hover:scale-105 ${
//                   selectedCategory === category
//                     ? "bg-[#00EE7D] text-black font-medium shadow-lg"
//                     : "text-[#00EE7D] hover:bg-[#00EE7D]/10 border border-[#00EE7D]/20"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Campaign Cards */}
//         {filteredCampaigns.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500">No campaigns found in this category</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredCampaigns.map((campaign) => (
//               <div key={campaign.id} className="w-full h-full">
//                 <CampaignCard {...campaign} />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* See more campaigns link */}
//         <div className="text-center mt-12">
//           <Link
//             href="/campaigns"
//             className="text-[#00EE7D] hover:text-[#00EE7D]/80 font-medium border-b-2 border-[#00EE7D] pb-1"
//           >
//             See more campaigns
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useCampaignStore } from "@/hooks/useCampignStore"
import { CampaignCard } from "@/components/Campaign/CampaignCard"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const categories = [
  "All Categories",
  "Renewable Energy",
  "Blue economy",
  "Circular economy",
  "green infrastructure",
  "Waste Management and Recycling",
  "De-Fi",
  "NFTs & Collectibles",
]

export default function HeroCampaigns() {
  const { campaigns, selectedCategory, setSelectedCategory, fetchCampaigns } = useCampaignStore()

  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns])

  // Filter campaigns based on selected category and limit to 3
  const filteredCampaigns =
    selectedCategory === "All Categories"
      ? campaigns.slice(0, 3)
      : campaigns.filter((campaign) => campaign.category === selectedCategory).slice(0, 3)

  return (
    <div id="how-it-works" className="bg-white py-24 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-100 to-transparent" />
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
            Discover Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">Featured Campaigns</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore innovative green projects that are making a real impact on our planet&apos;s future.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-x-auto mb-12 -mx-4 px-4"
        >
          <div className="flex flex-nowrap space-x-4 sm:space-x-6 pb-2 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-5 py-2.5 rounded-full whitespace-nowrap text-sm sm:text-base transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-[#00EE7D] text-black font-medium shadow-lg"
                    : "text-[#00EE7D] hover:bg-[#00EE7D]/10 border border-[#00EE7D]/20"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Campaign Cards */}
        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-gray-500">No campaigns found in this category</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="w-full h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <CampaignCard {...campaign} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* See more campaigns link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-[#00EE7D] hover:text-[#00EE7D]/80 font-medium text-lg group"
          >
            <span className="border-b-2 border-[#00EE7D] pb-1 group-hover:border-[#00EE7D]/80">See more campaigns</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
