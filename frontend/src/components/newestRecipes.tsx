"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import useRecipes from "./useRecipes";
import { NewestRecipeCard } from "./newestRecipeCard";
import getImageUrl from "@/settings/utils";

const NewestRecipes = () => {
  const { recipes } = useRecipes();
  const router = useRouter();

  // Sort recipes by newest first
  const newestRecipes = useMemo(() => {
    return [...recipes]
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt).getTime() -
          new Date(a.updatedAt || a.createdAt).getTime()
      )
      .slice(0, 3); // show latest 3 recipes
  }, [recipes]);

  const handleNavigate = (recipe) => {
    router.push(`/recipeDetail/${recipe._id}`);
  };

  return (
    <section
      className="relative bg-fixed bg-center bg-cover"
      style={{
           backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1705056547423-de4ef0f85bf7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHdoaXRlJTIwYmFja2tncm91bmR8ZW58MHx8MHx8')",
      }}
    >
      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-screen-2xl mx-auto px-28 py-24">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
           Newest Recipes
        </h2>

        <div className="flex justify-center">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {newestRecipes.map((recipe, index) => (
              <div
                key={recipe._id}
                className="cursor-pointer"
                onClick={() => handleNavigate(recipe)}
              >
                <NewestRecipeCard item={recipe} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewestRecipes;
