import { useState, useEffect, useContext, createContext } from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import firebase from '../firebase/index';
//` For Database
import { doc, setDoc } from 'firebase/firestore';

const { auth, db } = firebase;

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

  async function signup(email, password, name, confirmPassword) {
    try {
      if (!name || !email || !password || !confirmPassword) {
        return 'Please fill all the fields';
      }
      if (password !== confirmPassword) {
        return 'Passwords do not match';
      }
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      if (newUser) {
        const ref = doc(db, 'users', 'id');
        const userDoc = await setDoc(ref, {
          name,
          email,
        });
        console.log('userDoc', userDoc);
      }
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  async function signin(email, password) {
    try {
      if (!email || !password) {
        return 'Please fill all the fields';
      }
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      return error.message;
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
