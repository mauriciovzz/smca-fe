import {
  React, useState, useEffect, useContext,
} from 'react';

import Button from 'src/components/Button';
import CloseButton from 'src/components/CloseButton';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import TextInput from 'src/components/TextInput';
import Heading from 'src/components/Heading';
import Label from 'src/components/Label';
import TypeSelect from 'src/components/Select/TypeSelect';
import VariablesSelect from 'src/components/Select/VariablesSelect';
import { AuthContext } from 'src/context/authProvider';
import VariableCreation from 'src/pages/Variables/VariableCreation';
import componentsService from 'src/services/components';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

const ComponentManagement = ({ selectedComponent, closeWindow, updateList }) => {
  const [variableList, setVariableList] = useState([]);
  const [componentName, setComponentName] = useState(selectedComponent.component_name);
  const [componentType, setComponentType] = useState(selectedComponent.component_type);
  const [datasheetLink, setDatasheetLink] = useState(selectedComponent.datasheet_link);
  const [variables, setVariables] = useState([...selectedComponent.component_variables]);
  const { logout } = useContext(AuthContext);
  const [isConDiaModalOpen, setIsConDiaModalOpen] = useState(false);
  const [isVarCreModalOpen, setIsVarCreModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const selectOptions = [
    { value: 'BOARD', label: 'Placa' },
    { value: 'SENSOR', label: 'Sensor' },
    { value: 'CAMERA', label: 'Camara' },
    { value: 'SCREEN', label: 'Pantalla' },
    { value: 'OTHER', label: 'Otro' },
  ];

  const updateVariableList = () => {
    variablesService
      .getAll()
      .then((allVariables) => setVariableList(allVariables))
      .catch((err) => {
        if (err.response.data.error === 'La sesión expiró') logout(err);
      });
  };

  const setData = () => {
    setIsEditable(false);
    setComponentName(selectedComponent.component_name);
    setComponentType(selectedComponent.component_type);
    setDatasheetLink(selectedComponent.datasheet_link);
    setVariables(selectedComponent
      .component_variables
      .map((e) => ({ value: e, label: e.variable_name })));
  };

  useEffect(() => {
    updateVariableList();
    setData();
  }, [selectedComponent]);

  const handleUpdate = async () => {
    if (componentType === 'SENSOR' && variables.length === 0) {
      notifications.errorInfo('Selecionar al menos 1 variable.');
    } else {
      try {
        await componentsService.update({
          componentId: selectedComponent.component_id,
          componentName,
          componentType,
          datasheetLink,
          variables: variables.map((e) => e.value.variable_id),
        });

        notifications.success(`Componente "${componentName}" modificado.`);
        updateList();
        setIsEditable(!isEditable);
      } catch (exception) {
        notifications.error(exception);
      }
    }
  };

  const handleRemove = async () => {
    try {
      await componentsService.remove(componentType, selectedComponent.component_id);
      notifications.success(`Componente "${componentName}" eliminado exitosamente.`);
      setIsConDiaModalOpen(false);
      updateList();
      closeWindow();
    } catch (exception) {
      notifications.error(exception);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col gap-2.5 rounded-lg bg-white p-5 shadow">

      <div className="flex grow flex-col gap-2.5">
        <div className="flex justify-between">
          <Heading text="Gestionar Componente" />
          <CloseButton onClick={() => closeWindow()} />
        </div>

        <form className="flex flex-col gap-2.5 space-y-4 md:space-y-1">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre del Componente"
            value={componentName}
            setValue={setComponentName}
            disabled={!isEditable}
          />

          <div>
            <Label text="Tipo de Componente" />
            <TypeSelect
              options={selectOptions}
              value={selectOptions.find((element) => element.value === componentType)}
              onChange={(selected) => setComponentType(selected.value)}
              isDisabled
            />
          </div>

          {
            (componentType === 'SENSOR') && (
              <div>
                <Label text="Variables del Sensor" />
                <VariablesSelect
                  variableList={variableList}
                  value={variableList
                    .map((e) => ({ value: e, label: e.variable_name }))
                    .filter((e) => variables.map((ee) => ee.label).includes(e.label))}
                  onChange={(selected) => setVariables(selected)}
                  isDisabled={!isEditable}
                  onButtonClick={() => setIsVarCreModalOpen(true)}
                />
              </div>
            )
          }

          <TextInput
            id="datasheet"
            type="url"
            labelText="Datasheet del Componente"
            value={datasheetLink}
            setValue={setDatasheetLink}
            disabled={!isEditable}
          />
        </form>
      </div>

      <div className="flex w-full gap-x-2.5">
        <Button
          text={isEditable ? 'Guardar Cambios' : 'Modificar Componente'}
          color="blue"
          onClick={isEditable ? () => handleUpdate() : () => setIsEditable(!isEditable)}
        />
        <Button
          text={isEditable ? 'Cancelar' : 'Eliminar Componente'}
          color="red"
          onClick={isEditable ? () => setData(!isEditable) : () => setIsConDiaModalOpen(true)}
        />
      </div>

      {
        isVarCreModalOpen && (
          <div className="absolute left-0 top-0 h-full w-full">
            <VariableCreation
              closeWindow={setIsVarCreModalOpen}
              updateList={updateVariableList}
            />
          </div>

        )
      }

      {
        isConDiaModalOpen && (
        <ConfirmationDialog
          title="Eliminar Componente"
          description={`Estas seguro de querer eliminar el componente "${componentName}"?`}
          onDecline={() => setIsConDiaModalOpen(false)}
          onConfirm={() => handleRemove()}
        />
        )
      }
    </div>
  );
};

export default ComponentManagement;
