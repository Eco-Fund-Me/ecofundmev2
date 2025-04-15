"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Facebook, Linkedin, Twitter } from "lucide-react"

interface BusinessDetailsProps {
  onNext: () => void
  initialData?: {
    businessName: string
    addressLine1: string
    addressLine2: string
    cityRegion: string
    state: string
    country: string
    jurisdiction: string
    phoneNumber: string
    socialLinks: {
      linkedin: string
      twitter: string
      facebook: string
    }
  }
}

export function BusinessDetails({
  onNext,
  initialData = {
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
  },
}: BusinessDetailsProps) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required"
    }
    if (!formData.cityRegion.trim()) {
      newErrors.cityRegion = "City/Region is required"
    }
    if (!formData.country) {
      newErrors.country = "Country is required"
    }
    if (!formData.jurisdiction) {
      newErrors.jurisdiction = "Jurisdiction is required"
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
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
        {/* Business Name */}
        <div className="space-y-4">
          <Label htmlFor="businessName">
            Full Name of the Business <span className="text-red-500">*</span>
          </Label>
          <Input
            id="businessName"
            placeholder="Enter your business name"
            value={formData.businessName}
            onChange={(e) => {
              setFormData({ ...formData, businessName: e.target.value })
              if (errors.businessName) setErrors({ ...errors, businessName: "" })
            }}
          />
          {errors.businessName && <p className="text-sm text-red-500">{errors.businessName}</p>}
        </div>

        {/* Business Address */}
        <div className="space-y-4">
          <Label>
            Registered Address of the Business <span className="text-red-500">*</span>
          </Label>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Address line 1"
                value={formData.addressLine1}
                onChange={(e) => {
                  setFormData({ ...formData, addressLine1: e.target.value })
                  if (errors.addressLine1) setErrors({ ...errors, addressLine1: "" })
                }}
              />
              {errors.addressLine1 && <p className="text-sm text-red-500 mt-1">{errors.addressLine1}</p>}
            </div>
            <Input
              placeholder="Address line 2"
              value={formData.addressLine2}
              onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
            />
            <div>
              <Input
                placeholder="City/Region"
                value={formData.cityRegion}
                onChange={(e) => {
                  setFormData({ ...formData, cityRegion: e.target.value })
                  if (errors.cityRegion) setErrors({ ...errors, cityRegion: "" })
                }}
              />
              {errors.cityRegion && <p className="text-sm text-red-500 mt-1">{errors.cityRegion}</p>}
            </div>
            <Input
              placeholder="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
            <div>
              <Select
                value={formData.country}
                onValueChange={(value) => {
                  setFormData({ ...formData, country: value })
                  if (errors.country) setErrors({ ...errors, country: "" })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="gh">Ghana</SelectItem>
                  <SelectItem value="ng">Nigeria</SelectItem>
                  {/* Add more countries */}
                </SelectContent>
              </Select>
              {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country}</p>}
            </div>
          </div>
        </div>

        {/* Jurisdiction */}
        <div className="space-y-4">
          <Label>
            Jurisdiction of Incorporation of the Business <span className="text-red-500">*</span>
          </Label>
          <div>
            <Select
              value={formData.jurisdiction}
              onValueChange={(value) => {
                setFormData({ ...formData, jurisdiction: value })
                if (errors.jurisdiction) setErrors({ ...errors, jurisdiction: "" })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="gh">Ghana</SelectItem>
                <SelectItem value="ng">Nigeria</SelectItem>
                {/* Add more countries */}
              </SelectContent>
            </Select>
            {errors.jurisdiction && <p className="text-sm text-red-500 mt-1">{errors.jurisdiction}</p>}
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-4">
          <Label htmlFor="phone">
            Telephone number <span className="text-red-500">*</span>
          </Label>
          <div>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your business phone number"
              value={formData.phoneNumber}
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e.target.value })
                if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: "" })
              }}
            />
            {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}
          </div>
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
        <Button onClick={handleSubmit} className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
          Save and continue
        </Button>
      </div>
    </div>
  )
}


// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Facebook, Linkedin, Twitter } from "lucide-react";

// interface BusinessDetailsProps {
//   onNext: () => void;
// }

// export function BusinessDetails({ onNext }: BusinessDetailsProps) {
//   return (
//     <div className="space-y-8 py-4">
//       <div className="space-y-6">
//         {/* Business Name */}
//         <div className="space-y-4">
//           <Label htmlFor="businessName">Full Name of the Business</Label>
//           <Input id="businessName" placeholder="Enter your business name" />
//         </div>

//         {/* Business Address */}
//         <div className="space-y-4">
//           <Label>Registered Address of the Business</Label>
//           <div className="space-y-4">
//             <Input placeholder="Address line 1" />
//             <Input placeholder="Address line 2" />
//             <Input placeholder="City/Region" />
//             <Input placeholder="State" />
//             <Select>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select country" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="us">United States</SelectItem>
//                 <SelectItem value="uk">United Kingdom</SelectItem>
//                 <SelectItem value="ca">Canada</SelectItem>
//                 {/* Add more countries */}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Jurisdiction */}
//         <div className="space-y-4">
//           <Label>Jurisdiction of Incorporation of the Business</Label>
//           <Select>
//             <SelectTrigger>
//               <SelectValue placeholder="Select country" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="us">United States</SelectItem>
//               <SelectItem value="uk">United Kingdom</SelectItem>
//               <SelectItem value="ca">Canada</SelectItem>
//               {/* Add more countries */}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Phone Number */}
//         <div className="space-y-4">
//           <Label htmlFor="phone">Telephone number</Label>
//           <Input
//             id="phone"
//             type="tel"
//             placeholder="Enter your business phone number"
//           />
//         </div>

//         {/* Social Media Links */}
//         <div className="space-y-4">
//           <Label>Social media Link</Label>
//           <div className="space-y-4">
//             <Button
//               variant="outline"
//               className="w-full justify-start gap-2"
//               onClick={() => {
//                 /* Handle LinkedIn sign in */
//               }}
//             >
//               <Linkedin className="h-5 w-5" />
//               Sign in with LinkedIn
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full justify-start gap-2"
//               onClick={() => {
//                 /* Handle Twitter sign in */
//               }}
//             >
//               <Twitter className="h-5 w-5" />
//               Sign in with X
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full justify-start gap-2"
//               onClick={() => {
//                 /* Handle Facebook sign in */
//               }}
//             >
//               <Facebook className="h-5 w-5" />
//               Sign in with Facebook
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end pt-6">
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
