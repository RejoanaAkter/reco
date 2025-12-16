// hooks/useRecipeComments.ts
import { API_BASE } from "@/config";
import { useState } from "react";

export const useRecipeComments = (recipe: any, user: any, token: string | null) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

 // hooks/useRecipeComments.ts
const addComment = async () => {
  if (!user) return alert("Please login to comment");
  if (!comment.trim()) return;

  setLoading(true);
  try {
    const newComment = {
      user: user,
      text: comment,
      _id: Date.now().toString(), // temporary ID until backend returns real one
      createdAt: new Date().toISOString(),
    };

    await fetch(`${API_BASE}/recipes/recipe/${recipe._id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment }),
    });

    setComment("");
    return newComment; // return locally created comment immediately
  } finally {
    setLoading(false);
  }
};


  return { comment, setComment, loading, addComment };
};
