"use client";

import React from "react";
import ImageUploader from "../components/ImageUploader";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Find Similar Clothing with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Upload an image of a clothing item and discover similar products from top online stores
        </p>

        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
          <ImageUploader onImageUpload={(file: File) => console.log(file)} />
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Supported formats: JPEG, PNG, WebP (max 10MB)
        </div>

        <div className="mt-10 flex justify-center space-x-4">
          <Link 
            href="/how-it-works" 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            How It Works
          </Link>
          <Link 
            href="/about" 
            className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
