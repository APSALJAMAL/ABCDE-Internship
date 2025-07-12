import { useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import AddToCart from './AddToCart';
import CartList from './CartList';
import { UserContext } from '../context/UserContext';

export default function CartsPage() {
  const { user } = useContext(UserContext);
  const [userCartId, setUserCartId] = useState(null);
  const [carts, setCarts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    api.post(`/carts/for-user/${user.id}`)
      .then((res) => setUserCartId(res.data.id))
      .catch((err) => console.error('Error ensuring cart:', err));
  }, [user]);

  useEffect(() => {
    api.get('/items')
      .then((res) => setItems(res.data))
      .catch((err) => console.error('Error fetching items:', err));
  }, []);

  useEffect(() => {
    api.get('/carts')
      .then((res) => setCarts(res.data))
      .catch((err) => console.error('Error fetching carts:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {!user ? (
          <p className="text-center text-red-600 text-lg font-semibold">
            You must be logged in to view your cart.
          </p>
        ) : (
          <>
            <section className="bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/30">
              <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Add Items to Cart</h2>
              <AddToCart items={items} userCartId={userCartId} />
            </section>

              <CartList carts={carts} setCarts={setCarts} />
     
          </>
        )}
      </div>
    </div>
  );
}
