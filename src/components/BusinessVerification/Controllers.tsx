"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/Campaign/ImageUpload"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"

interface Controller {
  id: number
  type: string
  passportDocument: File | null
  proofOfAddress: File | null
}

interface ControllersProps {
  onNext: () => void
  onBack: () => void
  initialData?: {
    controllers: Array<{
      type: string
      id: File | null
      address: File | null
    }>
  }
}

export function Controllers({
  onNext,
  onBack,
  initialData = {
    controllers: [{ type: "", id: null, address: null }],
  },
}: ControllersProps) {
  const [controllers, setControllers] = useState<Controller[]>(
    initialData.controllers.length > 0
      ? initialData.controllers.map((ctrl, index) => ({
          id: index + 1,
          type: ctrl.type,
          passportDocument: ctrl.id,
          proofOfAddress: ctrl.address,
        }))
      : [{ id: 1, type: "", passportDocument: null, proofOfAddress: null }],
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const addController = () => {
    const newId = controllers.length + 1
    setControllers([...controllers, { id: newId, type: "", passportDocument: null, proofOfAddress: null }])
  }

  const removeController = (id: number) => {
    if (controllers.length > 1) {
      setControllers(controllers.filter((controller) => controller.id !== id))

      // Remove errors for this controller
      const newErrors = { ...errors }
      delete newErrors[`controller${id}Type`]
      delete newErrors[`controller${id}Id`]
      delete newErrors[`controller${id}Address`]
      setErrors(newErrors)
    }
  }

  const updateControllerType = (id: number, value: string) => {
    setControllers(
      controllers.map((controller) => (controller.id === id ? { ...controller, type: value } : controller)),
    )

    // Clear error for this field
    if (errors[`controller${id}Type`]) {
      const newErrors = { ...errors }
      delete newErrors[`controller${id}Type`]
      setErrors(newErrors)
    }
  }

  const updateControllerDocument = (id: number, field: "passportDocument" | "proofOfAddress", file: File | null) => {
    setControllers(
      controllers.map((controller) => (controller.id === id ? { ...controller, [field]: file } : controller)),
    )

    // Clear error for this field
    const errorField = field === "passportDocument" ? `controller${id}Id` : `controller${id}Address`
    if (errors[errorField]) {
      const newErrors = { ...errors }
      delete newErrors[errorField]
      setErrors(newErrors)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    controllers.forEach((controller) => {
      if (!controller.type) {
        newErrors[`controller${controller.id}Type`] = "Controller type is required"
      }

      if (!controller.passportDocument) {
        newErrors[`controller${controller.id}Id`] = "ID document is required"
      }

      if (!controller.proofOfAddress) {
        newErrors[`controller${controller.id}Address`] = "Proof of address is required"
      }
    })

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
      <div className="space-y-4">
        <div className="text-sm text-gray-600 space-y-2">
          <p>Controllers are individuals with significant control over the Business.</p>
          <p>Please add:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              any shareholder or ultimate beneficial owner(UBO) holding equal or more than 10% shares or any beneficial
              interest of the Business.
            </li>
            <li>all directors.</li>
          </ul>
          <p>Controllers may be contacted for authentication purposes.</p>
        </div>

        {controllers.map((controller, index) => (
          <div key={controller.id} className="border rounded-lg p-6 space-y-6 relative">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Controller {index + 1}</h3>
              {controllers.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeController(controller.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Type of Controller */}
            <div className="space-y-4">
              <Label>
                Type of controller <span className="text-red-500">*</span>
              </Label>
              <Select value={controller.type} onValueChange={(value) => updateControllerType(controller.id, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="director">Director</SelectItem>
                  <SelectItem value="shareholder">Shareholder</SelectItem>
                  <SelectItem value="both">Both Director and Shareholder</SelectItem>
                </SelectContent>
              </Select>
              {errors[`controller${controller.id}Type`] && (
                <p className="text-sm text-red-500">{errors[`controller${controller.id}Type`]}</p>
              )}
            </div>

            {/* Passport/Identity Document */}
            <div className="space-y-4">
              <Label>
                Passport or Identity Document <span className="text-red-500">*</span>
              </Label>
              <div
                className={`border rounded-lg p-6 ${controller.passportDocument ? "border-[#00EE7D] bg-[#00EE7D]/10" : ""}`}
              >
                <ImageUpload
                  onChange={(file) => updateControllerDocument(controller.id, "passportDocument", file)}
                  value={controller.passportDocument}
                />
                {errors[`controller${controller.id}Id`] && (
                  <p className="text-sm text-red-500 mt-1">{errors[`controller${controller.id}Id`]}</p>
                )}
              </div>
            </div>

            {/* Proof of Address */}
            <div className="space-y-4">
              <Label>
                Proof of Address <span className="text-red-500">*</span>
              </Label>
              <div
                className={`border rounded-lg p-6 ${controller.proofOfAddress ? "border-[#00EE7D] bg-[#00EE7D]/10" : ""}`}
              >
                <ImageUpload
                  onChange={(file) => updateControllerDocument(controller.id, "proofOfAddress", file)}
                  value={controller.proofOfAddress}
                />
                {errors[`controller${controller.id}Address`] && (
                  <p className="text-sm text-red-500 mt-1">{errors[`controller${controller.id}Address`]}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" onClick={addController} className="w-full py-6 border-dashed">
          <Plus className="w-4 h-4 mr-2" />
          Add more Controller
        </Button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Back to Authorised Representative
        </Button>
        <Button onClick={handleSubmit} className="bg-[#00EE7D] text-black hover:bg-[#00EE7D]/90">
          Save and continue
        </Button>
      </div>
    </div>
  )
}


// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { ImageUpload } from "@/components/Campaign/ImageUpload";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Plus, X } from "lucide-react";

// interface Controller {
//   id: number;
//   type: string;
//   passportDocument: File | null;
//   proofOfAddress: File | null;
// }

// interface ControllersProps {
//   onNext: () => void;
//   onBack: () => void;
// }

// export function Controllers({ onNext, onBack }: ControllersProps) {
//   const [controllers, setControllers] = useState<Controller[]>([
//     { id: 1, type: "", passportDocument: null, proofOfAddress: null },
//   ]);

//   const addController = () => {
//     const newId = controllers.length + 1;
//     setControllers([
//       ...controllers,
//       { id: newId, type: "", passportDocument: null, proofOfAddress: null },
//     ]);
//   };

//   const removeController = (id: number) => {
//     if (controllers.length > 1) {
//       setControllers(controllers.filter((controller) => controller.id !== id));
//     }
//   };

//   const updateControllerDocument = (
//     id: number,
//     field: "passportDocument" | "proofOfAddress",
//     file: File
//   ) => {
//     setControllers(
//       controllers.map((controller) =>
//         controller.id === id ? { ...controller, [field]: file } : controller
//       )
//     );
//   };

//   return (
//     <div className="space-y-8 py-4">
//       <div className="space-y-4">
//         <div className="text-sm text-gray-600 space-y-2">
//           <p>
//             Controllers are individuals with significant control over the
//             Business.
//           </p>
//           <p>Please add:</p>
//           <ul className="list-disc pl-5 space-y-1">
//             <li>
//               any shareholder or ultimate beneficial owner(UBO) holding equal or
//               more than 10% shares or any beneficial interest of the Business.
//             </li>
//             <li>all directors.</li>
//           </ul>
//           <p>Controllers may be contacted for authentication purposes.</p>
//         </div>

//         {controllers.map((controller, index) => (
//           <div
//             key={controller.id}
//             className="border rounded-lg p-6 space-y-6 relative"
//           >
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold">Controller {index + 1}</h3>
//               {controllers.length > 1 && (
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => removeController(controller.id)}
//                   className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               )}
//             </div>

//             {/* Type of Controller */}
//             <div className="space-y-4">
//               <Label>Type of controller</Label>
//               <Select>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="director">Director</SelectItem>
//                   <SelectItem value="shareholder">Shareholder</SelectItem>
//                   <SelectItem value="beneficial-owner">
//                     Beneficial Owner
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Passport/Identity Document */}
//             <div className="space-y-4">
//               <Label>Passport or Identity Document</Label>
//               <div className="border rounded-lg p-6">
//                 <ImageUpload
//                   onChange={(file) =>
//                     updateControllerDocument(
//                       controller.id,
//                       "passportDocument",
//                       file!
//                     )
//                   }
//                 />
//               </div>
//             </div>

//             {/* Proof of Address */}
//             <div className="space-y-4">
//               <Label>Proof of Address</Label>
//               <div className="border rounded-lg p-6">
//                 <ImageUpload
//                   onChange={(file) =>
//                     updateControllerDocument(
//                       controller.id,
//                       "proofOfAddress",
//                       file!
//                     )
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//         ))}

//         <Button
//           variant="outline"
//           onClick={addController}
//           className="w-full py-6 border-dashed"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           Add more Controller
//         </Button>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-between pt-6">
//         <Button variant="outline" onClick={onBack}>
//           Back to Authorised Representative
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
