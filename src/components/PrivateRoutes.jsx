import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import userAccountsService from '../services/userAccounts';

const PrivateRoutes = () => {
  const user = userAccountsService.getCurrentUser();

  if (user === undefined) {
    return null; // or loading indicator/spinner/etc
  }

  return user
    ? <Outlet />
    : <Navigate replace to="/" />;
};

export default PrivateRoutes;
