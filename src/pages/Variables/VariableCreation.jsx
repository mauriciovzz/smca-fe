import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, Label, TextInput,
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

          <div>
            <Label text="Tipo" />
            <div className="flex h-fit w-full overflow-hidden rounded-2xl border-2 bg-white font-medium ">
              <button
                type="button"
                className={`${(variableType === 'Meteorológica') ? 'rounded-r-2xl bg-meteorological text-white' : 'bg-white text-slate-400'} flex w-1/2 flex-col items-center justify-center p-1 text-center`}
                onClick={() => setVariableType('Meteorológica')}
              >
                <div>
                  Meteorológica
                </div>
                <Divider changePadding="p-[2.5px]" changeColor={(variableType === 'Meteorológica') ? 'border-white' : 'border-slate-400'} />
                <div className="text-xs">
                  Referentes al tiempo atmosferico
                </div>
              </button>

              <button
                type="button"
                className={`${(variableType === 'Ambiental') ? 'rounded-l-2xl bg-enviromental text-white' : 'bg-white text-slate-400'} flex w-1/2 flex-col items-center justify-center p-1 text-center`}
                onClick={() => setVariableType('Ambiental')}
              >
                <div>
                  Ambiental
                </div>
                <Divider changePadding="p-[2.5px]" changeColor={(variableType === 'Ambiental') ? 'border-white' : 'border-slate-400'} />
                <div className="text-xs">
                  Referentes a contaminantes
                </div>
              </button>
            </div>
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
