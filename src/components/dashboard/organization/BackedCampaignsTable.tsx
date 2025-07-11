import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { getStatusColor } from "@/utils/getStatusColor"
import { formatDate } from "@/utils/formatDate"

interface BackedCampaign {
  id: number
  title: string
  creator: string
  amountContributed: number
  date: string
  status: string
}

interface BackedCampaignsTableProps {
  campaigns: BackedCampaign[]
}

export function BackedCampaignsTable({ campaigns }: BackedCampaignsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-200 gap-4">
        <h2 className="text-xl md:text-2xl font-bold">Campaigns Backed</h2>
        <Link
          href="/campaigns"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-center sm:text-left"
        >
          Discover campaigns
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Campaign</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Creator</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount Contributed</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-900">{campaign.title}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{campaign.creator}</td>
                <td className="px-4 py-4 text-sm text-gray-900">${campaign.amountContributed.toLocaleString()} USD</td>
                <td className="px-4 py-4 text-sm text-gray-500">{formatDate(campaign.date)}</td>
                <td className="px-4 py-4 text-sm">
                  <span className={`${getStatusColor(campaign.status)}`}>{campaign.status}</span>
                </td>
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
                <p className="text-gray-500">Creator</p>
                <p>{campaign.creator}</p>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p>${campaign.amountContributed.toLocaleString()} USD</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p>{formatDate(campaign.date)}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className={`${getStatusColor(campaign.status)}`}>{campaign.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-4">You haven&apos;t backed any campaigns yet.</p>
          <Link href="/campaigns" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            Discover campaigns
          </Link>
        </div>
      )}
    </div>
  )
}
