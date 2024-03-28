import {
  React, useState, useEffect,
} from 'react';

import { useOutletContext } from 'react-router-dom';

import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

import VariableCreation from './VariableCreation';
import VariableList from './VariableList';
import VariableManagement from './VariableManagement';

const Variables = () => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);

  const [variables, setVariables] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState(null);
  const isScreenSM = (window.innerWidth <= 640);

  const getVariables = async () => {
    try {
      const response = await variablesService.getAll(selectedWorkspace.workspace_id);
      setVariables(response);

      if (selectedVariable) {
        const updatedVariable = response.find(
          (r) => r.variable_id === selectedVariable.variable_id,
        );
        setSelectedVariable(updatedVariable);
      }
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getVariables();
  }, []);

  const selectVariable = (variable) => {
    setSelectedVariable(variable);
    setView('VariableManagement');
  };

  const renderView = () => {
    switch (view) {
      case 'VariableCreation':
        return (
          <VariableCreation
            updateVariables={() => getVariables()}
            changeView={() => setView(null)}
          />
        );
      case 'VariableManagement':
        return (
          <VariableManagement
            selectedVariable={selectedVariable}
            updateVariables={() => getVariables()}
            changeView={() => setView(null)}
          />
        );
      default:
        return (
          (isScreenSM)
            ? (
              <VariableList
                variables={variables}
                selectVariable={(variable) => selectVariable(variable)}
                changeView={() => setView('VariableCreation')}
              />
            )
            : (
              <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
                <span>Selecciona una variable de la lista para gestionarla</span>
                <span>o el botón ⊕ para crear una nueva.</span>
              </div>
            )
        );
    }
  };

  return (
    <div className="flex grow flex-col">
      <div className="flex grow bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
        {
          !isScreenSM && (
            <div className="grow bg-background sm:flex">
              <VariableList
                variables={variables}
                selectVariable={(variable) => selectVariable(variable)}
                changeView={() => setView('VariableCreation')}
              />
            </div>
          )
        }

        <div className="flex grow bg-background">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default Variables;
