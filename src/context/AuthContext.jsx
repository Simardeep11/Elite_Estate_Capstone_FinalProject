"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../firebase/firebase";  // Ensure this path is correct
import { onAuthStateChanged, signOut } from "firebase/auth";
import { signIn, signUp, signInWithGoogle, resetPassword } from "../firebase/auth";  // Ensure this path is correct

const AuthContext = createContext();  // Correctly create the context

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const login = async (email, password) => {
    return await signIn(email, password);
  };

  const register = async (email, password) => {
    return await signUp(email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserLoggedIn(false);
  };

  const loginWithGoogle = async () => {
    return await signInWithGoogle();
  };

  const resetUserPassword = async (email) => {
    return await resetPassword(email);
  };

  const value = {
    user,
    userLoggedIn,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
    resetUserPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext };  // Ensure the context is exported
