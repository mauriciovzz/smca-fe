import {
  React, useState, useEffect, useContext, useMemo,
} from 'react';

import { Outlet } from 'react-router-dom';

import Button from 'src/components/Button';
import Heading from 'src/components/Heading';
import SelectFilter from 'src/components/Table/SelectFilter';
import Table from 'src/components/Table/Table';
import { AuthContext } from 'src/context/authProvider';
import componentsService from 'src/services/components';

import ComponentCreation from './ComponentCreation';
import ComponentManagement from './ComponentManagement';

const LinkCell = ({ value }) => (
  <a
    className="text-blue-600 underline"
    href={value}
    target="_blank"
    rel="noopener noreferrer"
  >
    Link
  </a>
);

const Components = () => {
  const [componentList, setComponentList] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedView, setSelectedView] = useState('default');
  const { logout } = useContext(AuthContext);

  const updateComponentList = () => {
    componentsService
      .getAll()
      .then((components) => setComponentList(components))
      .catch((err) => {
        if (err.response.data.error === 'La sesión expiró') logout(err);
      });
  };

  useEffect(() => {
    updateComponentList();
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'Nombre',
      accessor: 'component_name',
    },
    {
      Header: 'Tipo',
      accessor: 'component_type',
      Filter: SelectFilter,
      filter: 'includes',
    },
    {
      Header: 'Link',
      accessor: 'datasheet_link',
      Cell: LinkCell,
    },
  ], []);

  const renderSelectedView = () => {
    switch (selectedView) {
      case 'creation':
        return (
          <ComponentCreation
            closeWindow={() => setSelectedView('default')}
            updateList={() => updateComponentList()}
          />
        );
      case 'management':
        return (
          <ComponentManagement
            selectedComponent={selectedComponent}
            closeWindow={() => setSelectedView('default')}
            updateList={() => updateComponentList()}
          />
        );
      default:
        return (
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
            <span>Seleciona un componente de la lista para gestionarlo</span>
            <span>o</span>
            <span>&quot;Agregar componente&quot; para crear uno nuevo.</span>
          </div>
        );
    }
  };

  return (
    <>
      <Outlet />

      <div className="grid h-full w-full grid-cols-2 grid-rows-1 gap-5">
        <div className="flex h-full w-full flex-col justify-between rounded-lg bg-white p-5 shadow">
          <Heading text="Componentes" />

          <Table
            columns={columns}
            data={componentList}
            onRowClick={(component) => {
              setSelectedComponent(component);
              setSelectedView('management');
            }}
          />

          <Button
            text="Agregar Componente"
            color="blue"
            onClick={() => setSelectedView('creation')}
          />
        </div>

        <div className="flex h-full w-full">
          {renderSelectedView()}
        </div>
      </div>
    </>
  );
};

export default Components;
