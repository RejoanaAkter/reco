import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import useCategories from "../hook/useCategories";
import getImageUrl from "@/settings/utils";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const CategoryDropdown = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedCategoryId,
}) => {
  const { categories, loading, error } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const buttonRef = useRef(null);

  // Select handler
  const handleSelect = (category) => {
    setSelectedCategory(category);
    setSelectedCategoryId(category?._id);
    setIsOpen(false);
  };

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 99999,
      });
    }
  }, [isOpen]);

  // Return early if DOM not ready for portal
  const portalRoot = typeof window !== "undefined" ? document.body : null;

  return (
    <div className="mb-4 relative">
      {/* Trigger Button */}
      <div
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="border border-gray-300 px-3 py-2 cursor-pointer bg-white flex items-center justify-between rounded select-none"
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
        <IoIosArrowDown
          className={`ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown List */}
      {portalRoot &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, scaleY: 0.8, transformOrigin: "top" }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.8 }}
                transition={{ duration: 0.2 }}
                style={dropdownStyle}
                className="max-h-60 overflow-auto border border-gray-300 bg-white shadow-lg rounded-md origin-top"
              >
                {loading && <li className="px-3 py-2">Loading...</li>}
                {error && <li className="px-3 py-2 text-red-500">{error}</li>}
                {!loading &&
                  !error &&
                  categories.map((category) => (
                    <li
                      key={category._id}
                      onClick={() => handleSelect(category)}
                      className="flex items-center px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      <img
                        src={getImageUrl(category.imageUrl)}
                        alt={category.name}
                        className="w-8 h-8 object-cover rounded mr-3"
                      />
                      <span className="text-gray-800">{category.name}</span>
                    </li>
                  ))}
              </motion.ul>
            )}
          </AnimatePresence>,
          portalRoot
        )}
    </div>
  );
};

export default CategoryDropdown;
