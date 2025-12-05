import React from 'react';
import { 
  FaUtensils,
  FaHeart,
  FaInstagram,
  FaTwitter,
  FaArrowUp
} from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 p-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="flex flex-col items-center space-y-8 mb-4">
          
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2 rounded-lg">
              <FaUtensils className="text-xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 font-serif italic">Cookly</h2>
          </div>
          
          {/* Tagline */}
          <p className="text-center text-gray-500 max-w-md">
            Simple recipes for everyday cooking. No complicated ingredients, no fuss.
          </p>
          
          {/* Social & Links */}
          <div className="flex items-center space-x-8">
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
            </div>
            
            <div className="h-6 w-px bg-gray-200"></div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-teal-600 transition-colors">Recipes</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Meal Prep</a>
              <a href="#" className="hover:text-teal-600 transition-colors">About</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-5 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          <div className="text-sm text-gray-400">
            <span>&copy; {new Date().getFullYear()} RecipeBox</span>
            <span className="mx-2">•</span>
            <span>All recipes tested in real kitchens</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
              Contact
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-1 text-gray-400 hover:text-teal-600 transition-colors"
            >
              <span>Top</span>
              <FaArrowUp className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

