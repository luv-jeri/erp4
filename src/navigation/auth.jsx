import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/authentication/signup/SignUp';
import SignUp from '../pages/authentication/signin/SignIn';

export default function AuthNav() {
  return (
    <Routes>
      <Route
        path='/signup'
        element={<SignUp />}
      />
      <Route
        path='/signin'
        element={<SignIn />}
      />
    </Routes>
  );
}
