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

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { CampaignHeader } from "@/components/Campaign/CampaignHeader"
import { CampaignProgress } from "@/components/Campaign/CampaignProgress"
import { CampaignCreator } from "@/components/Campaign/CampaignCreator"
import { CampaignRisk } from "@/components/Campaign/CampaignRisk"
import { CampaignTabs } from "@/components/Campaign/CampaignTabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Heart, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { CampaignCard } from "@/components/Campaign/CampaignCard"
import { useCampaignStore } from "@/hooks/useCampignStore"

export default function CampaignPage() {
  const params = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const { campaigns, fetchCampaigns } = useCampaignStore()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [campaign, setCampaign] = useState<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [relatedCampaigns, setRelatedCampaigns] = useState<any[]>([])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    console.log("Component mounted, params:", params)

    const loadData = async () => {
      console.log("Loading data, current campaigns:", campaigns.length)

      // Fetch campaigns if they're not already loaded
      if (campaigns.length === 0) {
        console.log("Fetching campaigns...")
        await fetchCampaigns()
        console.log("Campaigns fetched, count:", campaigns.length)
      }

      // Find the campaign with the matching ID
      console.log("Looking for campaign with ID:", params.id)
      const foundCampaign = campaigns.find((c) => c.id === params.id)
      console.log("Found campaign:", foundCampaign ? "Yes" : "No")

      if (foundCampaign) {
        setCampaign(foundCampaign)

        // Find related campaigns (same category, excluding current campaign)
        const related = campaigns.filter((c) => c.category === foundCampaign.category && c.id !== params.id).slice(0, 3)

        setRelatedCampaigns(related)
      } else {
        console.log("Campaign not found, setting notFound state")
        setNotFound(true)
      }

      // Set loaded state after a short delay for animation
      setTimeout(() => setIsLoaded(true), 300)
    }

    loadData()
  }, [params.id, campaigns, fetchCampaigns, params])

  // Default content for campaign tabs
  const campaignContent = {
    story:
      campaign?.description ||
      "This campaign aims to make a positive impact on our environment through innovative solutions and sustainable practices.",
    rewards: campaign?.rewards || [
      {
        id: "r1",
        title: "Early Bird Supporter",
        description: "Get early access to the project updates and exclusive content",
        price: 25,
        type: "digital",
      },
      {
        id: "r2",
        title: "Premium Supporter",
        description: "All previous rewards plus special mention in the project",
        price: 75,
        type: "physical",
        deliveryDate: "December 2023",
        location: "Ships worldwide",
      },
    ],
    riskDisclosure: "Donations will no longer be refundable once the campaign ends.",
  }

  // If campaign not found, show error message
  if (notFound) {
    return (
      <div className="min-h-screen bg-[#F5F2EA] flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-[#E8E4D8] max-w-md mx-auto text-center">
          <AlertTriangle className="h-16 w-16 text-[#4CAF50] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#1E3A29] mb-2">Campaign Not Found</h1>
          <p className="text-[#5A7D6A] mb-6">
            The campaign you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/campaigns">
            <Button className="bg-[#4CAF50] text-white hover:bg-[#4CAF50]/90">Browse Campaigns</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Show loading state while fetching campaign data
  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#F5F2EA] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-[#E8E4D8] h-12 w-12 mb-4"></div>
          <div className="h-4 bg-[#E8E4D8] rounded w-32 mb-2"></div>
          <div className="h-3 bg-[#E8E4D8] rounded w-24"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen mt-20 bg-[#F5F2EA]">
      {/* Back button and actions */}
      <div className="bg-white border-b border-[#E8E4D8]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/campaigns">
            <Button variant="ghost" className="text-[#1E3A29] hover:text-[#4CAF50] hover:bg-[#4CAF50]/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Campaigns
            </Button>
          </Link>
          <div className="flex space-x-2">
            <Button variant="ghost" className="text-[#1E3A29] hover:text-[#4CAF50] hover:bg-[#4CAF50]/10">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost" className="text-[#1E3A29] hover:text-[#4CAF50] hover:bg-[#4CAF50]/10">
              <Heart className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Image */}
          <div className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden bg-white border border-[#E8E4D8]">
            <Image
              src={campaign.imageUrl || campaign.coverImage || "/placeholder.svg"}
              alt={campaign.title}
              className="object-cover w-full h-full"
              fill
              priority
            />
          </div>

          {/* Right Column - Campaign Info */}
          <div className="space-y-6 bg-white p-6 md:p-8 rounded-2xl border border-[#E8E4D8]">
            <CampaignHeader
              category={campaign.category}
              title={campaign.title}
              subtitle={campaign.tagline || `A ${campaign.category} project by ${campaign.creatorName}`}
            />

            <CampaignProgress
              targetAmount={campaign.targetAmount || campaign.goalAmount}
              currentAmount={campaign.currentAmount || campaign.raisedAmount}
              backers={campaign.backers || Math.floor(Math.random() * 10) + 1}
              daysLeft={campaign.daysLeft}
            />

            <CampaignCreator name={campaign.creatorName} imageUrl={campaign.creatorAvatar || "/creator-avatar.png"} />

            <Button className="w-full py-6 bg-[#4CAF50] text-white font-semibold rounded-full hover:bg-[#4CAF50]/90 transition-colors">
              Support This Project
            </Button>

            <CampaignRisk disclosure={campaignContent.riskDisclosure} />
          </div>
        </div>

        {/* Campaign Tabs */}
        <div className="mt-8 md:mt-12 bg-white p-6 md:p-8 rounded-2xl border border-[#E8E4D8]">
          <CampaignTabs
            description={campaignContent.story}
            milestones={campaign.milestones || []}
            rewards={campaignContent.rewards}
          />
        </div>

        {/* Related Campaigns Section */}
        {relatedCampaigns.length > 0 && (
          <div className="mt-12 md:mt-16">
            <h2 className="text-2xl font-bold text-[#1E3A29] mb-6">Similar Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCampaigns.map((relatedCampaign) => (
                <div key={relatedCampaign.id} className="w-full h-full">
                  <CampaignCard {...relatedCampaign} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
