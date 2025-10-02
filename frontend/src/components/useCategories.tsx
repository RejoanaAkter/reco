import { useState, useEffect } from "react";

interface Category {
  _id: string;
  name: string;
  description?: string;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true; // prevent state update if unmounted

    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/cat/categories", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // uncomment if protected
          },
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          throw new Error(errData?.message || "Failed to fetch categories");
        }

        const data: Category[] = await response.json();
        if (isMounted) setCategories(data);
      } catch (err: unknown) {
        if (isMounted)
          setError((err as Error).message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  return { categories, loading, error };
};

export default useCategories;
