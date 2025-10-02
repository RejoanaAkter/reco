"use client";

import { FeaturedRecipeCard } from "@/components/feature-card";
import useRecipes from "@/components/useRecipes";
import { Routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";

function RecipesScreen() {
  const { recipes, error } = useRecipes();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleNavigate = (recipe: string) => {
    router.push(`/recipeDetail/${recipe._id}`);
  };

  // Filter recipes by title (case-insensitive)
  const filteredRecipes = useMemo(() => {
    if (!searchTerm) return recipes;
    return recipes.filter((r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipes, searchTerm]);

  return (
<div className="bg-gray-100 min-h-screen p-6">
  {/* Card: Title + Search + Button */}
   <div className="flex justify-center">
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl bg-white p-4 rounded mb-4">
    {/* Title */}
    <h2 className="text-2xl font-bold text-gray-800 flex-1 text-center md:text-left">
      All Recipes
    </h2>

    {/* Search Bar */}
    <div className="flex flex-1 justify-center md:justify-start">
      <input
        type="text"
        placeholder="Search recipes by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      />
    </div>

    {/* Create Recipe Button */}
    <button
      className="text-gray-600 border border-gray-600 px-4 py-2 rounded-lg hover:shadow-lg hover:text-orange-600 transition"
      onClick={() => router.push(Routes.createRecipe)}
    >
      + Create Recipe
    </button>
  </div></div>

  {/* Recipes List */}
  {error && <p className="text-red-500 text-center">{error}</p>}

  {filteredRecipes.length === 0 ? (
    <p className="text-center text-gray-700">No recipes found.</p>
  ) : (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} onClick={() => handleNavigate(recipe)}>
            <FeaturedRecipeCard item={recipe} />
          </div>
        ))}
      </div>
    </div>
  )}
</div>


  );
}

export default RecipesScreen;
