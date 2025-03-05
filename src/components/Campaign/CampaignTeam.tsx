"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  email: string;
}

export function CampaignTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  const addTeamMember = () => {
    setTeam([
      ...team,
      {
        name: "",
        role: "",
        bio: "",
        email: "",
      },
    ]);
  };

  const removeTeamMember = (index: number) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Team</h2>
        <p className="text-sm text-gray-500">
          Introduce your team members and build trust with potential backers.
        </p>
      </div>

      <div className="space-y-6">
        {team.map((member, index) => (
          <Card key={index} className="p-6 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => removeTeamMember(index)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <Input placeholder="Team member name" />
                  <Input placeholder="Role / Position" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea placeholder="A brief description about the team member" />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Contact email" />
              </div>
            </div>
          </Card>
        ))}

        <Button
          onClick={addTeamMember}
          className="w-full bg-[#00EE7D]/10 text-[#00EE7D] hover:bg-[#00EE7D]/20"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>
    </div>
  );
}
