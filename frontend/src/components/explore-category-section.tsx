"use client";

import React from "react";
import useRecipes from "@/hook/useRecipes";
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
  const router = useRouter();

  // Group by category
  const groupedByCategory = recipes.reduce<Record<string, Recipe[]>>(
    (acc, recipe) => {
      const categoryName = recipe.category?.name || "Uncategorized";
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(recipe);
      return acc;
    },
    {}
  );

  // Animation Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
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
              viewport={{ once: true, amount: 0.3 }}
              className="text-center lg:text-left mb-8"
            >
              <h2 className="text-xl font-semibold mb-1 text-gray-900 flex gap-2 font-serif italic">
                <PiForkKnifeFill className="text-amber-700" /> Explore Categories
              </h2>
              <AnimatedBorder />
            </motion.div>

            {/* Category Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(groupedByCategory)
                  .slice(0, 4)
                  .map(([categoryName, recipes]) => (
                    <motion.div
                      key={categoryName}
                      variants={cardVariants}
                      className="group bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-amber-800/10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 truncate pl-2 border-l-2 border-amber-700">
                          {categoryName}
                        </h3>
                      </div>

                      {/* Recipe List */}
                      <div className="space-y-2">
                        {recipes.slice(0, 3).map((recipe) => (
                          <motion.div
                            key={recipe._id}
                            variants={cardVariants}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50/30 transition-all"
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-800/30"></div>
                              <span className="text-sm text-gray-700 truncate">
                                {recipe.title}
                              </span>
                            </div>

                            {/* Recipe Image */}
                            {recipe.imageUrl && (
                              <motion.div
                                variants={imageVariants}
                                className="w-12 h-12 relative rounded-md overflow-hidden"
                              >
                                <Image
                                  src={getImageUrl(recipe.imageUrl)}
                                  alt={recipe.title}
                                  fill
                                  className="object-cover"
                                />
                              </motion.div>
                            )}
                          </motion.div>
                        ))}
                      </div>

                      {recipes.length > 3 && (
                        <div className="mt-3 pt-2 border-t border-gray-100">
                          <span className="text-xs text-gray-400">
                            +{recipes.length - 3} more
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-4"
            >
              <button
                onClick={() => router.push("/allRecipes")}
                className="w-48 bg-transparent border border-amber-500 text-amber-600 hover:bg-amber-700 hover:text-white py-2 rounded text-sm transition-all flex items-center justify-center gap-3"
              >
                Explore More <FaArrowRight />
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
