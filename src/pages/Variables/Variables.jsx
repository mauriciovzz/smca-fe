import {
  React, useState, useEffect, useContext, useMemo,
} from 'react';

import { Outlet } from 'react-router-dom';

import Button from 'src/components/Button';
import Heading from 'src/components/Heading';
import SelectFilter from 'src/components/Table/SelectFilter';
import Table from 'src/components/Table/Table';
import { AuthContext } from 'src/context/authProvider';
import variablesService from 'src/services/variables';

import VariableCreation from './VariableCreation';
import VariableManagement from './VariableManagement';

const typeCell = ({ value }) => {
  const getType = () => {
    switch (value) {
      case 'ENV':
        return 'Ambiental';
      case 'MET':
        return 'Meteorológica';
      default:
        return '';
    }
  };

  return (
    <div>
      {getType()}
    </div>
  );
};

const Variables = () => {
  const [variableList, setVariableList] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState(null);
  const [selectedView, setSelectedView] = useState('default');
  const { logout } = useContext(AuthContext);

  const updateVariableList = () => {
    variablesService
      .getAll()
      .then((variables) => setVariableList(variables))
      .catch((err) => {
        if (err.response.data.error === 'La sesión expiró') logout(err);
      });
  };

  useEffect(() => {
    updateVariableList();
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'Nombre',
      accessor: 'variable_name',
    },
    {
      Header: 'Unidad',
      accessor: 'unit',
    },
    {
      Header: 'Tipo',
      accessor: 'variable_type',
      Filter: SelectFilter,
      filter: 'includes',
      Cell: typeCell,
    },
  ], []);

  const renderSelectedView = () => {
    switch (selectedView) {
      case 'creation':
        return (
          <VariableCreation
            closeWindow={() => setSelectedView('default')}
            updateList={() => updateVariableList()}
          />
        );
      case 'management':
        return (
          <VariableManagement
            selectedVariable={selectedVariable}
            closeWindow={() => setSelectedView('default')}
            updateList={() => updateVariableList()}
          />
        );
      default:
        return (
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
            <span>Seleciona una variable de la lista para gestionarla</span>
            <span>o</span>
            <span>&quot;Agregar Variable&quot; para crear una nueva.</span>
          </div>
        );
    }
  };

  return (
    <>
      <Outlet />

      <div className="grid h-full w-full grid-cols-2 grid-rows-1 gap-5">
        <div className="flex h-full w-full flex-col justify-between rounded-lg bg-white p-5 shadow">
          <Heading text="Variables" />

          <Table
            columns={columns}
            data={variableList}
            onRowClick={(variable) => {
              setSelectedVariable(variable);
              setSelectedView('management');
            }}
          />

          <Button
            text="Agregar Variable"
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

export default Variables;
