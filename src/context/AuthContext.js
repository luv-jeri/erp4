import React from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const auth = getAuth();
const AuthContext = React.createContext();

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const authListener = auth.onAuthStateChanged(
      (user) => {
        console.log('user', user);
        // setUser(user);
      }
    );
    return authListener;
  }, []);

  function signup(email, password) {
    createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  const value = {
    user,
    setUser,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
