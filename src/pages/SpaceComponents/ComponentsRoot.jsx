import { React, useEffect, useState } from 'react';

import { Outlet, useOutlet, useOutletContext } from 'react-router-dom';

import { LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';

import ComponentsOverview from './ComponentsOverview';

const NoOptionSelected = () => (
  <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
    <span>Selecciona un componente de la lista para gestionarlo</span>
    <span>o el botón ⊕ para crear uno nuevo.</span>
  </div>
);

const ComponentsRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();

  const { spaceData, updateSpaceData } = useOutletContext();

  const [loadingData, setLoadingData] = useState(true);
  const [variablesData, setVariablesData] = useState([]);
  const [componentsData, setComponentsData] = useState([]);

  const [uptVariablesData, setUptVariablesData] = useState(0);
  const updateVariablesData = () => setUptVariablesData(Math.random());

  const getVariablesData = async () => {
    try {
      const request = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/variables`,
      );

      setVariablesData(request.data);
    } catch (error) {
      errorHandler(error);
    }
  };

  const [uptComponentsData, setUptComponentsData] = useState(0);
  const updateComponentsData = () => setUptComponentsData(Math.random());

  const getComponentsData = async () => {
    try {
      const request = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/components`,
      );

      setComponentsData(request.data);
      setLoadingData(false);
    } catch (error) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    updateSpaceData();
  }, []);

  useEffect(() => {
    getComponentsData();
  }, [uptComponentsData]);

  useEffect(() => {
    getVariablesData();
  }, [uptVariablesData]);

  const outlet = useOutlet();
  const isScreenSmall = useScreenWidth();

  const renderOutlet = () => {
    if (isScreenSmall) {
      if (outlet)
        return (
          <Outlet
            context={{
              spaceData, componentsData, updateComponentsData, variablesData, updateVariablesData,
            }}
          />
        );

      return <ComponentsOverview componentsData={componentsData} spaceData={spaceData} />;
    }

    if (outlet)
      return (
        <Outlet
          context={{
            spaceData, componentsData, updateComponentsData, variablesData, updateVariablesData,
          }}
        />
      );

    return <NoOptionSelected />;
  };

  return loadingData
    ? <LoaderSpinner isSmall />
    : (
      <div className="flex grow flex-col">
        <div className="flex grow bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
          <div className="hidden grow bg-background sm:flex">
            <ComponentsOverview componentsData={componentsData} spaceData={spaceData} />
          </div>

          <div className="flex grow bg-background">
            {renderOutlet()}
          </div>
        </div>
      </div>
    );
};

export default ComponentsRoot;
