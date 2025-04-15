"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/Campaign/ImageUpload"
import { Card } from "@/components/ui/card"
import { useActiveAccount } from "thirdweb/react"
import { isAddress } from "thirdweb"
import { getUserEmail } from "thirdweb/wallets/in-app"
import { client } from "@/app/client"
import { uploadKybDocument } from "@/app/actions/upload-document"
import { submitKybData } from "@/app/actions/submit-kyb-data"
import EmailLogin from "../login/withEmail"

interface BusinessDocumentsProps {
  onBack: () => void
  initialData?: {
    businessId: string
    businessName: string
    addressLine1: string
    addressLine2?: string
    cityRegion: string
    state: string
    country: string
    jurisdiction: string
    phoneNumber: string
    incorporation: File | null
    articles: File | null
    shareholders: File | null
    directors: File | null
    orgChart: File | null
    incumbency: File | null
    representativeId: File | null
    representativeAddress: File | null
    controllers: Array<{
      type: string
      id: File | null
      address: File | null
    }>
  }
}

interface UploadResult {
  public_id: string
  secure_url: string
  resource_type: string
  format: string
}

interface KYBDocument {
  url: string
  format: string
  publicId: string
  uploadedAt: string
  resourceType: string
  value?: unknown
}

type KYBDocuments = Record<string, KYBDocument>

