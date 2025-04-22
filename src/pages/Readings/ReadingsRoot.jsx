import { React, useEffect, useState } from 'react';

import { Outlet, useOutlet } from 'react-router-dom';

import { LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';

import ReadingsOverview from './ReadingsOverview';

const ReadingsRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();

  const [loadingData, setLoadingData] = useState(true);
  const [locationsData, setLocationsData] = useState([]);

  const [uptLocationsData, setUptLocationsData] = useState(0);
  const updateLocationsData = () => setUptLocationsData(Math.random());

  const getLocationsData = async () => {
    try {
      // const request = await axiosPrivate.get(
      //   `/api/spaces/${spaceData.space_id}/locations`,
      // );

      // setLocationsData(request.data);
      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getLocationsData();
  }, [uptLocationsData]);

  const outlet = useOutlet();

  const renderOutlet = () => {
    if (outlet)
      return <Outlet context={{ locationsData, updateLocationsData }} />;

    return <ReadingsOverview locationsData={locationsData} />;
  };

  return (
    <div className="flex grow flex-col px-5 pb-5">
      <div className="flex grow bg-background">
        {
          loadingData
            ? <LoaderSpinner isSmall />
            : renderOutlet()
        }
      </div>
    </div>
  );
};

export default ReadingsRoot;
