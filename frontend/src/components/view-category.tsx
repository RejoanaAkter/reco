'use client';

import { useEffect, useState } from 'react';
import useCategories from '../hook/useCategories';
import getImageUrl from '@/settings/utils';

const CategoryListModal = ({ setShowModal }) => {

  const { categories, loading: loadingCategories, error: categoryError } = useCategories();

  return (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">All Categories</h2>
        {categoryError && <p className="text-red-500">{categoryError}</p>}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat._id} className="border p-2 rounded">
              <img
                src={getImageUrl(cat.imageUrl)}
                alt={cat.name}
                className="w-full h-32 object-cover rounded mb-1"
              />
              <p className="text-center font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryListModal;
