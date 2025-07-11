"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onChange?: (file: File | null) => void;
  value?: File | string | null;
  multiple?: boolean;
}

export function ImageUpload({
  onChange,
  value,
  multiple = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle preview logic when value changes
  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    setPreview(null);
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (file.size > 5 * 1024 * 1024) {
          setError("File size must be less than 5MB");
          return;
        }

        if (onChange) {
          onChange(file);
        }
      }
    },
    [onChange]
  );

  const removeImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onChange) {
        onChange(null);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: multiple ? undefined : 1,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200 ${
            isDragActive
              ? "border-[#00EE7D] bg-[#00EE7D]/10"
              : "border-gray-300 hover:border-[#00EE7D]"
          }`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="relative w-full aspect-square">
            <Image
              src={preview}
              alt="Upload preview"
              fill
              className="object-cover rounded-lg"
            />
            <Button
              onClick={removeImage}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {isDragActive
                ? "Drop the image here"
                : "Drag and drop an image here, or click to select"}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              PNG, JPG or JPEG (max. 5MB)
            </p>
          </>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}


// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Upload } from "lucide-react"

// interface ImageUploadProps {
//   onChange?: (file: File | null) => void
//   value?: File | null
// }

// export function ImageUpload({ onChange, value }: ImageUploadProps) {
//   const [preview, setPreview] = useState<string | null>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null

//     if (file) {
//       // Create a preview URL for image files
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader()
//         reader.onload = () => {
//           setPreview(reader.result as string)
//         }
//         reader.readAsDataURL(file)
//       } else {
//         // For non-image files (like PDFs), just show the filename
//         setPreview(null)
//       }
//     } else {
//       setPreview(null)
//     }

//     if(onChange){
//       onChange(file)
//     }
   
//   }

//   return (
//     <div className="w-full">
//       <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
//       <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full cursor-pointer">
//         {preview ? (
//           <div className="w-full">
//             <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-40 mx-auto object-contain" />
//             <p className="text-sm text-center mt-2 text-gray-700">{value?.name}</p>
//           </div>
//         ) : value ? (
//           <div className="text-center text-gray-700">
//             <p className="text-sm">{value.name}</p>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center text-gray-500">
//             <Upload className="w-8 h-8 mb-2" />
//             <p className="text-sm">Click to upload</p>
//             <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF</p>
//           </div>
//         )}
//       </label>
//     </div>
//   )
// }
