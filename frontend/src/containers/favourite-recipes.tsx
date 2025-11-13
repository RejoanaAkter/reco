"use client";

import AnimatedBorder from "@/components/animatedTitle";
import { FeaturedRecipeCard } from "@/components/feature-card";
import useFavorites from "@/hook/useFavourites";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdRestaurant } from "react-icons/io";

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
          <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
                       <IoMdRestaurant className="text-amber-700" /> Favorite Recipes
                     </h2>
                     <AnimatedBorder />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
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
