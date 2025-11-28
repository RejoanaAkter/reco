'use client';
import getImageUrl from '@/settings/utils';
import React, { useEffect, useState } from 'react';

export default function RecipeDetailsModal({ recipeId, onClose }) {
    
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/recipes/recipe/${recipeId}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [recipeId]);

  return (
   <div className="fixed inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[80vh] overflow-y-auto relative">
    <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
      ×
    </button>
    {loading ? (
      <p className="text-center">Loading...</p>
    ) : recipe ? (
      <>
        <img src={getImageUrl(recipe.imageUrl)} alt={recipe.title} className="w-full h-48 object-cover rounded" />
        <h2 className="mt-4 text-xl font-bold">{recipe.title}</h2>
        <p className="mt-2 text-gray-600">{recipe.description}</p>

        <h4 className="mt-4 font-semibold">Ingredients:</h4>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>

        <h4 className="mt-4 font-semibold">Instructions:</h4>
        <ol className="list-decimal list-inside">
          {recipe.instructions.map((i, idx) => <li key={idx}>{i}</li>)}
        </ol>

        <h4 className="mt-4 font-semibold">Tags:</h4>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.filter(Boolean).map((t, idx) => (
            <span key={idx} className="bg-blue-200 px-2 py-1 rounded-full text-xs">{t}</span>
          ))}
        </div>
      </>
    ) : (
      <p className="text-center text-red-500">Failed to load recipe.</p>
    )}
  </div>
</div>

  );
}
