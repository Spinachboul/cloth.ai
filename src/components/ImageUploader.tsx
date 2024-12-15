// src/components/ImageUploader.tsx
"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type.startsWith("image/")) {
        setError(null);
        setPreview(URL.createObjectURL(file));
        onImageUpload(file); // Pass the file to the parent component
      } else {
        setError("Please upload a valid image file.");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className={`w-full h-40 border-2 border-dashed rounded-lg flex justify-center items-center cursor-pointer transition ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the image here...</p>
        ) : (
          <p className="text-gray-500">Drag & drop an image, or click to upload</p>
        )}
      </div>
      {preview && (
        <div className="relative w-32 h-32">
          <Image
            src={preview}
            alt="Preview"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUploader;
