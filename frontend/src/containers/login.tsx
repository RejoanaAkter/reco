// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
debugger
    try {
      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
debugger
      const contentType = res.headers.get("content-type");
      debugger;
      if (!res.ok) {
        let message = "Login failed";
        if (contentType?.includes("application/json")) {
          const errorData = await res.json();
          message = errorData.message || message;
        }
        throw new Error(message);
      }

      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await res.json();
      console.log("Login response data:", data); // Debug response
      debugger;
      if (!data.user || !data.token) {
        throw new Error("Incomplete login response");
      }

      login(data.user, data.token);
      debugger;

      router.replace("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1705056547423-de4ef0f85bf7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHdoaXRlJTIwYmFja2tncm91bmR8ZW58MHx8MHx8')",
      }}
    >
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* Website Name - Top Left */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        {/* Logo */}
        <img
          src="/chef-logo.png" // Replace with your logo path
          alt="Yummy Foods Logo"
          className="w-10 h-10 object-cover rounded-full"
        />

        {/* Website Name */}
        <h1 className="text-2xl font-baloo font-bold text-amber-700">
          Yummy Foods
        </h1>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/90 rounded-sm shadow-lg p-4 border border-[rgba(0,0,0,0.05)] z-10">
        <div className="rounded border border-amber-600 p-8">
          <div className="text-center mb-8">
            {/* Fun Food Icon */}
            <div className="text-6xl animate-bounce">🍜</div>

            {/* Stylish Font */}
            <h2 className="text-xl font-baloo font-bold text-gray-800">
              Log In
            </h2>

            <p className="text-sm text-gray-500 italic mt-1">
              Log in to your secret recipe collection 🍴
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-3 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-1 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full py-2 rounded-sm bg-gradient-to-r from-[#B86958] to-[#FFAAA5] text-white font-semibold shadow hover:from-[#FFB382] hover:to-[#FF8C7A] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
