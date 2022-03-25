import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export default function useProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to='/signin' />;
}
