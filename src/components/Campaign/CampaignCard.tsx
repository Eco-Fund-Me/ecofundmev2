import Link from "next/link"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Campaign } from "@/hooks/useCampignStore"

export function CampaignCard({
  id,
  title,
  tagline,
  category,
  creatorName,
  creatorAvatar,
  goalAmount,
  raisedAmount,
  backers,
  daysLeft,
  coverImage,
}: Campaign) {
  const percentFunded = Math.min(Math.round((raisedAmount / goalAmount) * 100), 100)

  return (
    <Link href={`/campaigns/${id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="relative aspect-video">
          <Image
            src={coverImage || "/placeholder.svg?height=200&width=350&query=nature"}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full">{category}</span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tagline}</p>

          <div className="mt-auto">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">${raisedAmount.toLocaleString()}</span>
              <span className="text-gray-600">{percentFunded}%</span>
            </div>
            <Progress value={percentFunded} className="h-2 mb-4" />

            <div className="flex justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <div className="relative w-5 h-5 rounded-full overflow-hidden mr-1">
                  <Image
                    src={creatorAvatar || "/placeholder.svg?height=20&width=20&query=avatar"}
                    alt={creatorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{creatorName}</span>
              </div>
              <div className="flex gap-2">
                <span>{backers} backers</span>
                <span>•</span>
                <span>{daysLeft} days left</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
