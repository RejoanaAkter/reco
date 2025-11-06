'use client';

import React from 'react';
import useRecipes from '@/components/useRecipes';
import Image from 'next/image';
import getImageUrl from '@/settings/utils';
import { PiForkKnifeFill } from 'react-icons/pi';
import { motion } from 'framer-motion';
import LatestRecipesSidebar from '@/components/latest-recipe';

const ExploreCategoriesSection = () => {
  const { recipes } = useRecipes();

  // Group recipes by category name
  const groupedByCategory = Array.isArray(recipes)
    ? recipes.reduce((acc: Record<string, any[]>, recipe) => {
        const categoryName = recipe.category?.name || 'Uncategorized';
        if (!acc[categoryName]) acc[categoryName] = [];
        acc[categoryName].push(recipe);
        return acc;
      }, {})
    : {};

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: { 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      } 
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    },
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 1.1 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="w-full py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Side - Main Content (More Space) */}
          <div className="w-full lg:w-3/4">
            {/* Title Section */}
            <motion.div
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center lg:text-left mb-8"
            >
              <h2 className="text-2xl font-light tracking-tight text-gray-900 leading-tight mb-3">
                <span className="font-serif italic">Experiences</span>
              </h2>
              <div className="w-12 h-0.5 bg-amber-800 mx-auto lg:mx-0"></div>
            </motion.div>

            {/* Categories Cards - More Compact */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(groupedByCategory)?.slice(0, 4).map(([categoryName, recipes], categoryIndex) => (
                  <motion.div
                    key={categoryName}
                    variants={cardVariants}
                    className="group bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-amber-800/10"
                  >
                    {/* Category Header - Compact */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-medium text-gray-900 tracking-wide truncate pr-2">
                        {categoryName}
                      </h3>
                      <div className="text-amber-800/50 group-hover:text-amber-700 transition-colors duration-300 flex-shrink-0">
                        <PiForkKnifeFill className="text-lg" />
                      </div>
                    </div>

                    {/* Recipe List - More Compact */}
                    <div className="space-y-2">
                      {recipes.slice(0, 3).map((recipe: any, index: number) => (
                        <motion.div
                          key={recipe.id || index}
                          variants={cardVariants}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50/30 transition-all duration-200 group/item"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-800/30 group-hover/item:bg-amber-700 transition-colors duration-300 flex-shrink-0"></div>
                            <span className="text-xs text-gray-600 truncate tracking-wide font-light">
                              {recipe.title}
                            </span>
                          </div>

                          {/* Recipe Image - Smaller */}
                          {recipe.imageUrl && (
                            <motion.div
                              variants={imageVariants}
                              className="w-12 h-12 relative rounded-md overflow-hidden flex-shrink-0 ml-2"
                            >
                              <Image
                                src={getImageUrl(recipe.imageUrl)}
                                alt={recipe.title}
                                fill
                                className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                                sizes="48px"
                              />
                              <div className="absolute inset-0 bg-black/5 group-hover/item:bg-transparent transition-colors duration-300"></div>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* View More Indicator - Smaller */}
                    {recipes.length > 3 && (
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400 font-light tracking-wide">
                          +{recipes.length - 3} more
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Button - More Compact */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.a
                href="/categories"
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "rgb(120 53 15)",
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 hover:shadow-md group"
              >
                <span>Explore more</span>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="group-hover:translate-x-0.5 transition-transform duration-300"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Side - Latest Recipes (Taller to match categories height) */}
          <div className="w-full lg:w-1/4 lg:mt-20"> {/* Added margin-top to align with categories */}
            <LatestRecipesSidebar />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExploreCategoriesSection;