import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { CampaignProgress } from "./CampaignProgress"
import { CampaignCreator } from "./CampaignCreator"
import { Badge } from "@/components/ui/badge"

interface CampaignCardProps {
  id: string
  title: string
  category: string
  creatorName: string
  targetAmount: number
  currentAmount: number
  daysLeft: number
  imageUrl: string
}

export function CampaignCard({
  id,
  title,
  category,
  creatorName,
  targetAmount,
  currentAmount,
  daysLeft,
  imageUrl,
}: CampaignCardProps) {
  return (
    <Link href={`/campaigns/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-[#0A1A12] border-[#0A1A12] text-white h-full flex flex-col">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#040B08] to-transparent opacity-50"></div>
            <Badge className="absolute top-3 right-3 bg-[#00EE7D] hover:bg-[#00EE7D]/90 text-black">{category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="text-xl font-semibold mt-2 mb-4 line-clamp-2">{title}</h3>
          <div className="mt-auto">
            <CampaignProgress
              targetAmount={targetAmount}
              currentAmount={currentAmount}
              backers={0}
              daysLeft={daysLeft}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 border-t border-[#1A2A22]">
          <CampaignCreator name={creatorName} imageUrl="/creator-avatar.png" />
        </CardFooter>
      </Card>
    </Link>
  )
}
