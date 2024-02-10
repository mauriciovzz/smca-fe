import {
  React, useState, useContext,
} from 'react';

import Button from 'src/components/Button';
import CloseButton from 'src/components/CloseButton';
import TextInput from 'src/components/TextInput';
import Heading from 'src/components/Heading';
import Label from 'src/components/Label';
import TypeSelect from 'src/components/Select/TypeSelect';
import { AuthContext } from 'src/context/authProvider';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

const VariableCreation = ({ closeWindow, updateList }) => {
  const [variableName, setVariableName] = useState('');
  const [unit, setUnit] = useState('');
  const [variableType, setVariableType] = useState('');
  const { logout } = useContext(AuthContext);

  const selectOptions = [
    { value: 'ENV', label: 'Ambiental' },
    { value: 'MET', label: 'Meteorológica' },
  ];

  const handleSubmit = async () => {
    try {
      await variablesService.create({
        variableName,
        unit,
        variableType: variableType.value,
      });

      notifications.success(`Variable "${variableName}" registrad@.`);
      setVariableName('');
      setUnit('');
      setVariableType(null);
      updateList();
    } catch (err) {
      if (err.response.data.error === 'La sesión expiró') logout(err);
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-2.5 rounded-lg bg-white p-5 shadow">

      <div className="flex grow flex-col gap-2.5">
        <div className="flex justify-between">
          <Heading text="Agregar Variable" />
          <CloseButton onClick={() => closeWindow()} />
        </div>

        <form className="flex flex-col gap-2.5 space-y-4 md:space-y-1">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre de la Variable"
            value={variableName}
            setValue={setVariableName}
          />

          <TextInput
            id="unit"
            type="text"
            labelText="Unidad"
            value={unit}
            setValue={setUnit}
          />

          <div>
            <Label text="Tipo de Variable" />
            <TypeSelect
              options={selectOptions}
              value={variableType}
              onChange={(selected) => setVariableType(selected)}
              isDisabled={false}
            />
          </div>

        </form>
      </div>

      <Button
        text="Registrar Variable"
        color="blue"
        onClick={() => handleSubmit()}
      />
    </div>
  );
};

export default VariableCreation;
