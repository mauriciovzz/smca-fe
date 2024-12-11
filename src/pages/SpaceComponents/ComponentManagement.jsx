import { React, useEffect, useState } from 'react';

import { useOutletContext, useParams, useNavigate } from 'react-router-dom';

import { checkCircleIcon, pasteIcon, uncheckCircleIcon } from 'src/assets';
import {
  AddNewItemButton, Button, ConfirmationDialog, TextInput, VariableListItem,
} from 'src/components/inputs';
import {
  Badge, Divider, Heading, Label,
} from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import useScreenWidth from 'src/hooks/useScreenWidth';
import VariableCreation from 'src/pages/SpaceVariables/VariableCreation';
import notificationHelper from 'src/utils/notificationHelper';

const DatasheetButton = ({ link }) => (
  <a
    href={link}
    target="_blank"
    rel="noreferrer noopener"
    className="flex h-[24px] w-full items-center justify-center rounded-3xl bg-[#0066CC] text-center text-sm font-medium text-white"
  >
    datasheet
  </a>
);

const ComponentManagement = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const isScreenSmall = useScreenWidth();
  const navigate = useNavigate();

  const {
    spaceData,
    componentsData, updateComponentsData,
    variablesData, updateVariablesData,
  } = useOutletContext();

  const { componentId } = useParams();
  const selectedComponent = componentsData
    .find((c) => c.component_id === parseInt(componentId, 10));

  const [isEditable, setIsEditable] = useState(false);
  const [isConDiaOpen, setIsConDiaOpen] = useState(false);
  const [isVarCreOpen, setIsVarCreOpen] = useState(false);

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [datasheetLink, setDatasheetLink] = useState('');
  const [variables, setVariables] = useState([]);

  const setData = () => {
    setIsEditable(false);
    setIsConDiaOpen(false);
    setIsVarCreOpen(false);

    setName(selectedComponent.name);
    setDatasheetLink(selectedComponent.datasheet_link);
    setType(selectedComponent.type);

    const varList = selectedComponent.type === 'sensor'
      ? selectedComponent.variables
      : [];

    setVariables(varList);
  };

  useEffect(() => {
    setData();
  }, [componentId]);

  const isVariableInComponent = (varId) => variables.map((v) => v.variable_id).indexOf(varId);

  const handleVariableSelection = (variable) => {
    const index = isVariableInComponent(variable.variable_id);

    if (index === -1) {
      setVariables([...variables, variable]);
    } else {
      setVariables(variables.toSpliced(index, 1));
    }
  };

  const arraysDiference = (array1, array2) => array1.filter((v) => !array2.includes(v));

  const copyClipboard = async () => {
    const text = await navigator.clipboard.readText();
    setDatasheetLink(text);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (type === 'sensor' && variables.length === 0) {
      notificationHelper.error('Selecionar al menos 1 variable.');
    } else {
      try {
        const originalVariables = selectedComponent.variables.map((v) => v.variable_id);
        const updatedVariables = variables.map((v) => v.variable_id);

        const variablesToUpdate = [];

        const variablesToAdd = arraysDiference(updatedVariables, originalVariables);
        variablesToAdd.forEach((variableId) => variablesToUpdate.push({ variableId, action: 'add' }));

        const variablesToRemove = arraysDiference(originalVariables, updatedVariables);
        variablesToRemove.forEach((variableId) => variablesToUpdate.push({ variableId, action: 'remove' }));

        const response = await axiosPrivate.put(
          `/api/spaces/${spaceData.space_id}/components/${selectedComponent.component_id}`,
          {
            name,
            datasheetLink,
            variables: variablesToUpdate,
          },
        );

        notificationHelper.success(response.data);

        updateComponentsData();
        setIsEditable(!isEditable);
      } catch (error) {
        if (error?.response?.data?.message === 'NewComponentVariableDoesNotExist') {
          notificationHelper.error('Una de las variables agregadas no se encuentra registrada.');
          updateVariablesData();
          setVariables(selectedComponent.variables);
        } else {
          errorHandler(error, updateComponentsData);
        }
      }
    }
  };

  const handleRemove = async () => {
    try {
      const response = await axiosPrivate.delete(
        `/api/spaces/${spaceData.space_id}/components/${selectedComponent.component_id}`,
      );

      notificationHelper.success(response);
      updateComponentsData();
      navigate('..');
    } catch (error) {
      errorHandler(error, updateComponentsData);
    }
  };

  return (
    <div className="relative flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Componente"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider />

        <form className="flex grow flex-col space-y-5" onSubmit={handleUpdate} id="updateComponentForm">
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
                    <div className="flex grow flex-col">
                      <TextInput
                        id="type"
                        type="text"
                        labelText="Tipo"
                        value={type}
                        setValue={setType}
                        autoComplete="off"
                        disabled
                      />
                    </div>

                    <div className="flex w-[80px] flex-col">
                      <Label text="Datasheet" />
                      <div className="flex h-full items-center justify-between">
                        <button
                          type="button"
                          className="flex"
                          onClick={() => copyClipboard()}
                        >
                          <img
                            src={pasteIcon}
                            className="size-[30px]"
                            alt="paste icon"
                          />
                        </button>

                        <img
                          className="size-[30px]"
                          src={selectedComponent.datasheet_link !== datasheetLink
                            ? checkCircleIcon
                            : uncheckCircleIcon}
                          alt={selectedComponent.datasheet_link !== datasheetLink
                            ? 'cheked'
                            : 'unchecked'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
              : (
                <div className="flex grow flex-col space-y-5">
                  {
                    (isScreenSmall)
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

                          <div className="flex size-full space-x-5">
                            <Badge value={type} width="w-full" />
                            <DatasheetButton link={datasheetLink} />
                          </div>
                        </div>
                      )
                      : (
                        <div className="flex w-full space-x-5 divide-x">
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

                          <div className="flex w-2/6 flex-col justify-between pl-5">
                            <Badge value={type} width="w-full" />
                            <DatasheetButton link={datasheetLink} />
                          </div>
                        </div>
                      )
                  }
                </div>
              )
          }

          {
            (type === 'sensor') && (
              <div className="h-full">
                <Label text="Variables del componente" />

                <div className="relative size-full">
                  <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
                    {
                      (isEditable ? variablesData : variables)
                        .filter((v) => v.variable_type === 'enviromental')
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((variable) => (
                          <VariableListItem
                            key={variable.variable_id}
                            variable={variable}
                            onClick={isEditable ? () => handleVariableSelection(variable) : null}
                            wasSelected={isVariableInComponent(variable.variable_id) !== -1}
                            isEditable={isEditable}
                          />
                        ))
                    }

                    {(isEditable ? variablesData : variables)
                      .filter((v) => v.variable_type === 'meteorological')
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((variable) => (
                        <VariableListItem
                          key={variable.variable_id}
                          variable={variable}
                          onClick={isEditable ? () => handleVariableSelection(variable) : null}
                          wasSelected={isVariableInComponent(variable.variable_id) !== -1}
                          isEditable={isEditable}
                        />
                      ))}

                    {(isEditable) && (
                      <AddNewItemButton
                        text="Agregar Variable"
                        onClick={() => setIsVarCreOpen(true)}
                      />
                    )}
                  </ul>
                </div>
              </div>
            )
          }
          <div className="pt-5" />
        </form>
      </div>

      {
        (spaceData.is_admin) && (
          <div className="flex w-full gap-2.5">
            {
              isEditable
                ? (
                  <Button
                    key="save button"
                    text="Guardar"
                    form="updateComponentForm"
                    color="blue"
                  />
                )
                : (
                  <Button
                    key="edit button"
                    text="Modificar"
                    isTypeButton
                    onClick={() => setIsEditable(true)}
                    color="blue"
                  />
                )
            }
            <Button
              text={isEditable ? 'Cancelar' : 'Eliminar'}
              isTypeButton
              onClick={isEditable ? () => setData() : () => setIsConDiaOpen(true)}
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
          onDecline={{ text: 'Cancelar', action: () => setIsConDiaOpen(false) }}
          onConfirm={{ text: 'Eliminar', action: () => handleRemove() }}
        />
        )
      }

      {isVarCreOpen && (
        <div className="absolute left-0 top-0 size-full">
          <VariableCreation onClose={() => setIsVarCreOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default ComponentManagement;
