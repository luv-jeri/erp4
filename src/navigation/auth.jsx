import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/authentication/signup/SignUp';
import SignIn from '../pages/authentication/signin/SignIn';

export default function AuthNav() {
  return (
    <Routes>
      <Route
        path='/join'
        element={<SignUp />}
      />
      <Route
        path='/'
        element={<SignIn />}
      />
    </Routes>
  );
}
