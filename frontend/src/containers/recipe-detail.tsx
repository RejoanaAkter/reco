"use client";
import React from "react";
import { useParams } from "next/navigation";

import getImageUrl from "@/settings/utils";
import RecipeActions from "@/components/recipeActions";
import useRecipeDetail from "@/hook/useRecipeDetail";

export default function RecipeDetail() {
  const { id: recipeId } = useParams();
  const { recipe, setRecipe, loading, error } = useRecipeDetail(recipeId);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading recipe...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!recipe)
    return <p className="text-center text-red-500 mt-10">Recipe not found</p>;

  // Calculate average rating
  const avgRating = recipe.ratings?.length
    ? (
        recipe.ratings.reduce((sum: number, r: any) => sum + r.value, 0) /
        recipe.ratings.length
      ).toFixed(1)
    : "0";

  // Group comments and ratings by user
  const usersMap = new Map<
    string,
    { user: any; comments: string[]; rating: number | null }
  >();

  // Add ratings
  recipe.ratings?.forEach((r: any) => {
    if (!r.user) return;
    const userId = r.user._id || r.user;
    if (!usersMap.has(userId)) {
      usersMap.set(userId, { user: r.user, rating: r.value, comments: [] });
    } else {
      usersMap.get(userId)!.rating = r.value;
    }
  });

  // Add comments
  recipe.comments?.forEach((c: any) => {
    if (!c.user) return;
    const userId = c.user._id || c.user;
    if (!usersMap.has(userId)) {
      usersMap.set(userId, { user: c.user, rating: null, comments: [c.text] });
    } else {
      usersMap.get(userId)!.comments.push(c.text);
    }
  });

  const userInteractions = Array.from(usersMap.values());

  const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push("⭐");
  }

  if (hasHalfStar) {
    stars.push("✨"); // you can also use "⭐½" or a proper half-star icon
  }

  return stars.join(" "); // space between stars
};

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
      {/* Recipe Image */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md">
        <img
          src={getImageUrl(recipe.imageUrl)}
          alt={recipe.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-400 px-4 py-1.5 rounded-full text-sm font-medium text-white shadow">
          {recipe.cuisine || "Cuisine"}
        </span>
      </div>

      {/* Title & Description */}
      <div className="mt-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          🍲 {recipe.title}
        </h1>
        <p className="mt-3 text-gray-600 text-base leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-700">
          <span className="bg-gray-50 px-3 py-1 border border-gray-200 rounded-full">
            👩‍🍳 {recipe.user?.name || "Unknown"}
          </span>
          <span className="bg-gray-50 px-3 py-1 border border-gray-200 rounded-full">
            📂 {recipe.category?.name || "Uncategorized"}
          </span>
          <span className="bg-gray-50 px-3 py-1 border border-gray-200 rounded-full">
            ⏱ {recipe.prepTime} min
          </span>
          <span
            className={`px-3 py-1 rounded-full border ${
              recipe.isPublic
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {recipe.isPublic ? "🌍 Public" : "🔒 Private"}
          </span>
          <span className="bg-pink-50 px-3 py-1 border border-pink-200 rounded-full">
            ❤️ {recipe.favorites?.length || 0} Favorites
          </span>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-amber-800 mb-3 flex items-center gap-2">
          🥬 Ingredients
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm pl-1">
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx} className="leading-relaxed">
              {ing}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
          📖 Instructions
        </h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 text-sm pl-1">
          {recipe.instructions.map((inst, idx) => (
            <li key={idx} className="leading-relaxed">
              {inst}
            </li>
          ))}
        </ol>
      </div>

      {/* Tags */}
      {recipe.tags?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-md font-semibold text-teal-700 mb-3 flex items-center gap-2">
            🏷️ Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.filter(Boolean).map((tag, idx) => (
              <span
                key={idx}
                className="border border-amber-300 bg-amber-50 text-amber-800 px-4 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Average Rating */}
      <div className="mt-8">
        <h3 className="text-md font-semibold text-yellow-700 mb-3 flex items-center gap-2">
          ⭐ Average Rating
        </h3>
        <span className="bg-yellow-50 text-amber-700 border border-yellow-200 px-4 py-1 rounded-full font-semibold text-sm shadow-sm">
          {avgRating} / 5 ⭐ ({recipe.ratings?.length || 0} reviews)
        </span>
      </div>

      {/* Recipe Actions */}
      <div className="mt-8">
        <RecipeActions
          recipe={recipe}
          onUpdate={(updated) => setRecipe(updated)}
        />
      </div>

      {/* User Ratings & Comments */}
      {userInteractions?.length > 0 && (
        <div className="mt-10 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            💬 User Ratings & Comments
          </h3>
          {userInteractions?.map((u, idx) => (
            <div
              key={idx}
              className="p-5 bg-gray-50 rounded-xl shadow-md border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-800">
                  👤 {u.user?.name || "Guest"}
                </p>
              {u.rating !== null && (
  <p className="text-amber-700 font-bold">
    {renderStars(u.rating)} <span className="text-sm text-gray-500">({u.rating})</span>
  </p>
)}
              </div>

              <ul className="list-disc list-inside text-gray-600 space-y-1 pl-1">
                {u?.comments.map((c, idx) => (
                  <li key={idx} className="leading-relaxed">
                    💡 {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
