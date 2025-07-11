"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CampaignHeader } from "@/components/Campaign/CampaignHeader"
import { CampaignContent } from "@/components/Campaign/CampaignContent"
import { CampaignRewards } from "@/components/Campaign/CampaignRewards"
import { CampaignBasics } from "@/components/Campaign/CampaignBasics"
import { CampaignMilestones } from "@/components/Campaign/CampaignMilestones"
import { CheckCircle2, FileText, Gift, Flag } from "lucide-react"

export default function CreateCampaignPage() {
  const [activeTab, setActiveTab] = useState("basics")

  const tabs = ["basics", "content", "milestones", "rewards"]

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "basics":
        return <CheckCircle2 className="h-5 w-5" />
      case "content":
        return <FileText className="h-5 w-5" />
      case "milestones":
        return <Flag className="h-5 w-5" />
      case "rewards":
        return <Gift className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <CampaignHeader
        category="Create Campaign"
        title="Start your campaign"
        subtitle="Create and launch your campaign in just a few steps"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab} className="flex items-center gap-2">
              {getTabIcon(tab)}
              <span className="capitalize">{tab}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="basics">
          <CampaignBasics />
          <div className="flex justify-end mt-6">
            <Button onClick={handleNext} className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
              Continue to Content
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <CampaignContent />
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back to Basics
            </Button>
            <Button onClick={handleNext} className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
              Continue to Milestones
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="milestones">
          <CampaignMilestones />
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back to Content
            </Button>
            <Button onClick={handleNext} className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
              Continue to Rewards
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="rewards">
          <CampaignRewards />
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handleBack}>
              Back to Milestones
            </Button>
            <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">Preview Campaign</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
