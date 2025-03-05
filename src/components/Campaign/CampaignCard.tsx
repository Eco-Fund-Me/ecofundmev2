import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { CampaignProgress } from "./CampaignProgress";
import { CampaignCreator } from "./CampaignCreator";

interface CampaignCardProps {
  id: string;
  title: string;
  category: string;
  creatorName: string;
  targetAmount: number;
  currentAmount: number;
  daysLeft: number;
  imageUrl: string;
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
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-[#00EE7D]">{category}</p>
          <h3 className="text-xl font-semibold mt-2">{title}</h3>
          <div className="mt-4">
            <CampaignProgress
              targetAmount={targetAmount}
              currentAmount={currentAmount}
              backers={0}
              daysLeft={daysLeft}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <CampaignCreator name={creatorName} imageUrl="/creator-avatar.png" />
        </CardFooter>
      </Card>
    </Link>
  );
}
