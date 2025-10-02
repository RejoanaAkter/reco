import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";

const useFavorites = () => {
  const { user, isAuthLoading } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthLoading) return;
    if (!user) {
      setLoading(false);
      setFavorites([]);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      setError("");
debugger
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8000/recipes/favorites/${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
debugger
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch favorites");
        }

        const data = await res.json();
        setFavorites(data);

        debugger
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, isAuthLoading]);

  return { favorites, loading, error };
};

export default useFavorites;
