'use client';
import React from "react";
import { useParams } from "next/navigation";

import getImageUrl from "@/settings/utils";
import RecipeActions from "@/components/recipeActions";
import useRecipeDetail from "@/hook/useRecipeDetail";

export default function RecipeDetail() {
  const { id: recipeId } = useParams();
  const { recipe, setRecipe, loading, error } = useRecipeDetail(recipeId);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading recipe...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!recipe) return <p className="text-center text-red-500 mt-10">Recipe not found</p>;

  // Calculate average rating
  const avgRating = recipe.ratings?.length
    ? (recipe.ratings.reduce((sum: number, r: any) => sum + r.value, 0) / recipe.ratings.length).toFixed(1)
    : "0";

  // Group comments and ratings by user
  const usersMap = new Map<string, { user: any; comments: string[]; rating: number | null }>();

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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      {/* Recipe Image */}
      <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-lg border border-orange-200">
        <img
          src={getImageUrl(recipe.imageUrl)}
          alt={recipe.title}
          className="w-full h-full object-cover object-center"
        />
        <span className="absolute top-4 left-4 bg-orange-200/70 px-3 py-1 rounded-full text-sm font-semibold text-white shadow">
          {recipe.cuisine || "Cuisine"}
        </span>
      </div>

      {/* Title & Description */}
      <div className="mt-6">
        <h1 className="text-lg font-semibold text-amber-800">{recipe.title}</h1>
        <p className="mt-2 text-gray-700 text-sm">{recipe.description}</p>

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
          <span className="bg-orange-100 px-2 py-1 border rounded-full">By: {recipe.user?.name || "Unknown"}</span>
          <span className="bg-orange-100 px-2 py-1 rounded-full">Category: {recipe.category?.name || "Uncategorized"}</span>
          <span className="bg-orange-100 px-2 py-1 rounded-full">Prep Time: {recipe.prepTime} min</span>
          <span className="bg-orange-100 px-2 py-1 rounded-full">{recipe.isPublic ? "Public" : "Private"}</span>
          <span className="bg-orange-100 px-2 py-1 rounded-full">Favorites: {recipe.favorites?.length || 0} ❤️</span>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-6">
        <h2 className="text-md font-semibold text-amber-800 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
          {recipe.ingredients.map((ing: string, idx: number) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="mt-6">
        <h2 className="text-md font-semibold text-amber-700 mb-2">Instructions</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
          {recipe.instructions.map((inst: string, idx: number) => (
            <li key={idx}>{inst}</li>
          ))}
        </ol>
      </div>

      {/* Tags */}
      {recipe.tags?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-semibold text-sky-800 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.filter(Boolean).map((tag: string, idx: number) => (
              <span key={idx} className="border border-yellow-400 bg-yellow-50 text-gray-800 px-3 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Average Rating */}
      <div className="mt-6">
        <h3 className="text-md font-semibold text-amber-800 mb-2">Average Rating</h3>
        <span className="border bg-yellow-100 text-amber-800 px-3 py-1 rounded-full font-semibold text-sm">
          {avgRating} ⭐ ({recipe.ratings?.length || 0} ratings)
        </span>
      </div>

      {/* Recipe Actions */}
      <div className="mt-6">
        <RecipeActions recipe={recipe} onUpdate={(updated) => setRecipe(updated)} />
      </div>

      {/* User Cards */}
      {userInteractions.length > 0 && (
        <div className="mt-10 space-y-4">
          <h3 className="text-md font-semibold text-amber-800 mb-4">User Ratings & Comments</h3>
          {userInteractions.map((u, idx) => (
            <div key={idx} className="p-4 bg-white rounded-xl shadow-md border-l-4 border-amber-800">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-700">{u.user?.name || "User"}</p>
                {u.rating !== null && <p className="text-yellow-800 font-bold">{u.rating} ⭐</p>}
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {u.comments.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
