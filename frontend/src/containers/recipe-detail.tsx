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

export default function RecipeDetail() {
  const { id: recipeId } = useParams();
  const { recipe, setRecipe, loading, error } = useRecipeDetail(recipeId);
debugger
  if (loading) return <RecipeDetailSkeleton />;
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
          <div className="text-center space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {recipe.title}
              </h1>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                {recipe.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 max-w-3xl mx-auto">
              {/* Prep Time */}
              <div className=" p-3 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mb-2 mx-auto">
                  <Clock size={16} className="text-gray-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Prep Time</p>
                <p className="text-sm font-semibold text-gray-900">
                  {recipe.prepTime} min
                </p>
              </div>

              {/* Author */}
              <div className=" p-3 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mb-2 mx-auto">
                  <Users size={16} className="text-gray-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Author</p>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {recipe.user?.name || "Unknown"}
                </p>
              </div>

              {/* Cuisine */}
              <div className=" p-3 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mb-2 mx-auto">
                  <MapPin size={16} className="text-gray-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Cuisine</p>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {recipe.cuisine?.name || "Global"}
                </p>
              </div>

              {/* Category */}
              <div className=" p-3 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mb-2 mx-auto">
                  <Folder size={16} className="text-gray-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Category</p>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {recipe.category?.name || "General"}
                </p>
              </div>

              {/* Privacy Status */}
              <div className=" p-3 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mb-2 mx-auto">
                  {recipe.isPublic ? (
                    <Globe size={16} className="text-gray-600" />
                  ) : (
                    <Lock size={16} className="text-gray-600" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <p className="text-sm font-semibold text-gray-900">
                  {recipe.isPublic ? "Public" : "Private"}
                </p>
              </div>

              {/* Favorites */}
              <div className=" p-3 rounded-lg border border-gray-200 group hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg mb-2 mx-auto">
                  <Heart size={16} className="text-gray-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Favorites</p>
                <p className="text-sm font-semibold text-gray-900">
                  {recipe.favorites?.length || 0}
                </p>
              </div>
            </div>

            {/* Category & Cuisine Highlight */}
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Category Highlight */}
              {recipe.category && (
                <div className=" p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Folder size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Recipe Category
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {recipe.category.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cuisine Highlight */}
              {recipe.cuisine && (
                <div className=" p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <MapPin size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Cuisine Type
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {recipe.cuisine?.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Average Rating - Amber Accent */}
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 max-w-sm mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-amber-800 mb-2">
                    Average Rating
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {renderStars(Number(avgRating))}
                    </div>
                    <span className="text-xl font-bold text-amber-700">
                      {avgRating}/5
                    </span>
                  </div>
                  <p className="text-xs text-amber-600 mt-1">
                    {recipe.ratings?.length || 0} review
                    {recipe.ratings?.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Star size={18} className="text-amber-700" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Actions */}
        <div className="p-6 border-b border-gray-200">
          <RecipeActions
            recipe={recipe}
            onUpdate={(updated) => setRecipe(updated)}
          />
        </div>

        {/* Tags Section */}
        {recipe.tags?.length > 0 && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Tag size={16} className="text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.filter(Boolean).map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients & Instructions */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Ingredients */}
          <div className="p-6 border-r-0 md:border-r border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Utensils size={16} className="text-gray-600" />
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
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <BookOpen size={16} className="text-gray-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Instructions
              </h2>
            </div>
            <ol className="space-y-3">
              {recipe.instructions.map((inst, idx) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <span className="w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
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
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
              <Timer size={16} className="text-amber-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Cooking Timer
              </h2>
              <p className="text-sm text-gray-600">
                Set timers for perfect cooking
              </p>
            </div>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <RecipeTimer />
          </div>
        </div>

        {/* User Reviews */}
        {userInteractions?.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Star size={16} className="text-gray-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                User Reviews
              </h2>
            </div>
            <div className="space-y-4">
              {userInteractions?.map((u, idx) => (
                <div
                  key={idx}
                  className="p-4  rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                        {u.user?.name?.charAt(0)?.toUpperCase() || "G"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
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
                          <span className="text-gray-400">•</span>
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

// Skeleton Loader
function RecipeDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="h-80 md:h-96 bg-gray-200 rounded-xl animate-pulse" />
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="space-y-4 text-center">
          <div className="h-8 bg-gray-200 rounded animate-pulse mx-auto w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse mx-auto w-1/2" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
        <div className="h-16 bg-gray-200 rounded-lg animate-pulse w-80 mx-auto" />
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
