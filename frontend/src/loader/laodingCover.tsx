// src/components/LoadingCover.tsx
"use client";

import React from "react";

export default function LoadingCover() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="flex flex-col items-center">
        {/* Spinning circle */}
        <div className="w-14 h-14 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin mb-4"></div>

        {/* Optional loading text */}
        <p className="text-gray-800 font-medium text-md animate-pulse">
          Loading your delicious recipes...
        </p>
      </div>
    </div>
  );
}
