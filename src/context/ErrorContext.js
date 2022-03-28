import { createContext, useContext, useState } from 'react';
import Snack from './../components/snack';

const ErrorContext = createContext();

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

export function ErrorProvider({ children }) {
  const [error, setError] = useState('');

  const value = {
    error,
    setError,
  };
  return (
    <ErrorContext.Provider value={value}>
      {children} <Snack open={error} setOpen={setError} message={error} />
    </ErrorContext.Provider>
  );
}
