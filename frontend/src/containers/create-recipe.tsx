'use client';

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import CategoryDropdown from "@/components/category-dropDown";
import useCuisines from "@/hook/useCuisines";
import useRecipeDetail from "@/hook/useRecipeDetail";
import CategoryCreateModal from "@/components/create-category";
import { GlobalDropdown } from "./globalDropDown";
import useCategories from "@/hook/useCategories";


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const CreateOrEditRecipe = () => {
  const { id: recipeId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { recipe, loading: recipeLoading, error: recipeError } = useRecipeDetail(recipeId || null);
  const { cuisines, loading: cuisinesLoading, addCuisine } = useCuisines();
  const { categories, loading: categoriesLoading } = useCategories();
  // Recipe state
  const [category, setCategory] = useState<any>(null);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([""]);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [customCuisine, setCustomCuisine] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Category modal state
  const [showCategoryCreate, setShowCategoryCreate] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Populate recipe data if editing
useEffect(() => {
  if (recipe) {
    setTitle(recipe.title || "");
    setDescription(recipe.description || "");
    setPrepTime(recipe.prepTime || "");
    setIsPublic(!!recipe.isPublic);
    setCategory(recipe.category || null);
    setCategoryId(recipe.category?._id || "");
    setIngredients(recipe.ingredients?.length ? recipe.ingredients : [""]);
    setInstructions(recipe.instructions?.length ? recipe.instructions : [""]);
    setTags(recipe.tags?.length ? recipe.tags : [""]);
    setSelectedCuisine(recipe.cuisine?._id || null); // ✅ fix here
    if (recipe.imageUrl) {
      const fullUrl = recipe.imageUrl.startsWith("http")
        ? recipe.imageUrl
        : `${API_BASE}${recipe.imageUrl}`;
      setImagePreview(fullUrl);
    }
  }
}, [recipe]);


  // File change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Only image files are allowed.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Dynamic array helpers
  const updateArrayValue = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) =>
    setter(prev => prev.map((item, i) => (i === index ? value : item)));
  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => setter(prev => [...prev, ""]);
  const removeField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) =>
    setter(prev => prev.filter((_, i) => i !== index));

  // Save or update recipe
  const handleSave = async () => {
    setMessage("");
    if (!user?.id || !categoryId || !title) {
      setMessage("User ID, Category, and Title are required.");
      return;
    }

    try {
      let cuisineIdToUse: string | null = selectedCuisine || null;

      // Create new cuisine if "other" selected
      if (selectedCuisine === "other" && customCuisine.trim()) {
        const newCuisine = await addCuisine(customCuisine.trim());
        if (newCuisine?._id) {
          cuisineIdToUse = newCuisine._id;
          setSelectedCuisine(newCuisine._id);
          setCustomCuisine("");
        }
      }

      const formData = new FormData();
      formData.append("user", user.id);
      formData.append("category", categoryId);
      formData.append("title", title);
      formData.append("description", description);
      if (cuisineIdToUse) formData.append("cuisine", cuisineIdToUse);
      formData.append("prepTime", prepTime || "0");
      formData.append("isPublic", String(isPublic));
      formData.append("tags", JSON.stringify(tags.filter(t => t.trim())));
      formData.append("ingredients", JSON.stringify(ingredients.filter(i => i.trim())));
      formData.append("instructions", JSON.stringify(instructions.filter(i => i.trim())));
      if (imageFile) formData.append("image", imageFile);

      const method = recipeId ? "PUT" : "POST";
      const url = recipeId
        ? `${API_BASE}/recipes/update/recipe/${recipeId}`
        : `${API_BASE}/recipes/recipe`;

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save recipe");

      setMessage(recipeId ? "✅ Recipe updated successfully!" : "✅ Recipe created successfully!");
      // Optional: redirect after save
      router.push("/recipes");
    } catch (err: any) {
      setMessage(err.message || "Error saving recipe.");
    }
  };

  if (recipeError) return <p className="text-center py-10 text-red-600">{recipeError}</p>;

  return (
    <section className="relative bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1705056547423-de4ef0f85bf7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0')" }}>
      <div className="py-10 flex justify-center">
        <div className="w-3/5 p-8 bg-white/95 rounded-xl shadow-lg text-gray-700 border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-orange-700 text-center">
            {recipeId ? "✏️ Edit Recipe" : "🍲 Create a Recipe"}
          </h2>

          {/* Category + Add */}
          <div className="flex items-center gap-2 mb-4">
             <GlobalDropdown
              label="Category"
              items={categories}
              selected={category}
              setSelectedItem={(cat:any) => {
                setCategory(cat);
                setCategoryId(cat?._id || "");
              }}
              placeholder="Select Category"
              isCategory
            />
            <button
              type="button"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={() => setShowCategoryCreate(true)}
            >
              + Add
            </button>
          </div>

          {/* Recipe Fields */}
          <input type="text" className="w-full mt-4 border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Recipe title" />
          <textarea rows={3} className="w-full mt-4 border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />

          {/* Cuisine & PrepTime */}
          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <label className="font-semibold">Cuisine:</label>
              <select
                value={selectedCuisine || ""}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              >
                <option value="">Select Cuisine</option>
                {!cuisinesLoading && cuisines.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
                <option value="other">Other (Add New)</option>
              </select>
              {selectedCuisine === "other" && (
                <input type="text" className="w-full border rounded px-3 py-2 mt-2" value={customCuisine} onChange={(e) => setCustomCuisine(e.target.value)} placeholder="Enter your own cuisine" />
              )}
            </div>
            <input type="number" className="w-1/2 border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="Prep time (minutes)" />
          </div>

          {/* Ingredients */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input type="text" className="flex-1 border rounded px-3 py-2" value={ing} onChange={(e) => updateArrayValue(setIngredients, idx, e.target.value)} placeholder={`Ingredient ${idx + 1}`} />
                <button type="button" onClick={() => removeField(setIngredients, idx)} className="bg-red-500 text-white px-2 rounded">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => addField(setIngredients)} className="text-sm text-orange-600">+ Add Ingredient</button>
          </div>

          {/* Instructions */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Instructions</h3>
            {instructions.map((ins, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <textarea rows={2} className="flex-1 border rounded px-3 py-2" value={ins} onChange={(e) => updateArrayValue(setInstructions, idx, e.target.value)} placeholder={`Step ${idx + 1}`} />
                <button type="button" onClick={() => removeField(setInstructions, idx)} className="bg-red-500 text-white px-2 rounded">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => addField(setInstructions)} className="text-sm text-orange-600">+ Add Step</button>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Tags</h3>
            {tags.map((tag, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input type="text" className="flex-1 border rounded px-3 py-2" value={tag} onChange={(e) => updateArrayValue(setTags, idx, e.target.value)} placeholder={`Tag ${idx + 1}`} />
                <button type="button" onClick={() => removeField(setTags, idx)} className="bg-red-500 text-white px-2 rounded">✕</button>
              </div>
            ))}
            <button type="button" onClick={() => addField(setTags)} className="text-sm text-orange-600">+ Add Tag</button>
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Recipe Image</h3>
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2 border" />}
            <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} ref={fileInputRef} />
          </div>

          {/* Public toggle */}
          <div className="mt-6 flex items-center gap-2">
            <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            <label>Make this recipe public</label>
          </div>

          <button onClick={handleSave} className="mt-6 px-4 py-2 bg-gradient-to-r from-[#B86958] to-[#FFAAA5] text-white font-semibold rounded-lg hover:bg-orange-700 transition">
            {recipeId ? "Update Recipe" : "Save Recipe"}
          </button>

          {message && <p className={`mt-4 text-center font-medium ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

          {/* Category Create Modal */}
          {showCategoryCreate && (
            <CategoryCreateModal
              setShowModal={setShowCategoryCreate}
              onCategoryCreated={(newCategory:any) => {
                setCategory(newCategory);
                setCategoryId(newCategory._id);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CreateOrEditRecipe;
