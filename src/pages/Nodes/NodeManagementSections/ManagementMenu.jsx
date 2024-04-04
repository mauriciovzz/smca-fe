import { React, useState } from 'react';

import { Divider, Heading } from 'src/components';

import UpdateComponents from './UpdateComponents';
import UpdateLocation from './UpdateLocation';
import UpdateName from './UpdateName';
import UpdateState from './UpdateState';
import UpdateType from './UpdateType';
import UpdateVisibility from './UpdateVisibility';

const OverviewButton = ({ title, onClick }) => (
  <button
    type="button"
    className="flex h-full w-full items-center justify-center rounded-lg border p-2.5 text-lg font-medium shadow hover:bg-background"
    onClick={() => onClick()}
  >
    {title}
  </button>
);

const Menu = ({ setView, changeView }) => (
  <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
    <Heading
      text="Modificar Nodo"
      hasButton
      onButtonClick={() => changeView(null)}
    />

    <Divider />

    <div className="grid grow grid-cols-2 grid-rows-3 gap-5">
      <OverviewButton
        title="Actualizar Nombre"
        onClick={() => setView('UpdateName')}
      />
      <OverviewButton
        title="Actualizar Estado"
        onClick={() => setView('UpdateState')}
      />
      <OverviewButton
        title="Actualizar Tipo"
        onClick={() => setView('UpdateType')}
      />
      <OverviewButton
        title="Actualizar Visibilidad"
        onClick={() => setView('UpdateVisibility')}
      />
      <OverviewButton
        title="Actualizar Ubicación"
        onClick={() => setView('UpdateLocation')}
      />
      <OverviewButton
        title="Actualizar Componentes"
        onClick={() => setView('UpdateComponents')}
      />
    </div>
  </div>
);

const ManagementMenu = ({
  selectedNode, nodeComponents, getNodeComponents, changeView, updateNodes,
}) => {
  const [view, setView] = useState(null);
  const isScreenSM = (window.innerWidth <= 640);

  const getCurrentVariables = () => {
    const sensors = nodeComponents.filter((nc) => nc.type === 'Sensor');
    const nodeVariables = [];

    sensors.forEach((s) => s.variables.forEach((v) => nodeVariables.push(v)));
    return nodeVariables;
  };

  const renderView = () => {
    switch (view) {
      case 'UpdateName':
        return (
          <UpdateName
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateState':
        return (
          <UpdateState
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateType':
        return (
          <UpdateType
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateVisibility':
        return (
          <UpdateVisibility
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateLocation':
        return (
          <UpdateLocation
            selectedNode={selectedNode}
            updateNodes={updateNodes}
            changeView={(value) => setView(value)}
          />
        );
      case 'UpdateComponents':
        return (
          <UpdateComponents
            selectedNode={selectedNode}
            currentComponents={nodeComponents.filter((nc) => nc.type !== 'Sensor de Lluvia')}
            currentRainSensor={nodeComponents.filter((nc) => nc.type === 'Sensor de Lluvia')}
            currentVariables={getCurrentVariables()}
            updateCurrentComponents={() => getNodeComponents()}
            changeView={(value) => setView(value)}
          />
        );
      case 'ManagementMenu':
        return (
          <ManagementMenu
            selectedNode={selectedNode}
            nodeComponents={nodeComponents}
            changeView={(value) => setView(value)}
          />
        );
      default:
        return (
          (isScreenSM)
            ? (
              <Menu
                changeView={changeView}
                setView={setView}
              />
            )
            : (
              <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
                <span>Selecciona una opción para realizar cambios.</span>
              </div>
            )
        );
    }
  };

  return (
    <div className="relative flex h-full w-full bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
      <div className="hidden h-full w-full bg-background sm:flex">
        <Menu
          changeView={changeView}
          setView={setView}
        />
      </div>

      <div className="flex h-full w-full bg-background">
        {renderView()}
      </div>
    </div>
  );
};

export default ManagementMenu;
