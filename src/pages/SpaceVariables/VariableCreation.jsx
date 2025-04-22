import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import {
  Button, ColorInput, TextInput, ToggleSwitch,
} from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const VariableCreation = ({ onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const { spaceData, updateVariablesData } = useOutletContext();

  const [valueType, setValueType] = useState('numerical');
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [color, setColor] = useState('#0284C7');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosPrivate.post(
        `/api/spaces/${spaceData.space_id}/variables`,
        {
          valueType,
          name,
          unit: (valueType === 'numerical') ? unit : null,
          color,
        },
      );

      notificationHelper.success(response.data);

      setName('');
      setValueType('numerical');
      setUnit('');
      setColor('#0284C7');
      updateVariablesData();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex size-full flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Agregar Variable"
          hasButton
          onButtonClick={onClose ? () => onClose() : () => navigate('..')}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <ToggleSwitch
            labelText="Tipo de Valor"
            selectedOption={valueType}
            leftOption={{
              title: 'Numérico',
              value: 'numerical',
              onClick: () => setValueType('numerical'),
              color: 'bg-main',
            }}
            rigthOption={{
              title: 'Presencial',
              value: 'presential',
              onClick: () => setValueType('presential'),
              color: 'bg-main',
            }}
          />

          <div className="flex space-x-2.5">
            <div className="flex-1">
              <TextInput
                id="name"
                type="text"
                labelText="Nombre"
                value={name}
                setValue={setName}
                autoComplete="off"
              />
            </div>

            {
              (valueType === 'numerical') && (
                <div className="w-[100px]">
                  <TextInput
                    id="unit"
                    type="text"
                    labelText="Unidad"
                    value={unit}
                    setValue={setUnit}
                    autoComplete="off"
                  />
                </div>
              )
            }
          </div>

          <div className="w-full">
            <ColorInput
              id="color"
              labelText="Color"
              value={color}
              setValue={setColor}
            />
          </div>
        </form>
      </div>

      <Button
        text="Agregar Variable"
        form="form"
        color="blue"
      />
    </div>
  );
};

export default VariableCreation;
