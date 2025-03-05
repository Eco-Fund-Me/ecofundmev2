"use client";

import { CampaignHeader } from "@/components/Campaign/CampaignHeader";
import { CampaignProgress } from "@/components/Campaign/CampaignProgress";
import { CampaignCreator } from "@/components/Campaign/CampaignCreator";
import { CampaignRisk } from "@/components/Campaign/CampaignRisk";
import { CampaignTabs } from "@/components/Campaign/CampaignTabs";
import Image from "next/image";

interface CampaignPageProps {
  params: {
    id: string;
  };
}

export default function CampaignPage({ params }: CampaignPageProps) {
  // This would normally come from an API call using the ID
  const campaign = {
    id: params.id,
    title: "Project name",
    category: "category",
    subtitle:
      "subtitle - explanation subtitle - explanation subtitle - explanation " +
      "subtitle - explanation subtitle - explanation subtitle - explanation",
    creatorName: "Creator name",
    targetAmount: 0.006,
    currentAmount: 0.00066,
    backers: 1,
    daysLeft: 9,
    imageUrl: "/placeholder.jpg",
    riskDisclosure:
      "Donations will no longer be refundable when this project expires by " +
      "Sun, September 17, 2023 8:17:12 PM.",
    story:
      "Hi! My name is Stephan Franck. I am back with volumes 2 and 3 of my " +
      "4-volume graphic novel series PALOMINO, which combines my passion for " +
      "mysteries, hardboiled dialogue, music, lived-in slice-of-life, and " +
      "Los Angeles' weird and forgotten history. PALOMINO RETURNS with 250 " +
      "NEW PAGES across 2 NEW VOLUMES! And it is filled to the brim with more " +
      "heart, more noir, more suspense, more slice-of-life, more comedy, and " +
      "more passion than ever before.",
    faq: [
      "What happens if the project doesn't meet its funding goal?",
      "When will I receive my rewards?",
      "Can I change my pledge amount?",
    ],
    rewards: [
      {
        title: "Early Bird Supporter",
        description:
          "Get early access to the project updates and exclusive content",
        amount: 0.001,
      },
      {
        title: "Premium Supporter",
        description: "All previous rewards plus special mention in the project",
        amount: 0.003,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Image */}
          <div className="relative aspect-video sm:aspect-square rounded-lg overflow-hidden">
            <Image
              src={campaign.imageUrl}
              alt={campaign.title}
              className="object-cover w-full h-full"
              fill
              priority
            />
          </div>

          {/* Right Column - Campaign Info */}
          <div className="space-y-4 sm:space-y-6">
            <CampaignHeader
              category={campaign.category}
              title={campaign.title}
              subtitle={campaign.subtitle}
            />

            <CampaignProgress
              targetAmount={campaign.targetAmount}
              currentAmount={campaign.currentAmount}
              backers={campaign.backers}
              daysLeft={campaign.daysLeft}
            />

            <CampaignCreator
              name={campaign.creatorName}
              imageUrl="/creator-avatar.png"
            />

            <button className="w-full py-3 sm:py-4 bg-[#00EE7D] text-black font-semibold rounded-full hover:bg-[#00EE7D]/90 transition-colors">
              Checkout this project
            </button>

            <CampaignRisk disclosure={campaign.riskDisclosure} />
          </div>
        </div>

        {/* Campaign Tabs */}
        <div className="mt-8 sm:mt-12">
          <CampaignTabs
            story={campaign.story}
            faq={campaign.faq}
            rewards={campaign.rewards}
          />
        </div>
      </div>
    </div>
  );
}
