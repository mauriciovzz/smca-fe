import { React, useState } from 'react';

import {
  useNavigate, useLoaderData, redirect, useOutletContext,
} from 'react-router-dom';

import { Divider, Heading } from 'src/components/ui';
import useScreenWidth from 'src/hooks/useScreenWidth';
import {
  EnterNodeInformation, EnterNodeComponents, EnterNodeLocation,
  NewNodeOverview, NewNodeCreationSuccess,
} from 'src/pages/SpaceNodes/NodeCreation';
import componentsService from 'src/services/components';
import locationsService from 'src/services/locations';
import nodesService from 'src/services/nodes';
import variablesService from 'src/services/variables';
import notificationHelper from 'src/utils/notificationHelper';

export const nodeCreationLoader = async (auth, params, loaderErrors) => {
  if (!auth) {
    return redirect('/');
  }

  try {
    const componentsData = await componentsService.getAll(params.spaceId);
    const variablesData = await variablesService.getAll(params.spaceId);
    const locationsData = await locationsService.getAll(params.spaceId);

    return { componentsData, variablesData, locationsData };
  } catch (error) {
    const errorMessage = error.response.data.message;

    const errorData = loaderErrors.find((err) => err.errorMessage === errorMessage);

    if (errorData) {
      if (errorData.showMessage)
        notificationHelper.errorMsg(errorData.errorMessage);

      return redirect(errorData.redirectTo);
    }

    return null;
  }
};

const NodeCreation = () => {
  const { spaceData, updateSelectedSpaceRoot, errorHandler } = useOutletContext();
  const { componentsData, variablesData, locationsData } = useLoaderData();
  const isScreenSmall = useScreenWidth();
  const navigate = useNavigate();

  const [view, setView] = useState(null);
  const [nodeCreated, setNodeCreated] = useState(false);

  const [name, setName] = useState('');
  const [readingInterval, setReadingInterval] = useState(15);
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
      return notificationHelper.errorMsg('El nodo necesita un nombre.');

    if (name.length > 15)
      return notificationHelper.errorMsg('El nombre del nodo puede tener maximo 15 caracteres.');

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
      return notificationHelper.errorMsg('El nodo necesita por lo menos una placa.');

    if (componentsCount.sensor + componentsCount.camera + componentsCount.rain_detector === 0)
      return notificationHelper.errorMsg('El nodo necesita por lo menos un componente que realice algún tipo de lectura (sensor, detector de lluvia o cámara).');

    if (componentsCount.rain_detector > 1)
      return notificationHelper.errorMsg('El nodo solo puede poseer un detector de lluvia.');

    if (componentsCount.camera > 1)
      return notificationHelper.errorMsg('El nodo solo puede poseer una camara.');

    const nodeVariablesCount = nodeComponents.reduce(
      (accumulator, currentObj) => (currentObj.variables.length !== 0
        ? currentObj.variables.length + accumulator
        : accumulator
      ),
      0,
    );

    if (nodeVariablesCount + componentsCount.rain_detector === 0)
      return notificationHelper.errorMsg('El nodo necesita por lo menos 1 variable.');

    if (nodeVariablesCount > 11)
      return notificationHelper.errorMsg('El nodo solo puede poseer 11 variables.');

    try {
      await nodesService.create(
        spaceData.space_id,
        {
          name,
          isIndoor,
          readingInterval,
          locationId: location,
          components: nodeComponents,
        },
      );

      updateSelectedSpaceRoot();
      setNodeCreated(true);
      setView('NewNodeCreationSuccess');
    } catch (error) {
      const goTo = errorHandler(error, updateSelectedSpaceRoot);

      if (goTo)
        navigate(goTo);
    }

    return null;
  };

  const renderView = () => {
    switch (view) {
      case 'NewNodeCreationSuccess':
        return (
          <NewNodeCreationSuccess
            onClose={() => navigate('..')}
          />
        );
      case 'NewNodeOverview':
        return (
          <NewNodeOverview
            name={name}
            readingInterval={readingInterval}
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
            locationsData={locationsData.filter((loc) => !loc.is_taken)}
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
            color="bg-main"
            componentsData={componentsData.filter((c) => c.type === 'other')}
            variablesData={variablesData}
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
            color="bg-main"
            componentsData={componentsData.filter((c) => c.type === 'camera')}
            variablesData={variablesData}
            selectedComponents={components}
            selectComponent={(selection) => handleComponentSelection(selection)}
            previousPage={() => setView('RainDetectorSelection')}
            nextPage={() => setView('OtherSelection')}
          />
        );
      case 'RainDetectorSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Detector de Lluvia"
            color="bg-main"
            componentsData={componentsData.filter((c) => c.type === 'rain_detector')}
            variablesData={variablesData}
            selectedComponents={components}
            selectComponent={(selection) => handleComponentSelection(selection)}
            previousPage={() => setView('SensorSelection')}
            nextPage={() => setView('CameraSelection')}
          />
        );
      case 'SensorSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Sensores"
            color="bg-main"
            componentsData={componentsData.filter((c) => c.type === 'sensor')}
            variablesData={variablesData}
            selectedComponents={components}
            selectComponent={(selection) => handleComponentSelection(selection)}
            isSensorSelector
            previousPage={() => setView('BoardSelection')}
            nextPage={() => setView('RainDetectorSelection')}
          />
        );
      case 'BoardSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Placas"
            color="bg-main"
            componentsData={componentsData.filter((c) => c.type === 'board')}
            variablesData={variablesData}
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
            readingInterval={{ readingInterval, setReadingInterval }}
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
          readingInterval={readingInterval}
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

export default NodeCreation;
