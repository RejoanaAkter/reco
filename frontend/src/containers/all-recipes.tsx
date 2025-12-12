"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FeaturedRecipeCard } from "@/components/feature-card";
import useCuisines from "@/hook/useCuisines";
import useCategories from "@/hook/useCategories";
import { GlobalLoader } from "@/loader/globalLoader";
import { GlobalDropdown } from "../components/globalDropDown";
import { IoMdRestaurant } from "react-icons/io";
import AnimatedBorder from "@/components/animatedTitle";
import { API_BASE } from "@/config";



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
  const [prepTime, setPrepTime] = useState(120);
  const [cookTime, setCookTime] = useState(180);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
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
 <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">

  {/* Page Title */}
  <h2 className="text-xl font-semibold mb-1 text-gray-900 text-start font-serif italic flex gap-2">
    <IoMdRestaurant className="text-amber-700" /> All Recipes
  </h2>
  <AnimatedBorder />

  {/* MAIN GRID */}
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">

    {/* LEFT SIDEBAR (Filters) */}
    <div className="lg:col-span-1 bg-white shadow border border-gray-100 rounded p-4 sm:p-6 h-fit sticky top-4 lg:top-6 space-y-6">

      {/* Create Recipe Button */}
      <button
        onClick={() => router.push("/createRecipe")}
        className="border border-amber-600 text-amber-700 hover:text-white hover:bg-amber-700 cursor-pointer px-4 py-2 rounded transition-all duration-300 shadow text-sm w-full sm:w-auto"
      >
        + Create Recipe
      </button>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="pt-2 space-y-2">
          <h4 className="text-xs font-semibold text-gray-600">
            Active Filters:
          </h4>

          <div className="flex flex-wrap gap-2">

            {selectedCategory && (
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full">
                {selectedCategory.name}
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedCategoryId("");
                  }}
                  className="ml-1 text-xs"
                >
                  ✕
                </button>
              </span>
            )}

            {selectedCuisine && (
              <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                {cuisines.find((c) => c._id === selectedCuisine)?.name}
                <button onClick={() => setSelectedCuisine("")} className="ml-1 text-xs">
                  ✕
                </button>
              </span>
            )}

            {searchTerm && (
              <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="ml-1 text-xs">
                  ✕
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

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

      {/* Prep Time */}
      <div>
        <label className="block font-semibold text-gray-800 text-[13px] mb-1">
          Prep Time ≤ {prepTime} min
        </label>
        <input
          type="range"
          min="5"
          max="180"
          step="5"
          value={prepTime}
          onChange={(e) => setPrepTime(Number(e.target.value))}
          className="w-full h-1.5 bg-amber-300 rounded-full cursor-pointer appearance-none accent-amber-600"
        />
      </div>

      {/* Cook Time */}
      <div>
        <label className="block font-semibold text-gray-800 text-[13px] mb-1">
          Cook Time ≤ {cookTime} min
        </label>
        <input
          type="range"
          min="5"
          max="240"
          step="5"
          value={cookTime}
          onChange={(e) => setCookTime(Number(e.target.value))}
          className="w-full h-1.5 bg-amber-300 rounded-full cursor-pointer appearance-none accent-amber-600"
        />
      </div>

      {/* Search Input */}
      <div>
        <label className="block font-semibold text-gray-800 text-[13px] mb-1">
          Search
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes..."
          className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 focus:ring-1 focus:ring-amber-500"
        />
      </div>
    </div>

    {/* RIGHT SIDE — RECIPE LIST */}
    <div className="lg:col-span-3 space-y-6">

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {loading ? (
          <div className="col-span-full flex justify-center py-16">
            <GlobalLoader />
          </div>
        ) : error ? (
          <div className="text-red-600 col-span-full py-16">{error}</div>
        ) : recipes.length === 0 ? (
          <div className="text-gray-500 col-span-full py-16 text-center">
            No recipes found
          </div>
        ) : (
          recipes
            ?.filter((r) => r?.isPublic)
            ?.map((r) => (
              <div key={r._id} className="cursor-pointer">
                <FeaturedRecipeCard item={r} />
              </div>
            ))
        )}

      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 text-sm"
        >
          Prev
        </button>

        <span className="text-sm font-medium text-gray-700">
          Page <span className="text-indigo-600">{page}</span> of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</div>

  );
}
