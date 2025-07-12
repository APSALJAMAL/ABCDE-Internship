import React, { useEffect, useState } from 'react';
import api from '../api/axios';

export default function CartList() {
  const [carts, setCarts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const res = await api.get('/carts');
      setCarts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (cart) => {
    setEditId(cart._id);
    setEditName(cart.name);
    setEditStatus(cart.status || '');
  };

  const handleCancel = () => {
    setEditId(null);
    setEditName('');
    setEditStatus('');
  };

  const handleUpdate = async (id) => {
    try {
      const res = await api.put(`/carts/${id}`, { name: editName, status: editStatus });
      setCarts((prev) => prev.map((cart) => (cart._id === id ? res.data : cart)));
      setMessage('Cart updated!');
      handleCancel();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this cart?')) return;
    try {
      await api.delete(`/carts/${id}`);
      setCarts((prev) => prev.filter((cart) => cart._id !== id));
      setMessage('Cart deleted!');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white/60 rounded-2xl backdrop-blur-sm border border-white/30 ">
      <h2 className="text-3xl font-bold text-center text-indigo-700 drop-shadow mb-6">
        All Carts
      </h2>
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}

      {carts.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No carts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {carts.map((cart) => (
            <div
              key={cart._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center space-y-4 hover:shadow-lg transition"
            >
              {editId === cart._id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    placeholder="Cart Name"
                  />
                  <input
                    type="text"
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    placeholder="Status"
                  />
                  <div className="flex space-x-2 w-full">
                    <button
                      onClick={() => handleUpdate(cart._id)}
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
                  {/* 🟪 Square Avatar with First Letter */}
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-4xl font-bold flex items-center justify-center shadow-lg rounded-lg">
                    {cart.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="text-center space-y-1">
                    <p className="font-bold text-lg text-gray-800">{cart.name}</p>
                    <p
                      className={`text-sm ${
                        cart.status === 'Available'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {cart.status || 'N/A'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(cart.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex space-x-2 w-full">
                    <button
                      onClick={() => handleEditClick(cart)}
                      className="flex-1 bg-yellow-400 text-white px-3 py-2 rounded-lg hover:bg-yellow-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cart._id)}
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
