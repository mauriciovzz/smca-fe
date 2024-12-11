import { React, useEffect, useState } from 'react';

import { Outlet, useOutlet, useOutletContext } from 'react-router-dom';

import { LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';

import LocationsOverview from './LocationsOverview';

const LocationsRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();

  const { spaceData, updateSpaceData } = useOutletContext();

  const [loadingData, setLoadingData] = useState(true);
  const [locationsData, setLocationsData] = useState([]);

  const [uptLocationsData, setUptLocationsData] = useState(0);
  const updateLocationsData = () => setUptLocationsData(Math.random());

  const getLocationsData = async () => {
    try {
      const request = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/locations`,
      );

      setLocationsData(request.data);
      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    updateSpaceData();
  }, []);

  useEffect(() => {
    getLocationsData();
  }, [uptLocationsData]);

  const outlet = useOutlet();

  const renderOutlet = () => {
    if (outlet)
      return <Outlet context={{ spaceData, locationsData, updateLocationsData }} />;

    return <LocationsOverview locationsData={locationsData} spaceData={spaceData} />;
  };

  return loadingData
    ? <LoaderSpinner isSmall />
    : (
      <div className="flex grow flex-col">
        <div className="flex grow bg-background">
          {renderOutlet()}
        </div>
      </div>
    );
};

export default LocationsRoot;
