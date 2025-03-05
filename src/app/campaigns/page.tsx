"use client";

import { useEffect, useRef } from "react";
import ScrollContainer from "react-scroll-horizontal";

import { CampaignCard } from "@/components/Campaign/CampaignCard";
import { useCampaignStore } from "@/hooks/useCampignStore";

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

export default function CampaignsPage() {
  const { campaigns, selectedCategory, setSelectedCategory, fetchCampaigns } =
    useCampaignStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const filteredCampaigns =
    selectedCategory === "All Categories"
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === selectedCategory);

  const scrollToCategory = (category: string) => {
    setSelectedCategory(category);
    if (scrollRef.current) {
      const button = (scrollRef.current as HTMLElement).querySelector(
        `button:contains("${category}")`
      );
      if (button) {
        button.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  };

  return (
    <>
      <div className="w-full  mt-0 bg-[#040B08] text-[#00EE7D] py-12 sm:py-16 lg:py-20">
        <div className="container px-4 mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-4">
            Discover Campaigns
          </h1>
          <p className="text-center text-[#00EE7D]/80 max-w-2xl mx-auto">
            Support innovative projects that make a real impact on our
            environment
          </p>
        </div>
      </div>

      <div className="container px-4 py-6 sm:py-8 lg:py-12 mx-auto">
        <div className="relative h-[60px] mb-8">
          <ScrollContainer
            ref={scrollRef}
            className="scroll-container"
            style={{ height: "60px", width: "100%" }}
          >
            <div className="flex items-center space-x-4 sm:space-x-6 h-full">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => scrollToCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-sm sm:text-base 
                    transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                      selectedCategory === category
                        ? "bg-[#00EE7D] text-black font-medium shadow-lg"
                        : "text-[#00EE7D] hover:bg-[#00EE7D]/10 border border-[#00EE7D]/20"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollContainer>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No campaigns found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="w-full h-full">
                <CampaignCard {...campaign} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
