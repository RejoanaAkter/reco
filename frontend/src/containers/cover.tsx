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

      <div className="w-full">
        <HeroBanner />
      </div>

      <div className="h-[700px] bg-gray-100 ">
        <div className="flex w-full h-[600px] justify-center items-center">
          <FeaturesRecipes />
        </div>
      </div>

      <div className="flex w-full justify-center items-center ">
        <ExploreCategoriesSection />
      </div>

      <div className="flex w-full h-screen justify-center items-center">
        <UserList />
      </div>
    </div>
  );
};

export default HomeCoverScreen;
