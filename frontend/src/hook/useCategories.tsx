// src/hook/useCategories.ts
import { API_BASE } from "@/config";
import { useState, useEffect } from "react";

export interface Category {
  _id: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/cat/categories`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data?.message || "Failed to fetch categories");
        if (isMounted) setCategories(Array.isArray(data) ? data : []);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
};

export default useCategories;
