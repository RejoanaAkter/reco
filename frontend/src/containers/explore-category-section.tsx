'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import getImageUrl from '@/settings/utils';
import useCategories from '@/components/useCategories';

interface Category {
  _id: string;
  name: string;
  imageUrl: string;
}

const ExploreCategoriesSection = () => {
  const { categories, loading, error } = useCategories();

  const featuredCategory = categories[0]; // pick the first one or a specific one

  return (
    <section className="py-12 px-6 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side: Featured Image Card */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg group">
          {featuredCategory?.imageUrl && (
            <Image
              src={getImageUrl(featuredCategory.imageUrl)}
              alt={featuredCategory.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-3xl font-bold">{featuredCategory?.name}</h3>
            <p className="text-sm opacity-80">Explore now →</p>
          </div>
        </div>

        {/* Right Side: Text + Explore Button */}
        <div className="text-gray-800">
          <h2 className="text-4xl font-bold mb-4">Our Menu</h2>
          <p className="mb-6 text-gray-600">
            Discover mouth-watering recipes from a variety of categories. Whether you're craving breakfast,
            lunch, or dessert, we have something for every taste.
          </p>
          <Link
            href={`/categories`}
            className="inline-block bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition"
          >
            Explore {featuredCategory?.name}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreCategoriesSection;
