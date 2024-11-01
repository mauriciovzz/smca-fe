import { React } from 'react';

import {
  Outlet, useOutletContext, redirect, useLoaderData, useOutlet, useRevalidator,
} from 'react-router-dom';

import useScreenWidth from 'src/hooks/useScreenWidth';
import accountsService from 'src/services/accounts';
import notificationHelper from 'src/utils/notificationHelper';

import AccountOverview from './AccountOverview';

export const accountInfoLoader = async (auth, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const accountData = await accountsService.get(auth.accountId);
    return accountData;
  } catch (error) {
    const errorMessage = error.response.data.message;

    const errorData = loaderErrors.find((err) => err.errorMessage === errorMessage);

    if (errorData) {
      if (errorData.showMessage)
        notificationHelper.errorMsg(errorData.errorMessage);

      return redirect(errorData.redirectTo);
    }

    return null;
  }
};

const NoOptionSelected = () => (
  <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Selecciona una opción para realizar cambios.</span>
  </div>
);

const AccountRoot = () => {
  const { errorHandler } = useOutletContext();
  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();
  const revalidator = useRevalidator();
  const accountData = useLoaderData();

  const updateAccountRoot = () => revalidator.revalidate();

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet)
        return <Outlet context={{ accountData, updateAccountRoot, errorHandler }} />;

      return <AccountOverview accountData={accountData} />;
    }

    if (outlet)
      return <Outlet context={{ accountData, updateAccountRoot, errorHandler }} />;

    return <NoOptionSelected />;
  };

  return (
    <div className="flex grow bg-background px-5 pb-5 sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
      <div className="hidden grow bg-background sm:flex">
        <AccountOverview accountData={accountData} />
      </div>

      <div className="flex grow bg-background">
        {renderOutlet()}
      </div>
    </div>
  );
};

export default AccountRoot;
