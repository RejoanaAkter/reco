"use client";


import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PiForkKnifeFill } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import useRecipes from "@/hook/useRecipes";
import useCategories from "@/hook/useCategories";
import getImageUrl from "@/settings/utils";
import AnimatedBorder from "@/components/animatedTitle";
import { CategoryCardSkeleton, LatestRecipesSkeleton } from "@/loader/latestSkeleton";
import LatestRecipesSidebar from "./latest-recipe";

interface Recipe {
  _id: string;
  category?: { _id: string };
}

export const ExploreCategoriesSection = () => {
  return (
    <section className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <ExploreCategoriesLeft />
          <ExploreCategoriesRight />
        </div>
      </div>
    </section>
  );
};

export const ExploreCategoriesLeft = () => {
  const { recipes = [] } = useRecipes() as { recipes: Recipe[] };
  const { categories = [], loading } = useCategories();
  const router = useRouter();

  const groupedByCategory = recipes.reduce<Record<string, number>>(
    (acc, recipe) => {
      const id = recipe.category?._id;
      if (!id) return acc;
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    },
    {}
  );

  const hasItems = categories.length > 0;

  return (
    <div className="w-full lg:w-3/5">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-5"
      >
        <h2 className="text-lg font-semibold text-gray-900 font-serif italic flex gap-2">
          <PiForkKnifeFill size={24} className="text-amber-700" />
          Explore Categories
        </h2>
        <AnimatedBorder />
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          : categories.slice(0, 9).map((cat) => (
              <motion.div
                key={cat._id}
                whileHover={{ scale: 1.03 }}
                onClick={() => router.push(`/allRecipes/${cat._id}`)}
                className="flex flex-col items-center bg-white border border-gray-300 rounded-lg p-3 cursor-pointer hover:shadow-sm transition"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-1.5">
                  <Image
                    src={getImageUrl(cat.imageUrl || "/category-placeholder.png")}
                    alt={cat.name}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>

                <span className="text-[12px] font-semibold text-gray-900 truncate w-full text-center">
                  {cat.name}
                </span>

                <span className="text-[11px] text-gray-600 mt-0.5">
                  {groupedByCategory[cat._id] || 0} recipes
                </span>
              </motion.div>
            ))}
      </div>

      {/* Button (ONLY if items exist) */}
      {hasItems && !loading && (

        <div className="flex justify-center mt-5">
            <div className="mt-6 pt-4 border-t border-gray-100">
          <a 
            href="/allRecipes" 
            className="text-xs text-amber-800 hover:text-amber-900 transition-colors duration-300 font-medium flex items-center gap-1 justify-center"
          >
            View All Recipes
            <span>→</span>
          </a>
        </div>
        </div>
      )}
    </div>
  );
};

export const ExploreCategoriesRight = () => {
  const { loading } = useRecipes() as { loading: boolean };

  return (
    <div className="w-full lg:w-2/5 lg:mt-14">
      {loading ? <LatestRecipesSkeleton /> : <LatestRecipesSidebar />}
    </div>
  );
};




