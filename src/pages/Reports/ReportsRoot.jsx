import { React, useEffect, useState } from 'react';

import { LoaderSpinner } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';

import ReportCreation from './ReportCreation';
import ReportsOverview from './ReportsOverview';

const ReportsRoot = ({ spaceId }) => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const { auth } = useAuth();

  const [loadingData, setLoadingData] = useState(true);
  const [reportsView, setReportsView] = useState(null);
  const [locationsData, setLocationsData] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const getLocationsData = async () => {
    try {
      if (spaceId) {
        const response = await axiosPrivate.get(
          `/api/readings/space-locations-with-readings/${spaceId}`,
        );

        setLocationsData(response.data);
      } else {
        const response = await axiosPrivate.get(
          '/api/readings/locations-with-readings',
        );

        setLocationsData(response.data);
      }

      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getLocationsData();
  }, [auth]);

  const onClose = () => {
    setSelectedLocation(null);
    setReportsView(null);
  };

  const selectLocation = (location) => {
    setSelectedLocation(location);
    setReportsView('reportsCreation');
  };

  const renderView = () => {
    switch (reportsView) {
      case 'reportsCreation':
        return (
          <ReportCreation
            selectedLocation={selectedLocation}
            onClose={onClose}
          />
        );
      default:
        return (
          <ReportsOverview
            locationsData={locationsData}
            selectLocation={selectLocation}
          />
        );
    }
  };

  return (
    <div className={`${!spaceId && 'px-5 pb-5'} flex grow flex-col`}>
      <div className="flex grow bg-background">
        {
          loadingData
            ? <LoaderSpinner isSmall />
            : renderView()
        }
      </div>
    </div>
  );
};

export default ReportsRoot;
