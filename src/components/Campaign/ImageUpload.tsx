"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onChange?: (file: File | null) => void;
  value?: string;
  multiple?: boolean;
}

export function ImageUpload({
  onChange,
  value,
  multiple = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setError("File size must be less than 5MB");
          return;
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);

        // Call onChange with the file
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
      setPreview(null);
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
