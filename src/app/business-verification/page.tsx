"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CampaignHeader } from "@/components/Campaign/CampaignHeader";
import { BusinessDetails } from "@/components/BusinessVerification/BusinessDetails";
import { AuthorisedRepresentative } from "@/components/BusinessVerification/AuthorisedRepresentative";
import { Controllers } from "@/components/BusinessVerification/Controllers";
import { BusinessDocuments } from "@/components/BusinessVerification/BusinessDocuments";

export default function BusinessVerificationPage() {
  const [activeTab, setActiveTab] = useState("business-details");

  const tabs = [
    "business-details",
    "authorised-representative",
    "controllers",
    "business-documents",
  ];

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <CampaignHeader
        category="Organization Verification"
        title="Business Verification"
        subtitle="To ensure trust and transparency, all organizations must complete a thorough verification process before joining EcoFundMe. Businesses are required to submit official documentation to verify their legitimacy, preventing fraudulent activities and unauthorized fundraising."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="business-details">Business Details</TabsTrigger>
          <TabsTrigger value="authorised-representative">
            Authorised Representative
          </TabsTrigger>
          <TabsTrigger value="controllers">Controllers</TabsTrigger>
          <TabsTrigger value="business-documents">
            Business Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="business-details">
          <BusinessDetails onNext={handleNext} />
        </TabsContent>

        <TabsContent value="authorised-representative">
          <AuthorisedRepresentative onNext={handleNext} onBack={handleBack} />
        </TabsContent>

        <TabsContent value="controllers">
          <Controllers onNext={handleNext} onBack={handleBack} />
        </TabsContent>

        <TabsContent value="business-documents">
          <BusinessDocuments onBack={handleBack} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
