'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/AuthContext"; // adjust path to your AuthProvider
import getImageUrl from "@/settings/utils";

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

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative w-full h-48">
            <Image
              src={getImageUrl(recipe.imageUrl) || "/placeholder.png"}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{recipe.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {recipe.description?.substring(0, 100)}...
            </p>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>⭐ {recipe.ratings?.length
                ? (recipe.ratings.reduce((a, b) => a + b.value, 0) / recipe.ratings.length).toFixed(1)
                : 0}</span>
              <span>❤️ {recipe.favorites?.length || 0}</span>
              <span>💬 {recipe.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyRecipes;
