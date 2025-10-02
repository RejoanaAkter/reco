// hooks/useRecipeFavorite.ts
import { useState } from "react";

export const useRecipeFavorite = (recipe: any, user: any, token: string | null) => {
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    if (!user) return alert("Please login to favorite");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/recipes/recipe/${recipe._id}/favorite`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to toggle favorite");
      const data = await res.json();
      return data.favorites;
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = recipe.favorites?.includes(user?._id || "");

  return { isFavorite, loading, toggleFavorite };
};
