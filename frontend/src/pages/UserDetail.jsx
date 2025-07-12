import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
        setUsername(res.data.username);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${id}`, { username, password });
      setMessage('✅ User updated successfully!');
      setError('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || '❌ Error updating user.');
      setMessage('');
    }
  };

  const handleDelete = async () => {

    try {
      await api.delete(`/users/${id}`);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || '❌ Error deleting user.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <p className="text-lg font-medium text-gray-600 animate-pulse">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-lg p-8 space-y-6 border border-white/20 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-700 drop-shadow">User Profile</h2>

        {message && (
          <p className="text-center text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            {message}
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-5 rounded-2xl shadow-inner space-y-2">
          <p className="text-gray-700"><span className="font-semibold">👤 Username:</span> {user.username}</p>
          <p className="text-gray-700"><span className="font-semibold">🗓️ Created:</span> {new Date(user.created_at).toLocaleDateString()}</p>

        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-700">Update User</h3>
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            type="password"
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"
          >
            Update
          </button>
        </form>

        <button
          onClick={handleDelete}
          className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition"
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
