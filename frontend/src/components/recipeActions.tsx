'use client';

import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { useRecipeRating } from "@/hook/useRecipeRating";
import { useRecipeFavorite } from "@/hook/useRecipeFavorite";
import { useRecipeComments } from "@/hook/useRecipeComments";

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

const RecipeActions = ({ recipe, onUpdate }: Props) => {
  const { user } = useAuth();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [localRecipe, setLocalRecipe] = useState<Recipe>(recipe);

  const { rating, rateRecipe } = useRecipeRating(localRecipe, user, token);
  const { isFavorite, toggleFavorite } = useRecipeFavorite(localRecipe, user, token);
  const { comment, setComment, addComment } = useRecipeComments(localRecipe, user, token);

  // Calculate average rating safely
  const avgRating = localRecipe.ratings?.length
    ? localRecipe.ratings.reduce((a, b) => a + b.value, 0) / localRecipe.ratings.length
    : 0;

  // Wrap updates to keep parent in sync
  const updateRecipe = (updates: Partial<Recipe>) => {
    const updated = { ...localRecipe, ...updates };
    setLocalRecipe(updated);
    onUpdate && onUpdate(updated);
  };

  // Render stars with half-star support
  const renderStars = (value: number) => {
    return [1, 2, 3, 4, 5].map(star => {
      let symbol = "☆"; // empty star
      if (value >= star) {
        symbol = "★"; // full star
      } else if (value >= star - 0.5) {
        symbol = "⯨"; // half star (can replace with proper SVG for professional look)
      }

      return (
        <span
          key={star}
          className={`text-lg ${
            symbol === "★" ? "text-yellow-500" : symbol === "⯨" ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          {symbol}
        </span>
      );
    });
  };

  return (
    <div className="mt-6 border-t pt-4 space-y-4 text-gray-700">
      {/* Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">Average:</span>
          <span className="text-yellow-600 font-semibold">{avgRating.toFixed(1)}</span>
        </div>
        <div className="flex space-x-1">{renderStars(avgRating)}</div>
      </div>

      {/* User Rating Buttons */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            className={`transition-colors text-lg ${
              star <= rating ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"
            }`}
            onClick={async () => {
              const updatedRatings = await rateRecipe(star);
              if (updatedRatings) updateRecipe({ ratings: updatedRatings });
            }}
          >
            ★
          </button>
        ))}
      </div>

      {/* Favorite */}
      <div>
        <button
          onClick={async () => {
            const updatedFavorites = await toggleFavorite();
            if (updatedFavorites) updateRecipe({ favorites: updatedFavorites });
          }}
          className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
            isFavorite
              ? "bg-red-50 border border-red-500 text-red-700 hover:bg-red-100"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
        </button>
      </div>

      {/* Comments */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-300"
        />
        <button
          onClick={async () => {
            const updatedComments = await addComment();
            if (updatedComments) updateRecipe({ comments: updatedComments });
          }}
          className="px-4 py-2 bg-orange-500 text-white text-sm rounded-lg shadow hover:bg-orange-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RecipeActions;
