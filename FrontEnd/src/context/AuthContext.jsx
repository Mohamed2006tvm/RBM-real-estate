import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      
      // Configure default axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token: receivedToken, user: receivedUser } = response.data;

      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(receivedUser));
      
      setToken(receivedToken);
      setUser(receivedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed. Please verify credentials.' 
      };
    }
  };

  const register = async (name, email, password, phone, role = 'CLIENT') => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { 
        name, email, password, phone, role 
      });
      const { token: receivedToken, user: receivedUser } = response.data;

      localStorage.setItem('token', receivedToken);
      localStorage.setItem('user', JSON.stringify(receivedUser));

      setToken(receivedToken);
      setUser(receivedUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const isAdmin = () => user?.role === 'ADMIN';
  const isAgent = () => user?.role === 'AGENT';
  const isAdminOrAgent = () => user && (user.role === 'ADMIN' || user.role === 'AGENT');

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin, isAgent, isAdminOrAgent }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
