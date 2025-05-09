import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2, MoreVertical } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardCampaignCardProps {
  type: "backed" | "created" | "draft";
  campaign: {
    id: string;
    title: string;
    image: string;
    goal: number;
    raised: number;
    backers: number;
    daysLeft: number;
    status: "active" | "draft" | "completed" | "failed";
  };
}

export function DashboardCampaignCard({
  type,
  campaign,
}: DashboardCampaignCardProps) {
  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover"
        />
        <Badge
          variant={
            campaign.status === "active"
              ? "default"
              : campaign.status === "draft"
                ? "secondary"
                : campaign.status === "completed"
                  ? "outline"
                  : "destructive"
          }
          className="absolute top-2 right-2"
        >
          {campaign.status}
        </Badge>
      </div>

      <div className="p-4 space-y-4">
        <h3 className="font-semibold text-lg line-clamp-2">{campaign.title}</h3>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${campaign.raised.toLocaleString()} raised</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <p className="text-gray-500">Backers</p>
            <p className="font-medium">{campaign.backers}</p>
          </div>
          <div>
            <p className="text-gray-500">Days Left</p>
            <p className="font-medium">{campaign.daysLeft}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          {type === "backed" ? (
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Campaign
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
