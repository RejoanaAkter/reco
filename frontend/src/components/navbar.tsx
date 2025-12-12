"use client";

import { Routes } from "@/config/routes";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/settings/AuthContext";
import { useState, useRef, useEffect } from "react";
import getImageUrl from "@/settings/utils";
import { ChevronRight, Menu, X } from "lucide-react"; // added menu icons
import Image from "next/image";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: "Home", path: Routes.home },
    { name: "About", path: Routes.about },
    { name: "All Recipes", path: Routes.allRecipes },
    { name: "Made by Me", path: Routes.myRecipes },
    { name: "Favorites", path: Routes.favouriteRecipes },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false); // close mobile menu after navigation
  };

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Left Section */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => handleNavigate(Routes.shop)}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={70}
              height={70}
              className="object-cover rounded"
            />
          </div>

          {/* Center Section */}
          <div className="hidden md:flex flex-col items-center">
            <div className="text-3xl  font-light text-gray-800 mb-1 font-serif italic">
              Kitchen Cloud
            </div>
            <div className="text-xs md:text-sm font-semibold text-amber-600 tracking-[0.1em]">
              COOKING FOR THE SOUL
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
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

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100 transition"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center gap-8 items-center py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-1 text-xs font-semibold uppercase transition-colors duration-200 tracking-[0.1em] ${
                  isActive
                    ? "text-amber-600 font-semibold"
                    : "text-gray-600 hover:text-gray-900 rounded cursor-pointer"
                }`}
              >
                {isActive && (
                  <ChevronRight size={14} className="text-amber-600" />
                )}
                {item.name}
              </button>
            );
          })}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center gap-1 text-sm font-semibold uppercase transition-colors duration-200 tracking-[0.05em] px-4 py-2 w-full text-left ${
                    isActive
                      ? "text-amber-600 bg-gray-50 rounded"
                      : "text-gray-700 hover:bg-gray-50 rounded"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
