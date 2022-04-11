import { useState, useEffect, useContext, createContext } from 'react';
import Stack from '@mui/material/Stack';
import { Backdrop, CircularProgress } from '@mui/material';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import firebase from '../firebase';

import { doc, setDoc, getDoc } from 'firebase/firestore';

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
  const [details, setDetails] = useState(null); // user details
  const [loading, setLoading] = useState(true);
  const { setError } = useError();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (user) => {
      console.log('authListener', user); // email and uid
      // setting loading to false after user is logged in

      setUser(user);

      //` Getting user details from fireStore database
      if (user) {
        const userRef = doc(db, `seller`, user.uid);

        const sellersData = await getDoc(userRef);

        if (sellersData.exists()) {
          setDetails(sellersData.data());
        } else {
          signOut(auth);
          setError('No details found , please signup');
        }
      }

      setLoading(false);
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
    details,
    setUser,
    signup,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress color='inherit' />
        </Backdrop>
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
