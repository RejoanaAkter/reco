"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/settings/AuthContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  // Form validation
  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.address.trim() &&
    formData.password.trim().length >= 6;

  const handleSubmit = async () => {
    if (!isFormValid) {
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters!");
      } else {
        toast.error("Please fill all required fields!");
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value as any);
      });

      const res = await fetch("http://localhost:8000/users/user", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Signup failed");

      toast.success("Sign up successful! 🎉");

      // Auto-login if backend returns user + token
      login(result.user, result.token);

      setTimeout(() => {
        router.replace("/"); // Redirect to home after signup
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 sm:p-6 relative"
      style={{
        backgroundImage:
          "url('/recipeCover.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40"></div>

      {/* Sign-Up Card */}
      <div className="relative w-full max-w-md bg-white/95 rounded-md shadow-lg p-4 border border-[rgba(0,0,0,0.05)] z-10">
        <div className="rounded border border-amber-600 p-6 text-gray-700">
          <div className="text-center mb-4">
            <h2 className="text-lg sm:text-2xl font-serif italic font-semibold text-gray-800">Sign Up</h2>
            <p className="text-sm sm:text-base text-amber-600 tracking-[0.1em] mb-2">
              Join our yummy foodie community 🍴
            </p>
          </div>

          {/* Form Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-sm border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-sm border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
          />
          <input
            type="text"
            name="address"
            placeholder="Address *"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-sm border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
          />

          {/* Password with Eye */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password * (min 6 characters)"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <textarea
            name="about"
            placeholder="About"
            value={formData.about}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-sm border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 mb-3 rounded-sm"
          />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mb-3 mx-auto"
            />
          )}

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
              disabled={!isFormValid || isSubmitting}
              onClick={handleSubmit}
              className={`bg-gradient-to-r from-[#ED7158] to-[#CC3314] text-white px-5 rounded-sm shadow hover:from-[#FFB382] hover:to-[#FF8C7A] transition h-8 ${
                !isFormValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
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
