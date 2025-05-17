"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CampaignHeader } from "@/components/Campaign/CampaignHeader"
import { BusinessDetails } from "@/components/BusinessVerification/BusinessDetails"
import { AuthorisedRepresentative } from "@/components/BusinessVerification/AuthorisedRepresentative"
import { Controllers } from "@/components/BusinessVerification/Controllers"
import { BusinessDocuments } from "@/components/BusinessVerification/BusinessDocuments"
import { useActiveAccount } from "thirdweb/react"
import { getUserKycData } from "@/app/actions/get-user-kyc-data"
// import KYCPage from "@/app/kyc/page"

export default function BusinessVerificationPage() {
  const [activeTab, setActiveTab] = useState("business-details")
  const account = useActiveAccount()
  const address = account ? account.address : ""
  const [kycStatus, setKYCStatus] = useState("")

  // Form data state to store all information across steps
  const [formData, setFormData] = useState({
    // Business Details
    businessId: crypto.randomUUID(),
    businessName: "",
    addressLine1: "",
    addressLine2: "",
    cityRegion: "",
    state: "",
    country: "",
    jurisdiction: "",
    phoneNumber: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
    },

    // Authorised Representative
    representativeId: null as File | null,
    representativeAddress: null as File | null,

    // Controllers
    controllers: [] as Array<{
      type: string
      id: File | null
      address: File | null
    }>,

    // Business Documents
    incorporation: null as File | null,
    articles: null as File | null,
    shareholders: null as File | null,
    directors: null as File | null,
    orgChart: null as File | null,
    incumbency: null as File | null,
  })

  useEffect(() => {
    async function checkStatus() {
      if (address) {
        const kycdata = await getUserKycData(address)
        if (kycdata?.status) {
          setKYCStatus(kycdata.status)
        }
      }
    }

    checkStatus()
  }, [address])

  const tabs = ["business-details", "authorised-representative", "controllers", "business-documents"]

  const handleNext = (data: Partial<typeof formData> = {}) => {
    // Merge the new data with existing data
    setFormData((prev) => {
      // For controllers, we need special handling to ensure we don't lose any uploaded files
      if (data.controllers) {
        // Make sure we preserve any file uploads from previous controllers
        const updatedControllers = data.controllers.map((newController, index) => {
          const prevController = prev.controllers[index]
          if (prevController) {
            return {
              ...newController,
              // Preserve files if they weren't changed
              id: newController.id || prevController.id,
              address: newController.address || prevController.address,
            }
          }
          return newController
        })

        return { ...prev, ...data, controllers: updatedControllers }
      }

      return { ...prev, ...data }
    })

    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  // If KYC is not approved, show KYC page instead
  if (kycStatus !== "approved") {
    // return <KYCPage />
    console.log("kyc not approved")
  }

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
          <TabsTrigger value="authorised-representative">Authorised Representative</TabsTrigger>
          <TabsTrigger value="controllers">Controllers</TabsTrigger>
          <TabsTrigger value="business-documents">Business Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="business-details">
          <BusinessDetails onNext={handleNext} initialData={formData} />
        </TabsContent>

        <TabsContent value="authorised-representative">
          <AuthorisedRepresentative onNext={handleNext} onBack={handleBack} initialData={formData} />
        </TabsContent>

        <TabsContent value="controllers">
          <Controllers onNext={handleNext} onBack={handleBack} initialData={formData} />
        </TabsContent>

        <TabsContent value="business-documents">
          <BusinessDocuments onBack={handleBack} initialData={formData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}


// "use client";

// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CampaignHeader } from "@/components/Campaign/CampaignHeader";
// import { BusinessDetails } from "@/components/BusinessVerification/BusinessDetails";
// import { AuthorisedRepresentative } from "@/components/BusinessVerification/AuthorisedRepresentative";
// import { Controllers } from "@/components/BusinessVerification/Controllers";
// import { BusinessDocuments } from "@/components/BusinessVerification/BusinessDocuments";

// export default function BusinessVerificationPage() {
//   const [activeTab, setActiveTab] = useState("business-details");

//   const tabs = [
//     "business-details",
//     "authorised-representative",
//     "controllers",
//     "business-documents",
//   ];

//   const handleNext = () => {
//     const currentIndex = tabs.indexOf(activeTab);
//     if (currentIndex < tabs.length - 1) {
//       setActiveTab(tabs[currentIndex + 1]);
//     }
//   };

//   const handleBack = () => {
//     const currentIndex = tabs.indexOf(activeTab);
//     if (currentIndex > 0) {
//       setActiveTab(tabs[currentIndex - 1]);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto py-8 px-4">
//       <CampaignHeader
//         category="Organization Verification"
//         title="Business Verification"
//         subtitle="To ensure trust and transparency, all organizations must complete a thorough verification process before joining EcoFundMe. Businesses are required to submit official documentation to verify their legitimacy, preventing fraudulent activities and unauthorized fundraising."
//       />

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="business-details">Business Details</TabsTrigger>
//           <TabsTrigger value="authorised-representative">
//             Authorised Representative
//           </TabsTrigger>
//           <TabsTrigger value="controllers">Controllers</TabsTrigger>
//           <TabsTrigger value="business-documents">
//             Business Documents
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="business-details">
//           <BusinessDetails onNext={handleNext} />
//         </TabsContent>

//         <TabsContent value="authorised-representative">
//           <AuthorisedRepresentative onNext={handleNext} onBack={handleBack} />
//         </TabsContent>

//         <TabsContent value="controllers">
//           <Controllers onNext={handleNext} onBack={handleBack} />
//         </TabsContent>

//         <TabsContent value="business-documents">
//           <BusinessDocuments onBack={handleBack} />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }
