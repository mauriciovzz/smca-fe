import { React, useState, useContext } from 'react';
import { AuthContext } from 'src/context/authProvider';
import { close } from 'src/assets';
import TextInput from 'src/components/TextInput';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';
import ToggleButton from './ToggleButton';

const VariableCreation = ({ setIsOpen, updateVariableList }) => {
  const [variableType, setVariableType] = useState('');
  const [variableName, setVariableName] = useState('');
  const [unit, setUnit] = useState('');
  const { logout } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await variablesService.create({
        variableType,
        variableName,
        unit,
      });

      notifications.success(`Variable "${variableName}" registrada.`);
      updateVariableList();
      setVariableType('');
      setVariableName('');
      setUnit('');
    } catch (err) {
      if (err.response.data.error === 'La sesión expiró') logout(err);
    }
  };

  return (
    <div className="absolute left-0 top-0 z-40 h-full w-full bg-green-400 p-4 backdrop-blur-sm">

      <div className="flex justify-between">
        <h1>Agregar variable</h1>

        <div className="row-span-1 flex items-center justify-center rounded-xl bg-white shadow">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <img
              src={close}
              alt="close button"
              className="h-[28px] w-[28px]"
            />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-1">
        <TextInput
          id="name"
          type="text"
          labelText="Nombre de la variable"
          value={variableName}
          setValue={setVariableName}
        />

        <TextInput
          id="unit"
          type="text"
          labelText="Unidad de la variable"
          value={unit}
          setValue={setUnit}
        />

        <ToggleButton
          title="Tipo de variable"
          selected={variableType}
          setSelected={setVariableType}
          options={[
            {
              label: 'Meteorologica',
              value: 'MET',
            },
            {
              label: 'Ambiental',
              value: 'ENV',
            },
          ]}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-sky-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-sky-700 focus:ring-4 focus:ring-sky-300"
        >
          Registrar Variable
        </button>
      </form>
    </div>
  );
};

export default VariableCreation;
