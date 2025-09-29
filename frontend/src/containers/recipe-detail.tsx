'use client';

import getImageUrl from '@/settings/utils';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function RecipeDetail() {
  const { id } = useParams(); // ✅ correct key
  const recipeId = id;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/recipes/recipe/${recipeId}`) // ✅ template literal
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [recipeId]);

  return (
    <div className='bg-gray-100 text-gray-700 p-8'>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : recipe ? (
        <>
          <img
            src={getImageUrl(recipe.imageUrl)}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded"
          />
          <h2 className="mt-4 text-xl font-bold">{recipe.title}</h2>
          <p className="mt-2 text-gray-600">{recipe.description}</p>

          <h4 className="mt-4 font-semibold">Ingredients:</h4>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          <h4 className="mt-4 font-semibold">Instructions:</h4>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ol>

          <h4 className="mt-4 font-semibold">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {recipe.tags?.filter(Boolean).map((t, idx) => (
              <span key={idx} className="bg-blue-200 px-2 py-1 rounded-full text-xs">
                {t}
              </span>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-red-500">Failed to load recipe.</p>
      )}
    </div>
  );
}
