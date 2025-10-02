"use client";

import { Routes } from "@/config/routes";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useState, useRef, useEffect } from "react";
import getImageUrl from "@/settings/utils";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", path: Routes.home },
    { name: "About", path: Routes.about },
    { name: "My Recipes", path: Routes.myRecipes },
    { name: "Favorites", path: Routes.favouriteRecipes },
    { name: "Recipes", path: Routes.recipes },
    { name: "Categories", path: Routes.categories },
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
    <>
<header className="sticky top-0 z-50 bg-white shadow-lg backdrop-blur-md">
  <nav className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
    
    {/* Logo */}
    <div className="flex flex-col cursor-pointer group">
      <span className="text-xl font-[cursive] text-gray-600 transition-transform duration-500 ease-out group-hover:rotate-3 group-hover:scale-105">
        Yummy Recipes
      </span>
      <span className="text-sm text-gray-500 tracking-wide transition-opacity duration-300 group-hover:opacity-80">
        Food & Drinks Blogger
      </span>
    </div>

    {/* Navigation Links */}
    <div className="flex gap-6 items-center text-sm tracking-wide font-medium uppercase">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <button
            key={item.name}
            onClick={() => handleNavigate(item.path)}
            className={`flex items-center gap-1 cursor-pointer relative px-2 py-1 rounded-lg transition-all duration-300 ${
              isActive
                ? "text-gray-600 font-semibold bg-gray-50 shadow-md scale-105"
                : "text-gray-700 hover:text-gray-600 hover:bg-slate-50 hover:scale-105 hover:shadow-sm"
            }`}
          >
            {/* Fun emoji icons */}
            {item.name}
          </button>
        );
      })}

      {/* Profile Dropdown */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <p className="text-gray-700 text-xs">{user?.name}</p>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 ml-4 transform transition-transform duration-300 hover:scale-110 hover:rotate-3"
          >
            <img
              src={getImageUrl(user.image)}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-xl z-50 animate-fadeIn scale-95 origin-top-right transform transition-all duration-300">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-orange-50 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </nav>

  {/* Fade-in animation using Tailwind */}
  <style jsx>{`
    .animate-fadeIn {
      @apply transition-opacity duration-300 opacity-0;
    }
    .relative:hover .animate-fadeIn {
      @apply opacity-100;
    }
  `}</style>
</header>


</>
  );
};

export default NavBar;
