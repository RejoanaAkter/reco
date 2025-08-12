'use client'

import CategoryDropdown from "@/components/category-dropDown";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const UpdateRecipeTailwind = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recipeId = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [tags, setTags] = useState(['']);
  const [isPublic, setIsPublic] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!recipeId) return;
    fetch(`http://localhost:8000/recipes/recipe/${recipeId}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title || '');
        setDescription(data.description || '');
        setCuisine(data.cuisine || '');
        setPrepTime(data.prepTime?.toString() || '');
        setIngredients(data.ingredients || ['']);
        setInstructions(data.instructions || ['']);
        setTags(data.tags || ['']);
        setIsPublic(data.isPublic || false);
        setCategoryId(data.category?._id || '');
        if (data.imageUrl) {
          setImagePreview(data.imageUrl);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage('Failed to load recipe.');
      })
      .finally(() => setLoading(false));
  }, [recipeId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.match(/image\/(jpeg|png)/)) {
      setMessage("Only JPG or PNG images are allowed.");
      setImageFile(null);
      return;
    }
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpdate = async () => {
    setMessage('');
    if (!title || !categoryId) {
      setMessage('Title and Category are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('cuisine', cuisine);
    formData.append('prepTime', prepTime ? Number(prepTime) : 0);
    formData.append('isPublic', isPublic);
    formData.append('tags', JSON.stringify(tags));
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('instructions', JSON.stringify(instructions));
    formData.append('category', categoryId);
    if (imageFile) formData.append('image', imageFile);

    try {
      const res = await fetch(`http://localhost:8000/recipes/recipe/${recipeId}`, {
        method: 'PUT',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || 'Failed to update recipe.');
      } else {
        setMessage('Recipe updated successfully!');
        setTimeout(() => router.push(`/recipes/${recipeId}`), 1000);
      }
    } catch (err) {
      setMessage('Error updating recipe.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Update Recipe</h2>

      <div className="mb-4">
        <CategoryDropdown
          selectedCategoryId={categoryId}
          setSelectedCategoryId={setCategoryId}
        />
      </div>

      {/* Title */}
      {/* Other input fields similarly */}
      <div className="mb-4">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full ..."
        />
      </div>
      {/* Description */}
      <div className="mb-4">
        <label>Description:</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full ..."
        />
      </div>
      {/* Cuisine, PrepTime */}
      <div className="mb-4">
        <label>Cuisine:</label>
        <input
          type="text"
          value={cuisine}
          onChange={e => setCuisine(e.target.value)}
          className="w-full ..."
        />
      </div>
      <div className="mb-4">
        <label>Prep Time (min):</label>
        <input
          type="number"
          min="0"
          value={prepTime}
          onChange={e => setPrepTime(e.target.value)}
          className="w-full ..."
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label>Image:</label>
        <div
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="relative cursor-pointer border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center ..."
        >
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
              <button onClick={clearImage} className="absolute top-2 right-2 text-red-600">×</button>
            </>
          ) : (
            <p>Click to choose JPG or PNG image</p>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Public */}
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={e => setIsPublic(e.target.checked)}
          className="mr-2"
        />
        <label>Public</label>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label>Tags:</label>
        {tags.map((t, i) => (
          <input
            key={i}
            type="text"
            value={t}
            onChange={e => {
              const arr = [...tags]; arr[i] = e.target.value; setTags(arr);
            }}
            className="w-full mb-2 ..."
            placeholder={`Tag #${i+1}`}
          />
        ))}
        <button onClick={() => setTags([...tags, ''])} className="mt-2 text-yellow-600">Add Tag</button>
      </div>

      {/* Ingredients */}
      {/* similar to existing code */}
      <div className="mb-6">
        <label>Ingredients:</label>
        {ingredients.map((ing, i) => (
          <input
            key={i}
            type="text"
            value={ing}
            onChange={e => {
              const arr = [...ingredients]; arr[i] = e.target.value; setIngredients(arr);
            }}
            className="w-full mb-2 ..."
            placeholder={`Ingredient #${i+1}`}
          />
        ))}
        <button onClick={() => setIngredients([...ingredients, ''])} className="mt-2 text-green-600">Add Ingredient</button>
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <label>Instructions:</label>
        {instructions.map((ins, i) => (
          <textarea
            key={i}
            value={ins}
            onChange={e => {
              const arr = [...instructions]; arr[i] = e.target.value; setInstructions(arr);
            }}
            className="w-full mb-2 ..."
            placeholder={`Step #${i+1}`}
            rows={3}
          />
        ))}
        <button onClick={() => setInstructions([...instructions, ''])} className="mt-2 text-green-600">Add Step</button>
      </div>

      <button
        onClick={handleUpdate}
        className="w-full py-3 bg-blue-600 text-white rounded"
      >
        Update Recipe
      </button>

      {message && (
        <p className={`mt-4 text-center ${message.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdateRecipeTailwind;
