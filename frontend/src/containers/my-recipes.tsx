"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { FeaturedRecipeCard } from "@/components/feature-card";
import { useDeleteRecipe } from "@/hook/useDeleteRecipe";
import { IoMdRestaurant } from "react-icons/io";
import AnimatedBorder from "@/components/animatedTitle";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const MyRecipes = () => {
  const { user, isAuthLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { deleteRecipe, loading: deleteLoading } = useDeleteRecipe(); // ✅ use hook

  useEffect(() => {
    if (!user) return;
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8000/recipes/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user]);

  const onEdit = (recipe: Recipe) => {
    router.push(`/createRecipe/${recipe._id}`);
  };

  const onDelete = async (recipeId: string) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    const success = await deleteRecipe(recipeId);
    if (success) {
      setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
      alert("Recipe deleted successfully!");
    }
  };

  if (isAuthLoading) return <p className="text-center ">Loading auth...</p>;
  if (loading) return <p className="text-center ">Loading recipes...</p>;
  if (!recipes?.length) return <p className="text-center">No recipes found.</p>;

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 text-gray-800">
      <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
        <IoMdRestaurant className="text-amber-700" /> My Recipes
      </h2>
      <AnimatedBorder />
      <div
        className="mt-6 grid gap-6
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
      >
        {recipes.map((recipe) => (
          <div key={recipe._id}>
            <FeaturedRecipeCard
              showActions={true}
              item={recipe}
              onEdit={() => onEdit(recipe)}
              onDelete={() => onDelete(recipe._id)}
            />
          </div>
        ))}
      </div>

      {deleteLoading && (
        <p className="text-center mt-4 text-gray-500">Deleting recipe...</p>
      )}
    </div>
  );
};

export default MyRecipes;
