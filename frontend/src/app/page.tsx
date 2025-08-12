'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import HomeCoverScreen from "@/containers/cover";

export default function Home() {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    debugger
    if (isAuthLoading) return; // ❗ Don't redirect until auth loading is done

   if (!isAuthLoading && !user) {
  router.replace("/login");
}
  }, [user, isAuthLoading, router]);

  if (isAuthLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) return null; // avoid showing anything until redirect is complete

  return <HomeCoverScreen />;
}
