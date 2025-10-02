'use client'

import { useAuth } from "@/components/AuthContext";
import CategoryDropdown from "@/components/category-dropDown";
import { useSearchParams } from "next/navigation";
import React, { useState, useRef } from "react";

const CreateRecipeTailwind = () => {
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([""]);
  const fileInputRef = useRef(null);
  const searchParams = useSearchParams();

  const { user } = useAuth();

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  const addIngredient = () => setIngredients([...ingredients, ""]);

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };
  const addInstruction = () => setInstructions([...instructions, ""]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.match(/image\/(jpeg|png)/)) {
      setMessage("Only JPG or PNG images are allowed.");
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    setMessage("");
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

const handleSave = async () => {
  if (!imageFile) {
    setMessage("Please upload an image.");
    return;
  }

  if (!user?.id || !categoryId || !title) {
    setMessage("User ID, Category ID, and Title are required.");
    return;
  }

  const formData = new FormData();
  formData.append("user", user.id);
  formData.append("category", categoryId);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("cuisine", cuisine);
  formData.append("prepTime", prepTime ? String(prepTime) : "0");
  formData.append("isPublic", String(isPublic)); // ✅ always string in FormData
  formData.append("tags", JSON.stringify(tags));
  formData.append("ingredients", JSON.stringify(ingredients));
  formData.append("instructions", JSON.stringify(instructions));
  formData.append("image", imageFile);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication token not found.");
      return;
    }

    const response = await fetch("http://localhost:8000/recipes/recipe", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ send token
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      setMessage(result.message || "Failed to create recipe.");
      return;
    }

    // ✅ Success
    setMessage("Recipe created successfully!");
    setCategory("");
    setTitle("");
    setDescription("");
    setCuisine("");
    setPrepTime("");
    setIngredients([]);
    setInstructions([]);
    setTags([]);
    clearImage();
    setIsPublic(false);
  } catch (error) {
    console.error(error);
    setMessage("Error creating recipe.");
  }
};


  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };
  const addTag = () => setTags([...tags, ""]);

  return (

  <section
    className="relative bg-fixed bg-center bg-cover"
    style={{
      backgroundImage:
        "url('https://plus.unsplash.com/premium_photo-1705056547423-de4ef0f85bf7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0')",
    }}
  >
    <div className="py-10 flex justify-center">
      <div className="w-3/5 p-8 bg-white/95 backdrop-blur rounded-xl shadow-lg text-gray-700 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-orange-700 text-center">
          🍲 Create a Delicious Recipe
        </h2>

        {/* Category */}
        <div className="mb-4">
          <CategoryDropdown
            selectedCategory={category}
            setSelectedCategory={setCategory}
            setSelectedCategoryId={setCategoryId}
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Title:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Description:</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-orange-400"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
          />
        </div>

        {/* Cuisine */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Cuisine:</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="e.g. Italian, Indian, Mexican"
          />
        </div>

        {/* Prep Time */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Prep Time (minutes):
          </label>
          <input
            type="number"
            min="0"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="e.g. 30"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Upload Image:
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative cursor-pointer border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center overflow-hidden hover:border-orange-400 transition"
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearImage();
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-red-700"
                >
                  &times;
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <p>Click to upload JPG or PNG image</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Public Checkbox */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
          />
          <label htmlFor="isPublic" className="ml-2 text-gray-700 font-medium">
            Public
          </label>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Tags:</label>
          {tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={tag}
                onChange={(e) => handleTagChange(i, e.target.value)}
                placeholder={`Tag #${i + 1}`}
              />
              {i === tags.length - 1 && (
                <button
                  onClick={addTag}
                  type="button"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              )}
              {tags.length > 1 && (
                <button
                  onClick={() => removeTag(i)}
                  type="button"
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Ingredients:</label>
          {ingredients.map((ing, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={ing}
                onChange={(e) => handleIngredientChange(i, e.target.value)}
                placeholder={`Ingredient #${i + 1}`}
              />
              {i === ingredients.length - 1 && (
                <button
                  onClick={addIngredient}
                  type="button"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              )}
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeIngredient(i)}
                  type="button"
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Instructions:</label>
          {instructions.map((step, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <textarea
                rows={3}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={step}
                onChange={(e) => handleInstructionChange(i, e.target.value)}
                placeholder={`Step #${i + 1}`}
              />
              {i === instructions.length - 1 && (
                <button
                  onClick={addInstruction}
                  type="button"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              )}
              {instructions.length > 1 && (
                <button
                  onClick={() => removeInstruction(i)}
                  type="button"
                  className="px-3 py-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="px-2 py-2 bg-gradient-to-r from-[#B86958] to-[#FFAAA5] text-white font-semibold rounded-lg hover:bg-orange-700 transition"
        >
          Save Recipe
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  </section>
);

};

export default CreateRecipeTailwind;
