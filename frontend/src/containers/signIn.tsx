// app/sign-in/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    about: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
  setIsSubmitting(true);
  setError("");

  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value as any);
    });

    const res = await fetch("http://localhost:8000/users/user", {
      method: "POST",
      body: data, // Don't set Content-Type; browser handles it
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Signup failed");

    // Auto-login after signup
    // Only works if backend returns user + token
    login(result.user, result.token); 
    router.replace("/");
  } catch (err: any) {
    setError(err.message || "Something went wrong");
  } finally {
    setIsSubmitting(false);
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* Sign-Up Card */}
      <div className="relative w-full max-w-md bg-white/90 rounded-sm shadow-lg p-4 border border-[rgba(0,0,0,0.05)] z-10">
        <div className="rounded border border-amber-600 p-6 text-gray-700">
          <div className="text-center mb-">
            {/* Fun Icon */}
            <div className="text-6xl mb-2 animate-bounce">🌶️</div>

            <h2 className="text-xl font-baloo font-bold text-gray-800 ">
              Sign Up
            </h2>

            <p className="text-sm text-gray-500 italic mb-2">
              Join our yummy foodie community 🍴
            </p>
          </div>

          {/* Form Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-1 rounded-sm border border-gray-300  mb-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 border border-gray-300 py-1 rounded-sm mb-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 border border-gray-300 py-1 rounded-sm mb-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-3 border border-gray-300 py-1 rounded-sm mb-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
          />
          <textarea
            name="about"
            placeholder="About"
            value={formData.about}
            onChange={handleInputChange}
            className="w-full px-3 border border-gray-300 py-1 rounded-sm mb-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full px-3 border border-gray-300 py-1 rounded-sm mb-3"
          />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mb-3 mx-auto"
            />
          )}

          {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="px-5 border border-gray-400 rounded-sm hover:bg-gray-100 text-gray-500 transition h-8"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#FFD3B6] to-[#FFAAA5] text-white px-5 rounded-sm shadow hover:from-[#FFB382] hover:to-[#FF8C7A] transition disabled:opacity-50 h-8"
            >
              {isSubmitting ? "Creating..." : "Sign Up"}
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-amber-700 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
