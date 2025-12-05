"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { FaRegClock } from "react-icons/fa6";
import { SlLike } from "react-icons/sl";
import useRecipes from "@/hook/useRecipes"; // adjust the path if needed
import getImageUrl from "@/settings/utils"; // helper to get image URLs

const HeroBanner = () => {
  const { recipes, loading, error } = useRecipes();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Only use the first 3 recipes as slides
  const slides = recipes?.slice(0, 3) || [];

  // Auto slide effect
  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);

  if (loading)
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  if (!slides.length)
    return (
      <div className="w-full h-[80vh] flex items-center justify-center text-gray-600">
        No recipes found
      </div>
    );

  const currentRecipe = slides[currentIndex];

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

    <main className="relative w-full h-[80vh] overflow-hidden">
  {/* Background slides */}
  {slides?.filter((s)=>s?.isPublic)?.map((recipe, index) => (
    <div
      key={index}
      className="absolute top-0 left-0 w-full h-full bg-cover"
      style={{
        backgroundImage: `url(${getImageUrl(recipe.imageUrl)})`,
        opacity: index === currentIndex ? 1 : 0,
        zIndex: index === currentIndex ? 0 : -1,
      }}
    />
  ))}

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 z-10" />

  {/* Recipe Card */}
  <div className="relative z-20 max-w-7xl mx-auto h-full px-6 flex items-center justify-center">
    <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl transition-all duration-700">
      <div className="mb-4">
        <span className="text-sm font-semibold tracking-widest uppercase text-amber-600">
          {currentRecipe?.category?.name || "General"}
        </span>
      </div>
      <h1 className="text-xl font-semibold text-gray-800 leading-tight mb-4">
        {currentRecipe?.title}
      </h1>
      <p className="text-gray-600 text-xs leading-relaxed mb-4">
        {currentRecipe?.description}
      </p>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <FaRegClock className="w-4 h-4 text-gray-500" />
          <div className="flex items-center space-x-1">
            <span className="text-sm font-bold text-gray-800">
              {currentRecipe?.prepTime + currentRecipe?.cookingTime}
            </span>
            <span className="text-xs text-gray-600">Minutes</span>
          </div>
        </div>

        <div className="w-px h-8 bg-gray-300" />

        <div className="flex items-center space-x-3">
          <SlLike className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-800">
            {currentRecipe?.difficulty || "Medium"}
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* Slide indicators */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
    {slides.map((_, index) => (
      <button
        key={index}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === currentIndex ? "bg-white scale-125" : "bg-white/50"
        }`}
        onClick={() => setCurrentIndex(index)}
      />
    ))}
  </div>
</main>

    </>
  );
};

export default HeroBanner;
