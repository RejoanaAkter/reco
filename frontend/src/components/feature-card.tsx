"use client";
import React from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import getImageUrl from "@/settings/utils";
import { useState } from "react";
import { useRecipeFavorite } from "@/hook/useRecipeFavorite";
import { useAuth } from "./AuthContext";

// Featured Recipe Card
export const FeaturedRecipeCard = ({ item }) => {
  const { user } = useAuth();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [localFavorites, setLocalFavorites] = useState(item.favorites || []);

  const { isFavorite, toggleFavorite, loading } = useRecipeFavorite(
    { ...item, favorites: localFavorites },
    user,
    token
  );

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    const updatedFavorites = await toggleFavorite();
    if (updatedFavorites) setLocalFavorites(updatedFavorites);
  };

  const avgRating = item.ratings?.length
    ? item.ratings.reduce((a, b) => a + b.value, 0) / item.ratings.length
    : 0;

  return (
    <div className="relative w-52 rounded-lg bg-white shadow-md border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center p-3">
      {/* Favorite button outside image */}
      <button
        onClick={handleFavorite}
        disabled={loading}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md z-20 hover:bg-white/90 hover:border transition"
      >
        {isFavorite ? (
          <FaHeart className="text-red-500 w-4 h-4" />
        ) : (
          <FaRegHeart className="text-gray-600 w-4 h-4 hover:text-red-600 cursor-pointer" />
        )}
      </button>

      {/* Recipe Image */}
      <div className="relative w-32 h-32 overflow-hidden rounded-xl shadow-sm mb-3">
        <Image
          src={getImageUrl(item.imageUrl)}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
          priority
        />
      </div>

      {/* Cuisine Badge */}
      <span className="bg-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full text-black shadow mb-1">
        {item?.cuisine}
      </span>

      {/* Title */}
      <h3 className="text-center text-xs font-semibold text-gray-700 px-1 tracking-wide 
      group-hover:text-gray-900 transition-colors duration-300 mb-1 ">
        {item.title}
      </h3>

      {/* Stars */}
      <div className="flex space-x-1 mb-1">
        {[1, 2, 3, 4, 5].map((star) => {
          let symbol = "☆";
          if (avgRating >= star) symbol = "★";
          else if (avgRating >= star - 0.5) symbol = "⯨"; // half star
          return (
            <span
              key={star}
              className={`text-lg ${
                symbol === "★"
                  ? "text-yellow-500"
                  : symbol === "⯨"
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              {symbol}
            </span>
          );
        })}
      </div>

      {/* Numeric Rating + Favorites */}
      <div className="flex justify-center items-center gap-3 ">
        <span className="text-gray-700 text-sm">{avgRating.toFixed(1)}</span>
        <span className="text-md text-gray-700 ">❤️ {localFavorites.length}</span>
      </div>
    </div>
  );
};
