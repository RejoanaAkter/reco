// app/login/page.tsx
'use client';

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

  try {
    const res = await fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const contentType = res.headers.get("content-type");
debugger
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
    console.log("Login response data:", data);  // Debug response
debugger
    // if (!data.user || !data.token) {
    //   throw new Error("Incomplete login response");
    // }

    // login(data.user, data.token);
     login(data);

    router.replace("/"); 
  } catch (err) {
    console.error("Login error:", err);
    setError(err.message || "Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="bg-blue-600 text-white py-2 px-4 rounded w-full"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <a href="/signin" className="text-blue-600 underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}
