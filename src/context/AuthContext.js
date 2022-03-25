import { useState, useEffect, useContext, createContext } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import firebase from '../firebase/index';

const { auth } = firebase;

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      console.log('User from context ->', user);
      setLoading(false);
      setUser(user);
    });
    return authListener;
  }, []);

  function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
  }

  async function signin(email, password) {
    signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    signOut();
  }

  const value = {
    user,
    setUser,
    signup,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>loading</div> : children}
    </AuthContext.Provider>
  );
}
