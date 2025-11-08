'use client'

import { useRouter } from "next/navigation";
import useRecipes from "../hook/useRecipes";
import { FeaturedRecipeCard } from "./feature-card";


const FeaturesRecipes = () => {
  const { recipes } = useRecipes();
  const router = useRouter();

  const handleNavigate = (recipe) => {
    router.push(`/recipeDetail/${recipe._id}`);
  };

  // 3️⃣ Hybrid Score = 60% favorites + 40% average rating
  const getHybridScore = (recipe) => {
    const favoritesCount = recipe.favorites?.length || 0;
    const avgRating =
      recipe.ratings?.length
        ? recipe.ratings.reduce((acc, r) => acc + r.value, 0) / recipe.ratings.length
        : 0;
    return favoritesCount * 0.6 + avgRating * 0.4;
  };

  const topFeatured = recipes
    ?.sort((a, b) => getHybridScore(b) - getHybridScore(a))
    .slice(0, 4);

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-4">
      <h2 className="text-xl font-semibold text-gray-700 ">🍽️ Featured Recipes</h2>
      <div
        className="mt-6 grid gap-6
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-4
          2xl:grid-cols-4"
      >
        {topFeatured?.map((recipe) => (
          <div key={recipe._id} onClick={() => handleNavigate(recipe)}>
            <FeaturedRecipeCard item={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesRecipes;