import React, { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { UserContext } from '../context/UserContext';

export default function AddToCart({ items, userCartId: propCartId }) {
  const { user } = useContext(UserContext);
  const [userCartId, setUserCartId] = useState(propCartId || null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    if (!user) return;
    if (!userCartId && user.id) {
      api
        .post(`/carts/for-user/${user.id}`)
        .then((res) => setUserCartId(res.data.id))
        .catch(() => setError('Could not initialize cart.'));
    }
  }, [user, userCartId]);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleAddToCart = async (itemId) => {
    if (!userCartId) {
      setError('Cart not initialized!');
      return;
    }

    setLoadingId(itemId);
    try {
      await api.post('/cart-items', {
        cart_id: userCartId,
        item_id: itemId,
      });
      setMessage('Item added to cart!');
    } catch (err) {
      console.error('Error ensuring cart:', err);
      setError('Error adding to cart.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl p-6 ">
      

      {message && <p className="text-center text-green-600 font-medium">{message}</p>}
      {error && <p className="text-center text-red-600 font-medium">{error}</p>}

      {items.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center space-y-3 hover:shadow-xl transition"
            >
              {/* 🔷 Square Letter Avatar */}
              <div className="w-40 h-40 bg-gradient-to-br from-green-500 to-blue-500 text-white text-4xl font-bold flex items-center justify-center rounded-lg shadow">
                {item.name?.charAt(0).toUpperCase()}
              </div>

              {/* 📝 Item Info */}
              <div className="text-center space-y-1">
                <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Status: <span className="font-medium">{item.status || 'N/A'}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(item.created_at).toLocaleString()}
                </p>
              </div>

              {/* ➕ Add Button */}
              <button
                onClick={() => handleAddToCart(item._id)}
                disabled={loadingId === item._id}
                className={`w-full py-2 rounded-md text-white font-semibold transition ${
                  loadingId === item._id
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {loadingId === item._id ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
