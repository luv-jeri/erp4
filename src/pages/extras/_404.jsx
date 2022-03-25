import React from 'react';
import { Navigate } from 'react-router-dom';
export default function _404() {
  return <Navigate to='/'></Navigate>;
}
