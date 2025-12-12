"use client";

import { API_BASE } from "@/config";
import { useState } from "react";

interface Props {
  setShowModal: (show: boolean) => void;
  onCategoryCreated: (category: any) => void; 
}

const CategoryCreateModal: React.FC<Props> = ({ setShowModal, onCategoryCreated }) => {
  const [formData, setFormData] = useState<{ name: string; image: File | null }>({
    name: "",
    image: null,
  });

  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = formData.name.trim() && formData.image;

  const handleSubmit = async () => {
    if (!isFormValid) {
      setFormError("Both category name and image are required.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.image) data.append("image", formData.image);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const res = await fetch(`${API_BASE}/cat/category`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create category");

      onCategoryCreated(result);
      setShowModal(false);
    } catch (err) {
      setFormError((err as Error).message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-gray-800">
      <div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md animate-[fadeIn_0.25s_ease-out,scaleIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Category</h2>

        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          className="w-full px-3 py-1 border rounded mt-4 hover:bg-gray-100 cursor-pointer"
        />

        {formData.image && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            className="w-24 h-24 object-cover rounded mb-3 border"
          />
        )}

        {formError && <p className="text-red-500 text-sm mb-3">{formError}</p>}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-1 rounded border border-gray-300 hover:bg-gray-100 text-gray-700 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`px-4 py-1 cursor-pointer rounded bg-green-600 text-white hover:bg-green-700 transition ${
              !isFormValid || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreateModal;
