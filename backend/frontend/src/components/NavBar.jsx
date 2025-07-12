
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function NavBar() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:opacity-90 transition duration-300"
        >
          ABCDE Internship
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
            <Link
                to="/"
                className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/cart"
                className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-300"
              >
                Items
              </Link>
              <Link
                to="/cartitem"
                className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-300"
              >
                Cart
              </Link>
              <Link
                to="/order"
                className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-300"
              >
                Order
              </Link>
              <Link to={`/users/${user.id}`}>

              {/* User Greeting with Avatar */}
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full">
                <div className="w-8 h-8 rounded-full bg-white text-blue-600 font-bold flex items-center justify-center shadow">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{`Hi, ${user.username}`}</span>
              </div>
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-full bg-red-500 hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 rounded-full bg-white/20 hover:bg-white/30 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
