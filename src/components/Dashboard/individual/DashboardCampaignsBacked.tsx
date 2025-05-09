import { BackedCampaignsTable } from "./BackedCampaignsTable"

export function DashboardCampaignsBacked() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Campaigns Backed</h1>
      <BackedCampaignsTable showSearch={true} />
    </div>
  )
}
