"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/userProvider";
import Link from "next/link";

export default function DashboardPage() {
  const { userType, userData } = useUser();

  //   const getStatusColor = (status: string) => {
  //     switch (status.toLowerCase()) {
  //       case "ongoing":
  //         return "bg-blue-500/20 text-blue-500";
  //       case "funded":
  //         return "bg-green-500/20 text-green-500";
  //       case "canceled":
  //         return "bg-red-500/20 text-red-500";
  //       default:
  //         return "bg-gray-500/20 text-gray-500";
  //     }
  //   };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {userType === "organization" && (
          <Link href="/create-campaign">
            <Button className="bg-[#00EE7D] hover:bg-[#00EE7D]/90 text-black">
              Start a campaign
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-[#040B08] border-[#00EE7D]/20">
          <p className="text-gray-400 mb-2">
            {userType === "organization" ? "raised" : "donated"}
          </p>
          <p className="text-[#00EE7D] text-3xl font-bold">
            ${userData.raised || userData.donated || 0}
            <span className="text-sm text-gray-400">USD</span>
          </p>
        </Card>

        <Card className="p-6 bg-[#040B08] border-[#00EE7D]/20">
          <p className="text-gray-400 mb-2">
            {userType === "organization" ? "from" : "rewards"}
          </p>
          <p className="text-[#00EE7D] text-3xl font-bold">
            {userType === "organization"
              ? `${userData.backers || 0} backers`
              : `$${userData.rewards || 0} USD`}
          </p>
        </Card>

        <Card className="p-6 bg-[#040B08] border-[#00EE7D]/20">
          <p className="text-gray-400 mb-2">across</p>
          <p className="text-[#00EE7D] text-3xl font-bold">
            {userData.campaigns || 0}
            <span className="text-sm text-gray-400">campaigns</span>
          </p>
        </Card>
      </div>

      {/* Campaigns Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          {userType === "organization"
            ? "Campaigns created"
            : "Campaigns backed"}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3">Campaign name</th>
                {userType !== "organization" && (
                  <th className="pb-3">Creator name</th>
                )}
                {userType === "organization" && (
                  <th className="pb-3">Goal Achievement (%)</th>
                )}
                <th className="pb-3">
                  Amount {userType === "organization" ? "raised" : "donated"}
                </th>
                <th className="pb-3">Status</th>
                <th className="pb-3">ETA(Days)</th>
              </tr>
            </thead>
            {/* Table body would be populated with actual data */}
          </table>
        </div>
      </div>
    </div>
  );
}
