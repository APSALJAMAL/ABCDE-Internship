import React, { useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { UserContext } from '../context/UserContext';

export default function OrderPage() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4 text-indigo-700">My Orders</h2>
        <p className="text-center text-gray-500">Please sign in to view your orders.</p>
      </div>
    );
  }

  const currentUserId = user.id;
  const myOrders = orders.filter(order => {
    if (!currentUserId) return false;
    if (order.user_id && typeof order.user_id === 'object') {
      return order.user_id._id === currentUserId;
    }
    return order.user_id === currentUserId;
  });

  return (
    <div className="max-w-5xl min-h-screen mx-auto mt-10 p-6 bg-white rounded-2xl ">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">My Orders</h2>

      {loading && (
        <p className="text-center text-gray-500">Loading your orders...</p>
      )}

      {error && (
        <p className="text-center text-red-600">{error}</p>
      )}

      {!loading && !error && myOrders.length === 0 && (
        <div className="text-center text-gray-500 bg-gray-50 p-6 rounded-lg shadow-inner">
          <p>You haven't placed any orders yet.</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {!loading && !error && myOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition transform hover:scale-[1.02] p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500"></span>
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-indigo-100 text-indigo-700">
              Order ID: {order._id}
              </span>
            </div>

            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Cart ID:</span>{' '}
                <span className="text-blue-600">
                  {order.cart_id && typeof order.cart_id === 'object'
                    ? order.cart_id._id
                    : order.cart_id}
                </span>
              </p>
              <p>
                <span className="font-medium">User ID:</span>{' '}
                <span className="text-green-600">{user.id}</span>
              </p>
              <p className="text-sm text-gray-500">
                Placed on:{' '}
                {order.created_at
                  ? new Date(order.created_at).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
