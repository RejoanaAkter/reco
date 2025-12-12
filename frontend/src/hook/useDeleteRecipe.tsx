'use client';
import { API_BASE } from "@/config";
import { useState } from "react";

export const useDeleteRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteRecipe = async (recipeId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in to delete a recipe.");

      const res = await fetch(`${API_BASE}/recipes/delete/recipe/${recipeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to delete recipe: ${res.status} - ${errText}`);
      }

      setSuccess(true);
      return true; // indicate success
    } catch (err: any) {
      console.error("Error deleting recipe:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRecipe, loading, error, success };
};
