// src/app/about/page.tsx
import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About Us
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          We are a team of passionate engineers and designers focused on helping you find the best clothing online.
        </p>
        <div className="text-sm text-gray-500">
          <p>Our mission is to revolutionize the online shopping experience using AI to help you find similar clothing with ease and accuracy.</p>
        </div>
      </div>
    </div>
  );
}
