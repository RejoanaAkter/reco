// app/sign-in/page.tsx
'use client';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Signup failed");

      login(result.user, result.token);
      router.replace("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Sign Up</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full p-2 border mb-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        className="w-full p-2 border mb-2"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleInputChange}
        className="w-full p-2 border mb-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        className="w-full p-2 border mb-2"
      />
      <textarea
        name="about"
        placeholder="About"
        value={formData.about}
        onChange={handleInputChange}
        className="w-full p-2 border mb-2"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleInputChange}
        className="w-full p-2 border mb-2"
      />
      {formData.image && (
        <img
          src={URL.createObjectURL(formData.image)}
          alt="Preview"
          className="w-20 h-20 object-cover rounded mb-2"
        />
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Creating..." : "Sign Up"}
        </button>
      </div>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 underline">
          Login
        </a>
      </p>
    </div>
  );
}
