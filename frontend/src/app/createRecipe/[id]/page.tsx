'use client'

import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CreateRecipesPage from "@/containers/create-recipe";

const RecipesRoute = () => {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  // ⚠️ Do NOT render the page until auth is checked
  if (isAuthLoading) return <p className="text-center mt-10">Checking authentication...</p>;
  if (!user) return null; // nothing rendered while redirecting

  return <CreateRecipesPage />;
};

export default RecipesRoute;
