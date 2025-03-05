"use client";

import { DashboardCampaignCard } from "@/components/Dashboard/DashboardCampaignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function CampaignsCreatedPage() {
  // Mock data - replace with real data
  const createdCampaigns = [
    {
      id: "1",
      title: "Sustainable Energy Project",
      image: "/mock-campaign-2.jpg",
      goal: 50000,
      raised: 35000,
      backers: 420,
      daysLeft: 25,
      status: "active",
    },
    // Add more mock campaigns
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Created Campaigns</h1>
        <Link href="/create-campaign">
          <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Campaign
          </Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search your campaigns..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {createdCampaigns.map((campaign) => (
          <DashboardCampaignCard
            key={campaign.id}
            type="created"
            campaign={campaign}
          />
        ))}
      </div>
    </div>
  );
}
