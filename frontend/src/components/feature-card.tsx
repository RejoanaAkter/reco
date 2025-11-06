"use client";
import React from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaArrowRight } from "react-icons/fa";
import getImageUrl from "@/settings/utils";
import { useState } from "react";
import { useRecipeFavorite } from "@/hook/useRecipeFavorite";
import { useAuth } from "./AuthContext";

interface FeaturedRecipeCardProps {
  item: any;
  showActions?: boolean;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

export const FeaturedRecipeCard = ({ 
  item, 
  showActions = false, 
  onEdit, 
  onDelete 
}: FeaturedRecipeCardProps) => {
  const { user } = useAuth();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [localFavorites, setLocalFavorites] = useState(item.favorites || []);
  const [isHovered, setIsHovered] = useState(false);

  const { isFavorite, toggleFavorite, loading } = useRecipeFavorite(
    { ...item, favorites: localFavorites },
    user,
    token
  );

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedFavorites = await toggleFavorite();
    if (updatedFavorites) setLocalFavorites(updatedFavorites);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(item);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(item);
  };

  const handleDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add your details navigation logic here
    console.log("View details for:", item.title);
  };

  const avgRating = item.ratings?.length
    ? item.ratings.reduce((a: number, b: any) => a + b.value, 0) / item.ratings.length
    : 0;

  return (
    <div 
      className="relative w-64 h-80 rounded bg-white shadow-lg border border-gray-200 overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Takes upper portion */}
      <div className="relative w-full h-4/7">
        <Image
          src={getImageUrl(item.imageUrl)}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-700 ease-in-out group-hover:scale-105"
          priority
        />

        {/* Bottom to Top Fade Overlay on Hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/70 to-transparent transition-all duration-500 ease-out z-10 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ 
            transformOrigin: 'bottom',
            transform: isHovered ? 'translateY(0)' : 'translateY(20px)'
          }}
        />

        {/* Hover Actions - Appear from bottom */}
        {isHovered && (
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <div className="flex justify-center gap-3">
              <button 
                onClick={handleDetails}
                className=" flex items-center gap-2 text-sm"
              >
                View Details
                <FaArrowRight className="w-3 h-3" />
              </button>
              
              {/* Favorite Button in Overlay */}
              <button
                onClick={handleFavorite}
                disabled={loading}
                className="bg-white/95 p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 w-4 h-4" />
                ) : (
                  <FaRegHeart className="text-gray-700 w-4 h-4 hover:text-red-500 transition-colors" />
                )}
              </button>
            </div>

            {/* Edit/Delete Buttons (only if showActions is true) */}
            {showActions && (
              <div className="flex gap-2 justify-center mt-2">
                <button
                  onClick={handleEdit}
                  className="bg-blue-600/90 hover:bg-blue-700 text-white p-2 rounded-full hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <FaEdit className="w-3 h-3" />
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-full hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <FaTrash className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Section - Bottom portion */}
      <div className="h-3/7 p-4 flex flex-col justify-between">
        {/* Title and Description */}
        <div>
          <h3 className="text-gray-900 font-semibold text-md mb-1 ">
            {item.title}
          </h3>
          <p className="text-gray-700 text-xs line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Bottom Section with Rating and Favorites */}
        <div className="flex justify-between items-center pb-3 mt-1">
          {/* Rating Stars */}
          <div className="flex items-center gap-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => {
                let symbol = "☆";
                if (avgRating >= star) symbol = "★";
                else if (avgRating >= star - 0.5) symbol = "⯨";
                return (
                  <span
                    key={star}
                    className={`text-md ${
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
            <span className="text-gray-700 text-sm font-medium">({avgRating.toFixed(1)})</span>
          </div>
  {item.time && (
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <span>⏱</span> {item.time}
          </p>
        )}
        </div>
      </div>
    </div>
  );
};