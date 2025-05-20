"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, Flag, AlertTriangle, ThumbsUp, ThumbsDown, X } from "lucide-react"
import Link from "next/link"
import { Campaign, Milestone, useCampaignStore } from "@/hooks/useCampignStore"

export default function MilestoneInterceptedPage() {
  const params = useParams()
  const router = useRouter()
  const { campaigns, fetchCampaigns } = useCampaignStore()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [milestone, setMilestone] = useState<Milestone | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  useEffect(() => {
    fetchCampaigns()
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [fetchCampaigns])

  useEffect(() => {
    if (campaigns.length > 0 && params.id && params.milestoneId) {
      const foundCampaign = campaigns.find((c) => c.id === params.id)
      if (foundCampaign) {
        setCampaign(foundCampaign)
        const foundMilestone = foundCampaign.milestones.find((m) => m.id === params.milestoneId)
        if (foundMilestone) {
          setMilestone(foundMilestone)
          // Check if user has voted (in a real app, this would check against the user's ID)
          setHasVoted(foundMilestone.votes?.voters?.includes("current-user-id") || false)
        }
      }
    }
  }, [campaigns, params.id, params.milestoneId])

  if (!campaign || !milestone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading milestone...</div>
      </div>
    )
  }

  const getMilestoneStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "voting":
        return <Flag className="h-5 w-5 text-amber-500" />
      case "rejected":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  const getMilestoneStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in_progress":
        return "In Progress"
      case "voting":
        return "Voting"
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      default:
        return "Pending"
    }
  }

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "voting":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleVote = (vote: "approve" | "reject") => {
    // In a real app, this would send the vote to the server
    setHasVoted(true)
    alert(`You voted to ${vote} this milestone. In a real app, this would be saved to the database.`)
  }

  const totalVotes = (milestone.votes?.approve || 0) + (milestone.votes?.reject || 0)
  const approvalPercentage = totalVotes > 0 ? Math.round(((milestone.votes?.approve || 0) / totalVotes) * 100) : 0

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-bold">Milestone Details</h2>
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            {getMilestoneStatusIcon(milestone.status)}
            <div>
              <h3 className="text-xl font-bold">{milestone.title}</h3>
              <Badge variant="outline" className={`mt-1 ${getMilestoneStatusColor(milestone.status)}`}>
                {getMilestoneStatusText(milestone.status)}
              </Badge>
            </div>
          </div>

          {milestone.estimatedCompletionDate && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Estimated Completion Date</p>
              <p className="font-medium">{new Date(milestone.estimatedCompletionDate).toLocaleDateString()}</p>
            </div>
          )}

          <div className="prose max-w-none">
            <h4>Description</h4>
            <div dangerouslySetInnerHTML={{ __html: milestone.description }} />

            {milestone.completionProof && (
              <>
                <h4 className="mt-6">Completion Report</h4>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p>{milestone.completionProof}</p>
                </div>
              </>
            )}
          </div>

          {milestone.status === "voting" && (
            <Card>
              <CardHeader>
                <CardTitle>Vote on this Milestone</CardTitle>
                <CardDescription>
                  As a backer, you can vote to approve or reject this milestone based on the completion report.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Approval Rating</span>
                    <span>{approvalPercentage}%</span>
                  </div>
                  <Progress value={approvalPercentage} className="h-2 mb-4" />
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      <span>{milestone.votes?.approve || 0} approvals</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                      <span>{milestone.votes?.reject || 0} rejections</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {hasVoted ? (
                  <p className="text-sm text-gray-500">You have already voted on this milestone.</p>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
                      onClick={() => handleVote("approve")}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 border-red-200 text-red-700 hover:bg-red-50"
                      onClick={() => handleVote("reject")}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          )}

          <div>
            <h4 className="font-medium mb-3">Campaign Timeline</h4>
            <div className="space-y-4">
              {campaign.milestones.map((m, index) => (
                <Link
                  key={m.id}
                  href={`/campaigns/${campaign.id}/milestones/${m.id}`}
                  className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                    m.id === milestone.id ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  onClick={(e) => {
                    if (m.id === milestone.id) {
                      e.preventDefault()
                    }
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        m.id === milestone.id ? "bg-[#00EE7D] text-white" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {index < campaign.milestones.length - 1 && <div className="w-0.5 h-8 bg-gray-200"></div>}
                  </div>
                  <div>
                    <p className={`font-medium ${m.id === milestone.id ? "text-[#00EE7D]" : ""}`}>{m.title}</p>
                    <Badge variant="outline" className={`mt-1 text-xs ${getMilestoneStatusColor(m.status)}`}>
                      {getMilestoneStatusText(m.status)}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
