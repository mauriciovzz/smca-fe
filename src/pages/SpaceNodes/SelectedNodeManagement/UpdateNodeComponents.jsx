import { React, useState } from 'react';

import { useNavigate, useOutletContext, useLoaderData } from 'react-router-dom';

import { Button, SelectionBar, ComponentListItem } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import { EnterNodeComponents } from 'src/pages/SpaceNodes/NodeCreation';
import nodesService from 'src/services/nodes';
import notificationHelper from 'src/utils/notificationHelper';

const ComponentsUpdated = () => {
  const oc = 'components updated';

  return (
    <div>{ oc }</div>
  );
};

const NewComponentsOverview = ({
  components, handleComponentsUpdate, previousPage, onCancel,
}) => (
  <div className="relative flex size-full flex-col gap-5 rounded-lg bg-white">
    <SelectionBar text="Confirmar Componentes" leftAction={previousPage} />

    <div className="flex size-full flex-col gap-2.5 sm:gap-5">
      <div className="relative flex grow flex-col">
        <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
          {components.filter((c) => c.type === 'board').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
          {components.filter((c) => c.type === 'sensor').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
          {components.filter((c) => c.type === 'rain_detector').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
          {components.filter((c) => c.type === 'camera').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
          {components.filter((c) => c.type === 'other').map((component) => <ComponentListItem component={component} key={`${component.component_id}`} />)}
        </ul>
      </div>

      <div className="flex gap-2.5">
        <Button
          text="Cancelar"
          isTypeButton
          onClick={() => onCancel()}
          color="red"
        />
        <Button
          text="Actualizar Componentes"
          isTypeButton
          onClick={() => handleComponentsUpdate()}
          color="blue"
        />
      </div>
    </div>
  </div>
);

const UpdateNodeComponents = () => {
  const {
    spaceData, selectedNode, componentsData,
    updateSelectedSpaceRoot, errorHandler,
  } = useOutletContext();
  const { spaceComponentsData, spaceVariablesData } = useLoaderData();
  const navigate = useNavigate();

  const formatCurrentComponents = (currentComponents) => {
    const formatedComponents = [];

    for (let i = 0; i < currentComponents.length; i += 1) {
      if (currentComponents[i].variables.length === 0) {
        formatedComponents.push({
          component_id: currentComponents[i].component_id,
        });
      } else {
        for (let j = 0; j < currentComponents[i].variables.length; j += 1) {
          formatedComponents.push({
            component_id: currentComponents[i].component_id,
            variable_id: currentComponents[i].variables[j].variable_id,
          });
        }
      }
    }

    return formatedComponents;
  };

  const [view, setView] = useState('BoardSelection');
  const [components, setComponents] = useState(formatCurrentComponents(componentsData));

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

  const componentsOverviewReducer = (accumulator, currentValue) => {
    const position = accumulator.findIndex(
      (ac) => ac.component_id === currentValue.component_id,
    );

    if (position !== -1) {
      const variableInfo = spaceVariablesData
        .find((vd) => vd.variable_id === currentValue.variable_id);

      accumulator[position].variables.push({
        variable_id: variableInfo.variable_id,
        name: variableInfo.name,
      });
    } else {
      const componentInfo = spaceComponentsData
        .find((cd) => cd.component_id === currentValue.component_id);

      const newEntry = {
        component_id: currentValue.component_id,
        name: componentInfo.name,
        type: componentInfo.type,
        variables: [],
      };

      if (currentValue.variable_id) {
        const variableInfo = spaceVariablesData
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
      const componentInfo = spaceComponentsData
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

  const handleComponentsUpdate = async () => {
    const nodeComponents = components.reduce(componentsSubmitReducer, []);

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
      await nodesService.updateComponents(
        spaceData.space_id,
        selectedNode.node_id,
        { components: nodeComponents },
      );

      updateSelectedSpaceRoot();
      setView('ComponentsUpdated');
    } catch (error) {
      const goTo = errorHandler(error, updateSelectedSpaceRoot);

      if (goTo)
        navigate(goTo);
    }

    return null;
  };

  const renderView = () => {
    switch (view) {
      case 'ComponentsUpdated':
        return (
          <ComponentsUpdated />
        );
      case 'NewComponentsOverview':
        return (
          <NewComponentsOverview
            components={components.reduce(componentsOverviewReducer, [])}
            handleComponentsUpdate={() => handleComponentsUpdate()}
            previousPage={() => setView('OtherSelection')}
            onCancel={() => navigate('..')}
          />
        );
      case 'OtherSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Otros"
            color="bg-main"
            spaceComponentsData={spaceComponentsData.filter((c) => c.type === 'other')}
            spaceVariablesData={spaceVariablesData}
            selectedComponents={components}
            selectComponent={(selection) => handleComponentSelection(selection)}
            previousPage={() => setView('CameraSelection')}
            nextPage={() => setView('NewComponentsOverview')}
          />
        );
      case 'CameraSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Camara"
            color="bg-main"
            spaceComponentsData={spaceComponentsData.filter((c) => c.type === 'camera')}
            spaceVariablesData={spaceVariablesData}
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
            spaceComponentsData={spaceComponentsData.filter((c) => c.type === 'rain_detector')}
            spaceVariablesData={spaceVariablesData}
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
            spaceComponentsData={spaceComponentsData.filter((c) => c.type === 'sensor')}
            spaceVariablesData={spaceVariablesData}
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
            spaceComponentsData={spaceComponentsData.filter((c) => c.type === 'board')}
            spaceVariablesData={spaceVariablesData}
            selectedComponents={components}
            selectComponent={(selection) => handleComponentSelection(selection)}
            nextPage={() => setView('SensorSelection')}
          />
        );
      default:
        return (
          <div />
        );
    }
  };

  return (
    <div className="relative flex size-full flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Componentes"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider changeBottomPadding="p-0" />

        {renderView()}
      </div>
    </div>
  );
};

export default UpdateNodeComponents;
