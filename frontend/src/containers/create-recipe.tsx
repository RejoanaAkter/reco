'use client';

import { useAuth } from "@/components/AuthContext";
import CategoryDropdown from "@/components/category-dropDown";
import useRecipeDetail from "@/hook/useRecipeDetail";
import { useParams } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";


const CreateOrEditRecipe = () => {
  const { id: recipeId } = useParams();
  const { user } = useAuth();
  const { recipe, loading, error } = useRecipeDetail(recipeId || null);

  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [cuisine, setCuisine] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState<string[]>([""]);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Populate all form fields when recipe data is fetched
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || "");
      setDescription(recipe.description || "");
      setCuisine(recipe.cuisine || "");
      setPrepTime(recipe.prepTime || "");
      setIsPublic(recipe.isPublic || false);
      setCategory(recipe.category || null);
      setCategoryId(recipe.category?._id || "");
      setIngredients(recipe.ingredients?.length ? recipe.ingredients : [""]);
      setInstructions(recipe.instructions?.length ? recipe.instructions : [""]);
      setTags(recipe.tags?.length ? recipe.tags : [""]);
      if (recipe.imageUrl) {
        const fullUrl = recipe.imageUrl.startsWith("http")
          ? recipe.imageUrl
          : `http://localhost:8000${recipe.imageUrl}`;
        setImagePreview(fullUrl);
      }
    }
  }, [recipe]);

  // ✅ Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/image\/(jpeg|png)/)) {
      setMessage("Only JPG or PNG images are allowed.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ✅ Helpers for dynamic fields
  const updateArrayValue = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
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
    formData.append("isPublic", String(isPublic));
    formData.append("tags", JSON.stringify(tags));
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("instructions", JSON.stringify(instructions));
    if (imageFile) formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("token");
      const method = recipeId ? "PUT" : "POST";
      const url = recipeId
        ? `http://localhost:8000/recipes/update/recipe/${recipeId}`
        : "http://localhost:8000/recipes/recipe";
debugger
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save recipe");

      setMessage(recipeId ? "✅ Recipe updated successfully!" : "✅ Recipe created successfully!");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Error saving recipe.");
    }
  };

  // if (loading) return <div className="text-center py-10 text-gray-600">Loading recipe...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <section
      className="relative bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1705056547423-de4ef0f85bf7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0')",
      }}
    >
      <div className="py-10 flex justify-center">
        <div className="w-3/5 p-8 bg-white/95 rounded-xl shadow-lg text-gray-700 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-orange-700 text-center">
            {recipeId ? "✏️ Edit Recipe" : "🍲 Create a Recipe"}
          </h2>

          {/* Category */}
          <CategoryDropdown
            selectedCategory={category}
            setSelectedCategory={setCategory}
            setSelectedCategoryId={setCategoryId}
          />

          {/* Title */}
          <input
            type="text"
            className="w-full mt-4 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe title"
          />

          {/* Description */}
          <textarea
            rows={3}
            className="w-full mt-4 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
          />

          {/* Cuisine & Prep Time */}
          <div className="flex gap-4 mt-4">
            <input
              type="text"
              className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-400"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="Cuisine (e.g. Italian)"
            />
            <input
              type="number"
              className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-orange-400"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              placeholder="Prep time (minutes)"
            />
          </div>

          {/* Ingredients */}
          <div className="mt-4">
            <label className="font-semibold">Ingredients:</label>
            {ingredients.map((ing, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={ing}
                  onChange={(e) => updateArrayValue(setIngredients, i, e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                  placeholder={`Ingredient ${i + 1}`}
                />
                {i > 0 && (
                  <button
                    onClick={() => removeField(setIngredients, i)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addField(setIngredients)}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-4">
            <label className="font-semibold">Instructions:</label>
            {instructions.map((step, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <textarea
                  rows={2}
                  value={step}
                  onChange={(e) => updateArrayValue(setInstructions, i, e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                  placeholder={`Step ${i + 1}`}
                />
                {i > 0 && (
                  <button
                    onClick={() => removeField(setInstructions, i)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addField(setInstructions)}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            >
              + Add Step
            </button>
          </div>

          {/* Tags */}
          <div className="mt-4">
            <label className="font-semibold">Tags:</label>
            {tags.map((tag, i) => (
              <div key={i} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateArrayValue(setTags, i, e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2"
                  placeholder={`Tag ${i + 1}`}
                />
                {i > 0 && (
                  <button
                    onClick={() => removeField(setTags, i)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addField(setTags)}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            >
              + Add Tag
            </button>
          </div>

          {/* Public checkbox */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="w-4 h-4"
            />
            <label>Make recipe public</label>
          </div>

          {/* Image */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative mt-4 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center overflow-hidden hover:border-orange-400 transition"
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageFile(null);
                    setImagePreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-red-700"
                >
                  &times;
                </button>
              </>
            ) : (
              <p className="text-gray-400">Click to upload image</p>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-6 px-4 py-2 bg-gradient-to-r from-[#B86958] to-[#FFAAA5] text-white font-semibold rounded-lg hover:bg-orange-700 transition"
          >
            {recipeId ? "Update Recipe" : "Save Recipe"}
          </button>

          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
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

export default CreateOrEditRecipe;
