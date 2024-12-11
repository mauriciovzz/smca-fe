import { React, useEffect, useState } from 'react';

import { Outlet, useOutlet, useOutletContext } from 'react-router-dom';

import { LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';

import NodesOverview from './NodesOverview';

const LocationsRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();

  const { spaceData, updateSpaceData } = useOutletContext();

  const [loadingData, setLoadingData] = useState(true);
  const [locationsData, setLocationsData] = useState([]);
  const [componentsData, setComponentsData] = useState([]);
  const [variablesData, setVariablesData] = useState([]);
  const [nodesData, setNodesData] = useState([]);

  useEffect(() => {
    updateSpaceData();
  }, []);

  const getLocationsData = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/locations`,
      );

      setLocationsData(response.data);
    } catch (error) {
      errorHandler(error);
    }
  };

  const [uptLocationsData, setUptLocationsData] = useState(0);
  const updateLocationsData = () => setUptLocationsData(Math.random());

  useEffect(() => {
    getLocationsData();
  }, [uptLocationsData]);

  const getComponentsData = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/components`,
      );

      setComponentsData(response.data);
    } catch (error) {
      errorHandler(error);
    }
  };

  const [uptComponentsData, setUptComponentsData] = useState(0);
  const updateComponentsData = () => setUptComponentsData(Math.random());

  useEffect(() => {
    getComponentsData();
  }, [uptComponentsData]);

  const getVariablesData = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/variables`,
      );

      setVariablesData(response.data);
    } catch (error) {
      errorHandler(error);
    }
  };

  const [uptVariablesData, setUptVariablesData] = useState(0);
  const updateVariablesData = () => setUptVariablesData(Math.random());

  useEffect(() => {
    getVariablesData();
  }, [uptVariablesData]);

  const getNodesData = async () => {
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

  const [uptNodesData, setUptNodesData] = useState(0);
  const updateNodesData = () => setUptNodesData(Math.random());

  useEffect(() => {
    getNodesData();
  }, [uptNodesData]);

  const outlet = useOutlet();

  const renderOutlet = () => {
    if (outlet)
      return (
        <Outlet context={{
          spaceData,
          locationsData,
          updateLocationsData,
          componentsData,
          updateComponentsData,
          variablesData,
          updateVariablesData,
          nodesData,
          updateNodesData,
        }}
        />
      );

    return <NodesOverview spaceData={spaceData} nodesData={nodesData} />;
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
