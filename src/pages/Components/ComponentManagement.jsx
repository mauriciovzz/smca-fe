import { React, useEffect, useState } from 'react';

import { useOutletContext } from 'react-router-dom';

import { addIcon } from 'src/assets';
import {
  Button, Divider, Heading, Label, TextInput,
} from 'src/components';
import { ConfirmationDialog } from 'src/layout';
import VariableCreation from 'src/pages/Variables/VariableCreation';
import componentsService from 'src/services/components';
import variablesService from 'src/services/variables';
import notifications from 'src/utils/notifications';

const ComponentManagement = ({ selectedComponent, updateComponents, changeView }) => {
  const { selectedWorkspace } = useOutletContext();
  const [variables, setVariables] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [isConDiaOpen, setIsConDiaOpen] = useState(false);
  const [isVarCreOpen, setIsVarCreOpen] = useState(false);

  const [name, setName] = useState('');
  const [datasheetLink, setDatasheetLink] = useState('');
  const [componentType, setComponentType] = useState('');
  const [componentVariables, setComponentVariables] = useState([]);

  const getVariables = async () => {
    try {
      const response = await variablesService.getAll(selectedWorkspace.workspace_id);
      setVariables(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  const setData = () => {
    setIsEditable(false);
    setIsConDiaOpen(false);

    setName(selectedComponent.name);
    setDatasheetLink(selectedComponent.datasheet_link);
    setComponentType(selectedComponent.type);
    setComponentVariables(selectedComponent.variables);
  };

  useEffect(() => {
    getVariables();
    setData();
  }, [selectedComponent]);

  const isVariableInComponent = (variable) => componentVariables
    .map((v) => v.variable_id)
    .includes(variable.variable_id);

  const handleVariableSelection = (variable) => {
    if (isVariableInComponent(variable)) {
      setComponentVariables(componentVariables
        .filter((vr) => vr.variable_id !== variable.variable_id));
    } else {
      setComponentVariables([...componentVariables, variable]);
    }
  };

  const handleUpdate = async () => {
    if (componentType === 'Sensor' && componentVariables.length === 0) {
      notifications.errorMsg('Selecionar al menos 1 variable.');
    } else {
      try {
        const response = await componentsService.update(
          selectedWorkspace.workspace_id,
          selectedComponent.component_id,
          {
            name,
            datasheetLink,
            variables: componentVariables.map((variable) => variable.variable_id),
          },
        );

        notifications.success(response);
        updateComponents();
        setIsEditable(!isEditable);
      } catch (err) {
        notifications.error(err);
      }
    }
  };

  const handleRemove = async () => {
    try {
      const response = await componentsService.remove(
        selectedWorkspace.workspace_id,
        selectedComponent.component_id,
      );

      notifications.success(response);
      updateComponents();
      changeView();
    } catch (err) {
      notifications.error(err);
    }
  };

  const variableTypeBadge = (type) => {
    switch (type) {
      case 'Meteorológica':
        return (
          <div className="flex h-[28px] w-[40px] items-center justify-center self-center rounded-3xl bg-sky-200 text-xs font-medium text-main">
            met
          </div>
        );
      case 'Ambiental':
        return (
          <div className="flex h-[28px] w-[40px] items-center justify-center self-center rounded-3xl bg-green-200 text-xs font-medium text-green-600">
            amb
          </div>
        );
      default:
        return (
          <div />
        );
    }
  };

  const componentTypeBadge = (type) => {
    switch (type) {
      case 'Placa':
        return (
          <div className="flex h-[25px] w-full items-center justify-center rounded-3xl bg-[#9DB28C] text-center text-sm font-medium text-white">
            placa
          </div>
        );
      case 'Sensor':
        return (
          <div className="flex h-[25px] w-full items-center justify-center rounded-3xl bg-[#C8C8C7] text-center text-sm font-medium text-white">
            sensor
          </div>
        );
      case 'Camara':
        return (
          <div className="flex h-[25px] w-full items-center justify-center rounded-3xl bg-[#8F8D8E] text-center text-sm font-medium text-white">
            camara
          </div>
        );
      case 'Pantalla':
        return (
          <div className="flex h-[25px] w-full items-center justify-center rounded-3xl bg-[#A3A6B5] text-center text-sm font-medium text-white">
            pantalla
          </div>
        );
      case 'Otro':
        return (
          <div className="flex h-[25px] w-full items-center justify-center rounded-3xl bg-[#A89A8E] text-center text-sm font-medium text-white">
            otro
          </div>
        );
      default:
        return (
          <div />
        );
    }
  };

  // const copyClipboard = async () => {
  //   const text = await navigator.clipboard.readText();
  //   setName(text)
  // };

  return (
    <div className="relative flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Componente"
          hasButton
          onButtonClick={() => changeView()}
        />

        <Divider />

        <form className="flex grow flex-col space-y-5">
          {
            (isEditable)
              ? (
                <div className="flex grow flex-col space-y-5">
                  <TextInput
                    id="name"
                    type="text"
                    labelText="Nombre"
                    value={name}
                    setValue={setName}
                    autoComplete="off"
                    disabled={!isEditable}
                  />

                  <div className="flex w-full space-x-5">
                    <TextInput
                      id="datasheetLink"
                      type="url"
                      labelText="Datasheet Link"
                      value={datasheetLink}
                      setValue={setDatasheetLink}
                      autoComplete="off"
                      disabled={!isEditable}
                    />
                    <div className="w-1/2">
                      <TextInput
                        id="componentType"
                        type="text"
                        labelText="Tipo"
                        value={componentType}
                        setValue={setComponentType}
                        autoComplete="off"
                        disabled
                      />
                    </div>
                  </div>
                </div>

              )
              : (
                <div className="flex grow flex-col space-y-5">
                  {
                    (window.innerWidth <= 640)
                      ? (
                        <div className="flex flex-col space-y-5">
                          <div className="flex-1">
                            <TextInput
                              id="name"
                              type="text"
                              labelText="Nombre"
                              value={name}
                              setValue={setName}
                              autoComplete="off"
                              disabled={!isEditable}
                            />
                          </div>

                          <div className="flex h-full w-full space-x-5">
                            {componentTypeBadge(componentType)}

                            <a
                              href={datasheetLink}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="flex h-[25px] w-full items-center justify-center rounded-3xl bg-[#0066CC] text-center text-xs font-medium text-white"
                            >
                              Datasheet
                            </a>
                          </div>
                        </div>
                      )
                      : (
                        <div className="flex space-x-5 divide-x">
                          <div className="flex-1">
                            <TextInput
                              id="name"
                              type="text"
                              labelText="Nombre"
                              value={name}
                              setValue={setName}
                              autoComplete="off"
                              disabled={!isEditable}
                            />
                          </div>

                          <div className="flex h-full w-[100px] flex-col justify-between pl-5">
                            {componentTypeBadge(componentType)}

                            <a
                              href={datasheetLink}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="flex h-[25px] w-full items-center justify-center rounded-3xl bg-[#0066CC] text-center text-xs font-medium text-white"
                            >
                              Datasheet
                            </a>
                          </div>
                        </div>
                      )
                  }
                </div>
              )
          }

          {
            (componentType === 'Sensor') && (
              <div className="h-full">
                <Label text="Variables del componente" />

                <div className="relative h-full w-full">
                  <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-auto rounded-lg border bg-background">
                    {
                      (isEditable ? variables : componentVariables).map((variable) => (
                        <li
                          key={variable.variable_id}
                          className={`${(isVariableInComponent(variable)) ? `${isEditable ? 'bg-sky-100' : 'bg-white'}` : 'bg-white hover:bg-slate-100'} h-fit w-full border-b px-5 py-2.5 shadow`}
                        >
                          <button
                            type="button"
                            onClick={isEditable
                              ? () => handleVariableSelection(variable)
                              : undefined}
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
                              {variableTypeBadge(variable.type)}
                            </div>
                          </button>
                        </li>
                      ))
                    }

                    {
                      (isEditable) && (
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
                      )
                    }
                  </ul>
                </div>
              </div>
            )
          }

          <div className="pt-5" />
        </form>
      </div>

      {
        (selectedWorkspace.is_admin) && (
          <div className="flex w-full gap-2.5">
            <Button
              text={isEditable ? 'Guardar' : 'Modificar'}
              typeIsButton
              onClick={isEditable ? () => handleUpdate() : () => setIsEditable(!isEditable)}
              color="blue"
            />
            <Button
              text={isEditable ? 'Cancelar' : 'Eliminar'}
              typeIsButton
              onClick={isEditable ? () => setData(!isEditable) : () => setIsConDiaOpen(true)}
              color="red"
            />
          </div>
        )
      }

      {
        isConDiaOpen && (
        <ConfirmationDialog
          title="Eliminar Componente"
          description={`Estas seguro de querer eliminar el componente "${name}"?`}
          onDecline={() => setIsConDiaOpen(false)}
          onConfirm={() => handleRemove()}
        />
        )
      }

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

export default ComponentManagement;
