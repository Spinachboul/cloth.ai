// src/app/how-it-works/page.tsx
import React from 'react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          How It Works
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn how our AI-powered clothing search works. Upload an image, and we'll find similar products from top online stores.
        </p>
        <div className="text-sm text-gray-500">
          <p>Our technology leverages advanced machine learning models to analyze your uploaded image and match it with similar clothing items available online.</p>
        </div>
      </div>
    </div>
  );
}