export function BusinessDocuments({
  onBack,
  initialData = {
    businessId: crypto.randomUUID(),
    businessName: "",
    addressLine1: "",
    addressLine2: "",
    cityRegion: "",
    state: "",
    country: "",
    jurisdiction: "",
    phoneNumber: "",
    incorporation: null,
    articles: null,
    shareholders: null,
    directors: null,
    orgChart: null,
    incumbency: null,
    representativeId: null,
    representativeAddress: null,
    controllers: [],
  },
}: BusinessDocumentsProps) {
  const router = useRouter()
  const account = useActiveAccount()
  const address = account ? account.address : ""
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const documents = [
    {
      id: "incorporation",
      title: "Certificate of Incorporation",
      description: "This document should be certified.",
    },
    {
      id: "articles",
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
      id: "orgChart",
      title: "Organisational Chart",
      description: "This document should be certified.",
    },
    {
      id: "incumbency",
      title: "Certificate of Incumbency",
      description: "This document should be certified.",
    },
  ]

  const handleFileChange = (fieldId: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: file,
    }))

    // Clear error for this field
    if (errors[fieldId]) {
      const newErrors = { ...errors }
      delete newErrors[fieldId]
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    documents.forEach((doc) => {
      if (!formData[doc.id as keyof typeof formData]) {
        newErrors[doc.id] = `${doc.title} is required`
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // 1️⃣ Upload all files first
      const documentReferences: KYBDocuments = {}
      const email = await getUserEmail({ client })

      // Process business documents from current step
      for (const doc of documents) {
        const fieldId = doc.id
        const fileData = formData[fieldId as keyof typeof formData]

        if (fileData instanceof File) {
          const formDataObj = new FormData()
          formDataObj.append("file", fileData)

          const result: UploadResult = await uploadKybDocument(formDataObj, initialData.businessId, fieldId)

          documentReferences[fieldId] = {
            publicId: result.public_id,
            url: result.secure_url,
            resourceType: result.resource_type,
            format: result.format,
            uploadedAt: new Date().toISOString(),
          }
        }
      }

      // Process representative documents from previous step
      if (initialData.representativeId instanceof File) {
        const repIdFormData = new FormData()
        repIdFormData.append("file", initialData.representativeId)
        const repIdResult: UploadResult = await uploadKybDocument(
          repIdFormData,
          initialData.businessId,
          "representativeId",
        )
        documentReferences["representativeId"] = {
          publicId: repIdResult.public_id,
          url: repIdResult.secure_url,
          resourceType: repIdResult.resource_type,
          format: repIdResult.format,
          uploadedAt: new Date().toISOString(),
        }
      }

      if (initialData.representativeAddress instanceof File) {
        const repAddressFormData = new FormData()
        repAddressFormData.append("file", initialData.representativeAddress)
        const repAddressResult: UploadResult = await uploadKybDocument(
          repAddressFormData,
          initialData.businessId,
          "representativeAddress",
        )
        documentReferences["representativeAddress"] = {
          publicId: repAddressResult.public_id,
          url: repAddressResult.secure_url,
          resourceType: repAddressResult.resource_type,
          format: repAddressResult.format,
          uploadedAt: new Date().toISOString(),
        }
      }

      // Process controller documents from previous step
      if (initialData.controllers && initialData.controllers.length > 0) {
        for (let i = 0; i < initialData.controllers.length; i++) {
          const controller = initialData.controllers[i]
          const controllerIndex = i + 1

          // Upload controller ID document
          if (controller.id instanceof File) {
            const controllerIdFormData = new FormData()
            controllerIdFormData.append("file", controller.id)
            const fieldId = `controller${controllerIndex}_id`
            const controllerIdResult: UploadResult = await uploadKybDocument(
              controllerIdFormData,
              initialData.businessId,
              fieldId,
            )

            documentReferences[fieldId] = {
              publicId: controllerIdResult.public_id,
              url: controllerIdResult.secure_url,
              resourceType: controllerIdResult.resource_type,
              format: controllerIdResult.format,
              uploadedAt: new Date().toISOString(),
            }
          }

          // Upload controller address document
          if (controller.address instanceof File) {
            const controllerAddressFormData = new FormData()
            controllerAddressFormData.append("file", controller.address)
            const fieldId = `controller${controllerIndex}_address`
            const controllerAddressResult: UploadResult = await uploadKybDocument(
              controllerAddressFormData,
              initialData.businessId,
              fieldId,
            )

            documentReferences[fieldId] = {
              publicId: controllerAddressResult.public_id,
              url: controllerAddressResult.secure_url,
              resourceType: controllerAddressResult.resource_type,
              format: controllerAddressResult.format,
              uploadedAt: new Date().toISOString(),
            }
          }

          // Store controller type information
          documentReferences[`controller${controllerIndex}_type`] = {
            publicId: "",
            url: "",
            resourceType: "text",
            format: "text",
            uploadedAt: new Date().toISOString(),
            value: controller.type, // Store the controller type as a value
          }
        }
      }

      // 2️⃣ Combine previous business details + uploaded file data
      const completeKybData = {
        businessDetails: {
          businessName: initialData.businessName,
          addressLine1: initialData.addressLine1,
          addressLine2: initialData.addressLine2,
          cityRegion: initialData.cityRegion,
          state: initialData.state,
          country: initialData.country,
          jurisdiction: initialData.jurisdiction,
          phoneNumber: initialData.phoneNumber,
        },
        documents: documentReferences, // Now contains all uploaded files
        submittedAt: new Date().toISOString(),
        status: "pending",
        email: email,
      }

      // 3️⃣ Submit the complete KYB data to backend
      await submitKybData(initialData.businessId, completeKybData, address)

      // 4️⃣ Redirect to success page
      router.push("/business-verification/success")
    } catch (error) {
      console.error("Error submitting KYB data:", error)
      alert("An error occurred while submitting your information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Please upload the constitutional documents of the Business.</p>
      </div>

      <div className="space-y-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-base font-semibold">
                {doc.title} <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-500">{doc.description}</p>
            </div>
            <div
              className={`border rounded-lg p-6 ${formData[doc.id as keyof typeof formData] ? "border-[#00EE7D] bg-[#00EE7D]/10" : ""}`}
            >
              <ImageUpload
                onChange={(file) => {
                  handleFileChange(doc.id, file)
                }}
                value={formData[doc.id as keyof typeof formData] as File | null}
              />
              {errors[doc.id] && <p className="text-sm text-red-500 mt-1">{errors[doc.id]}</p>}
            </div>
          </Card>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back to Controllers
        </Button>
        {isAddress(address) ? (
          <Button
            onClick={handleSubmit}
            className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        ) : (
          // <Button
          //   className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
          //   onClick={() => alert("Please connect your wallet to submit")}
          // >
          //   Sign In to submit
          // </Button>
          <EmailLogin label={"Sign In to submit"} />
        )}
      </div>
    </div>
  )
}


// "use client";

// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { ImageUpload } from "@/components/Campaign/ImageUpload";
// import { Card } from "@/components/ui/card";

// interface BusinessDocumentsProps {
//   onBack: () => void;
// }

// export function BusinessDocuments({ onBack }: BusinessDocumentsProps) {
//   const documents = [
//     {
//       id: "incorporation",
//       title: "Certificate of Incorporation",
//       description: "This document should be certified.",
//     },
//     {
//       id: "bylaws",
//       title: "Articles of Association/Bylaws",
//       description: "This document should be certified.",
//     },
//     {
//       id: "shareholders",
//       title: "Shareholder(s)' Register",
//       description: "This document should be certified.",
//     },
//     {
//       id: "directors",
//       title: "Director(s)' Register",
//       description: "This document should be certified.",
//     },
//     {
//       id: "organizational",
//       title: "Organisational Chart",
//       description: "This document should be certified.",
//     },
//     {
//       id: "incumbency",
//       title: "Certificate of Incumbency",
//       description: "This document should be certified.",
//     },
//   ];

//   return (
//     <div className="space-y-8 py-4">
//       <div className="space-y-2">
//         <p className="text-sm text-gray-600">
//           Please upload the constitutional documents of the Business.
//         </p>
//       </div>

//       <div className="space-y-6">
//         {documents.map((doc) => (
//           <Card key={doc.id} className="p-6 space-y-4">
//             <div className="space-y-2">
//               <Label className="text-base font-semibold">{doc.title}</Label>
//               <p className="text-sm text-gray-500">{doc.description}</p>
//             </div>
//             <div className="border rounded-lg p-6">
//               <ImageUpload
//                 onChange={(file) => {
//                   // Handle document upload
//                   console.log(`Uploading ${doc.title}:`, file);
//                 }}
//               />
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between pt-6">
//         <Button variant="outline" onClick={onBack}>
//           Back to Controllers
//         </Button>
//         <Button
//           type="submit"
//           className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
//         >
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// }
