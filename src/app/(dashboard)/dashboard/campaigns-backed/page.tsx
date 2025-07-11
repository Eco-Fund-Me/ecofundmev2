"use client";

import { DashboardCampaignCard } from "@/components/dashboard/DashboardCampaignCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function CampaignsBackedPage() {
  // Mock data - replace with real data
  const backedCampaigns: {
  id: string;
  title: string;
  image: string;
  goal: number;
  raised: number;
  backers: number;
  daysLeft: number;
  status: "active" | "draft" | "completed" | "failed";
}[] = [
  {
    id: "1",
    title: "Eco-Friendly Water Bottle",
    image: "/mock-campaign-1.jpg",
    goal: 10000,
    raised: 8500,
    backers: 150,
    daysLeft: 15,
    status: "active", 
  },
];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Campaigns You&apos;ve Backed</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search campaigns..."
              className="pl-8 w-[250px]"
            />
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backedCampaigns.map((campaign) => (
          <DashboardCampaignCard
            key={campaign.id}
            type="backed"
            campaign={campaign}
          />
        ))}
      </div>
    </div>
  );
}
