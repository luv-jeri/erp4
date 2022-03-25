/* eslint-disable react/jsx-pascal-case */
import { Routes, Route } from 'react-router-dom';
import Layout from '../pages/app/Layout';
import Home from '../pages/app/Home';
import _404 from '../pages/extras/_404';

export default function AppNav() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='home' element={<Home />} />
      </Route>
      <Route path='*' element={<_404 />} />
    </Routes>
  );
}
