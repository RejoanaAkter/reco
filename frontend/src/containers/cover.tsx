"use client";

import FeaturesRecipes from "@/components/featuresRecipes";
import HeroBanner from "@/components/hero-banner";
import UserList from "./user-section-list";
import ExploreCategoriesSection from "./explore-category-section";
import { Footer } from "./footer";
import { CookingTips } from "./cookingTips";

const HomeCoverScreen = () => {
  return (
    <div className="bg-gray-50">
      <div className="w-full">
        <HeroBanner />
      </div>

      <div className="flex w-full justify-center">
        <FeaturesRecipes />
      </div>

      <div className="flex w-full justify-center ">
        <ExploreCategoriesSection />
      </div>
      <div className="flex w-full h-800px justify-center ">
        <UserList />
      </div>
      <div className="flex w-full h-800px justify-center ">
        <CookingTips />
      </div>
    </div>
  );
};

export default HomeCoverScreen;
