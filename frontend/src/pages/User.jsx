import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import { jwtDecode } from 'jwt-decode';


export default function Users() {
  const [, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  useEffect(() => {
    api.get('/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  useEffect(() => {
    api.get('/items')
      .then((res) => setItems(res.data))
      .catch((err) => console.error('Error fetching items:', err));
  }, []);

  const handleAddItem = (newItem) => {
    api.post('/items', newItem)
      .then((res) => setItems((prev) => [...prev, res.data]))
      .catch((err) => console.error('Error adding item:', err));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-pink-100 p-4 space-y-10">

<div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 transition-transform duration-500 hover:scale-[1.02]">
  <h2 className="text-3xl font-bold mb-6 text-center text-green-600 drop-shadow-md">
    Profile
  </h2>

  {currentUser ? (
    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6 space-y-6 md:space-y-0 text-gray-800">
      {/* Avatar on Left */}
      <div className="flex-shrink-0">
        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
          {currentUser.username?.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* User Details on Right */}
      <div className="flex-1 space-y-3">
        <p className="text-lg"><span className="font-semibold text-green-700">Username:</span> {currentUser.username}</p>
        <p className="text-lg"><span className="font-semibold text-green-700">User ID:</span> {currentUser.id}</p>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">No user is currently logged in.</p>
  )}
</div>


      <div className="max-w-7xl mx-auto space-y-6 bg-white shadow-xl rounded-3xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 drop-shadow-lg">Item Manager</h1>
        <AddItemForm onAdd={handleAddItem} />
        <ItemList items={items} setItems={setItems} />
      </div>

    </div>
  );
}
