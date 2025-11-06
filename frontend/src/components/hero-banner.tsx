"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { FaClock, FaFire } from "react-icons/fa6";

const slides = ["/h.jpg", "/egg-plate.jpg", "/bread-cat.jpg"];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        {slides.map((src, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
            aria-hidden={index !== currentIndex}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-20" />



<div className="relative z-30 max-w-7xl mx-auto h-full px-6">
  <div className="flex items-center justify-center h-full">
    {/* Recipe Card - Wider */}
    <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="text-sm font-semibold tracking-widest uppercase text-gray-500">
          SEAFOOD
        </span>
      </div>

      {/* Recipe Title */}
      <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-4">
        Spicy shrimp soup with tomatoes
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Time and Difficulty with React Icons */}
      <div className="flex items-center space-x-6">
        {/* Time with Clock Icon */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
            <FaClock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-gray-800">30</span>
            <span className="text-sm text-gray-600">MINUTES</span>
          </div>
        </div>

        {/* Vertical Separator */}
        <div className="w-px h-8 bg-gray-300"></div>

        {/* Difficulty with Fire Icon */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
            <FaFire className="w-5 h-5 text-green-500" />
          </div>
          <div className="flex items-center">
            <span className="text-lg font-bold text-gray-800">MEDIUM</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
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