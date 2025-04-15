"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/Campaign/ImageUpload"

interface AuthorisedRepresentativeProps {
  onNext: () => void
  onBack: () => void
  initialData?: {
    representativeId: File | null
    representativeAddress: File | null
  }
}

export function AuthorisedRepresentative({
  onNext,
  onBack,
  initialData = {
    representativeId: null,
    representativeAddress: null,
  },
}: AuthorisedRepresentativeProps) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFileChange = (field: "representativeId" | "representativeAddress", file: File | null) => {
    setFormData({ ...formData, [field]: file })
    if (errors[field]) setErrors({ ...errors, [field]: "" })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.representativeId) {
      newErrors.representativeId = "Passport or identity document is required"
    }

    if (!formData.representativeAddress) {
      newErrors.representativeAddress = "Proof of address is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-6">
        {/* Passport/Identity Document Upload */}
        <div className="space-y-4">
          <Label>
            Passport or Identity Document <span className="text-red-500">*</span>
          </Label>
          <div
            className={`border rounded-lg p-6 ${formData.representativeId ? "border-[#00EE7D] bg-[#00EE7D]/10" : ""}`}
          >
            <ImageUpload
              onChange={(file) => {
                handleFileChange("representativeId", file)
              }}
              value={formData.representativeId}
            />
            <p className="text-xs text-gray-500 mt-2">
              Upload a clear image of your passport or government-issued ID. Accepted formats: PNG, JPG, PDF
            </p>
            {errors.representativeId && <p className="text-sm text-red-500 mt-1">{errors.representativeId}</p>}
          </div>
        </div>

        {/* Proof of Address Upload */}
        <div className="space-y-4">
          <Label>
            Proof of Address <span className="text-red-500">*</span>
          </Label>
          <div
            className={`border rounded-lg p-6 ${formData.representativeAddress ? "border-[#00EE7D] bg-[#00EE7D]/10" : ""}`}
          >
            <ImageUpload
              onChange={(file) => {
                handleFileChange("representativeAddress", file)
              }}
              value={formData.representativeAddress}
            />
            <p className="text-xs text-gray-500 mt-2">
              Upload a recent utility bill or bank statement (not older than 3 months). Accepted formats: PNG, JPG, PDF
            </p>
            {errors.representativeAddress && (
              <p className="text-sm text-red-500 mt-1">{errors.representativeAddress}</p>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Business Details
        </Button>
        <Button onClick={handleSubmit} className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
          Save and continue
        </Button>
      </div>
    </div>
  )
}


// "use client";

// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { ImageUpload } from "@/components/Campaign/ImageUpload";

// interface AuthorisedRepresentativeProps {
//   onNext: () => void;
//   onBack: () => void;
// }

// export function AuthorisedRepresentative({
//   onNext,
//   onBack,
// }: AuthorisedRepresentativeProps) {
//   return (
//     <div className="space-y-8 py-4">
//       <div className="space-y-6">
//         {/* Passport/Identity Document Upload */}
//         <div className="space-y-4">
//           <Label>Passport or Identity Document</Label>
//           <div className="border rounded-lg p-6">
//             <ImageUpload
//               onChange={(file) => {
//                 // Handle file upload
//                 console.log(file);
//               }}
//             />
//             <p className="text-xs text-gray-500 mt-2">
//               Upload a clear image of your passport or government-issued ID.
//               Accepted formats: PNG, JPG, PDF
//             </p>
//           </div>
//         </div>

//         {/* Proof of Address Upload */}
//         <div className="space-y-4">
//           <Label>Proof of Address</Label>
//           <div className="border rounded-lg p-6">
//             <ImageUpload
//               onChange={(file) => {
//                 // Handle file upload
//                 console.log(file);
//               }}
//             />
//             <p className="text-xs text-gray-500 mt-2">
//               Upload a recent utility bill or bank statement (not older than 3
//               months). Accepted formats: PNG, JPG, PDF
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between pt-6">
//         <Button variant="outline" onClick={onBack}>
//           Back to Business Details
//         </Button>
//         <Button
//           onClick={onNext}
//           className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90"
//         >
//           Save and continue
//         </Button>
//       </div>
//     </div>
//   );
// }
