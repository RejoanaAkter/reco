import React, { useState } from 'react';

const VerifyOwnerModal = ({ isOpen, onClose, recipeId, onSuccess }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      const res = await fetch('http://localhost:8000/recipes/check-recipe-owner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId, name, password })
      });

      const data = await res.json();

      if (res.ok && data.allowed) {
        setMessage('');
        onSuccess(); // ✅ Go to update page
      } else {
        setMessage(data.message || 'Access denied.');
      }
    } catch (err) {
      setMessage('Error verifying ownership');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Verify Recipe Ownership</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        {message && <p className="text-red-500 mb-3">{message}</p>}

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleVerify} className="px-4 py-2 bg-blue-600 text-white rounded">Verify</button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOwnerModal;
