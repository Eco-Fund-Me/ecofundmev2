import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CampaignCreatorProps {
  name: string;
  imageUrl: string;
}

export function CampaignCreator({ name, imageUrl }: CampaignCreatorProps) {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <span className="font-medium">{name}</span>
    </div>
  );
}
