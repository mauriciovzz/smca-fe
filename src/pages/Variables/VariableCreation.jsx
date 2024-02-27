import { React, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, Label, TextInput,
} from 'src/components';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

const VariableCreation = ({ variableTypes, updateVariables, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [variableType, setVariableType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await variablesService.create(
        selectedWorkspace.workspace_id,
        { name, unit, variableType },
      );
      notifications.success(response);

      setName('');
      setUnit('');
      setVariableType('');
      updateVariables();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Agregar Variable"
          hasButton
          onButtonClick={() => changeView(null)}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre de la variable"
            value={name}
            setValue={setName}
            autoComplete="off"
          />
          <TextInput
            id="unit"
            type="text"
            labelText="Unidad de la variable"
            value={unit}
            setValue={setUnit}
            autoComplete="off"
          />
          <div>
            <Label text="Tipo de variable" />
            <select
              name="variableType"
              id="varialeType"
              value={variableType}
              onChange={(event) => setVariableType(event.target.value)}
              className="h-[38px] w-full rounded-lg border border-gray-300 px-1 py-0.5 focus:border-main focus:ring-1 focus:ring-main"
            >
              <option value="" disabled hidden>Seleciona un tipo de variable</option>
              {
                variableTypes
                  .map((vt) => (
                    <option key={vt.variable_type_id} value={vt.variable_type_id}>{vt.type}</option>
                  ))
              }
            </select>
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
