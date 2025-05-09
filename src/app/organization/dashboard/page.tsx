"use client"

import { useState } from "react"



// Dummy data for the dashboard
const dashboardData = {
  totalRaised: 15700,
  backers: 1362,
  campaigns: 3,
}

// Dummy data for campaigns
const campaignsData = [
  {
    id: 1,
    title: "Clean Energy Initiative",
    goalPercentage: 120,
    amountRaised: 55000,
    status: "Ongoing",
    eta: 48,
  },
  {
    id: 2,
    title: "Sustainable Agriculture Project",
    goalPercentage: 80,
    amountRaised: 55000,
    status: "Funded",
    eta: 10,
  },
  {
    id: 3,
    title: "Ocean Cleanup Campaign",
    goalPercentage: 30,
    amountRaised: 55000,
    status: "Canceled",
    eta: null,
  },
  {
    id: 4,
    title: "Renewable Energy Solutions",
    goalPercentage: 120,
    amountRaised: 55000,
    status: "Ongoing",
    eta: 48,
  },
]

// Dummy data for drafts
const draftsData = [
  {
    id: 101,
    title: "Urban Gardening Initiative",
    lastEdited: "2023-05-15T14:30:00",
    completionPercentage: 75,
  },
  {
    id: 102,
    title: "Plastic-Free Community",
    lastEdited: "2023-05-10T09:15:00",
    completionPercentage: 45,
  },
  {
    id: 103,
    title: "Renewable Energy Workshop",
    lastEdited: "2023-05-05T16:20:00",
    completionPercentage: 90,
  },
]

// Dummy data for backed campaigns
const backedCampaignsData = [
  {
    id: 201,
    title: "Solar Power for Schools",
    creator: "GreenEducation Foundation",
    amountContributed: 2500,
    date: "2023-04-15T10:30:00",
    status: "Successful",
  },
  {
    id: 202,
    title: "Community Recycling Center",
    creator: "EcoNeighborhood Initiative",
    amountContributed: 1000,
    date: "2023-03-22T14:45:00",
    status: "In Progress",
  },
  {
    id: 203,
    title: "Reforestation Project",
    creator: "TreesForFuture",
    amountContributed: 3500,
    date: "2023-02-10T09:15:00",
    status: "Successful",
  },
]

// Dummy data for account settings
const accountSettingsData = {
  organization: {
    name: "EcoSolutions Inc.",
    email: "contact@ecosolutions.org",
    website: "https://ecosolutions.org",
    description:
      "Dedicated to creating sustainable solutions for environmental challenges through community-driven initiatives and innovative technology.",
    logo: "/placeholder.svg?key=mb5t5",
  },
  notifications: {
    emailUpdates: true,
    campaignAlerts: true,
    marketingEmails: false,
    newBackerNotifications: true,
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "2023-03-15T10:30:00",
    loginHistory: [
      { date: "2023-05-15T09:30:00", ip: "192.168.1.1", device: "Chrome / Windows" },
      { date: "2023-05-14T14:45:00", ip: "192.168.1.1", device: "Chrome / Windows" },
      { date: "2023-05-12T11:20:00", ip: "192.168.1.1", device: "Safari / iOS" },
    ],
  },
  payment: {
    defaultMethod: "Credit Card ending in 4242",
    billingAddress: "123 Green Street, Eco City, EC 12345",
    paymentHistory: [
      { date: "2023-05-01T10:30:00", amount: 250, description: "Monthly platform fee" },
      { date: "2023-04-01T10:30:00", amount: 250, description: "Monthly platform fee" },
      { date: "2023-03-01T10:30:00", amount: 250, description: "Monthly platform fee" },
    ],
  },
}

export default function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <OrganizationSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Home Tab */}
          {activeTab === "home" && (
            <>
              <StatsCards
                totalRaised={dashboardData.totalRaised}
                backers={dashboardData.backers}
                campaigns={dashboardData.campaigns}
              />
              <CampaignsTable campaigns={campaignsData} />
            </>
          )}

          {/* Drafts Tab */}
          {activeTab === "drafts" && <DraftsTable drafts={draftsData} />}

          {/* Campaigns Created Tab */}
          {activeTab === "campaigns-created" && <CampaignsTable campaigns={campaignsData} />}

          {/* Campaigns Backed Tab */}
          {activeTab === "campaigns-backed" && <BackedCampaignsTable campaigns={backedCampaignsData} />}

          {/* Account Settings Tab */}
          {activeTab === "account-settings" && <AccountSettings accountSettingsData={accountSettingsData} />}
        </div>
      </div>
    </div>
  )
}
