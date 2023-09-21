import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoutes = () => {
  const { user } = useAuth();

  if (user === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return user
    ? <Outlet />
    : <Navigate replace to="/" />;
};

export default PrivateRoutes;
