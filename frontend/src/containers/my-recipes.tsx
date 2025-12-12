"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/settings/AuthContext";
import { FeaturedRecipeCard } from "@/components/feature-card";
import { useDeleteRecipe } from "@/hook/useDeleteRecipe";
import { IoMdRestaurant } from "react-icons/io";
import AnimatedBorder from "@/components/animatedTitle";
import { GlobalLoader } from "@/loader/globalLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import ConfirmDeleteModal from "@/modal/confirmationDeleteModal";
import { FaUserEdit } from "react-icons/fa";
import { API_BASE } from "@/config";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const MyRecipes = () => {
  const { user, isAuthLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();
  const { deleteRecipe, loading: deleteLoading } = useDeleteRecipe();

  // Fetch user's recipes
  useEffect(() => {
    if (!user) return;

    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${API_BASE}/recipes/user/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
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

  // Navigate to edit page
  const onEdit = (recipe: Recipe) => {
    router.push(`/createRecipe/${recipe._id}`);
  };

  // Open modal
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  // Confirm deletion
  const onDelete = async () => {
    if (!deleteId) return;

    const success = await deleteRecipe(deleteId);
    if (success) {
      setRecipes((prev) => prev.filter((r) => r._id !== deleteId));
      toast.success("Recipe deleted successfully!");
    } else {
      toast.error("Failed to delete recipe.");
    }

    setDeleteId(null); // Close modal
  };

  if (isAuthLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <GlobalLoader />
      </div>
    );
  }

  if (!recipes?.length) {
    return <p className="text-center py-16 text-gray-500">No recipes found.</p>;
  }

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
        <FaUserEdit className="text-amber-700" /> My Recipes
      </h2>
      <AnimatedBorder />

      <motion.div
        className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {recipes.map((recipe) => (
          <motion.div key={recipe._id} variants={cardVariants}>
            <FeaturedRecipeCard
              showActions={true}
              item={recipe}
              onEdit={() => onEdit(recipe)}
              onDelete={() => handleDeleteClick(recipe._id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {deleteLoading && (
        <div className="flex justify-center mt-4">
          <GlobalLoader />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={onDelete}
      />
    </div>
  );
};

export default MyRecipes;
