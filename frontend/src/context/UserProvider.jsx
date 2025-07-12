// src/context/UserProvider.jsx
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from './UserContext';

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token from storage:', decoded);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token:', err);
        setUser(null);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    try {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error('Invalid token during login:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
