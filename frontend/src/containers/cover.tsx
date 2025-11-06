"use client";

import { useAuth } from "@/components/AuthContext";
import CategoryList from "@/components/categories";
import FeaturesRecipes from "@/components/featuresRecipes";
import HeroBanner from "@/components/hero-banner";
import UserList from "./user-section-list";
import ExploreCategoriesSection from "./explore-category-section";
import NavBar from "./navbar";
import NewestRecipes from "@/components/newestRecipes";
import { Footer } from "./footer";
import { CookingTips } from "./cookingTips";
import { RecipeTimer } from "./recipeTimer";
import LatestRecipesSidebar from "@/components/latest-recipe";

const HomeCoverScreen = () => {
  return (
    <div className="bg-gray-100">
      <div className="w-full">
        <HeroBanner />
      </div>

      <div className="h-[500px] ">
        <div className="flex w-full h-[450px] justify-center items-center">
          <FeaturesRecipes />
        </div>
      </div>

      <div className="flex w-full justify-center items-center ">
        <ExploreCategoriesSection />
      </div>
      <div className="flex w-full h-800px justify-center ">
        <UserList />
      </div>
      <div className="flex w-full h-800px justify-center ">
        <CookingTips />
      </div>
      
      <div className="flex w-full h-screen justify-center ">
        <Footer />
      </div>
    </div>
  );
};

export default HomeCoverScreen;
