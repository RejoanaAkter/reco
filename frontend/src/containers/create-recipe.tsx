"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/settings/AuthContext";
import useCuisines from "@/hook/useCuisines";
import useRecipeDetail from "@/hook/useRecipeDetail";
import CategoryCreateModal from "@/components/create-category";
import { GlobalDropdown } from "../components/globalDropDown";
import useCategories from "@/hook/useCategories";
import { IoMdRestaurant } from "react-icons/io";
import AnimatedBorder from "@/components/animatedTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE } from "@/config";
import { Routes } from "@/config/routes";

const CreateOrEditRecipe = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = useParams();
  const recipeId = Array.isArray(id) ? id[0] : id || "";
  const {
    recipe,
    loading: recipeLoading,
    error: recipeError,
  } = useRecipeDetail(recipeId);
  const { cuisines, loading: cuisinesLoading, addCuisine } = useCuisines();
  const { categories, loading: categoriesLoading } = useCategories();
  const [isLoading, setIsLoading] = useState(false);
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
  const [cookingTime, setCookingTime] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [showCategoryCreate, setShowCategoryCreate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Populate recipe data if editing
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || "");
      setDescription(recipe.description || "");
      setPrepTime(recipe.prepTime || "");
      setCookingTime(recipe.cookingTime || "");
      setIsPublic(!!recipe.isPublic);
      setCategory(recipe.category || null);
      setCategoryId(recipe.category?._id || "");
      setIngredients(recipe.ingredients?.length ? recipe.ingredients : [""]);
      setInstructions(recipe.instructions?.length ? recipe.instructions : [""]);
      setTags(recipe.tags?.length ? recipe.tags : [""]);
      setSelectedCuisine(recipe.cuisine?._id || null);
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
      toast.error("Only image files are allowed."); // <- toaster
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Dynamic array helpers
  const updateArrayValue = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter((prev) => [...prev, ""]);
  const removeField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => setter((prev) => prev.filter((_, i) => i !== index));

  // Save or update recipe
  const handleSave = async () => {
    if (!isFormValid || isLoading) return;

    if (!user?.id || !categoryId || !title) {
      toast.error("User ID, Category, and Title are required."); // <- toaster
      return;
    }

    setIsLoading(true);

    try {
      let cuisineIdToUse: string | null = selectedCuisine || null;

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
      formData.append("cookingTime", cookingTime || "0");
      formData.append("isPublic", String(isPublic));
      formData.append("tags", JSON.stringify(tags.filter((t) => t.trim())));
      formData.append(
        "ingredients",
        JSON.stringify(ingredients.filter((i) => i.trim()))
      );
      formData.append(
        "instructions",
        JSON.stringify(instructions.filter((i) => i.trim()))
      );
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

      toast.success(
        recipeId
          ? "Recipe updated successfully!"
          : "Recipe created successfully!"
      ); // <- toaster
      router.push(Routes.allRecipes);
    } catch (err: any) {
      toast.error(err.message || "Error saving recipe."); // <- toaster
    } finally {
      setIsLoading(false); // END LOADING
    }
  };

  if (recipeError)
    return <p className="text-center py-10 text-red-600">{recipeError}</p>;

  const isFormValid =
    title.trim() &&
    categoryId.trim() &&
    description.trim() &&
    description.length <= 300 &&
    prepTime &&
    cookingTime &&
    ingredients.some((i) => i.trim()) &&
    instructions.some((i) => i.trim()) &&
    (imageFile || recipe?.imageUrl);

  return (
 <section
  className="relative bg-fixed bg-center bg-cover min-h-[80vh] flex items-center justify-center px-4 sm:px-6"
  style={{ backgroundImage: "url('/recipeCover.png')" }}
>
  <ToastContainer position="top-right" autoClose={3000} />

  <div className="absolute inset-0 bg-white/40"></div>

  <div className="w-full flex justify-center">
    <div
      className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-xl shadow-lg 
      text-gray-700 border border-gray-200 p-4 sm:p-6 lg:p-8 mt-4"
    >
      <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
        <IoMdRestaurant className="text-amber-700" />
        {recipeId ? "Edit Recipe" : " Create a Recipe"}
      </h2>

      <AnimatedBorder />

      {/* Title */}
      <div className="mt-4">
        <label className="text-gray-800 font-semibold text-[13px]">Title *</label>
        <input
          required
          type="text"
          className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none 
          focus:ring-1 focus:ring-amber-200 focus:border-amber-300 text-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="mt-2">
        <label className="text-gray-800 font-semibold text-[13px]">Category *</label>

        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full mt-1">
          <div className="w-full sm:w-5/6">
            <GlobalDropdown
              label="Category"
              items={categories}
              selected={category}
              setSelectedItem={(cat) => {
                setCategory(cat);
                setCategoryId(cat?._id || "");
              }}
              placeholder="Select Category"
              isCategory
            />
          </div>

          <div className="w-full sm:w-1/6">
            <button
              type="button"
              onClick={() => setShowCategoryCreate(true)}
              className="text-amber-700 hover:text-amber-500 text-sm"
            >
              + Add
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-2">
        <label className="text-gray-800 font-semibold text-[13px]">
          Description *
        </label>
        <textarea
          rows={3}
          className="w-full mt-1 border rounded px-3 py-2 focus:outline-none 
          focus:ring-1 focus:ring-amber-200 focus:border-amber-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          {description?.length}/300 characters
        </p>
      </div>

      {/* Cuisine / Time */}
      <div className="flex flex-col sm:flex-row gap-4 mt-1">
        <div className="w-full sm:w-1/3">
          <label className="text-gray-800 font-semibold text-[13px]">Cuisine</label>
          <select
            value={selectedCuisine || ""}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            <option value="">Select Cuisine</option>
            {!cuisinesLoading &&
              cuisines.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            <option value="other">Other (Add New)</option>
          </select>

          {selectedCuisine === "other" && (
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mt-2"
              value={customCuisine}
              onChange={(e) => setCustomCuisine(e.target.value)}
              placeholder="Enter your own cuisine"
            />
          )}
        </div>

        <div className="w-full sm:w-1/3">
          <label className="text-gray-800 font-semibold text-[13px]">
            Prep Time *
          </label>
          <input
            type="number"
            className="mt-1 h-9 border rounded px-3 focus:outline-none 
            focus:ring-1 focus:ring-amber-200 focus:border-amber-300 w-full"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="Minutes"
          />
        </div>

        <div className="w-full sm:w-1/3">
          <label className="text-gray-800 font-semibold text-[13px]">
            Cooking Time *
          </label>
          <input
            type="number"
            className="mt-1 h-9 border rounded px-3 focus:outline-none 
            focus:ring-1 focus:ring-amber-200 focus:border-amber-300 w-full"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Minutes"
          />
        </div>
      </div>

      {/* Ingredients */}
      <div className="mt-6">
        <h3 className="text-gray-800 font-semibold text-[13px]">Ingredients *</h3>

        {ingredients.map((ing, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row gap-2 sm:items-center mt-1"
          >
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2 focus:outline-none 
              focus:ring-1 focus:ring-amber-200 focus:border-amber-300"
              value={ing}
              onChange={(e) =>
                updateArrayValue(setIngredients, idx, e.target.value)
              }
              placeholder={`Ingredient ${idx + 1}`}
            />

            <button
              type="button"
              onClick={() => removeField(setIngredients, idx)}
              className="text-xs text-amber-800 hover:bg-gray-200 w-6 h-6 rounded-full"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addField(setIngredients)}
          className="text-sm text-amber-700 hover:text-amber-500 mt-1"
        >
          + Add Ingredient
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-3">
        <h3 className="text-gray-800 font-semibold text-[13px]">Instructions *</h3>

        {instructions.map((ins, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row gap-2 sm:items-center mt-1"
          >
            <textarea
              rows={2}
              className="flex-1 border rounded px-3 py-2 focus:outline-none 
              focus:ring-1 focus:ring-amber-200 focus:border-amber-300"
              value={ins}
              onChange={(e) =>
                updateArrayValue(setInstructions, idx, e.target.value)
              }
              placeholder={`Step ${idx + 1}`}
            />

            <button
              type="button"
              onClick={() => removeField(setInstructions, idx)}
              className="text-xs text-amber-800 hover:bg-gray-200 w-6 h-6 rounded-full"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addField(setInstructions)}
          className="text-sm text-amber-700 hover:text-amber-500 mt-1"
        >
          + Add Step
        </button>
      </div>

      {/* Image */}
      <div className="mt-3">
        <h3 className="text-gray-800 font-semibold text-[13px]">
          Recipe Image *
        </h3>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mb-2 border shadow-sm mt-1"
          />
        )}

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center mt-1">
          <label
            htmlFor="file-upload"
            className="cursor-pointer border border-gray-600 hover:bg-gray-100 
            text-gray-800 p-1 rounded shadow transition text-sm"
          >
            {imageFile ? "Change Image" : "Upload Image"}
          </label>

          <span className="text-gray-600 text-sm">
            {imageFile ? imageFile.name : "PNG or JPEG, max 5MB"}
          </span>
        </div>

        <input
          id="file-upload"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* Public */}
      <div className="mt-6 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <label className="text-gray-800 font-semibold text-[13px]">
          Make this recipe public
        </label>
      </div>

      {/* Actions */}
      <div className="w-full mt-4 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
        <button
          onClick={() => router.push(Routes.home)}
          className="border border-amber-600 text-amber-700 hover:text-white 
          hover:bg-amber-700 px-2 py-1 rounded transition-all duration-300 shadow text-sm"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={!isFormValid || isLoading}
          className={`px-4 py-2 rounded transition-all duration-300 flex items-center 
          justify-center text-sm font-medium shadow-md
          ${
            !isFormValid || isLoading
              ? "bg-gray-200 text-gray-600 cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
          }`}
        >
          {isLoading
            ? recipeId
              ? "Updating..."
              : "Saving..."
            : recipeId
            ? "Update Recipe"
            : "Save Recipe"}
        </button>
      </div>
    </div>
  </div>

  {showCategoryCreate && (
    <CategoryCreateModal
      setShowModal={setShowCategoryCreate}
      onCategoryCreated={(newCategory) => {
        setCategory(newCategory);
        setCategoryId(newCategory._id);
      }}
    />
  )}
</section>

  );
};

export default CreateOrEditRecipe;
