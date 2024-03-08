import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, Label, TextInput,
} from 'src/components';
import { ConfirmationDialog } from 'src/layout';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

const VariableManagement = ({ selectedVariable, updateVariables, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [isEditable, setIsEditable] = useState(false);
  const [isConDiaOpen, setIsConDiaOpen] = useState(false);

  const [name, setName] = useState(selectedVariable.name);
  const [unit, setUnit] = useState(selectedVariable.unit);
  const [variableType, setVariableType] = useState(selectedVariable.type);

  const setData = () => {
    setIsEditable(false);
    setIsConDiaOpen(false);

    setName(selectedVariable.name);
    setUnit(selectedVariable.unit);
    setVariableType(selectedVariable.type);
  };

  useEffect(() => {
    setData();
  }, [selectedVariable]);

  const handleUpdate = async () => {
    try {
      const response = await variablesService.update(
        selectedWorkspace.workspace_id,
        selectedVariable.variable_id,
        { name, unit },
      );

      notifications.success(response);
      updateVariables();
      setIsEditable(!isEditable);
    } catch (err) {
      notifications.error(err);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await variablesService.remove(
        selectedWorkspace.workspace_id,
        selectedVariable.variable_id,
      );

      notifications.success(response);
      updateVariables();
      changeView();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Variable"
          hasButton
          onButtonClick={() => changeView()}
        />

        <Divider />

        <form className="flex flex-col gap-5">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre"
            value={name}
            setValue={setName}
            disabled={!isEditable}
          />

          <TextInput
            id="unit"
            type="text"
            labelText="Unidad"
            value={unit}
            setValue={setUnit}
            disabled={!isEditable}
          />

          <div className="flex h-fit w-full flex-col">
            <Label text="Tipo" />
            <div className={`${(variableType === 'Meteorológica') ? 'bg-meteorological' : 'bg-enviromental'} flex h-[38px] w-full items-center justify-center rounded-xl font-medium text-white`}>
              {variableType}
            </div>
          </div>

        </form>
      </div>

      {
        (selectedWorkspace.is_admin) && (
          <div className="flex w-full gap-2.5">
            <Button
              text={isEditable ? 'Guardar' : 'Modificar'}
              typeIsButton
              onClick={isEditable ? () => handleUpdate() : () => setIsEditable(!isEditable)}
              color="blue"
            />
            <Button
              text={isEditable ? 'Cancelar' : 'Eliminar'}
              typeIsButton
              onClick={isEditable ? () => setData(!isEditable) : () => setIsConDiaOpen(true)}
              color="red"
            />
          </div>
        )
      }

      {
        isConDiaOpen && (
        <ConfirmationDialog
          title="Eliminar Variable"
          description={`Estas seguro de querer eliminar la variable "${name}"?`}
          onDecline={() => setIsConDiaOpen(false)}
          onConfirm={() => handleRemove()}
        />
        )
      }
    </div>
  );
};

export default VariableManagement;
