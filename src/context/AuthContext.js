import { useState, useEffect, useContext, createContext } from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import firebase from '../firebase';

import { doc, setDoc } from 'firebase/firestore';

import { useError } from './ErrorContext';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

const { auth, db } = firebase;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setError } = useError();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged((user) => {
      console.log('authListener', user);
      setLoading(false);
      setUser(user);
    });
    return authListener;
  }, []);

  async function signup({
    name,
    email,
    password,
    DPURL,
    businessName,
    businessEmail,
    address,
    phone,
    businessType,
    deliveryName,
    city,
    logoURL,
  }) {
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      if (newUser) {
        const ref = doc(db, 'seller', newUser.user.uid);
        const userDoc = await setDoc(ref, {
          name,
          email,
          DP: DPURL,
          businessName,
          businessEmail,
          address,
          phone,
          businessType,
          deliveryName,
          city,
          logo: logoURL,
        });
        console.log('userDoc', userDoc);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  async function signin(email, password) {
    try {
      if (!email || !password) {
        setError('Please fill all the fields');
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  function signout() {
    signOut(auth);
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
      {loading ? (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={10}>
          <LinearProgress color='secondary' />
          <LinearProgress color='success' />
          <LinearProgress color='inherit' />
        </Stack>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

// if (!name || !email || !password || !confirmPassword) {
//   alert('Please fill all the fields');
// } else if (password !== confirmPassword) {
//   alert('Passwords do not match');
// } else {
//   createUserWithEmailAndPassword(auth, email, password);
// }
