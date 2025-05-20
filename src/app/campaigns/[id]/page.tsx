/* eslint-disable @typescript-eslint/no-unused-vars */


// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import Image from "next/image"
// import { CampaignHeader } from "@/components/Campaign/CampaignHeader"
// import { CampaignProgress } from "@/components/Campaign/CampaignProgress"
// import { CampaignCreator } from "@/components/Campaign/CampaignCreator"
// import { CampaignRisk } from "@/components/Campaign/CampaignRisk"
// import { CampaignTabs } from "@/components/Campaign/CampaignTabs"
// import { Button } from "@/components/ui/button"
// import { ArrowLeft, Share2, Heart, AlertTriangle } from "lucide-react"
// import Link from "next/link"
// import { CampaignCard } from "@/components/Campaign/CampaignCard"
// import { useCampaignStore } from "@/hooks/useCampignStore"


// interface CampaignPageProps {
//   params: {
//     id: string
//   }
// }

// export default function CampaignPage({ params }: CampaignPageProps) {
 
//   const [isLoaded, setIsLoaded] = useState(false)
//   const { campaigns, fetchCampaigns } = useCampaignStore()
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [campaign, setCampaign] = useState<any>(null)
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [relatedCampaigns, setRelatedCampaigns] = useState<any[]>([])
//   const [notFound, setNotFound] = useState(false)

//   useEffect(() => {
//     const loadData = async () => {
//       // Fetch campaigns if they're not already loaded
//       if (campaigns.length === 0) {
//         await fetchCampaigns()
//       }

//       // Find the campaign with the matching ID
//       const foundCampaign = campaigns.find((c) => c.id === params.id)

//       if (foundCampaign) {
//         setCampaign(foundCampaign)

//         // Find related campaigns (same category, excluding current campaign)
//         const related = campaigns.filter((c) => c.category === foundCampaign.category && c.id !== params.id).slice(0, 3)

//         setRelatedCampaigns(related)
//       } else {
//         setNotFound(true)
//       }

//       // Set loaded state after a short delay for animation
//       setTimeout(() => setIsLoaded(true), 300)
//     }

//     loadData()
//   }, [params.id, campaigns, fetchCampaigns])

//   // Default content for campaign tabs
//   const campaignContent = {
//     story:
//       "This campaign aims to make a positive impact on our environment through innovative solutions and sustainable practices. Join us in our mission to create a greener future for all.",
//     faq: [
//       "What happens if the project doesn't meet its funding goal?",
//       "When will I receive my rewards?",
//       "Can I change my pledge amount?",
//     ],
//     rewards: [
//       {
//         title: "Early Bird Supporter",
//         description: "Get early access to the project updates and exclusive content",
//         amount: 0.001,
//       },
//       {
//         title: "Premium Supporter",
//         description: "All previous rewards plus special mention in the project",
//         amount: 0.003,
//       },
//     ],
//     riskDisclosure: "Donations will no longer be refundable once the campaign ends.",
//   }

