'use client';

import { useState } from 'react';

const CategoryCreateModal = ({ setShowModal, onCategoryCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        image: null,
    });

    const [formError, setFormError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prev) => ({ ...prev, image: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

const handleSubmit = async () => {
  setIsSubmitting(true);
  setFormError("");

  try {
    const data = new FormData();
    data.append("name", formData.name);
    if (formData.image) {
      data.append("image", formData.image);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const res = await fetch("http://localhost:8000/cat/category", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ required for protected route
      },
      body: data,
    });

    const result = await res.json();
    
onCategoryCreated(result)
    if (!res.ok) {
      throw new Error(result.message || "Failed to create category");
    }

    setShowModal(false); // close modal after success
  } catch (err) {
    setFormError((err as Error).message || "Something went wrong");
  } finally {
    setIsSubmitting(false);
  }
};


    return (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">

                <h2 className="text-lg font-bold mb-4">Create Category</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border mb-2"
                    required
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
                        className="w-24 h-24 object-cover rounded mb-2"
                    />
                )}
                {formError && <p className="text-red-500">{formError}</p>}
                <div className="flex justify-end gap-2">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
                        Cancel
                    </button>
                    <button
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreateModal;
