import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, TextInput, ToggleButton,
} from 'src/components';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

const VariableCreation = ({ updateVariables, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [variableTypes, setVariableTypes] = useState([]);
  const [variableValueTypes, setVariableValueTypes] = useState([]);

  const [variableType, setVariableType] = useState('Meteorológica');
  const [name, setName] = useState('');
  const [variableValueType, setVariableValueType] = useState('Numérico');
  const [unit, setUnit] = useState('');

  const getVariableTypes = async () => {
    try {
      const response = await variablesService.getTypes();
      setVariableTypes(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  const getVariableValueTypes = async () => {
    try {
      const response = await variablesService.getValueTypes();
      setVariableValueTypes(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getVariableTypes();
    getVariableValueTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const requestData = {
        variableType: variableTypes.find(
          (vt) => vt.type === variableType,
        ).variable_type_id,
        name,
        variableValueType: variableValueTypes.find(
          (vvt) => vvt.type === variableValueType,
        ).variable_value_type_id,
      };

      if (variableValueType === 'Numérico') {
        requestData.unit = unit;
      }

      const response = await variablesService.create(
        selectedWorkspace.workspace_id,
        requestData,
      );

      notifications.success(response);

      setVariableType('Meteorológica');
      setName('');
      setVariableValueType('Numérico');
      setUnit('');
      updateVariables();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Agregar Variable"
          hasButton
          onButtonClick={() => changeView()}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <ToggleButton
            labelText="Tipo de Variable"
            selectedOption={variableType}
            leftOption={{
              title: 'Meteorológica',
              text: 'Referentes al tiempo atmosferico',
              value: 'Meteorológica',
              onClick: () => setVariableType('Meteorológica'),
              color: 'bg-meteorological',
            }}
            rigthOption={{
              title: 'Ambiental',
              text: 'Referentes a contaminantes',
              value: 'Ambiental',
              onClick: () => setVariableType('Ambiental'),
              color: 'bg-enviromental',
            }}
          />

          <ToggleButton
            labelText="Tipo de Valor"
            selectedOption={variableValueType}
            leftOption={{
              title: 'Numérico',
              text: 'Su medición devuelve un valor numérico',
              value: 'Numérico',
              onClick: () => setVariableValueType('Numérico'),
              color: 'bg-indoor',
            }}
            rigthOption={{
              title: 'Dicotómico',
              text: 'Su medición indica si existe su presencia',
              value: 'Dicotómico',
              onClick: () => setVariableValueType('Dicotómico'),
              color: 'bg-indoor',
            }}
          />

          <div className={`${(variableValueType === 'Numérico') ? 'flex space-x-5' : 'w-full'}`}>
            <div className={`${(variableValueType === 'Numérico') ? 'w-3/4' : 'w-full'}`}>
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
              (variableValueType === 'Numérico') && (
                <div className="w-1/4">
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
