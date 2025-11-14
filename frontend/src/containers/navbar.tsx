"use client";

import { Routes } from "@/config/routes";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useState, useRef, useEffect } from "react";
import getImageUrl from "@/settings/utils";
import { ChevronRight } from "lucide-react"; // 👈 add your icon here

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", path: Routes.home },
    { name: "About", path: Routes.about },
    { name: "All Recipes", path: Routes.recipes },
    { name: "Made by Me", path: Routes.myRecipes },
    { name: "Favorites", path: Routes.favouriteRecipes },
  ];

  const handleNavigate = (path: string) => router.push(path);

  const handleLogout = () => {
    logout();
    router.push(Routes.login);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Bar with Cart (left), Logo (middle), User (right) */}
      <div className="border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left Section */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => handleNavigate(Routes.shop)}
          >
            <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">Y</span>
            </div>
          </div>

          {/* Center Section */}
          <div className="text-center flex-1">
            <div className="text-4xl font-light text-gray-800 mb-2 font-serif italic">
              Yummy
            </div>
            <div className="text-xs font-semibold text-amber-600 tracking-[0.2em]">
              COOKING FOR THE SOUL
            </div>
          </div>

          {/* Right Section - User */}
          <div className="flex items-center">
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src={getImageUrl(user.image)}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex justify-center gap-8 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-1 text-xs font-semibold uppercase transition-colors duration-200 tracking-[0.1em] ${
                  isActive
                    ? "text-amber-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900 rounded  cursor-pointer "
                }`}
              >
                {/* 👇 Icon shows only for active menu */}
                {isActive && (
                  <ChevronRight size={14} className="text-amber-600" />
                )}
                {item.name}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
