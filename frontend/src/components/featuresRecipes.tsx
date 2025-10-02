"use client";
import React from "react";
import "swiper/css";
import useRecipes from "./useRecipes";
import FeatureItemCard from "./feature-card";
import { useRouter } from "next/navigation";

function FeaturesRecipes() {
  const { recipes } = useRecipes();
  const router = useRouter();

  const handleNavigate = (recipe: string) => {
    debugger;
    router.push(`/recipeDetail/${recipe._id}`);
  };

  return (
    <div className="grid grid-cols-8 ">
      <div className="col-span-1"></div>
      <div className="col-span-6">
        <div className="max-w-screen-2xl mx-auto px-6 py-6">
          <h2 className="text-xl font-semibold text-gray-700">
            🍽️ Featured Recipes
          </h2>

          <div
            className="grid gap-6
                  grid-cols-1 
                  sm:grid-cols-2 
                  md:grid-cols-3 
                  lg:grid-cols-4
                  xl:grid-cols-4
                  2xl:grid-cols-4 mt-4"
          >
            {recipes?.slice(0,4).map((recipe, index) => (
              <div key={index} onClick={() => handleNavigate(recipe)}>
                <FeatureItemCard item={recipe} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>

    </div>
  );
}

export default FeaturesRecipes;
