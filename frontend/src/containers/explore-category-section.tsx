'use client';

import React from 'react';
import useRecipes from '@/components/useRecipes';
import Image from 'next/image';
import getImageUrl from '@/settings/utils';
import { PiForkKnifeFill } from 'react-icons/pi';

const ExploreCategoriesSection = () => {
  const { recipes, loading, error } = useRecipes();

  // Group recipes by category name
  const groupedByCategory = recipes.reduce((acc: Record<string, any[]>, recipe) => {
    const categoryName = recipe.category?.name || 'Uncategorized';
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(recipe);
    return acc;
  }, {});

  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Text Content */}
        <div>
          <h2 className="text-xl font-bold leading-tight mb-6 uppercase">
            Daily Food<br />Courses<br />With Drinks
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Browse our delicious selection of meals across different categories. Perfect for every time of day!
          </p>
          <a
            href="/categories"
            className="inline-block bg-[#A28D5B] text-white px-6 py-3 font-medium rounded hover:bg-[#8e794c] transition"
          >
            See Full Menu
          </a>
        </div>

        {/* Right Recipe Listing */}
        <div className="space-y-10">
          {Object.entries(groupedByCategory).slice(0,1).map(([categoryName, recipes]) => (
            <div key={categoryName}>
              <h3 className="text-lg font-semibold border-b border-gray-300 inline-block mb-4">
                {categoryName.toUpperCase()}
              </h3>

              <div className="space-y-5">
                {recipes.slice(0, 3).map((recipe: any) => (
                  <div key={recipe.id} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <PiForkKnifeFill className="text-[#A28D5B]" />
                      <span className="font-medium">{recipe.title}</span>
                    </div>

                    {/* Recipe image on the right */}
                    {recipe.imageUrl && (
                      <div className="w-16 h-16 relative rounded overflow-hidden shadow">
                        <Image
                          src={getImageUrl(recipe.imageUrl)}
                          alt={recipe.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreCategoriesSection;
