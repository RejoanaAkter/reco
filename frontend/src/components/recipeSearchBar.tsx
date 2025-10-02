"use client";

import useSearchRecipesByName from "@/hook/useSearchRecipesByName";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const RecipeSearchBar = ({ onResults }) => {
  const { results, loading, error, searchRecipes } = useSearchRecipesByName();
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    await searchRecipes(query);
    if (onResults) onResults(results); // send results back to parent
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="flex gap-2">
        {/* Input Box */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Search Icon Button */}
        <button
          onClick={handleSearch}
          className="px-3 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:text-orange-600 hover:border-orange-400 transition"
          aria-label="Search"
        >
          <FiSearch size={20} />
        </button>

        {/* Normal Search Button */}
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-3 text-gray-500">Searching...</p>}
      {error && <p className="mt-3 text-red-500">{error}</p>}
    </div>
  );
};

export default RecipeSearchBar;
