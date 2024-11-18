import { React, useEffect, useState } from 'react';

import { useOutletContext, useParams, useNavigate } from 'react-router-dom';

import {
  Button, ConfirmationDialog, ColorInput, TextInput,
} from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import variablesService from 'src/services/variables';
import notificationHelper from 'src/utils/notificationHelper';

const VariableManagement = () => {
  const { variableId } = useParams();
  const {
    spaceData, variablesData, updateSelectedSpaceRoot, errorHandler,
  } = useOutletContext();
  const selectedVariable = variablesData.find((v) => v.variable_id === parseInt(variableId, 10));
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);
  const [isConDiaOpen, setIsConDiaOpen] = useState(false);

  const [name, setName] = useState(selectedVariable.name);
  const [unit, setUnit] = useState(selectedVariable.unit);
  const [color, setColor] = useState(selectedVariable.color);

  const setData = () => {
    setIsEditable(false);
    setIsConDiaOpen(false);

    setName(selectedVariable.name);
    setUnit(selectedVariable.unit);
    setColor(selectedVariable.color);
  };

  useEffect(() => {
    setData();
  }, [variableId]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await variablesService.update(
        spaceData.space_id,
        selectedVariable.variable_id,
        {
          name,
          unit: (selectedVariable.value_type === 'numerical') ? unit : null,
          color,
        },
      );

      notificationHelper.success(response);

      updateSelectedSpaceRoot();
      setIsEditable(!isEditable);
    } catch (error) {
      const goTo = errorHandler(error, updateSelectedSpaceRoot);

      if (goTo)
        navigate(goTo);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await variablesService.remove(
        spaceData.space_id,
        selectedVariable.variable_id,
      );

      notificationHelper.success(response);

      updateSelectedSpaceRoot();
      navigate('..');
    } catch (error) {
      const goTo = errorHandler(error, updateSelectedSpaceRoot);

      if (goTo)
        navigate(goTo);
    }
  };

  return (
    <div className="relative flex size-full flex-col overflow-hidden rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Variable"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider />

        <form className="flex flex-col gap-5" onSubmit={handleUpdate} id="form">
          <div className="flex gap-5">
            <TextInput
              id="variableType"
              type="text"
              labelText="Tipo de Variable"
              value={selectedVariable.variable_type === 'enviromental' ? 'ambiental' : 'meteorológica'}
              disabled
            />
            <TextInput
              id="ValueType"
              type="text"
              labelText="Tipo de Valor"
              value={selectedVariable.value_type === 'numerical' ? 'numérico' : 'presencial'}
              disabled
            />
          </div>

          <TextInput
            id="name"
            type="text"
            labelText="Nombre"
            value={name}
            setValue={setName}
            disabled={!isEditable}
          />

          <div className="flex space-x-5">
            {
              (selectedVariable.value_type === 'numerical') && (
                <TextInput
                  id="unit"
                  type="text"
                  labelText="Unidad"
                  value={unit}
                  setValue={setUnit}
                  disabled={!isEditable}
                />
              )
            }

            <div className="w-full">
              <ColorInput
                id="color"
                labelText="Color"
                value={color}
                setValue={setColor}
                disabled={!isEditable}
              />
            </div>
          </div>

        </form>
      </div>

      {
        (spaceData.is_admin) && (
          <div className="flex w-full gap-2.5">
            {
              isEditable
                ? (
                  <Button
                    key="save button"
                    text="Guardar"
                    form="form"
                    color="blue"
                  />
                )
                : (
                  <Button
                    key="edit button"
                    text="Modificar"
                    isTypeButton
                    onClick={() => setIsEditable(true)}
                    color="blue"
                  />
                )
            }

            <Button
              text={isEditable ? 'Cancelar' : 'Eliminar'}
              isTypeButton
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
          onDecline={{ text: 'Cancelar', action: () => setIsConDiaOpen(false) }}
          onConfirm={{ text: 'Eliminar', action: () => handleRemove() }}
        />
        )
      }
    </div>
  );
};

export default VariableManagement;