//   // If campaign not found, show error message
//   if (notFound) {
//     return (
//       <div className="min-h-screen bg-[#F5F2EA] flex items-center justify-center">
//         <div className="bg-white p-8 rounded-2xl border border-[#E8E4D8] max-w-md mx-auto text-center">
//           <AlertTriangle className="h-16 w-16 text-[#4CAF50] mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-[#1E3A29] mb-2">Campaign Not Found</h1>
//           <p className="text-[#5A7D6A] mb-6">The campaign you&apos;re looking for doesn&apos;t exist or has been removed.</p>
//           <Link href="/campaigns">
//             <Button className="bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90">Browse Campaigns</Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Show loading state while fetching campaign data
//   if (!campaign) {
//     return (
//       <div className="min-h-screen bg-[#F5F2EA] flex items-center justify-center">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="rounded-full bg-[#E8E4D8] h-12 w-12 mb-4"></div>
//           <div className="h-4 bg-[#E8E4D8] rounded w-32 mb-2"></div>
//           <div className="h-3 bg-[#E8E4D8] rounded w-24"></div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen mt-20 bg-[#F5F2EA]">
//       {/* Back button and actions */}
//       <div className="bg-white border-b border-[#E8E4D8]">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <Link href="/campaigns">
//             <Button variant="ghost" className="text-[#1E3A29] hover:text-[#4CAF50] hover:bg-[#4CAF50]/10">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Campaigns
//             </Button>
//           </Link>
//           <div className="flex space-x-2">
//             <Button variant="ghost" className="text-[#1E3A29] hover:text-[#4CAF50] hover:bg-[#4CAF50]/10">
//               <Share2 className="mr-2 h-4 w-4" />
//               Share
//             </Button>
//             <Button variant="ghost" className="text-[#1E3A29] hover:text-[#4CAF50] hover:bg-[#4CAF50]/10">
//               <Heart className="mr-2 h-4 w-4" />
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8 md:py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
//           {/* Left Column - Image */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-white border border-[#E8E4D8]"
//           >
//             <Image
//               src={campaign.imageUrl || "/placeholder.svg"}
//               alt={campaign.title}
//               className="object-cover w-full h-full"
//               fill
//               priority
//             />
//           </motion.div>

//           {/* Right Column - Campaign Info */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-[#E8E4D8]"
//           >
//             <CampaignHeader
//               category={campaign.category}
//               title={campaign.title}
//               subtitle={campaign.subtitle || `A ${campaign.category} project by ${campaign.creatorName}`}
//             />

//             <CampaignProgress
//               targetAmount={campaign.targetAmount}
//               currentAmount={campaign.currentAmount}
//               backers={campaign.backers || Math.floor(Math.random() * 10) + 1}
//               daysLeft={campaign.daysLeft}
//             />

//             <CampaignCreator name={campaign.creatorName} imageUrl="/creator-avatar.png" />

//             <Button className="w-full py-6 bg-[#4CAF50] text-white font-semibold rounded-full hover:bg-[#4CAF50]/90 transition-colors">
//               Support This Project
//             </Button>

//             <CampaignRisk disclosure={campaignContent.riskDisclosure} />
//           </motion.div>
//         </div>

//         {/* Campaign Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-8 md:mt-12 bg-white p-6 md:p-8 rounded-2xl border border-[#E8E4D8]"
//         >
//           <CampaignTabs story={campaignContent.story} faq={campaignContent.faq} rewards={campaignContent.rewards} />
//         </motion.div>

//         {/* Related Campaigns Section */}
//         {relatedCampaigns.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={isLoaded ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.6 }}
//             className="mt-12 md:mt-16"
//           >
//             <h2 className="text-2xl font-bold text-[#1E3A29] mb-6">Similar Projects</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {relatedCampaigns.map((relatedCampaign) => (
//                 <div key={relatedCampaign.id} className="w-full h-full">
//                   <CampaignCard
//                     id={relatedCampaign.id}
//                     title={relatedCampaign.title}
//                     category={relatedCampaign.category}
//                     creatorName={relatedCampaign.creatorName}
//                     targetAmount={relatedCampaign.targetAmount}
//                     currentAmount={relatedCampaign.currentAmount}
//                     daysLeft={relatedCampaign.daysLeft}
//                     imageUrl={relatedCampaign.imageUrl}
//                   />
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle2,
  Clock,
  Flag,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Calendar,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { Campaign, MilestoneStatus, useCampaignStore } from "@/hooks/useCampignStore"

