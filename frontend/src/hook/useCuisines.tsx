import { API_BASE } from "@/config";
import { useEffect, useState } from "react";

export interface Cuisine {
  _id: string;
  name: string;
}

export interface Recipe {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  cuisine?: string;
  prepTime?: number;
}

const useCuisines = () => {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [recipesByCuisine, setRecipesByCuisine] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addingCuisine, setAddingCuisine] = useState(false);

  // 🔹 Fetch all cuisines
  const getCuisines = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/cuisines/getAllcuisines`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setCuisines(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Failed to load cuisines");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Add a new cuisine
  const addCuisine = async (name: string) => {
    if (!name.trim()) return null;
    setAddingCuisine(true);
    try {
      const res = await fetch(`${API_BASE}/cuisines/craeteCuisine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add cuisine");
      setCuisines((prev) => [...prev, data]);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to add cuisine");
      return null;
    } finally {
      setAddingCuisine(false);
    }
  };

  // 🔹 Fetch recipes by cuisine ID or name
  const getRecipesByCuisine = async (cuisine: string) => {
    if (!cuisine) return;
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/recipes/cuisine/${cuisine}`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch recipes");
      setRecipesByCuisine(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Failed to load recipes");
      setRecipesByCuisine([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCuisines();
  }, []);

  return {
    cuisines,
    recipesByCuisine,
    loading,
    error,
    addingCuisine,
    getCuisines,
    addCuisine,
    getRecipesByCuisine, // <-- exposed for use in frontend
  };
};

export default useCuisines;
