"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/settings/AuthContext";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form validation: email filled and password >= 6
  const isFormValid = email.trim() && password.trim().length >= 6;

  const handleLogin = async () => {
    if (!isFormValid) {
      if (password.trim().length < 6) {
        toast.error("Password must be at least 6 characters!");
      } else {
        toast.error("Please fill all required fields!");
      }
      return;
    }

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
        throw new Error(message);
      }

      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await res.json();

      if (!data.user || !data.token) {
        throw new Error("Incomplete login response");
      }

      login(data.user, data.token);

      toast.success("Login successful!");

      setTimeout(() => router.replace("/"), 1000);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-6 relative"
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
          width={80}
          height={80}
          className="object-cover rounded"
        />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/95 rounded-md shadow-lg p-6 sm:p-8 border border-[rgba(0,0,0,0.05)] z-10 flex flex-col gap-4">
        <div className="text-center sm:mb-8">
          <div className="text-6xl animate-bounce mb-2">🍜</div>
          <h2 className="text-lg sm:text-2xl font-baloo font-semibold font-serif italic text-gray-800">
            Log In
          </h2>
          <p className="text-sm sm:text-base text-amber-600 tracking-[0.1em] mt-1">
            Log in to your secret recipe collection 🍴
          </p>
        </div>

        {/* Email */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder=""
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-200 focus:border-amber-300 text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=""
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-200 focus:border-amber-300 text-gray-700 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-0 bottom-0 flex items-center px-2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={!isFormValid || isLoading}
          className={`w-full py-2 rounded bg-gradient-to-r from-[#B86958] to-[#FFAAA5] text-white font-semibold shadow 
                      hover:from-[#FFB382] hover:to-[#FF8C7A] transition flex items-center justify-center gap-2
                      ${
                        !isFormValid || isLoading
                          ? "opacity-50 cursor-not-allowed hover:from-[#B86958] hover:to-[#FFAAA5]"
                          : ""
                      }`}
        >
          {isLoading ? "Logging in..." : "Login"} <span>🍴</span>
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm sm:text-base">
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
  );
}
