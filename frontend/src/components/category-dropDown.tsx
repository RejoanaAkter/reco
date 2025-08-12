import { useState } from "react";
import useCategories from "./useCategories";
import getImageUrl from "@/settings/utils";


const CategoryDropdown = ({ selectedCategory, setSelectedCategory , setSelectedCategoryId }) => {
  const { categories, loading, error } = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (category) => {
debugger
    setSelectedCategory(category);
    setSelectedCategoryId(category?._id)
    setIsOpen(false);
  };

  return (
    <div className="mb-4 relative">
      <label className="block mb-1 font-medium text-gray-700">Category:</label>

      {/* Trigger Button */}
      <div
        className="border border-gray-300 rounded px-3 py-2 cursor-pointer bg-white flex items-center justify-between"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedCategory ? (
          <div className="flex items-center">
            <img
              src={getImageUrl(selectedCategory.imageUrl)}
              alt={selectedCategory.name}
              className="w-6 h-6 object-cover rounded mr-2"
            />
            <span>{selectedCategory.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">Select Category</span>
        )}
        <svg
          className="w-4 h-4 text-gray-600 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full max-h-60 overflow-auto border border-gray-300 rounded bg-white shadow">
          {loading && <li className="px-3 py-2">Loading...</li>}
          {error && <li className="px-3 py-2 text-red-500">{error}</li>}
          {!loading &&
            !error &&
            categories.map((category) => (
              <li
                key={category._id}
                className="flex items-center px-3 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelect(category)}
              >
                <img
                  src={getImageUrl(category.imageUrl)}
                  alt={category.name}
                  className="w-8 h-8 object-cover rounded mr-3"
                />
                <span>{category.name}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
