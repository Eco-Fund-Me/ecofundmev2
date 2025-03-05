"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/Campaign/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Reward {
  price: string;
  name: string;
  description: string;
  image: string | null;
  type: string;
  includedItems: string;
  estimatedDeliveryDate: Date | undefined;
  quantity: string;
}

const rewardTypes = [
  { value: "physical", label: "Physical Product" },
  { value: "digital", label: "Digital Item" },
  { value: "experience", label: "Experience" },
  { value: "service", label: "Service" },
  { value: "merchandise", label: "Merchandise" },
];

export function CampaignRewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [currentReward, setCurrentReward] = useState<Reward>({
    price: "",
    name: "",
    description: "",
    image: null,
    type: "",
    includedItems: "",
    estimatedDeliveryDate: undefined,
    quantity: "",
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentReward({
          ...currentReward,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setCurrentReward({ ...currentReward, image: null });
    }
  };

  const isFormValid = () => {
    return (
      currentReward.price.trim() !== "" &&
      currentReward.name.trim() !== "" &&
      currentReward.description.trim() !== "" &&
      currentReward.type.trim() !== ""
    );
  };

  const addReward = () => {
    if (!isFormValid()) {
      alert("Please fill in all required fields");
      return;
    }

    const newReward = {
      ...currentReward,
      price: currentReward.price.trim(),
      name: currentReward.name.trim(),
      description: currentReward.description.trim(),
      type: currentReward.type.trim(),
    };

    setRewards([...rewards, newReward]);

    // Reset form
    setCurrentReward({
      price: "",
      name: "",
      description: "",
      image: null,
      type: "",
      includedItems: "",
      estimatedDeliveryDate: undefined,
      quantity: "",
    });
  };

  const removeReward = (index: number) => {
    const newRewards = rewards.filter((_, i) => i !== index);
    setRewards(newRewards);
  };

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto">
      <div className="bg-[#00EE7D]/10 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          Rewards are incentives offered to backers in exchange for their
          support. Rewards are not editable once they&apos;re made. Visit the
          Help Center to learn about different kinds of perks you can offer.
        </p>
      </div>

      <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Reward Price *"
            type="number"
            value={currentReward.price}
            onChange={(e) =>
              setCurrentReward({ ...currentReward, price: e.target.value })
            }
          />
          <Input
            placeholder="Reward Name *"
            value={currentReward.name}
            onChange={(e) =>
              setCurrentReward({ ...currentReward, name: e.target.value })
            }
          />
        </div>

        <Textarea
          placeholder="Reward Description *"
          value={currentReward.description}
          onChange={(e) =>
            setCurrentReward({ ...currentReward, description: e.target.value })
          }
        />

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Reward Image</label>
          <ImageUpload
            value={currentReward.image || ""}
            onChange={handleImageChange}
          />
        </div>

        <Select
          value={currentReward.type}
          onValueChange={(value) =>
            setCurrentReward({ ...currentReward, type: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Reward Type *" />
          </SelectTrigger>
          <SelectContent>
            {rewardTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Included Items (separate with commas)"
          value={currentReward.includedItems}
          onChange={(e) =>
            setCurrentReward({
              ...currentReward,
              includedItems: e.target.value,
            })
          }
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !currentReward.estimatedDeliveryDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {currentReward.estimatedDeliveryDate ? (
                format(currentReward.estimatedDeliveryDate, "PPP")
              ) : (
                <span>Estimated Delivery Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={currentReward.estimatedDeliveryDate}
              onSelect={(date) =>
                setCurrentReward({
                  ...currentReward,
                  estimatedDeliveryDate: date,
                })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Quantity (leave blank if infinite)"
          type="number"
          value={currentReward.quantity}
          onChange={(e) =>
            setCurrentReward({ ...currentReward, quantity: e.target.value })
          }
        />

        <Button
          className="w-full bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
          onClick={addReward}
          disabled={!isFormValid()}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add a Reward
        </Button>
      </div>

      {rewards.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Added Rewards</h3>
          <div className="grid gap-4">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{reward.name}</h4>
                    <p className="text-sm text-gray-500">
                      {reward.description}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeReward(index)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Price: ${reward.price}</div>
                  <div>Type: {reward.type}</div>
                  {reward.quantity && <div>Quantity: {reward.quantity}</div>}
                  {reward.estimatedDeliveryDate && (
                    <div>
                      Delivery: {format(reward.estimatedDeliveryDate, "PPP")}
                    </div>
                  )}
                </div>
                {reward.image && (
                  <Image
                    src={reward.image}
                    alt={reward.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    width={80}
                    height={80}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end pt-6">
        <Button className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
          Save and continue
        </Button>
      </div>
    </div>
  );
}
