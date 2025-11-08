"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FeaturedRecipeCard } from "@/components/feature-card";
import useCuisines from "@/hook/useCuisines";
import CategoryDropdown from "@/components/category-dropDown";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Recipe {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  cuisine?: string;
  prepTime?: number;
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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc"); // newest first

  const { cuisines, loading: cuiLoading } = useCuisines();

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

      // Ensure recipes is always an array
      const recipesArray = Array.isArray(data.recipes) ? data.recipes : [];

      // Defensive frontend sort by createdAt
      const sortedRecipes = recipesArray.sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return sortOrder === "desc"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

      // Filter by prepTime
      const filtered = sortedRecipes.filter(
        (r) => !r.prepTime || r.prepTime <= prepTime
      );

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

  // Fetch on mount & when filters/pagination/sorting change
  useEffect(() => {
    fetchRecipes();
  }, [
    selectedCategoryId,
    selectedCuisine,
    searchTerm,
    prepTime,
    page,
    sortOrder,
  ]);

  const handleNavigate = (recipe: Recipe) => {
    router.push(`/recipeDetail/${recipe._id}`);
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedCategoryId("");
    setSelectedCuisine("");
    setSearchTerm("");
    setPrepTime(120);
    setPage(1);
  };

  const hasActiveFilters =
    selectedCategoryId || selectedCuisine || searchTerm || prepTime !== 120;

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8 text-gray-800">
      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-start mb-6">
          <h1 className="text-3xl font-light text-gray-900 tracking-tight font-serif italic">
            Discover Recipes
          </h1>
          <p className="text-xs text-amber-600 mt-2 tracking-[0.2em]">
            Find your perfect meal inspiration
          </p>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 border border-gray-100 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryDropdown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedCategoryId={setSelectedCategoryId}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuisine
              </label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5"
              >
                <option value="">All Cuisines</option>
                {cuiLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  cuisines.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time: ≤ {prepTime} min
              </label>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={prepTime}
                onChange={(e) => setPrepTime(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Recipe name..."
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5"
              />
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mb-6">
            {" "}
            <button
              onClick={() => router.push("/createRecipe")}
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 group ml-auto"
            >
              {" "}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />{" "}
              </svg>{" "}
              Create Recipe{" "}
            </button>{" "}
          </div>
          {hasActiveFilters && (
            <div className="flex justify-between items-center flex-wrap gap-2">
              {selectedCategoryId && (
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {selectedCategory?.name}
                </span>
              )}
              {selectedCuisine && (
                <span className="px-2 py-1 bg-gray-100 rounded">
                  {cuisines.find((c) => c._id === selectedCuisine)?.name}
                </span>
              )}
              {searchTerm && (
                <span className="px-2 py-1 bg-gray-100 rounded">
                  "{searchTerm}"
                </span>
              )}
              {prepTime !== 120 && (
                <span className="px-2 py-1 bg-gray-100 rounded">
                  Prep ≤ {prepTime}min
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

      {/* Recipes Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600">{error}</div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No recipes found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((r) => (
              <div
                key={r._id}
                onClick={() => handleNavigate(r)}
                className="cursor-pointer"
              >
                <FeaturedRecipeCard item={r} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
