import { React, useState, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { LoaderSpinner } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useRefreshToken from 'src/hooks/useRefreshToken';

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  const [loadingCredentials, setLoadingCredentials] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch {
        // caugh if user is not logged in
      } finally {
        setLoadingCredentials(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setLoadingCredentials(false);
  }, []);

  return ((loadingCredentials)
    ? <LoaderSpinner />
    : <Outlet />
  );
};

export default PersistLogin;
