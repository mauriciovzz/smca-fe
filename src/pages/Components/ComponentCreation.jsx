import {
  React, useState, useEffect, useContext,
} from 'react';

import Button from 'src/components/Button';
import CloseButton from 'src/components/CloseButton';
import TextInput from 'src/components/TextInput';
import Heading from 'src/components/Heading';
import Label from 'src/components/Label';
import TypeSelect from 'src/components/Select/TypeSelect';
import VariablesSelect from 'src/components/Select/VariablesSelect';
import { AuthContext } from 'src/context/authProvider';
import VariableCreation from 'src/pages/Variables/VariableCreation';
import componentsService from 'src/services/components';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

const ComponentCreation = ({ closeWindow, type, updateList }) => {
  const [variableList, setVariableList] = useState([]);
  const [componentName, setComponentName] = useState('');
  const [componentType, setComponentType] = useState(type);
  const [datasheetLink, setDatasheetLink] = useState('');
  const [variables, setVariables] = useState([]);
  const [isVarCreModalOpen, setIsVarCreModalOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const selectOptions = [
    { value: 'BOARD', label: 'Placa' },
    { value: 'SENSOR', label: 'Sensor' },
    { value: 'CAMERA', label: 'Camara' },
    { value: 'SCREEN', label: 'Pantalla' },
    { value: 'OTHER', label: 'Otro' },
  ];

  const updateVariableList = () => {
    variablesService
      .getAll()
      .then((allVariables) => setVariableList(allVariables))
      .catch((err) => {
        if (err.response.data.error === 'La sesión expiró') logout(err);
      });
  };

  useEffect(() => {
    updateVariableList();
  }, []);

  const getTitle = () => {
    switch (type) {
      case 'BOARD':
        return 'Agregar Placa';
      case 'SENSOR':
        return 'Agregar Sensor';
      case 'CAMERA':
        return 'Agregar Camara';
      case 'SCREEN':
        return 'Agregar Pantalla';
      case 'OTHER':
        return 'Agregar Otro';
      default:
        return 'Agregar Componente';
    }
  };

  const handleSubmit = async () => {
    if (componentType === 'SENSOR' && variables.length === 0) {
      notifications.error('Selecionar al menos 1 variable.');
    } else {
      try {
        await componentsService.create({
          componentType: componentType.value,
          componentName,
          datasheetLink,
          variables: variables.map((e) => e.value.variable_id),
        });

        notifications.success(`Componente "${componentName}" registrado.`);
        setComponentName('');
        setComponentType(null);
        setDatasheetLink('');
        setVariables([]);
        updateList();
      } catch (err) {
        if (err.response.data.error === 'La sesión expiró') logout(err);
      }
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col gap-2.5 rounded-lg bg-white p-5 shadow">

      <div className="flex grow flex-col gap-2.5">
        <div className="flex justify-between">
          <Heading text={getTitle()} />
          <CloseButton onClick={() => closeWindow()} />
        </div>

        <form className="flex flex-col gap-2.5 space-y-4 md:space-y-1">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre del Componente"
            value={componentName}
            setValue={setComponentName}
          />

          <div>
            <Label text="Tipo de Componente" />
            <TypeSelect
              options={selectOptions}
              value={componentType}
              onChange={(selected) => setComponentType(selected)}
              isDisabled={false}
            />
          </div>

          {
            (componentType) && (componentType.value === 'SENSOR') && (
              <>
                <Label text="Variables del Sensor" />
                <VariablesSelect
                  variableList={variableList}
                  variables={variables}
                  onChange={(selected) => setVariables(selected)}
                  onButtonClick={() => setIsVarCreModalOpen(true)}
                />
              </>
            )
          }

          <TextInput
            id="datasheet"
            type="url"
            labelText="Datasheet del componente"
            value={datasheetLink}
            setValue={setDatasheetLink}
          />
        </form>
      </div>

      <Button
        text="Registrar Componente"
        color="blue"
        onClick={() => handleSubmit()}
      />

      {
        isVarCreModalOpen && (
          <div className="absolute left-0 top-0 h-full w-full">
            <VariableCreation
              closeWindow={setIsVarCreModalOpen}
              updateList={updateVariableList}
            />
          </div>

        )
      }
    </div>
  );
};

export default ComponentCreation;
