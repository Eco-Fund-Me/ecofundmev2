"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/Campaign/ImageUpload";
import { Card } from "@/components/ui/card";

interface BusinessDocumentsProps {
  onBack: () => void;
}

export function BusinessDocuments({ onBack }: BusinessDocumentsProps) {
  const documents = [
    {
      id: "incorporation",
      title: "Certificate of Incorporation",
      description: "This document should be certified.",
    },
    {
      id: "bylaws",
      title: "Articles of Association/Bylaws",
      description: "This document should be certified.",
    },
    {
      id: "shareholders",
      title: "Shareholder(s)' Register",
      description: "This document should be certified.",
    },
    {
      id: "directors",
      title: "Director(s)' Register",
      description: "This document should be certified.",
    },
    {
      id: "organizational",
      title: "Organisational Chart",
      description: "This document should be certified.",
    },
    {
      id: "incumbency",
      title: "Certificate of Incumbency",
      description: "This document should be certified.",
    },
  ];

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Please upload the constitutional documents of the Business.
        </p>
      </div>

      <div className="space-y-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-base font-semibold">{doc.title}</Label>
              <p className="text-sm text-gray-500">{doc.description}</p>
            </div>
            <div className="border rounded-lg p-6">
              <ImageUpload
                onChange={(file) => {
                  // Handle document upload
                  console.log(`Uploading ${doc.title}:`, file);
                }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Controllers
        </Button>
        <Button
          type="submit"
          className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
