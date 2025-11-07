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
      <div className="max-w-7xl mx-auto mb-6 bg-white p-6 rounded-xl border border-gray-200">
  <h2 className="text-xl font-semibold mb-4">Filter Recipes</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Category Dropdown */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Category</label>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
      >
        <option value="">All</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
      </select>
    </div>

    {/* Cuisine Dropdown */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Cuisine</label>
      <select
        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
      >
        <option value="">All</option>
        <option value="cuisine1">Chinese</option>
        <option value="cuisine2">Italian</option>
      </select>
    </div>

    {/* Prep Time */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Max Prep Time (min)</label>
      <input
        type="number"
        placeholder="e.g. 60"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
      />
    </div>

    {/* Search */}
    <div>
      <label className="block text-gray-700 font-medium mb-1">Search by Name</label>
      <input
        type="text"
        placeholder="Search recipes..."
        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
      />
    </div>
  </div>

  <div className="mt-4 text-right">
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg">
      Apply Filters
    </button>
  </div>
</div>

      {/* Header Section */}
<div className="max-w-7xl mx-auto mb-6">
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="text-center lg:text-left">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2 font-serif italic">All Recipes</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <button
          className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          onClick={() => router.push(Routes.createRecipe)}
        >
          <span>+</span>
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