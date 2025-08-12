'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ItemCard from './item-card';
import useCategories from './useCategories';
import useRecipesByCategory from './useRecipesBycategory';
import getImageUrl from '@/settings/utils';
import { FaPlateWheat } from 'react-icons/fa6';

interface Category {
  _id: string;
  name: string;
  imageUrl: string;
}

interface Recipe {
  id: string;
  title: string;
  description?: string; // assuming this for richer cards
  imageUrl?: string; // optional image for recipe card
}

const CategoryList: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { categories, loading: loadingCategories, error: categoryError } = useCategories();
  const { recipes, loading: loadingRecipes, error: recipeError, fadeIn } = useRecipesByCategory(selectedCategoryId);

  // Set first category as selected by default
  React.useEffect(() => {
    if (!selectedCategoryId && categories?.length) {
      setSelectedCategoryId(categories[0]._id);
    }
  }, [categories, selectedCategoryId]);

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-8 px-6 gap-8 min-h-[500px]">

      {/* Left Sidebar: Categories */}
      <aside className="md:w-1/4 bg-white rounded-lg shadow p-4 sticky top-20 h-fit">
        <div className="flex items-center gap-2 mb-4">
          <FaPlateWheat className="text-dg-secondary-accent" size={20} />
          <h2 className="text-xl font-semibold text-gray-700">Categories</h2>
        </div>

        {loadingCategories && <p>Loading categories...</p>}
        {categoryError && <p className="text-red-500">{categoryError}</p>}

        <ul>
          {categories?.map((cat: Category) => (
            <li
              key={cat._id}
              onClick={() => setSelectedCategoryId(cat._id)}
              className={`flex items-center gap-3 p-2 mb-2 rounded cursor-pointer transition 
                ${selectedCategoryId === cat._id ? 'bg-dg-secondary-accent text-white' : 'hover:bg-gray-100'}
              `}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                <Image
                  src={getImageUrl(cat.imageUrl)}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium">{cat.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Right Content: Recipes */}
      <main className="md:w-3/4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {categories.find((c) => c._id === selectedCategoryId)?.name || 'Recipes'}
        </h2>

        {loadingRecipes && <p>Loading recipes...</p>}
        {recipeError && <p className="text-red-500">{recipeError}</p>}
        {!loadingRecipes && recipes.length === 0 && (
          <p className="text-gray-500">No recipes found for this category.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe: Recipe, index: number) => (
            <div
              key={recipe.id || index}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-500 ease-in-out
                ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                hover:shadow-lg hover:-translate-y-1
              `}
            >
              {/* You can customize ItemCard or build custom card here */}
              <ItemCard item={recipe} onSelect={null} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryList;
