"use client";

import React from "react";
import useRecipes from "@/hook/useRecipes";
import useCategories from "@/hook/useCategories";
import Image from "next/image";
import getImageUrl from "@/settings/utils";
import { PiForkKnifeFill } from "react-icons/pi";
import { motion } from "framer-motion";
import LatestRecipesSidebar from "@/components/latest-recipe";
import AnimatedBorder from "@/components/animatedTitle";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Recipe {
  _id: string;
  title: string;
  imageUrl?: string;
  category?: {
    _id: string;
    name: string;
  };
}

const ExploreCategoriesSection = () => {
  const { recipes = [] } = useRecipes() as { recipes: Recipe[] };
  const { categories = [], loading: catLoading } = useCategories();
  const router = useRouter();

  // Group recipes by category id
  const groupedByCategory = recipes.reduce<Record<string, Recipe[]>>(
    (acc, recipe) => {
      const categoryId = recipe.category?._id || "uncategorized";
      if (!acc[categoryId]) acc[categoryId] = [];
      acc[categoryId].push(recipe);
      return acc;
    },
    {}
  );

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Side */}
          <div className="w-full lg:w-3/5">
            {/* Title */}
            <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-5"
            >
              <h2 className="text-lg font-semibold text-gray-900 font-serif italic flex gap-2">
                <PiForkKnifeFill size={24} className="text-amber-700" />
                Explore Categories
              </h2>
              <AnimatedBorder />
            </motion.div>

            {/* Category Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            >
              {catLoading ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Loading categories...
                </div>
              ) : (
                categories.slice(0, 9).map((cat) => {
                  // Use category's own image, fallback if missing
                  const image = cat.imageUrl || "/category-placeholder.png";
                  const recipesForCat = groupedByCategory[cat._id] || [];

                  return (
                    <motion.div
                      key={cat._id}
                      variants={cardVariants}
                      onClick={() =>
                        router.push(`/allRecipes?catId=${cat._id}`)
                      }
                      className="flex flex-col items-center bg-white border border-gray-300 rounded-lg p-3 cursor-pointer hover:shadow-sm transition"
                    >
                      {/* Circular Image */}
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-1.5">
                        <Image
                          src={getImageUrl(image)}
                          alt={cat.name}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>

                      {/* Category Name */}
                      <span className="text-[12px] font-semibold text-gray-900 text-center truncate w-full">
                        {cat.name}
                      </span>

                      {/* Recipe Count */}
                      <span className="text-[11px] text-gray-600 mt-0.5">
                        {recipesForCat.length} recipes
                      </span>
                    </motion.div>
                  );
                })
              )}
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-5"
            >
              <button
                onClick={() => router.push("/allRecipes")}
                className="w-40 border border-amber-500 text-amber-600 hover:bg-amber-700 hover:text-white py-1.5 rounded text-xs transition flex items-center justify-center gap-2"
              >
                Explore More <FaArrowRight size={12} />
              </button>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-2/5 lg:mt-16">
            <LatestRecipesSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategoriesSection;
