'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
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
  description?: string;
  imageUrl?: string;
}

const CategoryList: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const { categories, loading: loadingCategories, error: categoryError } = useCategories();
  const { recipes, loading: loadingRecipes, error: recipeError, fadeIn } = useRecipesByCategory(selectedCategoryId);

  useEffect(() => {
    if (!selectedCategoryId && categories?.length) {
      setSelectedCategoryId(categories[0]._id);
    }
  }, [categories, selectedCategoryId]);

  return (
    <div className="flex flex-col md:flex-row  mx-auto py-10 px-6 gap-10 min-h-[500px] bg-gray-100 text-gray-700">
      
      {/* Sidebar */}
      <aside className="md:w-1/4">
        <div className="mb-6">
          <h4 className="text-sm tracking-wider text-gray-600 uppercase mb-1">Select Your Meal</h4>
          <h2 className="text-3xl font-bold text-gray-800">
            Popular <span className="text-[#E35D2B]">Foods</span>
          </h2>
        </div>

        {loadingCategories && <p>Loading categories...</p>}
        {categoryError && <p className="text-red-500">{categoryError}</p>}

        <ul className="space-y-4">
          {categories?.map((cat: Category) => {
            const isSelected = selectedCategoryId === cat._id;
            return (
              <li
                key={cat._id}
                onClick={() => setSelectedCategoryId(cat._id)}
                className={`flex items-center gap-3 p-3 rounded-full cursor-pointer transition shadow-sm
                  ${isSelected ? 'bg-white text-[#E35D2B] shadow-lg' : 'hover:bg-[#fbe9d5]'}
                `}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                  <Image
                    src={getImageUrl(cat.imageUrl)}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-md font-medium">{cat.name}</span>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="md:w-3/4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {
              categories.find((c) => c._id === selectedCategoryId)?.name || 'Recipes'
            }
          </h2>

          <button
            onClick={() => alert('Create Category clicked!')} // Replace with your modal or form logic
            className="bg-[#E35D2B] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#cf5124] transition"
          >
            + Create Category
          </button>
        </div>

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
              className={`bg-white rounded-lg overflow-hidden transform transition-all duration-500 ease-in-out
                ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                hover:shadow-xl hover:-translate-y-1
              `}
            >
              <ItemCard item={recipe} onSelect={null} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryList;
