import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon } from 'src/assets';
import {
  Badge, Button, Divider, Heading, Label, TextInput,
} from 'src/components';
import VariableCreation from 'src/pages/Variables/VariableCreation';
import componentsService from 'src/services/components';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

const ComponentCreation = ({ updateComponents, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [componentTypes, setComponentTypes] = useState([]);
  const [variables, setVariables] = useState([]);
  const [isVarCreOpen, setIsVarCreOpen] = useState(false);

  const [name, setName] = useState('');
  const [datasheetLink, setDatasheetLink] = useState('');
  const [componentType, setComponentType] = useState('');
  const [componentVariables, setComponentVariables] = useState([]);

  const getComponentTypes = async () => {
    try {
      const response = await componentsService.getTypes();
      setComponentTypes(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  const getVariables = async () => {
    try {
      const response = await variablesService.getAll(selectedWorkspace.workspace_id);
      setVariables(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getComponentTypes();
    getVariables();
  }, []);

  const isComponentTypeSensor = () => {
    const sensorType = componentTypes.find((ct) => ct.type === 'Sensor');
    return (sensorType.component_type_id.toString() === componentType);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ((isComponentTypeSensor()) && variables.length === 0) {
      notifications.errorMsg('Selecionar al menos 1 variable.');
    } else {
      try {
        const response = await componentsService.create(
          selectedWorkspace.workspace_id,
          {
            name,
            datasheetLink,
            componentType,
            variables: componentVariables,
          },
        );

        notifications.success(response);
        setName('');
        setComponentType('');
        setDatasheetLink('');
        setVariables([]);
        updateComponents();
      } catch (err) {
        notifications.error(err);
      }
    }
  };

  const handleVariableSelection = (variableId) => {
    if (componentVariables.includes(variableId)) {
      setComponentVariables(componentVariables.filter((vr) => vr !== variableId));
    } else {
      setComponentVariables([...componentVariables, variableId]);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Agregar Componente"
          hasButton
          onButtonClick={() => changeView()}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="ComponentCreationForm" className="flex grow flex-col space-y-5">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre"
            value={name}
            setValue={setName}
            autoComplete="off"
          />

          <div className="flex w-full space-x-5">
            <TextInput
              id="datasheetLink"
              type="url"
              labelText="Datasheet Link"
              value={datasheetLink}
              setValue={setDatasheetLink}
              autoComplete="off"
            />

            <div className="w-1/2">
              <Label text="Tipo" />
              <select
                name="componentType"
                id="componentType"
                value={componentType}
                onChange={(event) => setComponentType(event.target.value)}
                className="h-[38px] w-full rounded-lg border border-gray-300 px-1 py-0.5 focus:border-main focus:ring-1 focus:ring-main"
              >
                <option value="" disabled hidden> </option>
                {
                  componentTypes
                    .map((ct) => (
                      <option
                        key={ct.component_type_id}
                        value={ct.component_type_id}
                      >
                        {ct.type}
                      </option>
                    ))
                }
              </select>
            </div>
          </div>

          {
            (componentType) && (isComponentTypeSensor()) && (
              <div className="h-full">
                <Label text="Variables del componente" />

                <div className="relative h-full w-full">
                  <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-auto rounded-lg border bg-background">
                    {
                      variables.map((variable) => (
                        <li
                          key={variable.variable_id}
                          className={`${componentVariables.includes(variable.variable_id) ? 'bg-sky-100' : 'bg-white hover:bg-slate-100'} h-fit w-full border-b px-5 py-2.5 shadow`}
                        >
                          <button
                            type="button"
                            onClick={() => handleVariableSelection(variable.variable_id)}
                            className="flex w-full items-center space-x-2.5"
                          >
                            <div className="flex w-full flex-col text-left">
                              <div className="text-sm font-medium">
                                {variable.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {variable.unit}
                              </div>
                            </div>
                            <div className="w-fit">
                              <Badge value={variable.type} changeHeight="h-[20px]" />
                            </div>
                          </button>
                        </li>
                      ))
                    }
                    <li className="h-fit w-full border-b bg-white px-5 py-2.5 shadow hover:bg-slate-100">
                      <button
                        type="button"
                        onClick={() => setIsVarCreOpen(true)}
                        className="flex w-full items-center justify-center space-x-2.5"
                      >
                        <img
                          src={addIcon}
                          alt="add icon"
                        />
                        <div>Agregar Variable</div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )
          }

          <div className="pt-5" />
        </form>
      </div>

      <Button
        text="Agregar Componente"
        form="ComponentCreationForm"
        color="blue"
      />

      {
        isVarCreOpen && (
          <div className="absolute left-0 top-0 h-full w-full">
            <VariableCreation
              updateVariables={() => getVariables()}
              changeView={() => setIsVarCreOpen(false)}
            />
          </div>
        )
       }
    </div>
  );
};

export default ComponentCreation;
