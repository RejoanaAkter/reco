"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "./item-card";
import "swiper/css";
import useRecipes from "./useRecipes";
import CategoryListModal from "./view-category";
import RecipeDetailsModal from "./recipe-details-modal";
import FeatureItemCard from "./feature-card";

function FeaturesRecipes() {
  const { recipes } = useRecipes();
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="grid grid-cols-8 ">
      <div className="col-span-1"></div>
      <div className="col-span-6">
        <div className="max-w-screen-2xl mx-auto px-6 py-6">
          <h2 className="text-xl font-semibold ">🍽️ Featured Recipes</h2>

          <div
            className="grid gap-6
                  grid-cols-1 
                  sm:grid-cols-2 
                  md:grid-cols-3 
                  lg:grid-cols-4
                  xl:grid-cols-4
                  2xl:grid-cols-4"
          >
            {recipes?.slice(0, 4).map((recipe, index) => (
              <div key={index}>
                <FeatureItemCard item={recipe} onSelect={setSelectedId} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>

      {selectedId && (
        <RecipeDetailsModal
          recipeId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

export default FeaturesRecipes;
