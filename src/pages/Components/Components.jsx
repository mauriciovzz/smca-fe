import {
  React, useState, useEffect,
} from 'react';

import { useOutletContext } from 'react-router-dom';

import componentsService from 'src/services/components';
import notifications from 'src/utils/notifications';

import ComponentCreation from './ComponentCreation';
import ComponentList from './ComponentList';
import ComponentManagement from './ComponentManagement';

const Components = () => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);

  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const isScreenSM = (window.innerWidth <= 640);

  const getComponents = async () => {
    try {
      const response = await componentsService.getAll(selectedWorkspace.workspace_id);
      setComponents(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getComponents();
  }, []);

  const selectComponent = (variable) => {
    setSelectedComponent(variable);
    setView('ComponentManagement');
  };

  const renderView = () => {
    switch (view) {
      case 'ComponentCreation':
        return (
          <ComponentCreation
            updateComponents={() => getComponents()}
            changeView={() => setView(null)}
          />
        );
      case 'ComponentManagement':
        return (
          <ComponentManagement
            selectedComponent={selectedComponent}
            updateComponents={() => getComponents()}
            changeView={() => setView(null)}
          />
        );
      default:
        return (
          (isScreenSM)
            ? (
              <ComponentList
                components={components}
                selectComponent={(component) => selectComponent(component)}
                changeView={() => setView('ComponentCreation')}
              />
            )
            : (
              <div className="flex w-full flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
                <span>Selecciona un componente de la lista para gestionarlo</span>
                <span>o el botón ⊕ para crear uno nuevo.</span>
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
              <ComponentList
                components={components}
                selectComponent={(component) => selectComponent(component)}
                changeView={() => setView('ComponentCreation')}
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

export default Components;
