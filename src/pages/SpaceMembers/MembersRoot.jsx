import { React, useEffect, useState } from 'react';

import { Outlet, useOutlet, useOutletContext } from 'react-router-dom';

import { LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';

import MembersOverview from './MembersOverview';

const NoOptionSelected = () => (
  <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Gestiona a los miembros de este espacio o agrega nuevos integrantes.</span>
  </div>
);

const MembersRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();

  const { spaceData, updateSpaceData } = useOutletContext();

  const [loadingData, setLoadingData] = useState(true);
  const [membersData, setMembersData] = useState([]);

  const [uptMembersData, setUptMembersData] = useState(0);
  const updateMembersData = () => setUptMembersData(Math.random());

  const getSpaceMembers = async () => {
    try {
      const request = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/members`,
      );

      setMembersData(request.data);
      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    updateSpaceData();
  }, []);

  useEffect(() => {
    getSpaceMembers();
  }, [uptMembersData]);

  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet)
        return <Outlet context={{ spaceData, membersData, updateMembersData }} />;

      return <MembersOverview membersData={membersData} spaceData={spaceData} />;
    }

    if (outlet)
      return <Outlet context={{ spaceData, membersData, updateMembersData }} />;

    return <NoOptionSelected />;
  };

  return loadingData
    ? <LoaderSpinner isSmall />
    : (
      <div className="flex grow flex-col">
        <div className="flex grow bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
          <div className="hidden grow bg-background sm:flex">
            <MembersOverview membersData={membersData} spaceData={spaceData} />
          </div>

          <div className="flex grow bg-background">
            {renderOutlet()}
          </div>
        </div>
      </div>
    );
};

export default MembersRoot;
