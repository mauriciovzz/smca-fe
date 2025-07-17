import { React, useState, useEffect } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';

import { successIcon } from 'src/assets';
import { Button, SelectionBar, ComponentListItem } from 'src/components/inputs';
import { Divider, Heading, LoaderSpinner } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import { EnterNodeComponents } from 'src/pages/SpaceNodes/NodeCreation';
import notificationHelper from 'src/utils/notificationHelper';

const ComponentsUpdateSuccessMessage = ({ onClose }) => (
  <div className="flex grow flex-col bg-white">
    <div className="flex grow flex-col">
      <div className="flex flex-col items-center justify-center gap-[5px] border-b py-2.5">
        <img
          src={successIcon}
          alt="success icon"
          className="size-[30px]"
        />
        <div className="text-center font-bold">
          Componentes Actualizados Exitosamente
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
          dirígete al apartado 'Descargar Configuración', en la sección 'Modificar' .
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
          text="Actualizar"
          isTypeButton
          onClick={() => handleComponentsUpdate()}
          color="blue"
        />
      </div>
    </div>
  </div>
);

const UpdateNodeComponents = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const {
    spaceData, selectedNode,
    componentsData, updateComponentsData,
    variablesData, updateVariablesData,
    updateNodesData,
  } = useOutletContext();

  const [loadingData, setLoadingData] = useState(true);
  const [view, setView] = useState('BoardSelection');

  const [nodeComponentsData, setNodeComponentsData] = useState([]);

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

  const getNodeComponentsData = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/spaces/${spaceData.space_id}/nodes/${selectedNode.node_id}/components`,
      );

      setNodeComponentsData(formatCurrentComponents(response.data));
      setLoadingData(false);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      if (errorMessage === 'NodeDoesNotExists') {
        notificationHelper.error('El nodo indicado no se encuentra registrado.');
        navigate('..');
      } else {
        errorHandler(error);
      }
    }
  };

  useEffect(() => {
    getNodeComponentsData();
  }, []);

  const handleComponentSelection = (selection) => {
    if (selection.type === 'component') {
      const position = nodeComponentsData
        .findIndex((c) => c.component_id === selection.component_id);

      if (position !== -1) {
        setNodeComponentsData(nodeComponentsData.toSpliced(position, 1));
      } else {
        setNodeComponentsData([
          ...nodeComponentsData,
          { component_id: selection.component_id },
        ]);
      }
    }

    if (selection.type === 'variable') {
      const position = nodeComponentsData.findIndex(
        (c) => c.component_id === selection.component_id && c.variable_id === selection.variable_id,
      );

      if (position !== -1) {
        setNodeComponentsData(nodeComponentsData.toSpliced(position, 1));
      } else {
        setNodeComponentsData([
          ...nodeComponentsData,
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

  const handleComponentsUpdate = async () => {
    const nodeComponents = nodeComponentsData.reduce(componentsSubmitReducer, []);

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
      await axiosPrivate.put(
        `/api/spaces/${spaceData.space_id}/nodes/${selectedNode.node_id}/components`,
        { components: nodeComponents },
      );

      updateNodesData();
      setView('ComponentsUpdateSuccessMessage');
    } catch (error) {
      const errorMessage = error?.response?.data?.message;

      if (errorMessage === 'VariableDoesNotExist') {
        notificationHelper.error('Una de las variables no se encuentra registrada.');
        setNodeComponentsData(selectedNode.components);
        updateVariablesData();
      } else if (errorMessage === 'ComponentDoesNotExist') {
        notificationHelper.error('Uno de los componente no se encuentra registrado.');
        setNodeComponentsData(selectedNode.components);
        updateComponentsData();
      } else {
        errorHandler(error);
      }
    }

    return null;
  };

  const renderView = () => {
    switch (view) {
      case 'ComponentsUpdateSuccessMessage':
        return (
          <ComponentsUpdateSuccessMessage
            onClose={() => navigate('..')}
          />
        );
      case 'NewComponentsOverview':
        return (
          <NewComponentsOverview
            components={nodeComponentsData.reduce(componentsOverviewReducer, [])}
            handleComponentsUpdate={() => handleComponentsUpdate()}
            previousPage={() => setView('OtherSelection')}
            onCancel={() => navigate('..')}
          />
        );
      case 'OtherSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Otros"
            spaceComponentsData={componentsData.filter((c) => c.type === 'other')}
            selectedComponents={nodeComponentsData}
            selectComponent={(selection) => handleComponentSelection(selection)}
            previousPage={() => setView('CameraSelection')}
            nextPage={() => setView('NewComponentsOverview')}
          />
        );
      case 'CameraSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Camara"
            spaceComponentsData={componentsData.filter((c) => c.type === 'camera')}
            selectedComponents={nodeComponentsData}
            selectComponent={(selection) => handleComponentSelection(selection)}
            previousPage={() => setView('RainDetectorSelection')}
            nextPage={() => setView('OtherSelection')}
          />
        );
      case 'SensorSelection':
        return (
          <EnterNodeComponents
            text="Selecionar Sensores"
            spaceComponentsData={componentsData.filter((c) => c.type === 'sensor')}
            selectedComponents={nodeComponentsData}
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
            selectedComponents={nodeComponentsData}
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

  return loadingData
    ? <LoaderSpinner isSmall />
    : (
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
