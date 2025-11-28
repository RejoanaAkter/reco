"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  Clock,
  Users,
  Star,
  ChefHat,
  Globe,
  Lock,
  Heart,
  Timer,
  Tag,
  BookOpen,
  Utensils,
  Folder,
  MapPin,
} from "lucide-react";

import getImageUrl from "@/settings/utils";
import RecipeActions from "@/components/recipeActions";
import useRecipeDetail from "@/hook/useRecipeDetail";
import { RecipeTimer } from "./recipeTimer";
import { RiAccountBoxFill } from "react-icons/ri";
import SmallTitle from "@/utils/smallTitle";
import { GlobalLoader } from "@/components/globalLoader";

export default function RecipeDetail() {
  const { id: recipeId } = useParams();
  const { recipe, setRecipe, loading, error } = useRecipeDetail(recipeId);
  ;
  if (loading) return <GlobalLoader />;
  if (error) return <ErrorMessage error={error} />;
  if (!recipe) return <NotFoundMessage />;

  // Calculate average rating
  const avgRating = recipe.ratings?.length
    ? (
        recipe.ratings.reduce((sum: number, r: any) => sum + r.value, 0) /
        recipe.ratings.length
      ).toFixed(1)
    : "0";

  // Group comments and ratings by user
  const usersMap = new Map<
    string,
    { user: any; comments: string[]; rating: number | null }
  >();

  recipe.ratings?.forEach((r: any) => {
    if (!r.user) return;
    const userId = r.user._id || r.user;
    if (!usersMap.has(userId)) {
      usersMap.set(userId, { user: r.user, rating: r.value, comments: [] });
    } else {
      usersMap.get(userId)!.rating = r.value;
    }
  });

  recipe.comments?.forEach((c: any) => {
    if (!c.user) return;
    const userId = c.user._id || c.user;
    if (!usersMap.has(userId)) {
      usersMap.set(userId, { user: c.user, rating: null, comments: [c.text] });
    } else {
      usersMap.get(userId)!.comments.push(c.text);
    }
  });

  const userInteractions = Array.from(usersMap.values());

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={14}
        className={`
          ${
            index < Math.floor(rating)
              ? "fill-amber-700 text-amber-700"
              : "text-gray-300"
          }
        `}
      />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Big Image on Top */}
      <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-sm mb-6">
        <img
          src={getImageUrl(recipe.imageUrl)}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="text-start space-y-6">
            <div>
              <h1 className="text-xl font-semibold text-amber-800 text-center font-serif italic">
                {recipe.title}
              </h1>
              <p className="text-gray-800 leading-relaxed max-w-2xl mx-auto text-sm mt-2">
                {recipe.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mx-auto">
              {/* Author */}

              <div className="h-16 p-2 rounded shadow border-l-2 border-amber-600 group hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-6 py-1 rounded-lg mx-auto">
                  {/* Image instead of Icon */}
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded border">
                    <RiAccountBoxFill size={18} className="text-amber-700" />
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-gray-800">Author</p>
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {recipe.user?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-16 p-2 rounded shadow border-l-2 border-amber-600 group hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-6 py-1 rounded-lg mx-auto">
                  {/* Image instead of Icon */}
                  <div className="flex items-center justify-center w-16 h-10 bg-gray-50 rounded border overflow-hidden">
                    <img
                      src={getImageUrl(recipe.imageUrl) || "/placeholder.png"}
                      alt="Category"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-start">
                    <p className="text-xs text-gray-800">Category</p>
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {recipe.category?.name || "General"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-20 p-3 rounded shadow border-l-2 border-amber-600 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3 h-full">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded border">
                    <MapPin size={18} className="text-amber-700" />
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-gray-800">Cuisine</p>
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {recipe.cuisine?.name || "Global"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
              <div className="h-20 p-3 rounded shadow border-l-2 border-amber-600 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3 h-full">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded border">
                    <Heart size={18} className="text-amber-700" />
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-gray-800">Favorites</p>
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {recipe.favorites?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="h-20 p-3 rounded shadow border-l-2 border-amber-600 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3 h-full">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded border">
                    {recipe.isPublic ? (
                      <Globe size={18} className="text-amber-700" />
                    ) : (
                      <Lock size={18} className="text-amber-700" />
                    )}
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-gray-800">Status</p>
                    <p className="text-sm font-semibold text-gray-700 truncate">
                      {recipe.isPublic ? "Public" : "Private"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prep & Cooking Time */}
              <div className="h-20 p-3 rounded shadow border-l-2 border-amber-600 hover:border-gray-300 transition-colors">
                <div className="grid grid-cols-2 h-full gap-3">
                  {/* Prep Time */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded border">
                      <Clock size={18} className="text-amber-700" />
                    </div>
                    <div className="text-start">
                      <p className="text-xs text-gray-800">Prep</p>
                      <p className="text-sm font-semibold text-gray-700 truncate">
                        {recipe.prepTime} min
                      </p>
                    </div>
                  </div>

                  {/* Cooking Time */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded border">
                      <Clock size={18} className="text-amber-700" />
                    </div>
                    <div className="text-start">
                      <p className="text-xs text-gray-800">Cook</p>
                      <p className="text-sm font-semibold text-gray-700 truncate">
                        {recipe.cookingTime} min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="grid md:grid-cols-2 gap-4 mx-auto">
          {recipe.tags?.length > 0 && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-50 border rounded flex items-center justify-center">
                  <Tag size={16} className="text-amber-800" />
                </div>
                <h3 className="text-md font-semibold text-gray-900">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.filter(Boolean).map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-50 text-gray-800 px-3 py-1 rounded text-xs font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border-l-2 border-amber-600 p-4 rounded shadow w-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Average Rating
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {renderStars(Number(avgRating))}
                  </div>
                  <span className="text-xl font-semibold text-amber-700">
                    {avgRating}/5
                  </span>
                </div>
                <p className="text-xs text-amber-700 mt-1">
                  {recipe.ratings?.length || 0} review
                  {recipe.ratings?.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="w-10 h-10 border bg-amber-50 rounded-full flex items-center justify-center">
                <Star size={18} className="text-amber-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients & Instructions */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Ingredients */}
          <div className="p-6 border-r-0 md:border-r border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border bg-gray-50 rounded flex items-center justify-center">
                <Utensils size={16} className="text-amber-700" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Ingredients
              </h2>
            </div>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-sm text-gray-700 p-2 rounded-lg hover: transition-colors"
                >
                  <div className="w-1.5 h-1.5 bg-amber-700 rounded-full flex-shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-amber-50 border rounded flex items-center justify-center">
                <BookOpen size={16} className="text-amber-700" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Instructions
              </h2>
            </div>
            <ol className="space-y-3">
              {recipe.instructions.map((inst, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="w-5 h-5 bg-gray-50 border text-amber-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed pt-0.5">
                    {inst}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Timer Section - Amber Accent */}
        <div className="flex justify-center ">
          <div className="bg-emerald-50 rounded p-4 border border-amber-200 w-4/5">
            <RecipeTimer />
          </div>
        </div>

        {/* Recipe Actions */}
        <div className="p-6 border-b border-gray-200">
          <RecipeActions
            recipe={recipe}
            onUpdate={(updated) => setRecipe(updated)}
          />
        </div>

        {/* User Reviews */}
        {userInteractions?.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <SmallTitle
              title="User Reviews"
              titleSize="text-md"
              icon={<Star size={16} className="text-amber-700" />}
            />

            <div className="space-y-4 mt-4">
              {userInteractions?.map((u, idx) => (
                <div
                  key={idx}
                  className="p-4  rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 border rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                        {u.user?.name?.charAt(0)?.toUpperCase() || "G"}
                      </div>
                      <div>
                        <p className="text-md font-semibold text-gray-800">
                          {u.user?.name || "Guest"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {u.comments.length} comment
                          {u.comments.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    {u.rating !== null && (
                      <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                        <div className="flex items-center gap-1">
                          {renderStars(u.rating)}
                        </div>
                        <span className="text-sm font-semibold text-amber-700">
                          {u.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  {u.comments.length > 0 && (
                    <div className="space-y-2">
                      {u.comments.map((c, commentIdx) => (
                        <div
                          key={commentIdx}
                          className="flex gap-2 text-sm p-3 bg-white rounded border border-gray-200"
                        >
                          <span className="text-amber-600">•</span>
                          <p className="text-gray-700">{c}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// Error Message Component
function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">❌</span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

// Not Found Message Component
function NotFoundMessage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🔍</span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Recipe Not Found
      </h2>
      <p className="text-gray-600 mb-4">
        The recipe you're looking for doesn't exist.
      </p>
      <button
        onClick={() => window.history.back()}
        className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
      >
        Go Back
      </button>
    </div>
  );
}
