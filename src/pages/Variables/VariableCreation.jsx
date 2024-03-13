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

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [variableType, setVariableType] = useState('Meteorológica');

  const getVariableTypes = async () => {
    try {
      const response = await variablesService.getTypes();
      setVariableTypes(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getVariableTypes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await variablesService.create(
        selectedWorkspace.workspace_id,
        {
          name,
          unit,
          variableType: variableTypes.find((vt) => vt.type === variableType).variable_type_id,
        },
      );
      notifications.success(response);

      setName('');
      setUnit('');
      setVariableType('Meteorológica');
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
          <TextInput
            id="name"
            type="text"
            labelText="Nombre"
            value={name}
            setValue={setName}
            autoComplete="off"
          />

          <TextInput
            id="unit"
            type="text"
            labelText="Unidad"
            value={unit}
            setValue={setUnit}
            autoComplete="off"
          />

          <ToggleButton
            labelText="Tipo"
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
