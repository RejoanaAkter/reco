"use client";

import CategoryCreateModal from "@/components/create-category";
import ItemCard from "@/components/item-card";
import LogIn from "@/containers/login";
import RecipeDetailsModal from "@/components/recipe-details-modal";
import SignIn from "@/containers/signIn";
import useRecipes from "@/components/useRecipes";
import CategoryListModal from "@/components/view-category";
import { Routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RecipesScreen() {
  const { recipes, error } = useRecipes();
  const [isLoginView, setIsLoginView] = useState(true);
  const [showModal, setShowModal] = useState(false);


  const [selectedId, setSelectedId] = useState(null);
  const router = useRouter();

  const handleNavigate = (recipe: string) => {
    debugger;
    router.push(`/recipeDetail/${recipe._id}`);
  };

  return (
 <div className="bg-gray-100 p-4 text-gray-700">
  {/* Create Recipe Button */}
  <div className="flex justify-end mb-4">
    <button
      className="hover:shadow-lg hover:text-sky-700 text-gray-600 cursor-pointer border border-gray-600 px-3 py-1 rounded text-sm"
      onClick={() => {
        router.push(Routes.createRecipe);
      }}
    >
      + Create Recipe
    </button>
  </div>

  {/* Recipes List */}
  <h2 className="mb-6 text-2xl font-bold text-center">All Recipes</h2>

  {error && <p className="text-red-500 text-center">{error}</p>}

  {recipes.length === 0 ? (
    <p className="text-center">No recipes found.</p>
  ) : (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl">
        {recipes?.map((recipe, index) => (
          <div key={index} onClick={() => handleNavigate(recipe)}>
            <ItemCard key={index} item={recipe} onSelect={null} />
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  );
}

export default RecipesScreen;
