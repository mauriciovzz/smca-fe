import { React, useContext } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from 'src/context/authProvider';

const ProtectedRoute = () => {
  const { auth } = useContext(AuthContext);

  return (
    (auth)
      ? <Outlet />
      : <Navigate replace to="/" />
  );
};

export default ProtectedRoute;
