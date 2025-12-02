

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/settings/AuthContext";
import CategoryDropdown from "@/components/category-dropDown";
import useCuisines from "@/hook/useCuisines";
import useRecipeDetail from "@/hook/useRecipeDetail";
import CategoryCreateModal from "@/components/create-category";
import { GlobalDropdown } from "../components/globalDropDown";
import useCategories from "@/hook/useCategories";
import { IoMdRestaurant } from "react-icons/io";
import AnimatedTitle from "@/components/animatedTitle";
import AnimatedBorder from "@/components/animatedTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const CreateOrEditRecipe = () => {
  const { id: recipeId } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { recipe, loading: recipeLoading, error: recipeError } = useRecipeDetail(recipeId || null);
  const { cuisines, loading: cuisinesLoading, addCuisine } = useCuisines();
  const { categories, loading: categoriesLoading } = useCategories();

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
    if (!user?.id || !categoryId || !title) {
      toast.error("User ID, Category, and Title are required."); // <- toaster
      return;
    }

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
      router.push("/recipes");
    } catch (err: any) {
      toast.error(err.message || "Error saving recipe."); // <- toaster
    }
  };

  if (recipeError)
    return <p className="text-center py-10 text-red-600">{recipeError}</p>;

  const isFormValid =
    title.trim() &&
    categoryId.trim() &&
    description.trim() &&
    prepTime &&
    cookingTime &&
    ingredients.some((i) => i.trim()) &&
    instructions.some((i) => i.trim());

  return (
    <section
      className="relative bg-fixed bg-center bg-cover min-h-[80vh] flex items-center justify-center px-6"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1705056547423-de4ef0f85bf7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0')",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} /> {/* <- Toast container */}
      <div className="absolute inset-0 bg-white/40"></div>
      <div>
        <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-sm rounded-xl shadow-lg text-gray-700 border border-gray-200 p-8 mt-4">
          {/* ... All your existing JSX stays exactly the same ... */}

          <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
            <IoMdRestaurant className="text-amber-700" />{" "}
            {recipeId ? "Edit Recipe" : " Create a Recipe"}
          </h2>
          <AnimatedBorder />

   {/* Category + Add */}
          <div className="mt-4">
            <label className="text-gray-800 font-semibold text-[13px]">
              Title
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Recipe title"
            />
          </div>

          <div className="mt-2">
            <label className="text-gray-800 font-semibold text-[13px]">
              Category
            </label>
            <div className="flex gap-2 items-center w-full mt-1">
              <div className="w-5/6">
                <GlobalDropdown
                  label="Category"
                  items={categories}
                  selected={category}
                  setSelectedItem={(cat: any) => {
                    setCategory(cat);
                    setCategoryId(cat?._id || "");
                  }}
                  placeholder="Select Category"
                  isCategory
                />
              </div>
              <div className="w-1/6">
                <button
                  type="button"
                  className="text-amber-700 hover:text-amber-500 cursor-pointer text-sm"
                  onClick={() => setShowCategoryCreate(true)}
                >
                  + Add
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Fields */}
          <div className="mt-2">
            <label className="text-gray-800 font-semibold text-[13px]">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full mt-1 border rounded px-3 py-2 focus:ring-2 focus:ring-orange-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
            />
          </div>

          {/* Cuisine & PrepTime */}
          <div className="flex gap-4 mt-1">
            <div className="w-1/3">
              <label className="text-gray-800 font-semibold text-[13px]">
                Cuisine
              </label>
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
            <div className="w-1/3">
              <label className="text-gray-800 font-semibold text-[13px]">
                Prep Time
              </label>
              <input
                type="number"
                className="mt-1 h-9 border rounded px-3 focus:ring-2 focus:ring-orange-400"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder="Prep time (minutes)"
              />
            </div>
            <div className="w-1/3">
              <label className="text-gray-800 font-semibold text-[13px]">
                Cooking Time
              </label>
              <input
                type="number"
                className="mt-1 h-9 border rounded px-3 focus:ring-2 focus:ring-orange-400"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                placeholder="Cooking time (minutes)"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="mt-6">
            <h3 className="text-gray-800 font-semibold text-[13px]">
              Ingredients
            </h3>
            {ingredients.map((ing, idx) => (
              <div key={idx} className="flex gap-2 items-center mt-1">
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2"
                  value={ing}
                  onChange={(e) =>
                    updateArrayValue(setIngredients, idx, e.target.value)
                  }
                  placeholder={`Ingredient ${idx + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeField(setIngredients, idx)}
                  className="text-xs text-amber-800 hover:bg-gray-200 w-6 h-6 cursor-pointer rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField(setIngredients)}
              className="text-sm text-amber-700 hover:text-amber-500 cursor-pointer mt-1"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-3">
            <h3 className="text-gray-800 font-semibold text-[13px]">
              Instructions
            </h3>
            {instructions.map((ins, idx) => (
              <div key={idx} className="flex gap-2 items-center mt-1">
                <textarea
                  rows={2}
                  className="flex-1 border rounded px-3 py-2"
                  value={ins}
                  onChange={(e) =>
                    updateArrayValue(setInstructions, idx, e.target.value)
                  }
                  placeholder={`Step ${idx + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeField(setInstructions, idx)}
                  className="text-xs text-amber-800 hover:bg-gray-200 w-6 h-6 cursor-pointer rounded-full "
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField(setInstructions)}
              className="text-sm text-amber-700 hover:text-amber-500 cursor-pointer mt-1"
            >
              + Add Step
            </button>
          </div>

          {/* Tags */}
          <div className="mt-3">
            <h3 className="text-gray-800 font-semibold text-[13px]">Tags</h3>
            {tags.map((tag, idx) => (
              <div key={idx} className="flex gap-2 items-center mt-1">
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2"
                  value={tag}
                  onChange={(e) =>
                    updateArrayValue(setTags, idx, e.target.value)
                  }
                  placeholder={`Tag ${idx + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeField(setTags, idx)}
                  className="text-xs text-amber-800 hover:bg-gray-200 w-6 h-6 cursor-pointer rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField(setTags)}
              className="text-sm text-amber-700 hover:text-amber-500 cursor-pointer mt-1"
            >
              + Add Tag
            </button>
          </div>

          {/* Image Upload */}
          <div className="mt-3">
            <h3 className="text-gray-800 font-semibold text-[13px]">
              Recipe Image
            </h3>

            {/* Image Preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mb-2 border shadow-sm mt-1"
              />
            )}

            {/* Custom File Upload */}
            <div className="flex items-center gap-4 mt-1">
              <label
                htmlFor="file-upload"
                className="cursor-pointer border border-gray-600 text-gray-800 p-1 rounded shadow transition text-sm"
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

          {/* Public toggle */}
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

          <div className="w-full lg:w-auto mt-2 lg:mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`px-4 py-2 rounded transition-all duration-300 flex items-center gap-2 justify-center text-sm font-medium shadow-md
      ${
        isFormValid
          ? "bg-amber-600 hover:bg-amber-700 text-white cursor-pointer"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
            >
              {recipeId ? "Update Recipe" : "Save Recipe"}
            </button>
          </div>

          {/* Category Create Modal */}
          {showCategoryCreate && (
            <CategoryCreateModal
              setShowModal={setShowCategoryCreate}
              onCategoryCreated={(newCategory: any) => {
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
