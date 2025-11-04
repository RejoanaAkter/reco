'use client';

import { Routes } from "@/config/routes";
import { useRouter, usePathname } from 'next/navigation';
import { RiHome4Fill } from "react-icons/ri";
import { BiInfoCircle } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";
import { MdOutlineNewspaper } from "react-icons/md";
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
    { name: 'Home', path: Routes.home, icon: <RiHome4Fill /> },
    { name: 'About', path: Routes.about, icon: <BiInfoCircle /> },
    { name: 'Recipes', path: Routes.recipes, icon: <GiKnifeFork /> },
    { name: 'News', path: '/news', icon: <MdOutlineNewspaper /> },
    { name: 'Categories', path: Routes.categories, icon: <MdOutlineNewspaper /> }
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
    router.push(Routes.login);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full z-50 sticky top-0 bg-[#FBF9F7] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold text-black tracking-tight flex items-center gap-1 italic">
          🍳 <span className="font-bold">Yummy</span>Recipes
        </div>

        {/* Navigation */}
        <div className="flex gap-2 sm:gap-4 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out shadow-sm
                  ${isActive
                    ? 'bg-gradient-to-r from-lime-500 to-emerald-500 text-white scale-105 shadow-md'
                    : 'bg-lime-100 text-gray-700 hover:bg-lime-100 hover:text-emerald-600 hover:scale-[1.03]'
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}

          {/* Profile dropdown */}
          {user && (
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full px-3 py-1 bg-gray-100 hover:bg-gray-200 transition"
              >
                {/* Circle avatar image */}
                <img
                  src={getImageUrl(user.image)} // fallback avatar
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-gray-600">{user.name}</span>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
