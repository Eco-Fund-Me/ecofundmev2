"use client"

import { useState } from "react"
import { OrganizationSidebar } from "@/components/dashboard/organization/Sidebar"
import { DashboardHome } from "@/components/dashboard/organization/DashboardHome"
import { DraftsTable } from "@/components/dashboard/organization/DraftsTable"
import { CampaignsTable } from "@/components/dashboard/organization/CampaignsTable"
import { BackedCampaignsTable } from "@/components/dashboard/organization/BackedCampaignsTable"
import { KYBVerification } from "@/components/dashboard/organization/KYBVerification"
import { campaignsData, draftsData, backedCampaignsData } from "@/data/dashboardData"

export default function OrganizationDashboardPage() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <OrganizationSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 p-4 md:p-8">
        {activeTab === "home" && <DashboardHome />}

        {activeTab === "drafts" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Draft Campaigns</h2>
            <DraftsTable drafts={draftsData} />
          </div>
        )}

        {activeTab === "campaigns-created" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Campaigns Created</h2>
            <CampaignsTable campaigns={campaignsData} />
          </div>
        )}

        {activeTab === "campaigns-backed" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Campaigns Backed</h2>
            <BackedCampaignsTable campaigns={backedCampaignsData} />
          </div>
        )}

        {activeTab === "kyb-verification" && <KYBVerification />}

        {activeTab === "account-settings" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Account Settings</h2>
            <p>Account settings content will go here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
