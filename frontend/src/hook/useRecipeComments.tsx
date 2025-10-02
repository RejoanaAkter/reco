// hooks/useRecipeComments.ts
import { useState } from "react";

export const useRecipeComments = (recipe: any, user: any, token: string | null) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const addComment = async () => {
    if (!user) return alert("Please login to comment");
    if (!comment.trim()) return;
debugger
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/recipes/recipe/${recipe._id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: comment }),
      });

      if (!res.ok) throw new Error("Failed to add comment");
      const data = await res.json();
      debugger
      setComment("");
      return data.comments;
    } finally {
      setLoading(false);
    }
  };

  return { comment, setComment, loading, addComment };
};
