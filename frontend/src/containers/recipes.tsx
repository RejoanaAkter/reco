"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FeaturedRecipeCard } from "@/components/feature-card";
import useCuisines from "@/hook/useCuisines";
import useCategories from "@/hook/useCategories";
import { GlobalLoader } from "@/loader/globalLoader";
import { GlobalDropdown } from "../components/globalDropDown";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoMdRestaurant } from "react-icons/io";
import AnimatedBorder from "@/components/animatedTitle";
import AnimatedGrid from "@/components/animatedGrid";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Recipe {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  cuisine?: string;
  prepTime?: number;
  cookTime?: number;
  createdAt?: string;
}

export default function RecipesScreen() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ⏱️ New cooking + prep time filters
  const [prepTime, setPrepTime] = useState(120);
  const [cookTime, setCookTime] = useState(180);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const { cuisines, loading: cuiLoading } = useCuisines();
  const { categories, loading: catLoading } = useCategories();

  const fetchRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();

      if (selectedCategoryId) params.append("category", selectedCategoryId);
      if (selectedCuisine) params.append("cuisine", selectedCuisine);
      if (searchTerm.trim()) params.append("name", searchTerm.trim());
      params.append("page", page.toString());
      params.append("limit", "12");
      params.append("sort", sortOrder);

      const url = `${API_BASE}/recipes/recipes?${params.toString()}`;
      const res = await fetch(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch recipes");

      const recipesArray = Array.isArray(data.recipes) ? data.recipes : [];

      // Sort and filter by time
      const sortedRecipes = recipesArray.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return sortOrder === "desc"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

      const filtered = sortedRecipes.filter((r) => {
        const withinPrep =
          !r.prepTime || (r.prepTime && r.prepTime <= prepTime);
        const withinCook =
          !r.cookTime || (r.cookTime && r.cookTime <= cookTime);
        return withinPrep && withinCook;
      });

      setRecipes(filtered);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setRecipes([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [
    selectedCategoryId,
    selectedCuisine,
    searchTerm,
    prepTime,
    cookTime,
    page,
    sortOrder,
  ]);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedCategoryId("");
    setSelectedCuisine("");
    setSearchTerm("");
    setPrepTime(120);
    setCookTime(180);
    setPage(1);
  };

  const hasActiveFilters =
    selectedCategoryId ||
    selectedCuisine ||
    searchTerm ||
    prepTime !== 120 ||
    cookTime !== 180;

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white shadow rounded p-6 border border-gray-100 backdrop-blur-sm bg-opacity-95 space-y-6">
          <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
            <IoMdRestaurant className="text-amber-700" /> Recipes
          </h2>
          <AnimatedBorder />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category */}
            <div>
              <label className="block font-semibold text-gray-800 text-[13px] mb-1">
                Category
              </label>
              <GlobalDropdown
                label="Category"
                items={categories}
                selected={selectedCategory}
                setSelectedItem={(cat) => {
                  setSelectedCategory(cat);
                  setSelectedCategoryId(cat?._id);
                }}
                placeholder="Select Category"
                isCategory
              />
            </div>

            {/* Cuisine */}
            <div>
              <label className="block font-semibold text-gray-800 text-[13px] mb-1">
                Cuisine
              </label>
              <GlobalDropdown
                label="Cuisine"
                items={cuisines}
                selected={cuisines.find((c) => c._id === selectedCuisine)}
                setSelectedItem={(c) => setSelectedCuisine(c?._id || "")}
                placeholder="Select Cuisine"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block font-semibold text-gray-800 text-[13px] mb-1">
                Sort By
              </label>
              <GlobalDropdown
                label="Sort"
                items={[
                  { label: "Newest First", value: "desc" },
                  { label: "Oldest First", value: "asc" },
                ]}
                selected={{
                  label: sortOrder === "desc" ? "Newest First" : "Oldest First",
                }}
                setSelectedItem={(s) => setSortOrder(s.value)}
                placeholder="Sort"
              />
            </div>
          </div>

          {/* === Second Row: Time Sliders & Create Button === */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Prep Time */}
            <div className="flex-1">
              <label className="block font-semibold text-gray-800 text-[13px]">
                Prep Time ≤ {prepTime} min
              </label>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full h-1.5 bg-gradient-to-r from-amber-200 to-amber-400 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {/* Cook Time */}
            <div className="flex-1">
              <label className="block text-[13px] font-semibold text-gray-800">
                Cook Time ≤ {cookTime} min
              </label>
              <input
                type="range"
                min="5"
                max="240"
                step="5"
                value={cookTime}
                onChange={(e) => setCookTime(Number(e.target.value))}
                className="w-full h-1.5 bg-gradient-to-r from-orange-200 to-orange-400 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {/* Create Button */}
            <div className="w-full lg:w-auto mt-2 lg:mt-6">
              <button
                onClick={() => router.push("/createRecipe")}
                className="w-full border border-amber-600 text-amber-700 hover:text-white cursor-pointer px-4 py-1 rounded transition-all duration-300 flex items-center gap-3 justify-center bg-white hover:bg-amber-700 shadow hover:shadow-xl text-sm"
              >
                + Create Recipe
              </button>
            </div>
          </div>

          {/* === Search Bar === */}
          <div className="flex justify-start">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => !searchTerm && setIsSearchExpanded(false)}
              placeholder={
                isSearchExpanded || searchTerm
                  ? "Search recipes by name..."
                  : "Search..."
              }
              className={`
      transition-all duration-500 ease-in-out
      bg-white border border-gray-200 rounded px-4 py-2 text-gray-700
      focus:ring-1 focus:ring-amber-500 focus:border-transparent
      placeholder-gray-400 hover:border-gray-300 shadow-sm
      ${isSearchExpanded ? "w-full sm:w-[500px]" : "w-40 sm:w-56"}
    `}
            />
          </div>

          {/* === Active Filter Badges === */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 items-center">
              {selectedCategory && (
                <span className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full">
                  {selectedCategory.name}
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedCategoryId("");
                    }}
                    className="ml-1 text-xs hover:text-amber-900"
                  >
                    ✕
                  </button>
                </span>
              )}

              {selectedCuisine && (
                <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                  {cuisines.find((c) => c._id === selectedCuisine)?.name}
                  <button
                    onClick={() => setSelectedCuisine("")}
                    className="ml-1 text-xs hover:text-blue-900"
                  >
                    ✕
                  </button>
                </span>
              )}

              {searchTerm && (
                <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 text-xs hover:text-emerald-900"
                  >
                    ✕
                  </button>
                </span>
              )}

              {prepTime !== 120 && (
                <span className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-amber-700 rounded-full">
                  Prep ≤ {prepTime}min
                  <button
                    onClick={() => setPrepTime(120)}
                    className="ml-1 text-xs hover:text-purple-900"
                  >
                    ✕
                  </button>
                </span>
              )}

              {cookTime !== 180 && (
                <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-full">
                  Cook ≤ {cookTime}min
                  <button
                    onClick={() => setCookTime(180)}
                    className="ml-1 text-xs hover:text-orange-900"
                  >
                    ✕
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-gray-700 ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {loading ? (
          // Wrap loader in a full-width flex container
          <div className="col-span-full flex justify-center items-center py-16">
            <GlobalLoader />
          </div>
        ) : error ? (
          <div className="text-red-600 py-16 col-span-full">{error}</div>
        ) : recipes.length === 0 ? (
          <div className="text-gray-500 py-16 col-span-full">
            No recipes found
          </div>
        ) : (
          recipes.map((r) => (
            <div
              key={r._id}
              className="cursor-pointer"
            >
              <FeaturedRecipeCard item={r} />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-6">
        {/* Previous Button */}
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm font-medium">Prev</span>
        </button>

        {/* Page Info */}
        <span className="text-sm font-medium text-gray-700">
          Page <span className="text-indigo-600">{page}</span> of {totalPages}
        </span>

        {/* Next Button */}
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white border border-gray-300 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span className="hidden sm:inline text-sm font-medium">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
