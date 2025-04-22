import { React, useEffect, useState } from 'react';

import { useOutletContext, useParams, useNavigate } from 'react-router-dom';

import {
  Button, ConfirmationDialog, ColorInput, TextInput,
} from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const VariableManagement = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const { spaceData, variablesData, updateVariablesData } = useOutletContext();

  const { variableId } = useParams();
  const selectedVariable = variablesData
    .find((v) => v.variable_id === parseInt(variableId, 10));

  const [isEditable, setIsEditable] = useState(false);
  const [isConDiaOpen, setIsConDiaOpen] = useState(false);

  const [name, setName] = useState(selectedVariable.name);
  const [unit, setUnit] = useState(selectedVariable.unit);
  const [color, setColor] = useState(selectedVariable.color);

  const systemVariables = [
    'pm2.5', 'pm10', 'o3', 'no2', 'so2', 'co',
    'temperatura', 'humedad', 'presión', 'precipitación', 'radiación solar',
  ];

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
      const response = await axiosPrivate.put(
        `/api/spaces/${spaceData.space_id}/variables/${selectedVariable.variable_id}`,
        {
          name,
          unit: (selectedVariable.value_type === 'numerical') ? unit : null,
          color,
        },
      );

      notificationHelper.success(response.data);

      updateVariablesData();
      setIsEditable(!isEditable);
    } catch (error) {
      errorHandler(error, updateVariablesData);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/api/spaces/${spaceData.space_id}/variables/${selectedVariable.variable_id}`,
      );

      notificationHelper.success(response);

      updateVariablesData();
      navigate('..');
    } catch (error) {
      errorHandler(error, updateVariablesData);
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
        (spaceData.is_admin) && (!systemVariables.includes(name)) && (
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
