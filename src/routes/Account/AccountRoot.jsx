import { React } from 'react';

import {
  Outlet, redirect, useLoaderData, useOutlet, useRevalidator,
} from 'react-router-dom';

import accountsService from 'src/services/accounts';

import AccountOverview from './AccountOverview';
import useScreenWidth from '../../hooks/useScreenWidth';

export const accountInfoLoader = async (auth) => {
  if (!auth) {
    return redirect('/');
  }

  const response = await accountsService.get(auth.accountId);
  return response;
};

const NoOptionSelected = () => (
  <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Selecciona una opción para realizar cambios.</span>
  </div>
);

const AccountRoot = () => {
  const accountData = useLoaderData();
  const screenWidth = useScreenWidth();
  const outlet = useOutlet();
  const revalidator = useRevalidator();

  const updateData = () => revalidator.revalidate();

  const renderOutlet = () => {
    if (screenWidth >= 640) {
      if (outlet) {
        return <Outlet context={[accountData, updateData]} />;
      }
      return <NoOptionSelected />;
    }

    if (outlet) {
      return <Outlet context={[accountData, updateData]} />;
    }
    return <AccountOverview accountData={accountData} />;
  };

  return (
    <div className="flex grow bg-background px-5 pb-5 sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
      <div className="hidden grow bg-background sm:flex">
        <AccountOverview accountData={accountData} />
      </div>

      <div className="flex grow bg-background">
        {
          renderOutlet()
        }
      </div>
    </div>
  );
};

export default AccountRoot;
