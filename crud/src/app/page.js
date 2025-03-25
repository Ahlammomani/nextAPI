'use client';

import { useEffect, useState } from 'react';
import UserForm from '@/components/UserForm';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <UserForm 
        editingUser={editingUser} 
        setEditingUser={setEditingUser} 
        refreshUsers={fetchUsers} 
      />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Users List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user._id} className="border p-4 rounded shadow">
              <h3 className="font-bold">{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <div className="mt-2 flex gap-2">
                <button 
                  onClick={() => setEditingUser(user)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}