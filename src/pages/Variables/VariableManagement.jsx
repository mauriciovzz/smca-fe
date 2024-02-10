import {
  React, useState, useEffect,
} from 'react';

import Button from 'src/components/Button';
import CloseButton from 'src/components/CloseButton';
import ConfirmationDialog from 'src/components/ConfirmationDialog';
import TextInput from 'src/components/TextInput';
import Heading from 'src/components/Heading';
import Label from 'src/components/Label';
import TypeSelect from 'src/components/Select/TypeSelect';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

const VariableManagement = ({ selectedVariable, closeWindow, updateList }) => {
  const [variableName, setVariableName] = useState(selectedVariable.variable_name);
  const [unit, setUnit] = useState(selectedVariable.unit);
  const [variableType, setVariableType] = useState(selectedVariable.variable_type);
  const [isConDiaModalOpen, setIsConDiaModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const selectOptions = [
    { value: 'ENV', label: 'Ambiental' },
    { value: 'MET', label: 'Meteorológica' },
  ];

  const setData = () => {
    setIsEditable(false);
    setVariableName(selectedVariable.variable_name);
    setUnit(selectedVariable.unit);
    setVariableType(selectedVariable.variable_type);
  };

  useEffect(() => {
    setData();
  }, [selectedVariable]);

  const handleUpdate = async () => {
    try {
      await variablesService.update({
        variableId: selectedVariable.variable_id,
        variableName,
        unit,
        variableType,
      });

      notifications.success(`Variable "${variableName}" modificada exitosamente.`);
      updateList();
      setIsEditable(!isEditable);
    } catch (exception) {
      notifications.error(exception);
    }
  };

  const handleRemove = async () => {
    try {
      await variablesService.remove(selectedVariable.variable_id);
      notifications.success(`Variable "${variableName}" eliminada exitosamente.`);
      setIsConDiaModalOpen(false);
      updateList();
      closeWindow();
    } catch (exception) {
      notifications.error(exception);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-lg bg-white p-5 shadow">

      <div className="flex grow flex-col gap-2.5">
        <div className="flex justify-between">
          <Heading text="Gestionar Variable" />
          <CloseButton onClick={() => closeWindow()} />
        </div>

        <form className="flex flex-col gap-2.5 space-y-4 md:space-y-1">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre de la Variable"
            value={variableName}
            setValue={setVariableName}
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

          <div>
            <Label text="Tipo de Variable" />
            <TypeSelect
              options={selectOptions}
              value={selectOptions.find((element) => element.value === variableType)}
              onChange={(selected) => setVariableType(selected.value)}
              isDisabled
            />
          </div>
        </form>
      </div>

      <div className="flex w-full gap-x-2.5">
        <Button
          text={isEditable ? 'Guardar Cambios' : 'Modificar Variable'}
          color="blue"
          onClick={isEditable ? () => handleUpdate() : () => setIsEditable(!isEditable)}
        />
        <Button
          text={isEditable ? 'Cancelar' : 'Eliminar Variable'}
          color="red"
          onClick={isEditable ? () => setData(!isEditable) : () => setIsConDiaModalOpen(true)}
        />
      </div>

      {
        isConDiaModalOpen && (
        <ConfirmationDialog
          title="Eliminar Variable"
          description={`Estas seguro de querer eliminar la variable "${variableName}"?`}
          onDecline={() => setIsConDiaModalOpen(false)}
          onConfirm={() => handleRemove()}
        />
        )
      }
    </div>
  );
};

export default VariableManagement;
