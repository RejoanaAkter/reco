"use client";

import { FeaturedRecipeCard } from "@/components/feature-card";
import useFavorites from "@/components/useFavourites";
import { useRouter } from "next/navigation";
import React from "react";

const FavoriteRecipes: React.FC = () => {
  const { favorites, loading, error } = useFavorites();
  const router = useRouter();

  if (loading) return <p className="text-gray-500">Loading favorites...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (favorites.length === 0)
    return <p className="text-gray-600">No favorite recipes yet.</p>;

  const handleNavigate = (recipe) => {
    router.push(`/recipeDetail/${recipe._id}`);
  };

  return (
    <div className="p-4 text-gray-700">
      <h2 className="text-xl font-bold mb-4 ">
        {" "}
        <span className="animate-pulse">❤️</span> My Favorite Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((recipe: any) => (
          <div key={recipe._id} onClick={() => handleNavigate(recipe)}>
            <FeaturedRecipeCard item={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