export default function CampaignPage() {
  const params = useParams()
  const { campaigns, fetchCampaigns } = useCampaignStore()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("story")

  useEffect(() => {
    fetchCampaigns()
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [fetchCampaigns])

  useEffect(() => {
    if (campaigns.length > 0 && params.id) {
      const foundCampaign = campaigns.find((c) => c.id === params.id)
      if (foundCampaign) {
        setCampaign(foundCampaign)
      }
    }
  }, [campaigns, params.id])

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading campaign...</div>
      </div>
    )
  }

  const percentFunded = Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100)

  const getMilestoneStatusIcon = (status: MilestoneStatus) => {
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

  const getMilestoneStatusText = (status: MilestoneStatus) => {
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

  const getMilestoneStatusColor = (status: MilestoneStatus) => {
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

  const completedMilestones = campaign.milestones.filter(
    (m) => m.status === "completed" || m.status === "approved",
  ).length

  const totalMilestones = campaign.milestones.length
  const milestoneProgress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0

  // Sample rewards data (this would normally come from the campaign)
  const rewards = [
    {
      id: "1",
      title: "Digital Supporter Pack",
      description: "Get exclusive digital wallpapers and a thank you email.",
      price: 10,
      type: "digital",
    },
    {
      id: "2",
      title: "Early Access E-Book",
      description: "Receive our digital guide with early access before public release.",
      price: 25,
      type: "digital",
    },
    {
      id: "3",
      title: "Project T-Shirt",
      description: "A high-quality t-shirt with our project logo.",
      price: 45,
      type: "physical",
      deliveryDate: "December 2023",
      location: "Ships worldwide",
    },
    {
      id: "4",
      title: "Supporter Bundle",
      description: "T-shirt, stickers, and a personalized thank you note.",
      price: 75,
      type: "physical",
      deliveryDate: "January 2024",
      location: "Ships to select countries",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F2EA]">
      {/* Hero Section */}
      <div className="relative w-full bg-[#1E3A29] text-white py-12 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <span className="inline-block px-3 py-1 bg-[#4CAF50]/20 text-[#4CAF50] text-sm font-medium rounded-full mb-4">
                {campaign.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{campaign.title}</h1>
              <p className="text-lg text-white/80 mb-6">{campaign.tagline}</p>
              <div className="flex items-center gap-3 mb-6">
                <Avatar>
                  <AvatarImage src={campaign.creatorAvatar || "/placeholder.svg"} alt={campaign.creatorName} />
                  <AvatarFallback>{campaign.creatorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-white/60">Created by</p>
                  <p className="font-medium">{campaign.creatorName}</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">${campaign.raisedAmount.toLocaleString()}</span>
                <span>of ${campaign.goalAmount.toLocaleString()}</span>
              </div>
              <Progress value={percentFunded} className="h-2 mb-4" />
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-2xl font-bold">{percentFunded}%</p>
                  <p className="text-xs text-white/60">Funded</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{campaign.backers}</p>
                  <p className="text-xs text-white/60">Backers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{campaign.daysLeft}</p>
                  <p className="text-xs text-white/60">Days Left</p>
                </div>
              </div>
              <Button className="w-full bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">Back This Project</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
              </TabsList>
              <TabsContent value="story" className="bg-white p-6 rounded-xl mt-6">
                <div className="relative aspect-video mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={campaign.coverImage || "/placeholder.svg?height=400&width=800&query=nature"}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="prose max-w-none">
                  <h2>About This Project</h2>
                  <p>{campaign.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                  <h3>Our Mission</h3>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                  </p>
                  <h3>How We&apos;ll Use The Funds</h3>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="milestones" className="bg-white p-6 rounded-xl mt-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Project Milestones</h2>
                  <p className="text-gray-600">
                    Track the progress of this campaign through its key milestones. Each milestone represents a
                    significant step towards the project&apos;s completion.
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Milestone Progress</span>
                    <span className="text-sm text-gray-500">
                      {completedMilestones} of {totalMilestones} completed
                    </span>
                  </div>
                  <Progress value={milestoneProgress} className="h-2" />
                </div>

                <div className="space-y-6">
                  {campaign.milestones.map((milestone, index) => (
                    <Link
                      key={milestone.id}
                      href={`/campaigns/${campaign.id}/milestones/${milestone.id}`}
                      className="block"
                    >
                      <Card className="overflow-hidden hover:border-[#00EE7D] transition-colors">
                        <CardContent className="p-0">
                          <div className="flex items-stretch">
                            <div className={`w-2 ${getMilestoneStatusColor(milestone.status).split(" ")[0]}`}></div>
                            <div className="flex-1 p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0">{getMilestoneStatusIcon(milestone.status)}</div>
                                  <div>
                                    <h3 className="font-medium">{milestone.title}</h3>
                                    <Badge
                                      variant="outline"
                                      className={`mt-1 ${getMilestoneStatusColor(milestone.status)}`}
                                    >
                                      {getMilestoneStatusText(milestone.status)}
                                    </Badge>
                                  </div>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                              </div>

                              {milestone.estimatedCompletionDate && (
                                <p className="text-sm text-gray-500 mt-2 ml-8">
                                  Due: {new Date(milestone.estimatedCompletionDate).toLocaleDateString()}
                                </p>
                              )}

                              {milestone.status === "voting" && (
                                <div className="mt-4 ml-8 flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4 text-green-500" />
                                    <span className="text-sm font-medium">{milestone.votes?.approve || 0}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ThumbsDown className="h-4 w-4 text-red-500" />
                                    <span className="text-sm font-medium">{milestone.votes?.reject || 0}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="rewards" className="bg-white p-6 rounded-xl mt-6">
                <h2 className="text-2xl font-bold mb-6">Campaign Rewards</h2>

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
                          <div
                            key={reward.id}
                            className="border rounded-lg p-4 hover:border-[#00EE7D] transition-colors"
                          >
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium">{reward.title}</h4>
                              <span className="font-bold">${reward.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                            <div className="flex items-center text-xs text-blue-600">
                              <span className="bg-blue-100 px-2 py-1 rounded-full">Immediate delivery</span>
                            </div>
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
                          <div
                            key={reward.id}
                            className="border rounded-lg p-4 hover:border-[#00EE7D] transition-colors"
                          >
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
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="updates" className="bg-white p-6 rounded-xl mt-6">
                <h2 className="text-2xl font-bold mb-6">Project Updates</h2>
                <div className="space-y-8">
                  <div className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">First Equipment Shipment Arrived!</h3>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      We&apos;re excited to announce that our first shipment of equipment has arrived! This is a major step
                      forward for our project.
                    </p>
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <Image src="/ocean-cleanup-equipment.png" alt="Equipment" fill className="object-cover" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium">Team Expansion</h3>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-600">
                      We&apos;ve brought on two new team members with extensive experience in environmental conservation.
                      They&apos;ll be helping us accelerate our timeline.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className="lg:w-1/3 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Back This Project</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:border-[#00EE7D] cursor-pointer transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Basic Supporter</h4>
                      <span className="font-bold">$25</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Support our project and receive regular updates and a thank you in our documentation.
                    </p>
                    <p className="text-xs text-gray-500">Estimated delivery: December 2023</p>
                  </div>
                  <div className="p-4 border rounded-lg hover:border-[#00EE7D] cursor-pointer transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Premium Supporter</h4>
                      <span className="font-bold">$100</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      All basic rewards plus a limited edition project t-shirt and early access to our results.
                    </p>
                    <p className="text-xs text-gray-500">Estimated delivery: January 2024</p>
                  </div>
                  <div className="p-4 border rounded-lg hover:border-[#00EE7D] cursor-pointer transition-colors">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Partner Level</h4>
                      <span className="font-bold">$500</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      All previous rewards plus your name/logo on our website and an invitation to our launch event.
                    </p>
                    <p className="text-xs text-gray-500">Estimated delivery: February 2024</p>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">Back This Project</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Milestone Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completion</span>
                      <span>{milestoneProgress}%</span>
                    </div>
                    <Progress value={milestoneProgress} className="h-2 mb-4" />
                  </div>

                  <div className="space-y-3">
                    {campaign.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {getMilestoneStatusIcon(milestone.status)}
                        <div className="text-sm truncate">{milestone.title}</div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/campaigns/${campaign.id}?tab=milestones`}>View All Milestones</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Project Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium">{campaign.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium">San Francisco, CA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Launch Date</span>
                    <span className="font-medium">October 15, 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date</span>
                    <span className="font-medium">December 15, 2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
