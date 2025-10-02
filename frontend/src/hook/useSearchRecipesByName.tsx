"use client";

import { useState } from "react";

const useSearchRecipesByName = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecipes = async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/recipes/search?name=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch recipes");

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchRecipes };
};

export default useSearchRecipesByName;
