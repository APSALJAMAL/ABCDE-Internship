import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function ItemList({ items, setItems }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState('Available');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleEditClick = (item) => {
    setEditId(item._id);
    setEditName(item.name);
    setEditStatus(item.status || 'Available');
    setMessage('');
    setError('');
  };

  const handleCancel = () => {
    setEditId(null);
    setEditName('');
    setEditStatus('Available');
    setMessage('');
    setError('');
  };

  const handleUpdate = async (id) => {
    try {
      const res = await api.put(`/items/${id}`, {
        name: editName,
        status: editStatus
      });
      setMessage('Item updated successfully!');
      setEditId(null);
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === id ? res.data : item))
      );
    } catch (err) {
      console.error(err);
      setError('Error updating item.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`/items/${id}`);
      setMessage('Item deleted successfully!');
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      setError('Error deleting item.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white/60 rounded-2xl  backdrop-blur-sm border border-white/30">
      <h2 className="text-3xl font-bold text-center text-indigo-700 drop-shadow-md mb-6">
        All Items
      </h2>

      {message && <p className="text-center text-green-600">{message}</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {items.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4 hover:shadow-xl transition"
            >
              {editId === item._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    placeholder="Item Name"
                  />

                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>

                  <div className="flex space-x-2 w-full">
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-gray-400 text-white px-3 py-2 rounded-lg hover:bg-gray-500 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Avatar with First Letter */}
                  <div className="w-40 h-40 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-4xl font-bold flex items-center justify-center shadow-lg rounded-lg">
  {item.name?.charAt(0).toUpperCase()}
</div>


                  <div className="text-center space-y-1">
                    <p className="font-bold text-lg text-gray-800">{item.name}</p>
                    <p className={`text-sm ${item.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.status}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex space-x-2 w-full">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="flex-1 bg-yellow-400 text-white px-3 py-2 rounded-lg hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
