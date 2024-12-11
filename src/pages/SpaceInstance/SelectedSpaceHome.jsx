import { React, useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';

import { ReadingsMap } from 'src/components/maps';
import { LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';

const SelectedSpaceHome = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();

  const { spaceData } = useOutletContext();

  const [loadingData, setLoadingData] = useState(true);
  const [nodesData, setNodesData] = useState([]);

  const getSpaceNodes = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/nodes`,
      );

      setNodesData(response.data);
      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getSpaceNodes();
  }, []);

  return loadingData
    ? <LoaderSpinner />
    : <ReadingsMap markersData={nodesData.filter((n) => n.location_id)} />;
};

export default SelectedSpaceHome;
