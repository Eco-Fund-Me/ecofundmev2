import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useMatrix } from "@/hooks/useMatrix";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinServerButton({ server }: { server: { id: string; type: string } }) {
  const { joinSpace, joinCampaignSpace } = useMatrix();
  const router = useRouter();
  const [joining, setJoining] = useState(false);

const handleJoin = async () => {
  setJoining(true);
  try {
    if (server.type === "campaign") {
      console.log("Joining campaign space:", server.id);
      await joinCampaignSpace(server.id);
    } else {
      await joinSpace(server.id);
    }

    toast.success("Joined successfully!", "You are now in the space.");
    router.push(`/social/servers/${server.id}`);
  } catch (err) {
    console.error(err);
    toast.error("Failed to join.", "An unexpected error occurred.");
  } finally {
    setJoining(false);
  }
};


  return (
    <Button
      onClick={handleJoin}
      disabled={joining}
      className="w-full bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90 font-medium"
    >
      {joining
        ? "Joining..."
        : server.type === "campaign"
        ? "Join Campaign"
        : "Join Community"}
    </Button>
  );
}
