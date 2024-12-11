import { React, useEffect, useState } from 'react';

import { Outlet, useOutlet, useNavigate } from 'react-router-dom';

import { LoaderSpinner } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';

import SpacesOverview from './SpacesOverview';

const SpacesRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [spacesData, setSpacesData] = useState([]);
  const [invitationsData, setInvitationsData] = useState([]);

  const getSpacesData = async () => {
    try {
      const spacesResponse = await axiosPrivate.get(
        '/api/spaces',
      );

      const invitationsResponse = await axiosPrivate.get(
        `/api/invitations/${auth.accountId}`,
      );

      setSpacesData(spacesResponse.data);
      setInvitationsData(invitationsResponse.data);
      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate('/');
    } else {
      getSpacesData();
    }
  }, []);

  const isScreenSmall = useScreenWidth();
  const outlet = useOutlet();

  const handleRenderOutlet = () => {
    if (isScreenSmall || outlet)
      return 'col-span-1 flex grow bg-background';

    return 'hidden';
  };

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet)
        return <Outlet context={{ spacesData, invitationsData, getSpacesData }} />;

      return <SpacesOverview spacesData={spacesData} invitationsCount={invitationsData.length} />;
    }
    if (outlet)
      return <Outlet context={{ spacesData, invitationsData, getSpacesData }} />;

    return <SpacesOverview spacesData={spacesData} invitationsCount={invitationsData.length} />;
  };

  return loadingData
    ? <LoaderSpinner />
    : (
      <div className="flex grow bg-background px-5 pb-5 sm:grid sm:grid-cols-4 sm:grid-rows-1 sm:gap-5">
        <div className={`${outlet ? 'col-span-3' : 'col-span-4'} hidden grow bg-background sm:flex`}>
          <SpacesOverview spacesData={spacesData} invitationsCount={invitationsData.length} />
        </div>

        <div className={handleRenderOutlet()}>
          {renderOutlet()}
        </div>
      </div>
    );
};

export default SpacesRoot;
