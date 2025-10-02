// src/components/ClientLayout.tsx
"use client";

import React from "react";
import { useAuth } from "@/components/AuthContext";
import NavBar from "@/containers/navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      {user && <NavBar />}
      <main className="bg-gray-100 min-h-screen">{children}</main>
    </>
  );
}
