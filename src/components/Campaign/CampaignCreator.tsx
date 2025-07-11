import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CampaignCreatorProps {
  name: string
  imageUrl: string
}

export function CampaignCreator({ name, imageUrl }: CampaignCreatorProps) {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-8 w-8 border border-[#00EE7D]/20">
        <AvatarImage src={imageUrl || "/placeholder.svg"} />
        <AvatarFallback className="bg-[#00EE7D]/10 text-[#00EE7D]">{name[0]}</AvatarFallback>
      </Avatar>
      <span className="font-medium text-sm text-gray-400">{name}</span>
    </div>
  )
}
