'use client';

import { useState, useEffect } from 'react';

const useRecipeDetail = (recipeId: string | null) => {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!recipeId) return;

    const controller = new AbortController(); // cancel fetch on unmount

    const fetchRecipe = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const res = await fetch(`http://localhost:8000/recipes/recipe/${recipeId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch recipe');

        setRecipe(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching recipe:', err);
          setError(err.message || 'Failed to fetch recipe');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();

    return () => controller.abort();
  }, [recipeId]);

  return { recipe, setRecipe, loading, error };
};

export default useRecipeDetail;
