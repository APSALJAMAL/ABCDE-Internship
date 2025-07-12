import React, { useState } from 'react';
import api from '../api/axios';

export default function AddCartForm({ onAdd }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/carts', { name, status });
      onAdd(res.data);
      setName('');
      setStatus('');
    } catch (err) {
      console.error('Add cart error:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Add New Cart</h2>
      <div className="md:flex md:space-x-2 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Cart name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </form>
  );
}
