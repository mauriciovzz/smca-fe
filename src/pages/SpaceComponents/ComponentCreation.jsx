import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { pasteIcon } from 'src/assets';
import {
  AddNewItemButton, Button, TextInput, VariableListItem,
} from 'src/components/inputs';
import { Divider, Heading, Label } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import VariableCreation from 'src/pages/SpaceVariables/VariableCreation';
import notificationHelper from 'src/utils/notificationHelper';

const componentTypes = [
  { type: 'board', text: 'placa' },
  { type: 'sensor', text: 'sensor' },
  { type: 'camera', text: 'camara' },
  { type: 'other', text: 'otro' },
];

const ComponentCreation = ({ onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const {
    spaceData,
    updateComponentsData,
    variablesData, updateVariablesData,
  } = useOutletContext();

  const [isVarCreOpen, setIsVarCreOpen] = useState(false);

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [datasheetLink, setDatasheetLink] = useState('');
  const [componentVariables, setComponentVariables] = useState([]);

  const handleComponentCreationSubmit = async (event) => {
    event.preventDefault();

    if ((type === 'sensor') && variablesData.length === 0) {
      notificationHelper.error('Selecionar al menos 1 variable.');
    } else {
      try {
        const response = await axiosPrivate.post(
          `/api/spaces/${spaceData.space_id}/components`,
          {
            type,
            name,
            datasheetLink,
            variables: componentVariables,
          },
        );

        notificationHelper.success(response.data);

        setName('');
        setType('');
        setDatasheetLink('');
        setComponentVariables([]);

        updateComponentsData();
      } catch (error) {
        if (error?.response?.data?.message === 'NewComponentVariableDoesNotExist') {
          notificationHelper.error('Una de las variables agregadas no se encuentra registrada.');
          updateVariablesData();
          setComponentVariables([]);
        } else {
          errorHandler(error, updateComponentsData);
        }
      }
    }
  };

  const handleVariableSelection = (variableId) => {
    const index = componentVariables.indexOf(variableId);

    if (index === -1) {
      setComponentVariables([...componentVariables, variableId]);
    } else {
      setComponentVariables(componentVariables.toSpliced(index, 1));
    }
  };

  const copyClipboard = async () => {
    const text = await navigator.clipboard.readText();
    setDatasheetLink(text);
  };

  return (
    <div className="relative flex size-full flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Agregar Componente"
          hasButton
          onButtonClick={onClose ? () => onClose() : () => navigate('..')}
        />

        <Divider />

        <form onSubmit={handleComponentCreationSubmit} id="ComponentCreationForm" className="flex grow flex-col space-y-5">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre"
            value={name}
            setValue={setName}
            autoComplete="off"
          />
          <div className="flex w-full space-x-5">
            <div className="flex w-2/5 flex-col sm:w-1/4">
              <Label text="Tipo" />
              <select
                name="type"
                id="type"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-[38px] w-full rounded-lg border border-gray-300 px-2 py-0.5 focus:border-main focus:ring-1 focus:ring-main"
              >
                <option aria-label="Save" disabled hidden />
                {componentTypes.map((t) => <option key={t.type} value={t.type}>{t.text}</option>)}
              </select>
            </div>

            <div className="flex w-3/5 flex-col sm:w-3/4">
              <Label text="Datasheet Link" />
              <div className="flex h-full items-center gap-2.5">
                <button
                  type="button"
                  className="flex size-[38px] items-center justify-center rounded-lg hover:bg-graydetails"
                  onClick={() => copyClipboard()}
                >
                  <img
                    src={pasteIcon}
                    className="size-[30px]"
                    alt="paste icon"
                  />
                </button>

                <div className="flex-1 items-center justify-center rounded-lg">
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-disabled px-2 py-1.5 focus:border-main focus:ring-main"
                    value={datasheetLink}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {
            (type === 'sensor') && (
              <div className="h-full">
                <Label text="Variables del componente" />

                <div className="relative size-full">
                  <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
                    {variablesData.map((variable) => (
                      <VariableListItem
                        key={variable.variable_id}
                        variable={variable}
                        onClick={() => handleVariableSelection(variable.variable_id)}
                        wasSelected={componentVariables.includes(variable.variable_id)}
                        isEditable
                      />
                    ))}

                    <AddNewItemButton
                      text="Agregar Variable"
                      onClick={() => setIsVarCreOpen(true)}
                    />
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

      {(isVarCreOpen) && (
        <div className="absolute left-0 top-0 size-full">
          <VariableCreation onClose={() => setIsVarCreOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default ComponentCreation;
