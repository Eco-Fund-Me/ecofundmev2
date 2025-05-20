


"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useCampaignStore } from "@/hooks/useCampignStore"
import { CampaignCard } from "@/components/Campaign/CampaignCard"
import { motion } from "framer-motion"
import { ArrowRight, Leaf, Droplets, Recycle, Building2, Trash2, Coins, Palette } from "lucide-react"
import Image from "next/image"

// Helper function to capitalize each word
function capitalizeEachWord(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export default function HeroCampaigns() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { campaigns, selectedCategory, setSelectedCategory, fetchCampaigns, categories } = useCampaignStore()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetchCampaigns()
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [fetchCampaigns])

  // Filter campaigns based on selected category and limit to 6
  const filteredCampaigns =
    selectedCategory === "All Categories"
      ? campaigns.slice(0, 6)
      : campaigns.filter((campaign) => campaign.category === selectedCategory).slice(0, 6)

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
    <div id="featured-campaigns" className="py-24 md:py-32 relative overflow-hidden bg-[#F5F2EA]">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#F5F2EA]/80 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#4CAF50]/5 rounded-full blur-3xl" />

      <div className="container px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-[#4CAF50]/10 text-[#4CAF50] text-sm font-medium rounded-full mb-4">
            Discover Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A29] mb-6">Featured Campaigns</h2>
          <p className="text-lg text-[#5A7D6A] max-w-2xl mx-auto">
            Explore innovative green projects that are making a real impact on our planet&apos;s future.
          </p>
        </motion.div>

        {/* Category Selection - New Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              onClick={() => setSelectedCategory("All Categories")}
              className={`relative overflow-hidden rounded-xl p-4 h-24 flex flex-col items-center justify-center transition-all duration-300 ${
                selectedCategory === "All Categories"
                  ? "bg-[#4CAF50] text-white"
                  : "bg-[#E8E4D8] text-[#1E3A29] hover:bg-[#E8E4D8]/80"
              }`}
            >
              <div className="absolute inset-0 opacity-10">
                <Image
                  src="/hero-banner.png"
                  alt="Nature"
                  fill
                  className="object-cover"
                />
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
                className={`relative overflow-hidden rounded-xl p-4 h-24 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  className="w-full h-full transform transition-all duration-300"
                >
                  <CampaignCard {...campaign} />
                </motion.div>
              ))}
            </div>

            {/* Featured campaign spotlight */}
            {filteredCampaigns.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-16 bg-[#E8E4D8] rounded-2xl overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={filteredCampaigns[0].imageUrl || "/placeholder.svg"}
                      alt={filteredCampaigns[0].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A29] to-transparent opacity-60"></div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-[#4CAF50] text-sm font-medium mb-2">
                      {capitalizeEachWord(filteredCampaigns[0].category)}
                    </span>
                    <h3 className="text-2xl font-bold text-[#1E3A29] mb-4">{filteredCampaigns[0].title}</h3>
                    <p className="text-[#5A7D6A] mb-6">
                      Support this featured project and help make a significant impact on our environment.
                    </p>
                    <div className="mb-6">
                      <div className="w-full bg-[#D8D4C8] h-2 rounded-full">
                        <div
                          className="bg-[#4CAF50] h-2 rounded-full"
                          style={{
                            width: `${(filteredCampaigns[0].currentAmount / filteredCampaigns[0].targetAmount) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-[#5A7D6A]">
                          {Math.round((filteredCampaigns[0].currentAmount / filteredCampaigns[0].targetAmount) * 100)}%
                          funded
                        </span>
                        <span className="text-[#4CAF50]">{filteredCampaigns[0].daysLeft} days left</span>
                      </div>
                    </div>
                    <Link
                      href={`/campaigns/${filteredCampaigns[0].id}`}
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#4CAF50] text-white font-medium rounded-full hover:bg-[#4CAF50]/90 transition-colors"
                    >
                      Support This Project
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* See more campaigns link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-[#4CAF50] hover:text-[#4CAF50]/80 font-medium text-lg group"
          >
            <span className="border-b-2 border-[#4CAF50] pb-1 group-hover:border-[#4CAF50]/80">See more campaigns</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
