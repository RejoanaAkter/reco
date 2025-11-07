import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Cuisine {
  _id: string;
  name: string;
}

const useCuisines = () => {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addingCuisine, setAddingCuisine] = useState(false);

  // Fetch all cuisines
  const getCuisines = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/cuisines/getAllcuisines`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      debugger
      const data = await res.json();
      setCuisines(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Failed to load cuisines");
    } finally {
      setLoading(false);
    }
  };

  // Add new cuisine
  const addCuisine = async (name: string) => {
    debugger
    if (!name.trim()) return null;
    setAddingCuisine(true);
    try {
      const res = await fetch(`${API_BASE}/cuisines/craeteCuisine`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ name }),
      });
      debugger
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add cuisine");
      setCuisines(prev => [...prev, data]);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to add cuisine");
      return null;
    } finally {
      setAddingCuisine(false);
    }
  };

  useEffect(() => {
    getCuisines();
  }, []);

  return {
    cuisines,
    loading,
    error,
    addingCuisine,
    getCuisines,
    addCuisine,
  };
};

export default useCuisines;
