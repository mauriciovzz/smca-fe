import { React, useState } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';

import { successIcon } from 'src/assets';
import { Button } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';
import {
  EnterNodeInformation, EnterNodeComponents, EnterNodeLocation, NewNodeOverview,
} from 'src/pages/SpaceNodes/NodeCreation';
import notificationHelper from 'src/utils/notificationHelper';

const NodeCreationSuccessMessage = ({ onClose }) => (
  <div className="flex grow flex-col bg-white">
    <div className="flex grow flex-col">
      <div className="flex flex-col items-center justify-center gap-[5px] border-b py-2.5">
        <img
          src={successIcon}
          alt="success icon"
          className="size-[30px]"
        />
        <div className="text-center font-bold">
          Nodo Creado Exitosamente
        </div>
      </div>

      <p className="border-b py-2.5 text-justify text-sm text-gray-500">
        {`
          El nodo se encuentra actualmente en estado 'Inactivo'.
          Cuando el mismo esté funcionando en la ubicación indicada,
          cambia su estado a 'Activo' en la sección 'Modificar'.
        `}
      </p>

      <p className="py-2.5 text-justify text-sm text-gray-500">
        {`
          Para acceder a la información necesaria para la codificacion del nodo,
          dirígete al apartado 'Descargar Configuración'.
        `}
      </p>
    </div>

    <Button
      text="Regresar"
      isTypeButton
      onClick={() => onClose()}
      color="blue"
    />
  </div>
);

