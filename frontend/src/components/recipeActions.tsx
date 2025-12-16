"use client";

import { useState } from "react";
import { useAuth } from "@/settings/AuthContext";
import { useRecipeRating } from "@/hook/useRecipeRating";
import { useRecipeFavorite } from "@/hook/useRecipeFavorite";
import { useRecipeComments } from "@/hook/useRecipeComments";
import { SmallTitle } from "@/utils/smallTitle";
import { FaRegCommentDots } from "react-icons/fa";
import { GoHeartFill, GoStarFill } from "react-icons/go";

interface Recipe {
  _id: string;
  title: string;
  ratings?: { user: string; value: number }[];
  favorites?: string[];
  comments?: { user: string; text: string; createdAt: string }[];
}

interface Props {
  recipe: Recipe;
  onUpdate?: (updated: Recipe) => void;
}

export default function RecipeActions({ recipe, onUpdate }: Props) {
  const { user } = useAuth();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [localRecipe, setLocalRecipe] = useState<Recipe>(recipe);

  const { rating, rateRecipe } = useRecipeRating(localRecipe, user, token);
  const { isFavorite, toggleFavorite } = useRecipeFavorite(
    localRecipe,
    user,
    token
  );
  const { comment, setComment, addComment } = useRecipeComments(
    localRecipe,
    user,
    token
  );

  const avgRating = localRecipe.ratings?.length
    ? localRecipe.ratings.reduce((a, b) => a + b.value, 0) /
      localRecipe.ratings.length
    : 0;

  const updateRecipe = (updates: Partial<Recipe>) => {
    const updated = { ...localRecipe, ...updates };
    setLocalRecipe(updated);
    onUpdate && onUpdate(updated);
  };

  const renderStars = (value: number, clickMode = false) => {
    return [1, 2, 3, 4, 5].map((star) => {
      const isFull = value >= star;
      const isHalf = value >= star - 0.5 && value < star;

      const symbol = isFull ? "★" : isHalf ? "⯨" : "☆";
      const color = isFull
        ? "text-yellow-500"
        : isHalf
        ? "text-yellow-500"
        : "text-gray-400";

      return (
        <button
          key={star}
          disabled={!clickMode}
          onClick={async () => {
            if (!clickMode) return;
            const updatedRatings = await rateRecipe(star);
            if (updatedRatings) updateRecipe({ ratings: updatedRatings });
          }}
          className={`text-2xl cursor-pointer transition-transform  ${
            clickMode ? "hover:scale-110" : "cursor-default"
          } ${color}`}
        >
          {symbol}
        </button>
      );
    });
  };

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-2xl space-y-8 border border-gray-200">
      {/* Favorite Button */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-end sm:items-center">
        <h3 className="text-gray-800 font-semibold text-sm text-center sm:text-left">
          {isFavorite ? "Remove from favorite" : "Make your favourite"}
        </h3>

        <button
          onClick={async () => {
            const updatedFavorites = await toggleFavorite();
            if (updatedFavorites) updateRecipe({ favorites: updatedFavorites });
          }}
          className={`px-4 py-2 cursor-pointer rounded text-sm font-medium shadow transition-all flex items-center justify-center gap-2 ${
            isFavorite
              ? "text-red-600 border border-red-300 hover:bg-red-50"
              : "text-gray-700 hover:bg-gray-100 border"
          }`}
        >
          {isFavorite ? (
            <span className="flex gap-2 items-center">
              <GoHeartFill size={16} /> Favorited
            </span>
          ) : (
            <span className="flex gap-2 items-center">
              <GoHeartFill size={16} /> Favorite
            </span>
          )}
        </button>
      </div>

      {/* Rating Section */}
      <div className="p-4 rounded border border-amber-200 space-y-3">
        <SmallTitle
          title="Ratings"
          titleSize="text-md"
          icon={<GoStarFill size={16} className="text-amber-700" />}
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex justify-center sm:justify-start space-x-1 border rounded hover:bg-yellow-50 p-2">
            {renderStars(rating, true)}
          </div>

          <div className="text-center sm:text-right">
            <div className="text-gray-700 text-sm font-semibold">
              <span className="font-semibold">Average Rating:</span>{" "}
              {avgRating.toFixed(1)}
            </div>
            <div className="flex justify-center sm:justify-end space-x-1">
              {renderStars(avgRating)}
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div className="p-4 rounded border border-amber-200 shadow-xl space-y-4">
        <SmallTitle
          title="Comments"
          titleSize="text-md"
          icon={<FaRegCommentDots size={16} className="text-amber-700" />}
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border border-gray-400 rounded text-gray-700 px-4 py-2 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <button    className="cursor-pointer px-6 py-2 border border-amber-700 text-amber-700 hover:text-white rounded shadow hover:bg-orange-600 transition-colors text-sm"
            onClick={async () => {
              const newComment = await addComment();
              debugger;
              if (newComment) {
                onUpdate?.({
                  ...recipe,
                  comments: [...(recipe.comments || []), newComment],
                });
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
