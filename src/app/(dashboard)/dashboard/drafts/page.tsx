"use client";

import { DashboardCampaignCard } from "@/components/Dashboard/DashboardCampaignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function DraftsPage() {
  // Mock data - replace with real data
  const draftCampaigns: {
    id: string;
    title: string;
    image: string;
    goal: number;
    raised: number;
    backers: number;
    daysLeft: number;
    status: "active" | "draft" | "completed" | "failed";
  
}[]= [
    {
      id: "1",
      title: "New Green Initiative (Draft)",
      image: "/mock-campaign-3.jpg",
      goal: 25000,
      raised: 0,
      backers: 0,
      daysLeft: 30,
      status: "draft",
    },
    // Add more mock campaigns
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Draft Campaigns</h1>
        <Link href="/create-campaign">
          <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input placeholder="Search drafts..." className="pl-8" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {draftCampaigns.map((campaign) => (
          <DashboardCampaignCard
            key={campaign.id}
            type="draft"
            campaign={campaign}
          />
        ))}
      </div>
    </div>
  );
}
