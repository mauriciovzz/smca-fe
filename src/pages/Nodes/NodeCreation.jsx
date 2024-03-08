import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { Divider, Heading } from 'src/components';
import componentsService from 'src/services/components';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

import ComponentSelection from './NodeCreationSections/ComponentSelection';
import CreateNewNode from './NodeCreationSections/CreateNewNode';
import LocationSelection from './NodeCreationSections/LocationSelection';
import NewNodeSummary from './NodeCreationSections/NewNodeSummary';
import SensorSelection from './NodeCreationSections/SensorSelection';
import TypeSelection from './NodeCreationSections/TypeSelection';

const NodeCreation = ({ updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);

  const [components, setComponents] = useState([]);

  const [nodeComponents, setNodeComponents] = useState([]);
  const [nodeVariables, setNodeVariables] = useState([]);
  const [nodeLocation, setNodeLocation] = useState('');
  const [nodeType, setNodeType] = useState({});
  const [nodeVisibility, setNodeVisibility] = useState({});

  const createNode = async () => {
    try {
      const response = await nodesService.create(
        selectedWorkspace.workspace_id,
        {
          nodeComponents: nodeComponents.map((c) => c.component_id),
          nodeVariables: nodeVariables.map(
            (v) => ({ component_id: v.component_id, variable_id: v.variable_id }),
          ),
          nodeLocation: nodeLocation.location_id,
          nodeType: nodeType.node_type_id,
          nodeVisibility: nodeVisibility.is_visible,
        },
      );
      notifications.success(response);

      updateNodes();
      changeView();
    } catch (err) {
      notifications.error(err);
    }
  };

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

  const renderView = () => {
    switch (view) {
      case 'CreateNewNode':
        return (
          <CreateNewNode
            createNode={() => createNode()}
            leftButtonClick={() => setView('NewNodeSummary')}
          />
        );
      case 'NewNodeSummary':
        return (
          <NewNodeSummary
            nodeComponents={nodeComponents}
            nodeVariables={nodeVariables}
            nodeLocation={nodeLocation}
            nodeType={nodeType}
            nodeVisibility={nodeVisibility}
            rightButtonClick={() => setView('CreateNewNode')}
            leftButtonClick={() => setView('TypeSelection')}
          />
        );
      case 'TypeSelection':
        return (
          <TypeSelection
            SelectedType={nodeType}
            selectType={(newType) => setNodeType(JSON.parse(newType))}
            selectedVisibility={nodeVisibility}
            selectVisibility={(newVisiblity) => setNodeVisibility(JSON.parse(newVisiblity))}
            rightButtonClick={() => setView('NewNodeSummary')}
            leftButtonClick={() => setView('LocationSelection')}
          />
        );
      case 'LocationSelection':
        return (
          <LocationSelection
            selectedLocation={nodeLocation}
            selectLocation={(location) => setNodeLocation(location)}
            rightButtonClick={() => setView('TypeSelection')}
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
            rightButtonClick={() => setView('LocationSelection')}
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
            rightButtonClick={() => setView('CameraSelection')}
            leftButtonClick={() => setView(null)}
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
          text="Agregar Nodo"
          hasButton
          onButtonClick={() => changeView()}
        />

        <Divider />

        {renderView()}
      </div>
    </div>
  );
};

export default NodeCreation;
