"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { toast } from "@/components/ui/use-toast"
// import { useToast } from "@/components/hooks/use-toast"
interface Reward {
  id: string
  title: string
  description: string
  price: number
  image?: string
  type: "digital" | "physical"
  deliveryDate?: string
  location?: string
  quantity?: number
  remainingQuantity?: number
}

interface Milestone {
  id: string
  title: string
  description: string
  status: string
  estimatedCompletionDate: string
  completionProof?: string
  votes?: {
    approve: number
    reject: number
    voters: string[]
  }
}

interface CampaignTabsProps {
  description: string
  milestones: Milestone[]
  rewards: Reward[]
}

export function CampaignTabs({ description, milestones, rewards }: CampaignTabsProps) {
  const [activeTab, setActiveTab] = useState("description")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSelectReward = (rewardId: string) => {
    // In a real app, this would open a checkout flow
    // toast({
    //   title: "Reward selected",
    //   description: "You've selected a reward. This would normally open a checkout flow.",
    // })
  }

  return (
    <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="milestones">Milestones</TabsTrigger>
        <TabsTrigger value="rewards">Rewards</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="py-4">
        <div className="prose max-w-none">
          <p>{description}</p>
        </div>
      </TabsContent>
      <TabsContent value="milestones" className="py-4">
        {milestones && milestones.length > 0 ? (
          <div className="space-y-6">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{milestone.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      milestone.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : milestone.status === "in_progress"
                          ? "bg-blue-100 text-blue-800"
                          : milestone.status === "voting"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {milestone.status.replace("_", " ")}
                  </span>
                </div>
                <div
                  className="mt-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: milestone.description }}
                />
                <div className="mt-4 text-sm text-gray-500">
                  Estimated completion: {new Date(milestone.estimatedCompletionDate).toLocaleDateString()}
                </div>
                {milestone.status === "voting" && milestone.completionProof && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Completion Proof</h4>
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: milestone.completionProof }}
                    />
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-medium">Voting:</span>{" "}
                        {milestone.votes ? milestone.votes.approve + milestone.votes.reject : 0} votes
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200">
                          Approve
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No milestones have been added to this campaign yet.</p>
          </div>
        )}
      </TabsContent>
      <TabsContent value="rewards" className="py-4">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Digital Rewards
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {rewards
                .filter((r) => r.type === "digital")
                .map((reward) => (
                  <div key={reward.id} className="border rounded-lg p-4 hover:border-[#00EE7D] transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{reward.title}</h4>
                      <span className="font-bold">${reward.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                    <div className="flex items-center text-xs text-blue-600">
                      <span className="bg-blue-100 px-2 py-1 rounded-full">Immediate delivery</span>
                    </div>
                    <Button
                      className="w-full mt-4 bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90"
                      onClick={() => handleSelectReward(reward.id)}
                    >
                      Select Reward
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
              Physical Rewards
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {rewards
                .filter((r) => r.type === "physical")
                .map((reward) => (
                  <div key={reward.id} className="border rounded-lg p-4 hover:border-[#00EE7D] transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{reward.title}</h4>
                      <span className="font-bold">${reward.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        <Calendar className="h-3 w-3" />
                        {reward.deliveryDate}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                        <MapPin className="h-3 w-3" />
                        {reward.location}
                      </span>
                    </div>
                    <Button
                      className="w-full mt-4 bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90"
                      onClick={() => handleSelectReward(reward.id)}
                    >
                      Select Reward
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
