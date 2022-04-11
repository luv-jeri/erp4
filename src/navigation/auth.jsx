import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/authentication/signup/SignUp';

import SignIn from '../pages/authentication/signin/SignIn';

import Index from '../pages/authentication/index';
import PersonalDetails from '../pages/authentication/registration/personalDetails/PersonalDetails';
import BusinessDetails from '../pages/authentication/registration/businessDetails/BusinessDetails';
import DeliveryDetails from '../pages/authentication/registration/deliveryDetails/DeliveryDetails';

export default function AuthNav() {
  return (
    <Routes>
      <Route path='/' element={<Index />}>
        <Route path='' element={<SignIn />} />
        <Route path='join' element={<SignUp />}>
          <Route path='' element={<PersonalDetails />} />
          <Route path='shop' element={<BusinessDetails />} />
          <Route path='delivery' element={<DeliveryDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}
