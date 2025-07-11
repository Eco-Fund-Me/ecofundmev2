"use client"

import { useNavUser } from "@/hooks/useNavUser"
import { useKYBData } from "@/hooks/useKYBData"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, History } from "lucide-react"
import { KYBStatusCard } from "./shared/KYBStatusCard"

export function KYBVerification() {
  const { user } = useNavUser()
  const { kybData, isLoading } = useKYBData(user?.address)

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Business Verification</h2>

      {/* KYB Status Card */}
      <div className="max-w-md">
        <KYBStatusCard kybData={kybData} isLoading={isLoading} />
      </div>

      {/* KYB Details Tabs */}
      {kybData && kybData.status !== "not_started" && (
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="details" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Submission Details
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              Verification History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Details submitted for verification</CardDescription>
              </CardHeader>
              <CardContent>
                {kybData.business_details && Object.keys(kybData.business_details).length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(kybData.business_details).map(([key, value]) => {
                        // Skip nested objects for simple display
                        if (typeof value === "object" && value !== null) {
                          return null
                        }
                        return (
                          <div key={key} className="space-y-1">
                            <p className="text-sm font-medium text-gray-500 capitalize">{key.replace(/_/g, " ")}</p>
                            <p className="text-sm">{value as string}</p>
                          </div>
                        )
                      })}
                    </div>

                    {/* Handle address separately if it exists */}
                    {kybData.business_details.address && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500 mb-2">Business Address</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(kybData.business_details.address).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <p className="text-sm font-medium text-gray-500 capitalize">{key.replace(/_/g, " ")}</p>
                              <p className="text-sm">{value as string}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">Contact Information</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-500">Contact Name</p>
                          <p className="text-sm">{kybData.contact_name || "Not provided"}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-sm">{kybData.email || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No business details provided yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Submitted Documents</CardTitle>
                <CardDescription>Documents provided for verification</CardDescription>
              </CardHeader>
              <CardContent>
                {kybData.document_references && Object.keys(kybData.document_references).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(kybData.document_references).map(([key, value]) => (
                      <div key={key} className="border rounded-lg p-4 bg-gray-50">
                        <p className="text-sm font-medium capitalize mb-2">{key.replace(/_/g, " ")}</p>
                        <p className="text-xs text-gray-500 truncate">{value as string}</p>
                        <button className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium">
                          View Document
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No documents have been submitted yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Verification History</CardTitle>
                <CardDescription>Timeline of your verification process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative pl-8 pb-6 border-l border-gray-200">
                    <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-green-500"></div>
                    <p className="text-sm font-medium">Submission Created</p>
                    <p className="text-xs text-gray-500">
                      {new Date(kybData.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  {kybData.status === "pending" && (
                    <div className="relative pl-8 pb-6 border-l border-gray-200">
                      <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-blue-500"></div>
                      <p className="text-sm font-medium">Under Review</p>
                      <p className="text-xs text-gray-500">
                        {new Date(kybData.updated_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-sm mt-1">
                        Verification in progress ({kybData.verification_progress}% complete)
                      </p>
                    </div>
                  )}

                  {kybData.status === "approved" && (
                    <div className="relative pl-8 pb-6 border-l border-gray-200">
                      <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-green-500"></div>
                      <p className="text-sm font-medium">Verification Approved</p>
                      <p className="text-xs text-gray-500">
                        {new Date(kybData.updated_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-sm mt-1 text-green-600">{kybData.feedback}</p>
                    </div>
                  )}

                  {kybData.status === "rejected" && (
                    <div className="relative pl-8 pb-6 border-l border-gray-200">
                      <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-red-500"></div>
                      <p className="text-sm font-medium">Verification Rejected</p>
                      <p className="text-xs text-gray-500">
                        {new Date(kybData.updated_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-sm mt-1 text-red-600">{kybData.rejection_reason}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
