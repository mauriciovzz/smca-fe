import { React, useEffect, useState } from 'react';

import { Outlet, useOutlet, useNavigate } from 'react-router-dom';

import { LoaderSpinner } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';

import AccountOverview from './AccountOverview';

const NoOptionSelected = () => (
  <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Selecciona una opción para realizar cambios.</span>
  </div>
);

const AccountRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [accountData, setAccountData] = useState({});

  const getAccountData = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/accounts/${auth.accountId}`,
      );

      setAccountData(response.data);
      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate('/');
    } else {
      getAccountData();
    }
  }, []);

  const isScreenSmall = useScreenWidth();
  const outlet = useOutlet();

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet)
        return <Outlet context={{ accountData, getAccountData }} />;

      return <AccountOverview accountData={accountData} />;
    }

    if (outlet)
      return <Outlet context={{ accountData, getAccountData }} />;

    return <NoOptionSelected />;
  };

  return loadingData
    ? <LoaderSpinner />
    : (
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
