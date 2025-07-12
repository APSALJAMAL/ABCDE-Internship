import React, { useState } from 'react';

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Available');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), status: status.trim() });
    setName('');
    setStatus('Available');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-sm bg-white/60 shadow-xl rounded-2xl p-8 space-y-6 max-w-3xl mx-auto border border-white/30"
    >
      <h2 className="text-2xl font-bold text-center text-indigo-700 drop-shadow-md">
        Add New Item
      </h2>
      
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 shadow-sm"
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 shadow-sm"
        >
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
