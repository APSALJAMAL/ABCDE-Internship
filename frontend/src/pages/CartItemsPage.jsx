
import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

export default function CartItemsPage() {
  const { user } = useContext(UserContext);

  const [userCartId, setUserCartId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 👇 Effect to ensure user cart exists (only runs if user is present)
  useEffect(() => {
    const ensureCart = async () => {
      if (!user || !user.id) {
        setError('User not logged in.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const res = await api.post(`/carts/for-user/${user.id}`);
        setUserCartId(res.data.id);
        console.log("Fetched cart ID:", res.data.id);
      } catch (err) {
        console.error('Error ensuring cart:', err);
        setError('Error fetching user cart.');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      ensureCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  // 👇 Effect to fetch cart items once userCartId is available
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userCartId) return;

      try {
        setLoading(true);
        setError('');
        const res = await api.get(`/cart-items/for-cart/${userCartId}`);
        setCartItems(res.data);
        console.log("Cart items:", res.data);
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setError('Error fetching cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userCartId]);

  // ✅ Handle checkout
  const handleCheckout = async () => {
    if (!userCartId) return;
  
    try {
      setLoading(true);

      await api.post(`/orders/from-cart/${userCartId}`);
      toast.success('Order placed successfully!');
 
      await api.delete(`/carts/${userCartId}`);
      toast.success('Cart cleared!');

      setCartItems([]);
  
    } catch (err) {
      console.error('Checkout failed:', err);
      toast.error('Checkout failed. Try again.');
    } finally {
      setLoading(false);
    }
  };
  


  if (!user || !user.id) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">My Cart Items</h2>
        <p className="text-center text-gray-500">Please log in to view your cart.</p>
      </div>
    );
  }


  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6 bg-white  ">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">My Cart Items</h2>
  
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
  
      {!loading && !error && cartItems.length === 0 && (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map((cartItem) => {
          const name = cartItem.item_id?.name || 'Unknown Item';
          const firstLetter = name.charAt(0).toUpperCase();
  
          return (
            <div
              key={cartItem._id}
              className="flex flex-col items-center bg-gray-50 shadow-lg rounded-lg p-4  hover:shadow-lg transition"
            >
              <div className="w-40 h-40  bg-green-100 text-green-700 flex items-center justify-center text-3xl font-bold mb-4">
                {firstLetter}
              </div>
              <p className="text-lg font-semibold text-center">{name}</p>
              <p className="text-gray-600 text-center">
                Status: {cartItem.item_id?.status || 'N/A'}
              </p>
              <p className="text-sm text-gray-400 text-center mt-2">
                Created: {cartItem.item_id?.created_at
                  ? new Date(cartItem.item_id.created_at).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          );
        })}
      </div>
  
      {!loading && !error && cartItems.length > 0 && (
        <div className="mt-10 text-center">
          <button
            onClick={handleCheckout}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition shadow"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
  
}

