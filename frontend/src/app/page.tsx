'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import HomeCoverScreen from "@/containers/cover";

export default function Home() {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace("/login");
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading || (!user && typeof window !== "undefined")) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return <HomeCoverScreen />;
}
