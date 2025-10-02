'use client'

import useFavorites from "@/components/useFavourites";
import React from "react";


const FavoriteRecipes: React.FC = () => {
  const { favorites, loading, error } = useFavorites();

  if (loading) return <p className="text-gray-500">Loading favorites...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (favorites.length === 0) return <p className="text-gray-600">No favorite recipes yet.</p>;

  return (
    <div className="p-4 text-gray-700">
      <h2 className="text-xl font-bold mb-4 "> <span className="animate-pulse">❤️</span> My Favorite Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((recipe: any) => (
          <div
            key={recipe._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {recipe.image && (
              <img
                src={`http://localhost:8000${recipe.image}`}
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-3">
              <h3 className="font-semibold text-lg">{recipe.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
              <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                <span>👩‍🍳 {recipe.user?.name || "Unknown"}</span>
                <span>📂 {recipe.category?.name || "Uncategorized"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
