import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Badge, Button, Divider, Heading, SelectionBar,
} from 'src/components';
import componentsService from 'src/services/components';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

import ComponentSelection from '../NodeCreationSections/ComponentSelection';
import SensorSelection from '../NodeCreationSections/SensorSelection';
import NodeSuccessMessage from '../NodeSuccessMessage';

const NewComponentsOverview = ({
  nodeComponents, nodeVariables, handleComponentsUpdate, leftButtonClick,
}) => {
  const isVariableSelected = (variable) => (
    nodeVariables
      .find(
        (nv) => nv.component_id === variable.component_id
          && nv.variable_id === variable.variable_id,
      )
  );

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-2.5">
      <SelectionBar
        text="Confirmar Cambios"
        leftAction={leftButtonClick}
      />

      <Divider changePadding="p-[5px]" />

      <div className="flex h-full w-full flex-col space-y-2.5">
        <div className="flex grow flex-col">
          <div className="relative flex grow overflow-hidden rounded-lg border">
            <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-scroll bg-background">
              {
                nodeComponents
                  .sort((a, b) => (
                    a.component_type_id - b.component_type_id
                    || a.name.localeCompare(b.name)
                  ))
                  .map((component) => (
                    <li
                      key={component.component_id}
                      className="h-fit w-full border-b bg-white p-2.5 shadow"
                    >
                      <div className="flex h-full w-full flex-col">
                        <div className="flex w-full items-center justify-between">
                          <div className="h-fit w-3/4 break-words font-medium">
                            {component.name}
                          </div>
                          <div className="flex w-1/4 justify-end">
                            <Badge value={component.type} />
                          </div>
                        </div>
                        {
                          (component.type === 'Sensor') && (
                            <ul className="flex flex-col">
                              <Divider changePadding="p-[5px]" changeColor="border-black" />

                              {
                                component.variables
                                  .filter((variable) => isVariableSelected(variable))
                                  .sort((a, b) => (
                                    a.variable_type_id - b.variable_type_id
                                    || a.name.localeCompare(b.name)
                                  ))
                                  .map((variable) => (
                                    <li
                                      key={`${component.component_id}${variable.variable_id}`}
                                      className="pt-[5px]"
                                    >
                                      <div>
                                        {variable.name}
                                      </div>
                                    </li>
                                  ))
                              }
                            </ul>
                          )
                        }
                      </div>
                    </li>
                  ))
              }
            </ul>
          </div>
        </div>

        <Button
          text="Guardar Cambios"
          typeIsButton
          onClick={() => handleComponentsUpdate()}
          color="blue"
        />
      </div>
    </div>
  );
};

