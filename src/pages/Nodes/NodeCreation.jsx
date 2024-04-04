import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { Divider, Heading } from 'src/components';
import componentsService from 'src/services/components';
import locationsService from 'src/services/locations';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

import ComponentSelection from './NodeCreationSections/ComponentSelection';
import LocationSelection from './NodeCreationSections/LocationSelection';
import NewNodeOverview from './NodeCreationSections/NewNodeOverview';
import NodeInformation from './NodeCreationSections/NodeInformation';
import SensorSelection from './NodeCreationSections/SensorSelection';
import VisibilitySelection from './NodeCreationSections/VisibilitySelection';
import NodeSuccessMessage from './NodeSuccessMessage';

const NodeCreation = ({ updateNodes, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [view, setView] = useState(null);
  const isScreenSM = (window.innerWidth <= 640);

  const [nodeTypes, setNodeTypes] = useState([]);
  const [components, setComponents] = useState([]);
  const [locations, setLocations] = useState([]);

  const [name, setName] = useState('');
  const [type, setType] = useState('Indoor');
  const [nodeComponents, setNodeComponents] = useState([]);
  const [rainSensor, setRainSensor] = useState(null);
  const [nodeVariables, setNodeVariables] = useState([]);
  const [location, setLocation] = useState({});
  const [visibility, setVisibility] = useState('Privado');

  const getTypes = async () => {
    try {
      const response = await nodesService.getTypes();
      setNodeTypes(response);
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

  const getLocations = async () => {
    try {
      const response = await locationsService.getAll(selectedWorkspace.workspace_id);
      setLocations(response.filter((loc) => !loc.is_taken));
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getTypes();
    getComponents();
    getLocations();
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

  const createNode = async () => {
    try {
      const requestData = {
        nodeName: name,
        nodeType: nodeTypes.find((t) => t.type === type).node_type_id,
        nodeComponents: nodeComponents.map((c) => c.component_id),
        nodeVariables: nodeVariables.map(
          (v) => ({ component_id: v.component_id, variable_id: v.variable_id }),
        ),
        nodeLocation: location.location_id,
        nodeVisibility: !(visibility === 'Privado'),
      };

      if (rainSensor) {
        requestData.rainSensor = {
          component_id: rainSensor.component_id,
          variable_id: rainSensor.variables[0].variable_id,
        };
      }

      await nodesService.create(
        selectedWorkspace.workspace_id,
        requestData,
      );

      updateNodes();
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
            title="Nodo Creado Exitosamente"
            includeCodeMessage
            close={() => changeView()}
          />
        );
      case 'NewNodeOverview':
        return (
          <NewNodeOverview
            name={name}
            type={type}
            visibility={visibility}
            location={location}
            nodeComponents={nodeComponents}
            nodeVariables={nodeVariables}
            rainSensor={rainSensor ? [rainSensor] : []}
            createNode={() => createNode()}
            isScreenSM={isScreenSM}
            leftButtonClick={() => setView('VisibilitySelection')}
          />
        );
      case 'VisibilitySelection':
        return (
          <VisibilitySelection
            visibility={visibility}
            setVisibility={setVisibility}
            rightButtonClick={isScreenSM ? () => setView('NewNodeOverview') : null}
            leftButtonClick={() => setView('LocationSelection')}
          />
        );
      case 'LocationSelection':
        return (
          <LocationSelection
            locations={locations}
            updateLocations={() => getLocations()}
            selectedLocation={location}
            setLocation={setLocation}
            rightButtonClick={() => setView('VisibilitySelection')}
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
            leftButtonClick={() => setView('RainSensorSelection')}
          />
        );
      case 'RainSensorSelection':
        return (
          <ComponentSelection
            text="Selecionar Sensor de Lluvia"
            components={components.filter((c) => c.type === 'Sensor de Lluvia')}
            updateComponents={() => getComponents()}
            selectedComponents={rainSensor ? [rainSensor] : []}
            selectComponent={(component) => setRainSensor(component)}
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
      case 'BoardSelection':
        return (
          <ComponentSelection
            text="Selecionar Placas"
            components={components.filter((c) => c.type === 'Placa')}
            updateComponents={() => getComponents()}
            selectedComponents={nodeComponents}
            selectComponent={(component) => handleComponentSelection(component)}
            rightButtonClick={() => setView('SensorSelection')}
            leftButtonClick={() => setView(null)}
          />
        );
      default:
        return (
          <NodeInformation
            name={name}
            setName={setName}
            type={type}
            setType={setType}
            rightButtonClick={() => setView('BoardSelection')}
          />
        );
    }
  };

  return (

    <div className="relative flex h-full w-full bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
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

      <div className="hidden h-full w-full bg-background sm:flex">
        <NewNodeOverview
          name={name}
          type={type}
          visibility={visibility}
          location={location}
          nodeComponents={nodeComponents}
          nodeVariables={nodeVariables}
          rainSensor={rainSensor ? [rainSensor] : []}
          createNode={() => createNode()}
          isScreenSM={isScreenSM}
          leftButtonClick={() => setView('VisibilitySelection')}
        />
      </div>
    </div>
  );
};

export default NodeCreation;
