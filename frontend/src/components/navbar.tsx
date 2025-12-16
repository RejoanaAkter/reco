"use client";

import { Routes } from "@/config/routes";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/settings/AuthContext";
import { useState, useRef, useEffect } from "react";
import getImageUrl from "@/settings/utils";
import { ChevronRight, LogOut, Menu, X } from "lucide-react"; // menu icons
import Image from "next/image";

// Define a TypeScript type for user to fix user.image error
interface UserType {
  name: string;
  email: string;
  image?: string; // optional image
}

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth() as {
    user: UserType | null;
    logout: () => void;
  };
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
<header className="sticky top-0 z-50 bg-white border-b border-gray-200">
  {/* Top Bar */}
  <div className="border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
      {/* Left Section */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
        onClick={() => handleNavigate(Routes.home)}
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
        <div className="text-2xl font-light text-gray-800 mb-1 font-serif italic">
          Kitchen Cloud
        </div>
        <div className="text-[12px] text-amber-600 tracking-[0.2em]">
          COOKING FOR THE SOUL
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
              >
                <img
                  src={getImageUrl(user.image ?? "/default-avatar.png")}
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
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push(Routes.login)}
              className="border border-gray-300 px-4 py-1.5 rounded text-sm hover:bg-gray-100 transition"
            >
              Login
            </button>
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
  <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Desktop Menu */}
    <div className="hidden md:flex items-center py-4 relative">
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-8 items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.path)}
              className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                isActive
                  ? "text-amber-600"
                  : "text-gray-700 hover:text-gray-900"
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

      {/* Create Recipe */}
      <div className="ml-auto">
        <button
          onClick={() => router.push(Routes.createRecipe)}
          className="border border-amber-600 text-amber-700 hover:text-white hover:bg-amber-700 px-2 py-1 rounded transition-all duration-300 shadow text-sm"
        >
          + Create Recipe
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {mobileMenuOpen && (
      <div className="md:hidden flex flex-col gap-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => {
                handleNavigate(item.path);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.05em] px-4 py-2 text-left transition ${
                isActive
                  ? "text-amber-600 bg-gray-50 rounded"
                  : "text-gray-700 hover:bg-gray-50 rounded"
              }`}
            >
              {item.name}
            </button>
          );
        })}

        {/* Create Recipe (Mobile) */}
        <button
          onClick={() => {
            router.push(Routes.createRecipe);
            setMobileMenuOpen(false);
          }}
          className="mt-2 mx-4 border border-amber-600 text-amber-700 hover:text-white hover:bg-amber-700 px-4 py-2 rounded transition-all duration-300 shadow text-sm"
        >
          + Create Recipe
        </button>

        {/* Mobile Auth Card */}
        {user && (
          <div className="mx-4 mt-4 border rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={getImageUrl(user.image ?? "/default-avatar.png")}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 text-red-600 text-sm font-medium px-4 py-2 rounded hover:bg-red-50 transition"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        )}

        {!user && (
          <button
            onClick={() => {
              router.push(Routes.login);
              setMobileMenuOpen(false);
            }}
            className="mx-4 mt-4 border border-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-100 transition"
          >
            Login
          </button>
        )}
      </div>
    )}
  </nav>
</header>


  );
};

export default NavBar;
