import { React, useState } from 'react';

import { useOutletContext, useNavigate, useLoaderData } from 'react-router-dom';

import { checkCircleIcon, pasteIcon, uncheckCircleIcon } from 'src/assets';
import {
  AddToListButton, Button, TextInput, VariableListItem,
} from 'src/components/inputs';
import { Divider, Heading, Label } from 'src/components/ui';
import VariableCreation from 'src/pages/SpaceVariables/VariableCreation';
import componentsService from 'src/services/components';
import notificationHelper from 'src/utils/notificationHelper';

const ComponentCreation = () => {
  const { spaceData, updateSpaceInstanceRoot, errorHandler } = useOutletContext();
  const navigate = useNavigate();
  const variablesData = useLoaderData();
  const componentTypes = [
    { type: 'board', text: 'placa' },
    { type: 'sensor', text: 'sensor' },
    { type: 'rain_detector', text: 'detector de lluvia' },
    { type: 'camera', text: 'camara' },
    { type: 'screen', text: 'pantalla' },
    { type: 'other', text: 'otro' },
  ];

  const [isVarCreOpen, setIsVarCreOpen] = useState(false);

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [datasheetLink, setDatasheetLink] = useState('');
  const [componentVariables, setComponentVariables] = useState([]);

  const handleComponentCreationSubmit = async (event) => {
    event.preventDefault();

    if ((type === 'sensor') && variablesData.length === 0) {
      notificationHelper.errorMsg('Selecionar al menos 1 variable.');
    } else {
      try {
        const response = await componentsService.create(
          spaceData.space_id,
          {
            type,
            name,
            datasheetLink,
            variables: componentVariables,
          },
        );

        notificationHelper.success(response);

        setName('');
        setType('');
        setDatasheetLink('');
        setComponentVariables([]);

        updateSpaceInstanceRoot();
      } catch (error) {
        const goTo = errorHandler(error, updateSpaceInstanceRoot);

        if (goTo)
          navigate(goTo);

        if (error.response.data.message === 'Una de las variables agregadas no se encuentra registrada.')
          setComponentVariables([]);
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
          onButtonClick={() => navigate('..')}
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
            <div className="flex grow flex-col">
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
                  src={datasheetLink ? checkCircleIcon : uncheckCircleIcon}
                  alt={datasheetLink ? 'cheked' : 'unchecked'}
                />
              </div>
            </div>
          </div>

          {
            (type === 'sensor') && (
              <div className="h-full">
                <Label text="Variables del componente" />

                <div className="relative size-full">
                  <ul className="small-scrollbar absolute flex size-full flex-col overflow-hidden overflow-y-scroll rounded-lg border bg-background">
                    {
                      variablesData.map((variable) => (
                        <VariableListItem
                          key={variable.variable_id}
                          variable={variable}
                          onClick={() => handleVariableSelection(variable.variable_id)}
                          wasSelected={componentVariables.includes(variable.variable_id)}
                          isEditable
                        />
                      ))
                    }
                    <li className="h-fit w-full border-b bg-white px-5 py-2.5 shadow hover:bg-slate-100">
                      <AddToListButton text="Agregar Variable" onClick={() => setIsVarCreOpen(true)} />
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
          <div className="absolute left-0 top-0 size-full">
            <VariableCreation onClose={() => setIsVarCreOpen(false)} />
          </div>
        )
       }
    </div>
  );
};

export default ComponentCreation;
