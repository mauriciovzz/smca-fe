import { React } from 'react';

import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const HiddenRoutes = () => {
  const { login } = useOutletContext();
  const { auth } = useAuth();

  return auth ? <Navigate to="/" /> : <Outlet context={{ login }} />;
};

export default HiddenRoutes;
