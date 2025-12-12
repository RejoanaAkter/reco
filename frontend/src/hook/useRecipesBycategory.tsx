import { API_BASE } from '@/config';
import { useEffect, useState } from 'react';

interface Recipe {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  category?: string;
  user?: string;
}

const useRecipesByCategory = (selectedCategoryId: string | null) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedCategoryId) return;

    let isMounted = true;

    const fetchRecipesByCategory = async () => {
      setLoading(true);
      setError('');
      setRecipes([]);
      setFadeIn(false);

      try {
        const token = localStorage.getItem("token"); // 🔑 for protected route
        const res = await fetch(
          `${API_BASE}/recipes/category/${selectedCategoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || 'Failed to fetch recipes');
        }

        if (isMounted) {
          setRecipes(data?.recipes);
          // Add delay to trigger CSS fade-in animation
          setTimeout(() => setFadeIn(true), 50);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Something went wrong');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRecipesByCategory();

    return () => {
      isMounted = false; // cleanup
    };
  }, [selectedCategoryId]);

  return { recipes, loading, error, fadeIn };
};

export default useRecipesByCategory;
