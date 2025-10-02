import { useState, useEffect } from "react";

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }
      debugger;
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8000/recipes/recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
debugger
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch recipes");
        }

        setRecipes(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};

export default useRecipes;
