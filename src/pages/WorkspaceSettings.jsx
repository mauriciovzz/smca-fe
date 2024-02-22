import { React, useState } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';

import { control } from 'src/assets';
import {
  Button, ColorInput, Divider, Heading, Label, TextInput,
} from 'src/components';
import workspacesService from 'src/services/workspaces';
import notifications from 'src/utils/notifications';

const SettingsOverview = ({ onClick }) => {
  const { selectedWorkspace } = useOutletContext();

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
      <Heading text="Ajustes" />

      <Divider />

      <div className="flex h-full w-full flex-col divide-y">
        <button
          type="button"
          className="flex w-full justify-between pb-5 hover:bg-background"
          onClick={() => onClick('UpdateName')}
        >
          <div className="flex w-5/6 flex-col items-start">
            <Label text="Nombre" />
            <p className="w-full overflow-hidden break-words text-left">
              {selectedWorkspace.name}
            </p>
          </div>

          <img
            src={control}
            alt="control arrow"
            className="h-[28px] w-[28px] rotate-180 self-center"
          />
        </button>

        <button
          type="button"
          className="flex w-full justify-between py-5 hover:bg-background"
          onClick={() => onClick('UpdateColor')}
        >
          <div className="flex w-1/2 flex-col items-start sm:w-1/3">
            <Label text="Color" />
            <div className="h-[24px] w-full rounded-3xl border-2 border-black" style={{ backgroundColor: selectedWorkspace.color }} />
          </div>

          <img
            src={control}
            alt="control arrow"
            className="h-[28px] w-[28px] rotate-180 self-center"
          />
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-between py-5 hover:bg-background"
          onClick={() => onClick('LeaveWorkspace')}
        >
          <div className="font-semibold">Abandonar Espacio</div>

          <img
            src={control}
            alt="control arrow"
            className="h-[28px] w-[28px] rotate-180 self-center"
          />
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-between py-5 hover:bg-background"
          onClick={() => onClick('DeleteWorkspace')}
        >
          <div className="font-semibold">Eliminar Espacio</div>

          <img
            src={control}
            alt="control arrow"
            className="h-[28px] w-[28px] rotate-180"
          />
        </button>
      </div>
    </div>
  );
};

const UpdateName = ({ resetView }) => {
  const { selectedWorkspace, getWorkspaces } = useOutletContext();
  const [newName, setNewName] = useState(selectedWorkspace.name);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await workspacesService.updateName({
        workspaceId: selectedWorkspace.workspace_id,
        newName,
      });
      notifications.success(response);
      getWorkspaces();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Nombre"
          hasButton
          onButtonClick={() => resetView()}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <TextInput
            id="newName"
            type="text"
            labelText="Nombre del espacio de trabajo"
            value={newName}
            setValue={setNewName}
          />
        </form>
      </div>

      <Button
        text="Guardar Cambios"
        form="form"
        color="blue"
      />
    </div>
  );
};

const UpdateColor = ({ resetView }) => {
  const { selectedWorkspace, getWorkspaces } = useOutletContext();
  const [newColor, setNewColor] = useState(selectedWorkspace.color);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await workspacesService.updateColor({
        workspaceId: selectedWorkspace.workspace_id,
        newColor,
      });
      notifications.success(response);
      getWorkspaces();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Color"
          hasButton
          onButtonClick={() => resetView()}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <ColorInput
            id="newColor"
            labelText="Color del Espacio de Trabajo"
            value={newColor}
            setValue={setNewColor}
          />
        </form>
      </div>

      <Button
        text="Guardar Cambios"
        form="form"
        color="blue"
      />
    </div>
  );
};

const LeaveWorkspace = ({ resetView }) => {
  const { selectedWorkspace, getWorkspaces } = useOutletContext();
  const navigate = useNavigate();

  const buttonClick = async () => {
    try {
      const response = await workspacesService.leaveWorkspace(selectedWorkspace.workspace_id);
      notifications.success(response);
      getWorkspaces();
      navigate('/espacios-de-trabajo');
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Abandonar Espacio"
          hasButton
          onButtonClick={() => resetView()}
        />

        <Divider />

      </div>

      <Button
        text="Abandonar Espacio"
        typeIsButton
        onClick={() => buttonClick()}
        color="red"
      />
    </div>
  );
};

const WorkspaceSettings = () => {
  const [view, setView] = useState(null);
  const isScreenSM = (window.innerWidth <= 640);

  const renderView = () => {
    switch (view) {
      case 'UpdateName':
        return (
          <UpdateName resetView={(value) => setView(value)} />
        );
      case 'UpdateColor':
        return (
          <UpdateColor resetView={() => setView(null)} />
        );
      case 'LeaveWorkspace':
        return (
          <LeaveWorkspace resetView={() => setView(null)} />
        );
      // case 'LeaveWorkspace':
      //   return (
      //     <UpdatePassword
      //       resetView={() => setView(null)}
      //       isScreenSM={isScreenSM}
      //     />
      //   );
      default:
        return (
          (isScreenSM)
            ? (
              <SettingsOverview onClick={(value) => setView(value)} />
            )
            : (
              <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
                <span>Selecciona una opción para realizar cambios.</span>
              </div>
            )
        );
    }
  };

  return (
    <div className="flex h-full w-full bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
      <div className="hidden h-full w-full bg-background sm:flex">
        <SettingsOverview onClick={(value) => setView(value)} />
      </div>

      <div className="flex h-full w-full bg-background">
        {renderView()}
      </div>
    </div>
  );
};

export default WorkspaceSettings;