const UpdateComponents = ({
  selectedNode, currentComponents, currentRainSensor, currentVariables,
  updateCurrentComponents, changeView,
}) => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);

  const [components, setComponents] = useState([]);

  const [nodeComponents, setNodeComponents] = useState(currentComponents);
  const [rainSensor, setRainSensor] = useState(currentRainSensor);
  const [nodeVariables, setNodeVariables] = useState(currentVariables);

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

  const handleComponentSelection = (component) => {
    if (nodeComponents.map((nc) => nc.component_id).includes(component.component_id)) {
      setNodeComponents(nodeComponents.filter((nc) => nc.component_id !== component.component_id));
    } else {
      setNodeComponents([
        ...nodeComponents,
        component,
      ]);
    }
  };

  const isVariableSelected = (component, variable) => (
    nodeVariables.find(
      (nv) => nv.component_id === component.component_id && nv.variable_id === variable.variable_id,
    )
  );

  const handleVariableSelection = (component, variable) => {
    if (isVariableSelected(component, variable)) {
      const newNodeVariables = nodeVariables.filter(
        (nv) => !(
          nv.component_id === component.component_id && nv.variable_id === variable.variable_id
        ),
      );
      setNodeVariables(newNodeVariables);

      if (!newNodeVariables.map((nv) => nv.component_id).includes(component.component_id)) {
        setNodeComponents(
          nodeComponents.filter((nc) => nc.component_id !== component.component_id),
        );
      }
    } else {
      variable.component_id = component.component_id;

      setNodeVariables([
        ...nodeVariables,
        variable,
      ]);

      if (!nodeComponents.map((nc) => nc.component_id).includes(component.component_id)) {
        setNodeComponents([
          ...nodeComponents,
          component,
        ]);
      }
    }
  };

  const handleComponentsUpdate = async () => {
    try {
      if (rainSensor.length === 1) {
        nodeComponents.push(rainSensor[0]);
      }

      await nodesService.updateComponents(
        selectedWorkspace.workspace_id,
        selectedNode.node_id,
        {
          nodeComponents: nodeComponents.map((c) => c.component_id),
          nodeVariables: nodeVariables.map(
            (v) => ({ component_id: v.component_id, variable_id: v.variable_id }),
          ),
        },
      );

      updateCurrentComponents();
      setView('NodeSuccessMessage');
    } catch (err) {
      notifications.error(err);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'NodeSuccessMessage':
        return (
          <NodeSuccessMessage
            title="Actualizacion Exitosa"
            includeCodeMessage
            close={() => changeView('ManagementMenu')}
          />
        );
      case 'NewComponentsOverview':
        return (
          <NewComponentsOverview
            nodeComponents={nodeComponents}
            nodeVariables={nodeVariables}
            handleComponentsUpdate={handleComponentsUpdate}
            leftButtonClick={() => setView('OtherSelection')}
          />
        );
      case 'OtherSelection':
        return (
          <ComponentSelection
            text="Selecionar Otros"
            components={components.filter((c) => c.type === 'Otro')}
            updateComponents={() => getComponents()}
            selectedComponents={nodeComponents}
            selectComponent={(component) => handleComponentSelection(component)}
            rightButtonClick={() => setView('NewComponentsOverview')}
            leftButtonClick={() => setView('ScreenSelection')}
          />
        );
      case 'ScreenSelection':
        return (
          <ComponentSelection
            text="Selecionar Pantalla"
            components={components.filter((c) => c.type === 'Pantalla')}
            updateComponents={() => getComponents()}
            selectedComponents={nodeComponents}
            selectComponent={(component) => handleComponentSelection(component)}
            rightButtonClick={() => setView('OtherSelection')}
            leftButtonClick={() => setView('CameraSelection')}
          />
        );
      case 'CameraSelection':
        return (
          <ComponentSelection
            text="Selecionar Camara"
            components={components.filter((c) => c.type === 'Camara')}
            updateComponents={() => getComponents()}
            selectedComponents={nodeComponents}
            selectComponent={(component) => handleComponentSelection(component)}
            rightButtonClick={() => setView('ScreenSelection')}
            leftButtonClick={() => setView('RainSensorSelection')}
          />
        );
      case 'RainSensorSelection':
        return (
          <ComponentSelection
            text="Selecionar Sensor de Lluvia"
            components={components.filter((c) => c.type === 'Sensor de Lluvia')}
            updateComponents={() => getComponents()}
            selectedComponents={rainSensor}
            selectComponent={(component) => setRainSensor([component])}
            rightButtonClick={() => setView('CameraSelection')}
            leftButtonClick={() => setView('SensorSelection')}
          />
        );
      case 'SensorSelection':
        return (
          <SensorSelection
            sensors={components.filter((c) => c.type === 'Sensor')}
            updateComponents={() => getComponents()}
            selectedComponents={nodeComponents}
            selectedVariables={nodeVariables}
            selectVariable={(component, variable) => handleVariableSelection(component, variable)}
            rightButtonClick={() => setView('RainSensorSelection')}
            leftButtonClick={() => setView('BoardSelection')}
          />
        );
      default:
        return (
          <ComponentSelection
            text="Selecionar Placas"
            components={components.filter((c) => c.type === 'Placa')}
            updateComponents={() => getComponents()}
            selectedComponents={nodeComponents}
            selectComponent={(component) => handleComponentSelection(component)}
            rightButtonClick={() => setView('SensorSelection')}
          />
        );
    }
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Componentes"
          hasButton
          onButtonClick={() => changeView('ManagementMenu')}
        />

        <Divider />

        {renderView()}
      </div>
    </div>
  );
};

export default UpdateComponents;
