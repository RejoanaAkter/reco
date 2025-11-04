"use client";

import { useAuth } from "@/components/AuthContext";
import CategoryList from "@/components/categories";
import FeaturesRecipes from "@/components/featuresRecipes";
import HeroBanner from "@/components/hero-banner";
import UserList from "./user-section-list";
import ExploreCategoriesSection from "./explore-category-section";
import NavBar from "./navbar";

const HomeCoverScreen = () => {

  return (
    <div className="bg-gray-100">

      <NavBar />

      <div className="w-full">
        <HeroBanner />
      </div>

      <div className="h-[700px] bg-gray-100 ">
        <div className="flex w-full h-[600px] justify-center items-center">
          <FeaturesRecipes />
        </div>
      </div>

      <div className="border-t border-t-slate-400 mt-4 h-[700px]">
        <ExploreCategoriesSection />
      </div>

      <div className="flex w-full h-[600px] bg-[#F0D89C] justify-center items-center">
        <UserList />
      </div>
    </div>
  );
};

export default HomeCoverScreen;
