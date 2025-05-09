import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { getStatusColor } from "@/utils/getStatusColor"
import { ProgressBar } from "./shared/ProgressBar"
interface Campaign {
  id: number
  title: string
  goalPercentage: number
  amountRaised: number
  status: string
  eta: number | null
}

interface CampaignsTableProps {
  campaigns: Campaign[]
  title?: string
  actionLabel?: string
  actionUrl?: string
}

export function CampaignsTable({
  campaigns,
  title = "Campaigns created",
  actionLabel = "Start a campaign",
  actionUrl = "/create-campaign",
}: CampaignsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-200 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
        <Link
          href={actionUrl}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-center sm:text-left"
        >
          {actionLabel}
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Campaign name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Goal Achievement (%)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount raised</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ETA(Days)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-900">{campaign.title}</td>
                <td className="px-4 py-4 text-sm">
                  <div className="flex items-center">
                    <span className="mr-2">{campaign.goalPercentage}%</span>
                    <ProgressBar value={campaign.goalPercentage} />
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">${campaign.amountRaised.toLocaleString()} USD</td>
                <td className="px-4 py-4 text-sm">
                  <span className={`${getStatusColor(campaign.status)}`}>{campaign.status}</span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{campaign.eta ? `${campaign.eta} days` : "-"}</td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  <Link href={`/campaigns/${campaign.id}`} className="text-green-500 hover:text-green-700">
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-gray-200">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{campaign.title}</h3>
              <Link href={`/campaigns/${campaign.id}`} className="text-green-500 hover:text-green-700 ml-2">
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Goal</p>
                <div className="flex items-center mt-1">
                  <span className="mr-2">{campaign.goalPercentage}%</span>
                  <ProgressBar value={campaign.goalPercentage} />
                </div>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p>${campaign.amountRaised.toLocaleString()} USD</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className={`${getStatusColor(campaign.status)}`}>{campaign.status}</p>
              </div>
              <div>
                <p className="text-gray-500">ETA</p>
                <p>{campaign.eta ? `${campaign.eta} days` : "-"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
