'use client'

import { API_BASE } from '@/config';
import React, { useEffect, useState } from 'react';


function USersList() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Call the backend API using fetch
    const fetchUsers = async () => {
      try {
        
        const response = await fetch(`${API_BASE}/users/users/`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div>
      <div>
        <h2>All Users</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                {user?.name} – {user?.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default USersList
