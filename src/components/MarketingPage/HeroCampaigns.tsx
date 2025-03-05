"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCampaignStore } from "@/hooks/useCampignStore";
import { CampaignCard } from "@/components/Campaign/CampaignCard";

const categories = [
  "All Categories",
  "Renewable Energy",
  "Blue economy",
  "Circular economy",
  "green infrastructure",
  "Waste Management and Recycling",
  "De-Fi",
  "NFTs & Collectibles",
];

export default function HeroCampaigns() {
  const { campaigns, selectedCategory, setSelectedCategory, fetchCampaigns } =
    useCampaignStore();

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Filter campaigns based on selected category and limit to 3
  const filteredCampaigns =
    selectedCategory === "All Categories"
      ? campaigns.slice(0, 3)
      : campaigns
          .filter((campaign) => campaign.category === selectedCategory)
          .slice(0, 3);

  return (
    <div id="how-it-works" className="bg-white py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Campaigns
          </h2>
        </div>

        {/* Categories */}
        <div className="relative overflow-x-auto mb-8 -mx-4 px-4">
          <div className="flex flex-nowrap space-x-4 sm:space-x-6 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-sm sm:text-base transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-[#00EE7D] text-black font-medium shadow-lg"
                    : "text-[#00EE7D] hover:bg-[#00EE7D]/10 border border-[#00EE7D]/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards */}
        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No campaigns found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="w-full h-full">
                <CampaignCard {...campaign} />
              </div>
            ))}
          </div>
        )}

        {/* See more campaigns link */}
        <div className="text-center mt-12">
          <Link
            href="/campaigns"
            className="text-[#00EE7D] hover:text-[#00EE7D]/80 font-medium border-b-2 border-[#00EE7D] pb-1"
          >
            See more campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}
