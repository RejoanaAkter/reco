"use client";

import AnimatedBorder from "@/components/animatedTitle";
import { FeaturedRecipeCard } from "@/components/feature-card";
import useFavorites from "@/hook/useFavourites";
import { useRouter } from "next/navigation";
import React from "react";
import { IoMdRestaurant } from "react-icons/io";
import { GlobalLoader } from "@/components/globalLoader";
import { motion } from "framer-motion";
import AnimatedGrid from "@/components/animatedGrid";

const FavoriteRecipes: React.FC = () => {
  const { favorites, loading, error } = useFavorites();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <GlobalLoader />
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center py-16">{error}</p>;

  if (favorites.length === 0)
    return (
      <p className="text-gray-600 text-center py-16">
        No favorite recipes yet.
      </p>
    );


  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
        <IoMdRestaurant className="text-amber-700" /> Favorite Recipes
      </h2>
      <AnimatedBorder />

      <AnimatedGrid
        className="
          mt-6 grid gap-6
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
        "
      >
        {favorites.map((recipe) => (
          <div key={recipe._id} className="cursor-pointer">
            <FeaturedRecipeCard item={recipe} />
          </div>
        ))}
      </AnimatedGrid>
    </div>
  );
};

export default FavoriteRecipes;
