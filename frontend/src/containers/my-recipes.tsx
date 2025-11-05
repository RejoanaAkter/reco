'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/AuthContext"; // adjust path to your AuthProvider
import getImageUrl from "@/settings/utils";
import { FeaturedRecipeCard } from "@/components/feature-card";
import { useRouter } from "next/navigation";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ratings?: { user: string; value: number }[];
  favorites?: string[];
  comments?: { user: string; text: string; createdAt: string }[];
}

const MyRecipes = () => {
  const { user, isAuthLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
 const router = useRouter();
 
  useEffect(() => {
    if (!user) return;
debugger
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT

        // ✅ include the userId in the URL
        const res = await fetch(`http://localhost:8000/recipes/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
debugger
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to fetch recipes: ${res.status} - ${errText}`);
        }

        const data = await res.json();
        setRecipes(data);

        debugger
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user]);

  if (isAuthLoading) return <p className="text-center mt-10">Loading auth...</p>;
  if (loading) return <p className="text-center mt-10">Loading recipes...</p>;
  if (!recipes.length) return <p className="text-center mt-10">No recipes found.</p>;


  console.log("recipes", recipes)
  
  const handleNavigate = (recipe) => {
    router.push(`/recipeDetail/${recipe._id}`);
  };

  const onEdit=(recipe)=>{
    debugger
        router.push(`/createRecipe/${recipe._id}`);
  }

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
           {recipes?.map((recipe) => (
             <div key={recipe._id} onClick={() => handleNavigate(recipe)}>
               <FeaturedRecipeCard showActions={true} item={recipe} onEdit={onEdit} />
             </div>
           ))}
         </div>
       </div>
  );
};

export default MyRecipes;
