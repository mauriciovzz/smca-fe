import { React, useState, useEffect } from 'react';

import { ReadingsMap } from 'src/components/maps';
import { LoaderSpinner } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const { auth } = useAuth();

  const [loadingData, setLoadingData] = useState(true);
  const [nodesData, setNodesData] = useState([]);

  const getHomePageNodes = async () => {
    try {
      const request = await axiosPrivate.get(
        '/api/spaces/home-page-nodes',
      );

      setNodesData(request.data);
      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getHomePageNodes();
  }, [auth]);

  return loadingData
    ? <LoaderSpinner />
    : <ReadingsMap markersData={nodesData} />;
};

export default Home;
