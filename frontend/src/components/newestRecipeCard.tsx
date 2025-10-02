"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getImageUrl from "@/settings/utils";


export const NewestRecipeCard = ({ item, index }) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/recipeDetail/${item._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className={`cursor-pointer flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300`}
    >
      {/* Left: Recipe Info */}
      <div className="flex flex-col gap-1 max-w-[calc(100%-64px)]">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {item.title}
        </h3>
        <p className="text-xs text-gray-700">Cuisine: {item.cuisine}</p>
        <p className="text-xs text-gray-700">
          Added: {new Date(item.updatedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Right: Recipe Image */}
      <div className="w-16 h-16 rounded-full overflow-hidden shadow-md flex-shrink-0 ml-3">
        <Image
          src={getImageUrl(item.imageUrl)}
          alt={item.title}
          width={64}
          height={64}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </div>
  );
};
