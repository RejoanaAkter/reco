"use client";

import FeaturesRecipes from "@/components/featuresRecipes";
import HeroBanner from "@/components/hero-banner";
import UserList from "../../components/user-section-list";
import ExploreCategoriesSection from "../../components/explore-category-section";
import { CookingTips } from "../../components/cookingTips";

const HomeCoverScreen = () => {
  return (
    <div className="bg-gray-50">
      <div className="w-full">
        <HeroBanner />
      </div>

      <div className="flex w-full justify-center mt-4">
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
