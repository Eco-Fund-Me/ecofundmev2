"use client"

import { useState, useEffect } from "react"
import { Loader2, ArrowUpRight, Download, RefreshCw } from "lucide-react"

export default function ReservesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock data for reserves
  const reserves = [
    {
      id: "1",
      assetName: "Ghana Cedi (GHS)",
      assetType: "Fiat Currency",
      amount: "1,250,000",
      value: "$100,000",
      custodian: "Bank of Ghana",
      lastAudit: "2023-04-15",
    },
    {
      id: "2",
      assetName: "US Dollar (USD)",
      assetType: "Fiat Currency",
      amount: "50,000",
      value: "$50,000",
      custodian: "Standard Chartered",
      lastAudit: "2023-04-15",
    },
    {
      id: "3",
      assetName: "Gold",
      assetType: "Commodity",
      amount: "500g",
      value: "$30,000",
      custodian: "Precious Metals Vault",
      lastAudit: "2023-04-15",
    },
  ]

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setLastUpdated(new Date())
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refreshing data
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdated(new Date())
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 text-[#00EE7D] animate-spin" />
        <span className="ml-3 text-gray-600">Loading reserves data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Proof of Reserves</h1>
        <p className="mt-1 text-sm text-gray-500">
          View the current reserves backing the EcofundMe ecosystem. This data is verified through a secure proof
          mechanism.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Reserve Assets</h3>
            <p className="mt-1 text-sm text-gray-500">
              Last updated: {lastUpdated ? lastUpdated.toLocaleString() : "Loading..."}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00EE7D]"
          >
            {isRefreshing ? (
              <>
                <Loader2 className="animate-spin -ml-0.5 mr-2 h-4 w-4" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="-ml-0.5 mr-2 h-4 w-4" />
                Refresh Data
              </>
            )}
          </button>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Asset
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Value (USD)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Custodian
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Audit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reserves.map((reserve) => (
                  <tr key={reserve.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reserve.assetName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserve.assetType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserve.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserve.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserve.custodian}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reserve.lastAudit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-[#00EE7D] hover:text-[#00EE7D]/80 inline-flex items-center">
                        View <ArrowUpRight className="ml-1 h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Reserve Ratio</h3>
            <p className="mt-1 text-sm text-gray-500">Current backing ratio for all assets</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">Current Ratio</span>
              <span className="text-2xl font-bold text-[#00EE7D]">102.5%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-[#00EE7D] h-2.5 rounded-full" style={{ width: "102.5%" }}></div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              EcofundMe maintains a reserve ratio above 100% to ensure all tokens are fully backed by real assets.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Audit Reports</h3>
            <p className="mt-1 text-sm text-gray-500">Download verification reports</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex justify-between items-center">
                <span className="text-sm text-gray-900">Q1 2023 Audit Report</span>
                <button className="inline-flex items-center text-sm text-[#00EE7D] hover:text-[#00EE7D]/80">
                  <Download className="mr-1 h-4 w-4" />
                  Download PDF
                </button>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="text-sm text-gray-900">Q4 2022 Audit Report</span>
                <button className="inline-flex items-center text-sm text-[#00EE7D] hover:text-[#00EE7D]/80">
                  <Download className="mr-1 h-4 w-4" />
                  Download PDF
                </button>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="text-sm text-gray-900">Q3 2022 Audit Report</span>
                <button className="inline-flex items-center text-sm text-[#00EE7D] hover:text-[#00EE7D]/80">
                  <Download className="mr-1 h-4 w-4" />
                  Download PDF
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
