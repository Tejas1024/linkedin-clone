// frontend/src/contexts/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect remains the same
  useEffect(() => {
    checkAuthStatus();
  }, []);
  
  // checkAuthStatus remains the same
  const checkAuthStatus = async () => {
    // NEW: Check for a token in localStorage first to speed up auth check
    const token = localStorage.getItem('authToken');
    if (!token) {
        setUser(null);
        setLoading(false);
        return;
    }

    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      setUser(null);
      // NEW: If the token is invalid, remove it
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    // NEW: Store the token from the login response in localStorage
    if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
    }
    setUser(response.data.user);
    return response.data;
  };

  // register remains the same
  const register = async (userData) => {
    const response = await authAPI.register(userData);
    return response.data;
  };

  const logout = async () => {
    try {
        await authAPI.logout();
    } catch (error) {
        console.error("Logout failed, but clearing client-side session anyway.", error);
    } finally {
        // NEW: Always remove the user and token on logout
        setUser(null);
        localStorage.removeItem('authToken');
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
