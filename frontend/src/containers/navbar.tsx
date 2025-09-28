'use client';

import { Routes } from "@/config/routes";
import { useRouter, usePathname } from 'next/navigation';
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
    { name: 'Home', path: Routes.home },
    { name: 'About', path: Routes.about },
    { name: 'Recipes', path: Routes.recipes },
    { name: 'News', path: '/news' },
    { name: 'Categories', path: Routes.categories },
  ];

  const handleNavigate = (path: string) => router.push(path);

  const handleLogout = () => {
    logout();
    router.push(Routes.login);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
     <header className="sticky top-0 z-50 bg-white shadow">
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex flex-col leading-tight">
          <span className="text-3xl font-[cursive] text-black">Yummy Recipes</span>
          <span className="text-sm text-gray-500 tracking-wide">Food & Drinks Blogger</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center text-sm tracking-wide uppercase font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className={`transition-colors duration-200 ${
                  isActive
                    ? 'text-[#D9825F]' // soft highlight
                    : 'text-gray-700 hover:text-[#D9825F]'
                }`}
              >
                {item.name}
              </button>
            );
          })}

          {/* Profile Dropdown */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 ml-4"
              >
                <img
                  src={getImageUrl(user.image)}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-md z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav></header>
  );
};

export default NavBar;
