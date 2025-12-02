"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/settings/AuthContext";
import NavBar from "@/components/navbar";
import { Footer } from "@/components/footer";
import LoadingCover from "@/loader/laodingCover";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthLoading) return; // Wait until auth state is loaded

    const publicPaths = ["/login", "/signin"];
    const currentPath = window.location.pathname;

    // Redirect logged-out users trying to access protected routes
    if (!user && !publicPaths.includes(currentPath)) {
      router.replace("/login");
    }

    // Redirect logged-in users from login/signin pages to home
    if (user && publicPaths.includes(currentPath)) {
      router.replace("/"); // 🔹 This prevents logged-in users from visiting login/signup
    }
  }, [user, isAuthLoading, router]);

  if (isAuthLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
    <LoadingCover/>
      </div>
    );
  }

  return (
    <>
      {user && <NavBar />}
      <main className="bg-gray-50 min-h-screen">{children}</main>
      {user && <Footer />}
    </>
  );
}
