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

  const handleNavigate = (recipe) => {
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
    {/* Header Section */}
<div className="max-w-7xl mx-auto mb-8">
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div className="text-center lg:text-left flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">All Recipes</h1>
        <p className="text-gray-600 text-lg">
          Discover and create delicious recipes
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search recipes by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <button
          className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
          onClick={() => router.push(Routes.createRecipe)}
        >
          <span className="text-lg">+</span>
          Create Recipe
        </button>
      </div>
    </div>
  </div>
</div>

      {/* Results Count */}
      {searchTerm && (
        <div className="max-w-7xl mx-auto mb-6">
          <p className="text-gray-600 text-sm">
            Found {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} for "{searchTerm}"
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-center">{error}</p>
          </div>
        </div>
      )}

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No recipes found' : 'No recipes available'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms or create a new recipe.'
                  : 'Be the first to create a delicious recipe!'
                }
              </p>
              {!searchTerm && (
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                  onClick={() => router.push(Routes.createRecipe)}
                >
                  Create Your First Recipe
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <div 
                key={recipe._id || index} 
                onClick={() => handleNavigate(recipe)}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                <FeaturedRecipeCard item={recipe} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipesScreen;