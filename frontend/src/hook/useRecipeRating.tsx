// hooks/useRecipeRating.ts
import { useState, useEffect } from "react";

export const useRecipeRating = (recipe: any, user: any, token: string | null) => {
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userRating = recipe.ratings?.find((r: any) => r.user === user?._id)?.value;
    if (userRating) setRating(userRating);
  }, [recipe.ratings, user]);

  const rateRecipe = async (value: number) => {
    if (!user) return alert("Please login to rate");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/recipes/recipe/${recipe._id}/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: value }),
      });

      if (!res.ok) throw new Error("Failed to rate recipe");

      const data = await res.json();
      setRating(value);
      return data.ratings;
    } finally {
      setLoading(false);
    }
  };

  return { rating, setRating, loading, rateRecipe };
};
