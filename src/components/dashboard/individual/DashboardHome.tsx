import { StatsCards } from "./StatsCards"
import { BackedCampaignsTable } from "./BackedCampaignsTable"
import { mockUserData } from "@/data/individualDashboardData"

export function DashboardHome() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <StatsCards
        donated={mockUserData.stats.donated}
        rewards={mockUserData.stats.rewards}
        campaigns={mockUserData.stats.campaignsBacked}
      />

      <BackedCampaignsTable limit={5} />
    </div>
  )
}
