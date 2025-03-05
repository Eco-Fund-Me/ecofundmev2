"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/Campaign/ImageUpload";

interface AuthorisedRepresentativeProps {
  onNext: () => void;
  onBack: () => void;
}

export function AuthorisedRepresentative({
  onNext,
  onBack,
}: AuthorisedRepresentativeProps) {
  return (
    <div className="space-y-8 py-4">
      <div className="space-y-6">
        {/* Passport/Identity Document Upload */}
        <div className="space-y-4">
          <Label>Passport or Identity Document</Label>
          <div className="border rounded-lg p-6">
            <ImageUpload
              onChange={(file) => {
                // Handle file upload
                console.log(file);
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Upload a clear image of your passport or government-issued ID.
              Accepted formats: PNG, JPG, PDF
            </p>
          </div>
        </div>

        {/* Proof of Address Upload */}
        <div className="space-y-4">
          <Label>Proof of Address</Label>
          <div className="border rounded-lg p-6">
            <ImageUpload
              onChange={(file) => {
                // Handle file upload
                console.log(file);
              }}
            />
            <p className="text-xs text-gray-500 mt-2">
              Upload a recent utility bill or bank statement (not older than 3
              months). Accepted formats: PNG, JPG, PDF
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Business Details
        </Button>
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
