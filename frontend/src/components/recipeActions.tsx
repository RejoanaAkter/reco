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

  const avgRating = localRecipe.ratings?.length
    ? (localRecipe.ratings.reduce((a, b) => a + b.value, 0) / localRecipe.ratings.length).toFixed(1)
    : "0";

  // Wrap updates to keep parent in sync
  const updateRecipe = (updates: Partial<Recipe>) => {
    const updated = { ...localRecipe, ...updates };
    setLocalRecipe(updated);
    onUpdate && onUpdate(updated);
  };

  return (
    <div className="mt-4 border-t pt-2 space-y-2 text-gray-700">
      {/* Rating */}
      <div className="flex items-center space-x-2">
        <span>⭐ {avgRating}</span>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            className={`px-1 ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
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
      <button
        onClick={async () => {
          const updatedFavorites = await toggleFavorite();
          if (updatedFavorites) updateRecipe({ favorites: updatedFavorites });
        }}
        className={`px-3 py-1 rounded ${isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}
      >
        {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </button>

      {/* Comments */}
      <div className="flex space-x-2 mt-2">
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={async () => {
            const updatedComments = await addComment();
            if (updatedComments) updateRecipe({ comments: updatedComments });
          }}
          className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Send
        </button>
      </div>

      <div className="mt-2 space-y-1">
        {localRecipe.comments?.map((c, i) => (
          <div key={i} className="text-sm text-gray-700 border-b pb-1">
            <span className="font-semibold">{c.user}</span>: {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeActions;