const NodeCreationRoot = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const isScreenSmall = useScreenWidth();
  const navigate = useNavigate();

  const {
    spaceData,
    locationsData, updateLocationsData,
    componentsData, updateComponentsData,
    variablesData, updateVariablesData,
    updateNodesData,
  } = useOutletContext();

  const [view, setView] = useState(null);
  const [nodeCreated, setNodeCreated] = useState(false);

  const [name, setName] = useState('');
  const [isIndoor, setIsIndoor] = useState(true);
  const [location, setLocation] = useState(null);
  const [components, setComponents] = useState([]);

  const handleComponentSelection = (selection) => {
    if (selection.type === 'component') {
      const position = components.findIndex((c) => c.component_id === selection.component_id);

      if (position !== -1) {
        setComponents(components.toSpliced(position, 1));
      } else {
        setComponents([
          ...components,
          { component_id: selection.component_id },
        ]);
      }
    }

    if (selection.type === 'variable') {
      const position = components.findIndex(
        (c) => c.component_id === selection.component_id && c.variable_id === selection.variable_id,
      );

      if (position !== -1) {
        setComponents(components.toSpliced(position, 1));
      } else {
        setComponents([
          ...components,
          { component_id: selection.component_id, variable_id: selection.variable_id },
        ]);
      }
    }
  };

  const handleLocationSelection = (selection) => {
    if (selection === location)
      setLocation(null);
    else
      setLocation(selection);
  };

  const componentsOverviewReducer = (accumulator, currentValue) => {
    const position = accumulator.findIndex(
      (ac) => ac.component_id === currentValue.component_id,
    );

    if (position !== -1) {
      const variableInfo = variablesData
        .find((vd) => vd.variable_id === currentValue.variable_id);

      accumulator[position].variables.push({
        variable_id: variableInfo.variable_id,
        name: variableInfo.name,
      });
    } else {
      const componentInfo = componentsData
        .find((cd) => cd.component_id === currentValue.component_id);

      const newEntry = {
        component_id: currentValue.component_id,
        name: componentInfo.name,
        type: componentInfo.type,
        variables: [],
      };

      if (currentValue.variable_id) {
        const variableInfo = variablesData
          .find((vd) => vd.variable_id === currentValue.variable_id);

        newEntry.variables.push({
          variable_id: variableInfo.variable_id,
          name: variableInfo.name,
        });
      }

      accumulator.push(newEntry);
    }
    return accumulator;
  };

  const componentsSubmitReducer = (accumulator, currentValue) => {
    const position = accumulator.findIndex(
      (ac) => ac.componentId === currentValue.component_id,
    );

    if (position !== -1) {
      accumulator[position].variables.push(currentValue.variable_id);
    } else {
      const componentInfo = componentsData
        .find((cd) => cd.component_id === currentValue.component_id);

      const newEntry = {
        componentId: currentValue.component_id,
        type: componentInfo.type,
        variables: [],
      };

      if (currentValue.variable_id)
        newEntry.variables.push(currentValue.variable_id);

      accumulator.push(newEntry);
    }
    return accumulator;
  };

  const handleNodeCreation = async () => {
    const nodeComponents = components.reduce(componentsSubmitReducer, []);

    // check name
    if (!name || !name.trim())
      return notificationHelper.error('El nodo necesita un nombre.');

    if (name.length > 15)
      return notificationHelper.error('El nombre del nodo puede tener maximo 15 caracteres.');

    // check components min / max values
    const componentsCount = nodeComponents.reduce(
      (componentTypes, currentObj) => {
        if (componentTypes[currentObj.type] !== undefined)
          componentTypes[currentObj.type] += 1;

        return componentTypes;
      },
      {
        board: 0, sensor: 0, rain_detector: 0, camera: 0,
      },
    );

    if (componentsCount.board === 0)
      return notificationHelper.error('El nodo necesita por lo menos una placa.');

    if (componentsCount.sensor + componentsCount.camera + componentsCount.rain_detector === 0)
      return notificationHelper.error('El nodo necesita por lo menos un componente que realice algún tipo de lectura (sensor, detector de lluvia o cámara).');

    if (componentsCount.rain_detector > 1)
      return notificationHelper.error('El nodo solo puede poseer un detector de lluvia.');

    if (componentsCount.camera > 1)
      return notificationHelper.error('El nodo solo puede poseer una camara.');

    const nodeVariablesCount = nodeComponents.reduce(
      (accumulator, currentObj) => (currentObj.variables.length !== 0
        ? currentObj.variables.length + accumulator
        : accumulator
      ),
      0,
    );

    if (nodeVariablesCount + componentsCount.rain_detector === 0)
      return notificationHelper.error('El nodo necesita por lo menos 1 variable.');

    if (nodeVariablesCount > 11)
      return notificationHelper.error('El nodo solo puede poseer 11 variables.');

    try {
      await axiosPrivate.post(
        `/api/spaces/${spaceData.space_id}/nodes`,
        {
          name,
          isIndoor,
          readingInterval: 10,
          locationId: location,
          components: nodeComponents,
        },
      );

      updateNodesData();
      setNodeCreated(true);
      setView('NodeCreationSuccessMessage');
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      if (errorMessage === 'LocationDoesNotExist' || errorMessage === 'LocationInUse') {
        notificationHelper.error(
          (errorMessage === 'LocationDoesNotExist')
            ? 'La ubicacion indicada no se encuentra registrada.'
            : 'La ubicacion indicada se encuentra en uso.',
        );
        setLocation(null);
        updateLocationsData();
      } else if (errorMessage === 'VariableDoesNotExist') {
        notificationHelper.error('Una de las variables no se encuentra registrada.');
        setComponents([]);
        updateVariablesData();
      } else if (errorMessage === 'ComponentDoesNotExist') {
        notificationHelper.error('Uno de los componente no se encuentra registrado.');
        setComponents([]);
        updateComponentsData();
      } else {
        errorHandler(error);
      }
    }

    return null;
  };

  const renderView = () => {
    switch (view) {
      case 'NodeCreationSuccessMessage':
        return (
          <NodeCreationSuccessMessage
            onClose={() => navigate('..')}
          />
        );
      case 'NewNodeOverview':
        return (
          <NewNodeOverview
            name={name}
            readingInterval={10}
            isIndoor={isIndoor}
            location={locationsData.find((l) => l.location_id === location)}
            components={components.reduce(componentsOverviewReducer, [])}
            handleNodeCreation={() => handleNodeCreation()}
            previousPage={() => setView('LocationSelection')}
            isScreenSmall={isScreenSmall}
            nodeCreated={nodeCreated}
          />
        );
      case 'LocationSelection':
        return (
          <EnterNodeLocation
            spaceLocationsData={locationsData.filter((loc) => !loc.is_taken)}
            spaceData={spaceData}
            selectedLocation={location}
            selectLocation={handleLocationSelection}
            previousPage={() => setView('OtherSelection')}
            nextPage={isScreenSmall ? () => setView('NewNodeOverview') : null}
          />
        );
      case 'OtherSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Otros"
            spaceComponentsData={componentsData.filter((c) => c.type === 'other')}
            selectedComponents={components}
            selectComponent={(selection) => handleComponentSelection(selection)}
            previousPage={() => setView('CameraSelection')}
            nextPage={() => setView('LocationSelection')}
          />
        );
      case 'CameraSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Camara"
            spaceComponentsData={componentsData.filter((c) => c.type === 'camera')}
            selectedComponents={components}
            selectComponent={(selection) => handleComponentSelection(selection)}
            previousPage={() => setView('SensorSelection')}
            nextPage={() => setView('OtherSelection')}
          />
        );
      case 'SensorSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Sensores"
            spaceComponentsData={componentsData.filter((c) => c.type === 'sensor')}
            selectedComponents={components}
            selectComponent={(selection) => handleComponentSelection(selection)}
            isSensorSelector
            previousPage={() => setView('BoardSelection')}
            nextPage={() => setView('CameraSelection')}
          />
        );
      case 'BoardSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Placas"
            spaceComponentsData={componentsData.filter((c) => c.type === 'board')}
            selectedComponents={components}
            selectComponent={(selection) => handleComponentSelection(selection)}
            previousPage={() => setView(null)}
            nextPage={() => setView('SensorSelection')}
          />
        );
      default:
        return (
          <EnterNodeInformation
            name={{ name, setName }}
            isIndoor={{ isIndoor, setIsIndoor }}
            nextPage={() => setView('BoardSelection')}
          />
        );
    }
  };

  return (
    <div className="relative flex size-full bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
      <div className="relative flex size-full flex-col rounded-lg bg-white p-5 shadow">
        <div className="flex grow flex-col">
          <Heading
            text="Agregar Nodo"
            hasButton
            onButtonClick={() => navigate('..')}
          />

          <Divider changeBottomPadding="p-0" />

          {renderView()}
        </div>
      </div>

      <div className="hidden size-full bg-background sm:flex">
        <NewNodeOverview
          name={name}
          readingInterval={10}
          isIndoor={isIndoor}
          location={locationsData.find((l) => l.location_id === location)}
          components={components.reduce(componentsOverviewReducer, [])}
          handleNodeCreation={() => handleNodeCreation()}
          isScreenSmall={isScreenSmall}
          nodeCreated={nodeCreated}
        />
      </div>
    </div>
  );
};

export default NodeCreationRoot;
