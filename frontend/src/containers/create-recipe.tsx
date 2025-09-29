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
    if (!user?.userId || !categoryId || !title) {
      setMessage("User ID, Category ID, and Title are required.");
      return;
    }

    const formData = new FormData();
    formData.append("user", user?.userId);
    formData.append("category", categoryId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("cuisine", cuisine);
    formData.append("prepTime", prepTime ? Number(prepTime) : 0);
    formData.append("isPublic", isPublic);
    formData.append("tags", JSON.stringify(tags));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("instructions", JSON.stringify(instructions));
    formData.append("image", imageFile);

    try {
      const response = await fetch("http://localhost:8000/recipes/recipe", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to create recipe.");
        return;
      }
      setMessage("Recipe created successfully!");
      setCategory("");
      setTitle("");
      setDescription("");
      setCuisine("");
      setPrepTime("");
      setIngredients([""]);
      setInstructions([""]);
      setTags([""]);
      clearImage();
      setIsPublic(false);
    } catch (error) {
      setMessage("Error creating recipe.");
      console.error(error);
    }
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };
  const addTag = () => setTags([...tags, ""]);

  return (
    <div className="py-6 flex justify-center bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      <div className="w-3/5 p-8 bg-white rounded-xl shadow-lg text-gray-700 border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-orange-700">
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
            rows={4}
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
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
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
                  aria-label="Clear image"
                >
                  &times;
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16V4m0 0L3 8m4-4l4 4m5 4h3m-3 0v6a2 2 0 01-2 2H9m6-8l4 4m0 0l-4 4m4-4H9"
                  />
                </svg>
                <p>Click to upload JPG or PNG image</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            id="imageUpload"
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
          <label className="block mb-2 font-medium text-gray-700">Tags:</label>
          {tags.map((tag, i) => (
            <input
              key={i}
              type="text"
              className="w-full mb-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={tag}
              onChange={(e) => handleTagChange(i, e.target.value)}
              placeholder={`Tag #${i + 1}`}
            />
          ))}
          <button
            onClick={addTag}
            className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
            type="button"
          >
            + Add Tag
          </button>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Ingredients:</label>
          {ingredients.map((ing, i) => (
            <input
              key={i}
              type="text"
              className="w-full mb-2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={ing}
              onChange={(e) => handleIngredientChange(i, e.target.value)}
              placeholder={`Ingredient #${i + 1}`}
            />
          ))}
          <button
            onClick={addIngredient}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            type="button"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Instructions:</label>
          {instructions.map((step, i) => (
            <textarea
              key={i}
              rows={3}
              className="w-full mb-2 border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-green-500"
              value={step}
              onChange={(e) => handleInstructionChange(i, e.target.value)}
              placeholder={`Step #${i + 1}`}
            />
          ))}
          <button
            onClick={addInstruction}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            type="button"
          >
            + Add Instruction
          </button>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full py-3 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700 transition"
        >
          Save Recipe
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateRecipeTailwind;
