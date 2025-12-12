import { API_BASE } from "@/config";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  address?: string;
  image?: string;
  about?: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔑 protected route
        if (!token) {
          setError("Authentication token not found");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE}/users/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data?.message || "Failed to fetch users");

        if (isMounted) setUsers(data);
      } catch (err) {
        if (isMounted) setError((err as Error).message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  return { users, loading, error };
};
