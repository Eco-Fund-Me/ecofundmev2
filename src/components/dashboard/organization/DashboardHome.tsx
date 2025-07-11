"use client"
import { useNavUser } from "@/hooks/useNavUser"
import { useKYBData } from "@/hooks/useKYBData"
import { StatsCards } from "./StatsCards"
import { CampaignsTable } from "./CampaignsTable"
import { dashboardData, campaignsData } from "@/data/dashboardData"
import { KYBStatusCard } from "./shared/KYBStatusCard"

export function DashboardHome() {
  const { user} = useNavUser()
  const { kybData, isLoading: kybLoading } = useKYBData(user?.address)

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold md:hidden">Dashboard</h1>

      {/* Stats Cards */}
      <StatsCards data={dashboardData} />

      {/* KYB Status Card */}
      <div className="max-w-md">
        <KYBStatusCard kybData={kybData} isLoading={kybLoading} compact={true} />
      </div>

      {/* Campaigns Table */}
      <CampaignsTable campaigns={campaignsData} />
    </div>
  )
}
