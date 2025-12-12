"use client";
import { FaInstagram, FaTwitter, FaUtensils } from "react-icons/fa";
export const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Row */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <FaUtensils className="text-2xl text-amber-500" />
                <h1 className="text-2xl font-serif italic font-bold text-white">
                  Kitchen Cloud
                </h1>
              </div>
              <p className="text-gray-400 max-w-sm">
                Making cooking simpler, easier, and tastier every day.
              </p>
            </div>

            {/* Menu */}
            <div className="grid grid-cols-2 gap-10 text-sm">
              <div>
                <h3 className="font-semibold text-white mb-3">Explore</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-amber-500">
                      Recipes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-500">
                      Meal Prep
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-500">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-amber-500">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-500">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-amber-500">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social */}
            <div className="flex space-x-6">
              <FaInstagram className="text-2xl hover:text-pink-500 cursor-pointer" />
              <FaTwitter className="text-2xl hover:text-sky-400 cursor-pointer" />
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Kitchen Cloud — Cook with love ❤️
          </div>
        </div>
      </footer>
    </>
  );
};
