'use client'

import { useAuth } from "@/components/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import FavouriteRecipesPage from "@/containers/favourite-recipes";

const RecipesRoute = () => {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);


  if (isAuthLoading) return <p className="text-center mt-10">Checking authentication...</p>;
  if (!user) return null; // nothing rendered while redirecting

  return <FavouriteRecipesPage />;
};

export default RecipesRoute;
