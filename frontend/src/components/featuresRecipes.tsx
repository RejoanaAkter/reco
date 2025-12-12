'use client';

import { useRouter } from "next/navigation";
import useRecipes from "../hook/useRecipes";
import { FeaturedRecipeCard } from "./feature-card";
import AnimatedBorder from "./animatedTitle";
import { IoMdRestaurant } from "react-icons/io";
import AnimatedGrid from "./animatedGrid";

// Type definitions
interface Rating {
  value: number;
  // add other fields if needed
}

interface Recipe {
  _id: string;
  ratings?: Rating[];
  favorites?: any[]; // you can type this more strictly if you know the structure
  isPublic?: boolean;
  // add other fields used in FeaturedRecipeCard
}

const FeaturesRecipes: React.FC = () => {
  const { recipes } = useRecipes();
  const router = useRouter();

  const handleNavigate = (recipe: Recipe) => {
    router.push(`/recipeDetail/${recipe._id}`);
  };

  const getHybridScore = (recipe: Recipe) => {
    const favoritesCount = recipe.favorites?.length || 0;

    const avgRating =
      recipe.ratings?.length
        ? recipe.ratings.reduce((acc: number, r: Rating) => acc + r.value, 0) /
          recipe.ratings.length
        : 0;

    return favoritesCount * 0.6 + avgRating * 0.4;
  };

  const topFeatured = recipes
    ?.sort((a, b) => getHybridScore(b) - getHybridScore(a))
    .slice(0, 4);

  if (!topFeatured?.length) return null;

  return (
    <div className="max-w-screen-2xl mx-auto py-4">
      <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
        <IoMdRestaurant className="text-amber-700" /> Featured Recipes
      </h2>

      <AnimatedBorder />

      <AnimatedGrid
        className="
          mt-6 grid gap-6
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
        "
      >
        {topFeatured
          ?.filter((m) => m?.isPublic)
          .map((recipe) => (
            <div
              key={recipe._id}
              onClick={() => handleNavigate(recipe)}
              className="cursor-pointer"
            >
              <FeaturedRecipeCard item={recipe} />
            </div>
          ))}
      </AnimatedGrid>
    </div>
  );
};

export default FeaturesRecipes;
