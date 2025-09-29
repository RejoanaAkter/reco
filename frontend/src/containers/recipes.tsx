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
      <div className="flex justify-end">
        <button
          className="hover:shadow-lg hover:text-sky-700 text-gray-600 cursor-pointer border border-gray-600 p-1 rounded text-xs"
          onClick={() => {
            router.push(Routes.createRecipe); // default to login form
          }}
        >
         + Create Recipe
        </button>
      </div>
      {/* Recipes List */}
      <h2 className="mt-6 mb-4 text-2xl font-bold text-center">All Recipes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recipes.length === 0 ? (
        <p className="text-center">No recipes found.</p>
      ) : (
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 mx-8 gap-6">
          {recipes?.map((recipe, index) => (
            <div key={index} onClick={() => handleNavigate(recipe)}>
              <ItemCard key={index} item={recipe} onSelect={null} />
            </div>
          ))}
        </div>
      )}

    

      {/* {selectedId && (
        <RecipeDetailsModal
          recipeId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )} */}

    </div>
  );
}

export default RecipesScreen;
