// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import Image from "next/image";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        let message = "Login failed";
        if (contentType?.includes("application/json")) {
          const errorData = await res.json();
          message = errorData.message || message;
        }
        throw new Error(message); // Only throw, toast handled in catch
      }

      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await res.json();

      if (!data.user || !data.token) {
        throw new Error("Incomplete login response");
      }

      login(data.user, data.token);

      toast.success("Login successful! 🎉"); // ✅ single success toast

      setTimeout(() => {
        router.replace("/");
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong"); // ✅ single error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1705056547423-de4ef0f85bf7?fm=jpg&q=60&w=3000')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30 pointer-events-none"></div>

      {/* Logo */}
      <div className="absolute top-4 left-4 z-20">
        <Image
          src="/logo.png"
          alt="Logo"
          width={90}
          height={90}
          className="object-cover rounded"
        />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/95 rounded-sm shadow-lg p-4 border border-[rgba(0,0,0,0.05)] z-10">
        <div className="rounded border border-amber-600 p-8">
          <div className="text-center mb-8">
            <div className="text-6xl animate-bounce">🍜</div>
            <h2 className="text-xl font-baloo font-bold text-gray-800">Log In</h2>
            <p className="text-sm text-gray-500 italic mt-1">
              Log in to your secret recipe collection 🍴
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-3 py-1 border border-gray-300 rounded-sm
                         focus:outline-none focus:ring-2 focus:ring-amber-200
                         focus:border-amber-300 text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-1 border border-gray-300 rounded-sm
                         focus:outline-none focus:ring-2 focus:ring-amber-200
                         focus:border-amber-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-2 rounded-sm bg-gradient-to-r from-[#B86958]
                       to-[#FFAAA5] text-white font-semibold shadow
                       hover:from-[#FFB382] hover:to-[#FF8C7A]
                       transition disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
          >
            <span>{isLoading ? "Cooking up your login..." : "Login"}</span>
            <span>🍴</span>
          </button>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a
              href="/signin"
              className="text-amber-700 font-semibold hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
