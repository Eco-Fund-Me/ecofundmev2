"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CampaignTabsProps {
  story: string
  faq: string[]
  rewards: {
    title: string
    description: string
    amount: number
  }[]
}

export function CampaignTabs({ story, faq, rewards }: CampaignTabsProps) {
  return (
    <div className="flex flex-col w-full mb-20">
      <Tabs defaultValue="story" className="w-full">
        <div className="sticky top-0 bg-white z-10 border-b">
          <TabsList className="grid w-full grid-cols-3 rounded-none bg-transparent h-auto">
            <TabsTrigger
              value="story"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#00EE7D] 
                data-[state=active]:text-black rounded-none border-b-2 border-transparent
                py-4 text-lg font-semibold"
            >
              Story
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#00EE7D] 
                data-[state=active]:text-black rounded-none border-b-2 border-transparent
                py-4 text-lg font-semibold"
            >
              FAQ
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#00EE7D] 
                data-[state=active]:text-black rounded-none border-b-2 border-transparent
                py-4 text-lg font-semibold"
            >
              Rewards
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1">
          <TabsContent value="story" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{story}</p>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <div className="space-y-6">
              {faq.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold">Question {index + 1}</h3>
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="mt-6">
            <div className="grid gap-6">
              {rewards.map((reward, index) => (
                <div key={index} className="p-6 border rounded-lg hover:border-[#00EE7D] transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{reward.title}</h3>
                    <span className="text-[#00EE7D] font-semibold">{reward.amount} ETH</span>
                  </div>
                  <p className="text-gray-600">{reward.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
