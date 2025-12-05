'use client';

import React from 'react';
import useRecipes from '@/hook/useRecipes';
import Image from 'next/image';
import getImageUrl from '@/settings/utils';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

const LatestRecipesSidebar = () => {
  const { recipes, loading } = useRecipes(1, 8); // Increased to 8 recipes

  // Sort recipes by date
  const latestRecipes = React.useMemo(() => {
    if (!Array.isArray(recipes)) return [];
    
    return [...recipes]
      .sort((a, b) => new Date(b.createdAt || b.date || 0).getTime() - new Date(a.createdAt || a.date || 0).getTime())
      .slice(0, 3); // Show 6 recipes to make it taller
  }, [recipes]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
        <h3 className="text-xl font-light text-gray-900 mb-6 tracking-wide flex items-center gap-2">
          <Clock size={20} className="text-amber-800" />
          Latest Recipes
        </h3>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse flex gap-3 p-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-amber-800" />
        <h3 className="text-md font-light text-gray-900 tracking-wide">Latest Recipes</h3>
      </div>

      {/* Recipes List - Taller with more items */}
      <div className="space-y-4">
        {latestRecipes?.filter((r)=>r?.isPublic)?.map((recipe, index) => (
          <motion.div
            key={recipe._id || recipe.id || index}
            variants={itemVariants}
            className="group flex items-center gap-8 p-1 rounded-lg hover:bg-amber-50/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-amber-800/10"
          >
            {/* Recipe Image */}
            <div className="w-1/3 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={getImageUrl(recipe.imageUrl)}
                alt={recipe.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>

            {/* Recipe Info */}
            <div className="w-2/3 flex-1 min-w-0">
              <h4 className="font-normal text-sm text-gray-900 truncate mb-1 group-hover:text-amber-800 transition-colors duration-300">
                {recipe.title}
              </h4>
              
              {/* Date */}
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar size={12} />
                <span>{formatDate(recipe.createdAt || recipe.date || new Date().toISOString())}</span>
              </div>
            </div>

            {/* Hover Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="text-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm"
            >
              →
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {latestRecipes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Calendar size={32} className="mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No recipes yet</p>
        </div>
      )}

      {/* View All Link */}
      {latestRecipes.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <a 
            href="/allRecipes" 
            className="text-xs text-amber-800 hover:text-amber-900 transition-colors duration-300 font-medium flex items-center gap-1 justify-center"
          >
            View All Recipes
            <span>→</span>
          </a>
        </div>
      )}
    </motion.div>
  );
};

export default LatestRecipesSidebar;