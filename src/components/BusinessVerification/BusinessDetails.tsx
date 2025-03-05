"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Facebook, Linkedin, Twitter } from "lucide-react";

interface BusinessDetailsProps {
  onNext: () => void;
}

export function BusinessDetails({ onNext }: BusinessDetailsProps) {
  return (
    <div className="space-y-8 py-4">
      <div className="space-y-6">
        {/* Business Name */}
        <div className="space-y-4">
          <Label htmlFor="businessName">Full Name of the Business</Label>
          <Input id="businessName" placeholder="Enter your business name" />
        </div>

        {/* Business Address */}
        <div className="space-y-4">
          <Label>Registered Address of the Business</Label>
          <div className="space-y-4">
            <Input placeholder="Address line 1" />
            <Input placeholder="Address line 2" />
            <Input placeholder="City/Region" />
            <Input placeholder="State" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                {/* Add more countries */}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Jurisdiction */}
        <div className="space-y-4">
          <Label>Jurisdiction of Incorporation of the Business</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              {/* Add more countries */}
            </SelectContent>
          </Select>
        </div>

        {/* Phone Number */}
        <div className="space-y-4">
          <Label htmlFor="phone">Telephone number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your business phone number"
          />
        </div>

        {/* Social Media Links */}
        <div className="space-y-4">
          <Label>Social media Link</Label>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                /* Handle LinkedIn sign in */
              }}
            >
              <Linkedin className="h-5 w-5" />
              Sign in with LinkedIn
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                /* Handle Twitter sign in */
              }}
            >
              <Twitter className="h-5 w-5" />
              Sign in with X
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={() => {
                /* Handle Facebook sign in */
              }}
            >
              <Facebook className="h-5 w-5" />
              Sign in with Facebook
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button
          onClick={onNext}
          className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
        >
          Save and continue
        </Button>
      </div>
    </div>
  );
}
