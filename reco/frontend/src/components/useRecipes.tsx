import { useState, useEffect } from 'react';

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/recipes/recipes');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch recipes');
        }

        const data = await response.json();
        setRecipes(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};

export default useRecipes;
