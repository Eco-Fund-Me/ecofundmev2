"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { mockBackedCampaigns } from "@/data/individualDashboardData"

interface BackedCampaignsTableProps {
  limit?: number
  showSearch?: boolean
}

export function BackedCampaignsTable({ limit, showSearch = false }: BackedCampaignsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter campaigns based on search query
  const filteredCampaigns = mockBackedCampaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.creator.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort campaigns if a sort field is selected
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (!sortField) return 0

    // Handle different field types
    if (sortField === "amountDonated") {
      return sortDirection === "asc" ? a.amountDonated - b.amountDonated : b.amountDonated - a.amountDonated
    }

    if (sortField === "etaDays") {
      // Handle null values for etaDays
      if (a.etaDays === null && b.etaDays === null) return 0
      if (a.etaDays === null) return sortDirection === "asc" ? 1 : -1
      if (b.etaDays === null) return sortDirection === "asc" ? -1 : 1

      return sortDirection === "asc" ? a.etaDays - b.etaDays : b.etaDays - a.etaDays
    }

    // Default string comparison for other fields
    const aValue = a[sortField as keyof typeof a] as string
    const bValue = b[sortField as keyof typeof b] as string

    return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
  })

  // Limit the number of campaigns if specified
  const displayedCampaigns = limit ? sortedCampaigns.slice(0, limit) : sortedCampaigns

  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new sort field and default to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "funded":
        return "bg-green-100 text-green-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Campaigns backed</h2>

        {showSearch && (
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <button onClick={() => handleSort("title")} className="flex items-center focus:outline-none">
                  Campaign name {renderSortIcon("title")}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <button onClick={() => handleSort("creator")} className="flex items-center focus:outline-none">
                  Creator name {renderSortIcon("creator")}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <button onClick={() => handleSort("amountDonated")} className="flex items-center focus:outline-none">
                  Amount donated {renderSortIcon("amountDonated")}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <button onClick={() => handleSort("status")} className="flex items-center focus:outline-none">
                  Status {renderSortIcon("status")}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                <button onClick={() => handleSort("etaDays")} className="flex items-center focus:outline-none">
                  ETA(Days) {renderSortIcon("etaDays")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedCampaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 mr-3">
                      <Image
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <Link
                      href={`/campaigns/${campaign.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-green-600"
                    >
                      {campaign.title}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">{campaign.creator}</td>
                <td className="px-4 py-4 text-sm text-gray-700">${campaign.amountDonated.toFixed(2)} USD</td>
                <td className="px-4 py-4">
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {campaign.etaDays !== null ? `${campaign.etaDays} days` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {displayedCampaigns.map((campaign) => (
          <div key={campaign.id} className="p-4 border-b last:border-b-0">
            <div className="flex items-start">
              <div className="h-16 w-16 flex-shrink-0 mr-3">
                <Image
                  src={campaign.image || "/placeholder.svg"}
                  alt={campaign.title}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-1">
                <Link href={`/campaigns/${campaign.id}`} className="font-medium text-gray-900 hover:text-green-600">
                  {campaign.title}
                </Link>
                <div className="text-sm text-gray-500 mt-1">{campaign.creator}</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm font-medium">${campaign.amountDonated.toFixed(2)} USD</div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  ETA: {campaign.etaDays !== null ? `${campaign.etaDays} days` : "N/A"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {displayedCampaigns.length === 0 && <div className="p-8 text-center text-gray-500">No campaigns found.</div>}

      {limit && filteredCampaigns.length > limit && (
        <div className="p-4 border-t text-center">
          <Link href="/individual/dashboard/campaigns-backed">
            <Button variant="outline">View All Campaigns</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
