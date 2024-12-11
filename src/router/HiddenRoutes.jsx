import { React } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const HiddenRoutes = () => {
  const { auth } = useAuth();

  return auth?.accessToken ? <Navigate to="/" /> : <Outlet />;
};

export default HiddenRoutes;
