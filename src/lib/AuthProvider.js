'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  userData: null,
  setUserData: () => {},
  logout: () => {},
  login: () => {},
  loading: false,
  token: null,
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUserData = localStorage.getItem('userResponse');
        if (savedUserData) {
          setUserData(JSON.parse(savedUserData));
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const login = async (data) => {
    try {
      await localStorage.setItem('userResponse', JSON.stringify(data));
      setUserData(data);
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  };
  const logout = async () => {
    await localStorage.removeItem('userResponse');
    setUserData(null);
  };

  const token = userData ? userData.token : null;

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        logout,
        login,
        loading,
        token: userData?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
