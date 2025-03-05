"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";
import { Button } from "@/components/ui/button";

export function CampaignBasics() {
  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Basics</h2>
        <p className="text-sm text-gray-500">
          Make a good first impression: introduce your campaign objectives and
          entice people to learn more. This basic information will represent
          your campaign on your campaign card and in searches.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="title">Campaign title</Label>
          <Input
            id="title"
            placeholder="What is the title of the campaign?"
            maxLength={50}
          />
          <div className="text-xs text-gray-500 text-right">0/50</div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="tagline">Campaign tagline</Label>
          <Textarea
            id="tagline"
            placeholder="Provide a short description that describes your campaign to your audience."
            maxLength={100}
          />
          <div className="text-xs text-gray-500 text-right">0/100</div>
        </div>

        <div className="space-y-4">
          <Label>Campaign card image</Label>
          <ImageUpload />
          <p className="text-xs text-gray-500">
            Upload a square image that represents your campaign. 640x640 is the
            recommended and minimum resolution.
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="category">Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="art">Art</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              {/* Add more categories */}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            To help backers find your campaign, select a category that best
            represents your project.
          </p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="goal">Campaign goal</Label>
          <Input
            id="goal"
            type="number"
            placeholder="How much do you aim to raise from this campaign?"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="duration">Campaign duration</Label>
          <Input
            id="duration"
            type="number"
            placeholder="Number of days (maximum 60 days)"
            max={60}
          />
          <p className="text-xs text-gray-500">
            How many days will you be running your campaign for? You can run a
            campaign for any number of days, with a 60-day duration maximum.
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
          Save and continue
        </Button>
      </div>
    </div>
  );
}
