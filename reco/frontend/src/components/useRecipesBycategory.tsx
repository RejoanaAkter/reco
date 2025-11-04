import { useEffect, useState } from 'react';

const useRecipesByCategory = (selectedCategoryId: string | null) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchRecipesByCategory = async () => {
      setLoading(true);
      setError('');
      setRecipes([]);
      setFadeIn(false);

      try {
        const res = await fetch(
          `http://localhost:8000/recipes/category/${selectedCategoryId}`
        );

        if (!res.ok) throw new Error('Failed to fetch recipes');

        const data = await res.json();
        setRecipes(data);

        // Add delay to trigger CSS fade-in animation
        setTimeout(() => setFadeIn(true), 50);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByCategory();
  }, [selectedCategoryId]);

  return { recipes, loading, error, fadeIn };
};

export default useRecipesByCategory;
