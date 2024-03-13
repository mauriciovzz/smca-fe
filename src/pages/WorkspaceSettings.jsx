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
          className={`${selectedWorkspace.is_admin && 'hover:bg-background'} flex w-full justify-between pb-5`}
          onClick={selectedWorkspace.is_admin ? (() => onClick('UpdateName')) : undefined}
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
            className={`${!selectedWorkspace.is_admin && 'hidden'} h-[28px] w-[28px] rotate-180 self-center`}
          />
        </button>

        <button
          type="button"
          className={`${selectedWorkspace.is_admin && 'hover:bg-background'} flex w-full justify-between py-5`}
          onClick={selectedWorkspace.is_admin ? (() => onClick('UpdateColor')) : undefined}
        >
          <div className="flex w-1/2 flex-col items-start sm:w-1/3">
            <Label text="Color" />
            <div className="h-[24px] w-full rounded-lg border p-0.5">
              <div className="h-full w-full rounded-lg" style={{ backgroundColor: selectedWorkspace.color }} />
            </div>
          </div>

          <img
            src={control}
            alt="control arrow"
            className={`${!selectedWorkspace.is_admin && 'hidden'} h-[28px] w-[28px] rotate-180 self-center`}
          />
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-between py-5 hover:bg-background"
          onClick={() => onClick('LeaveWorkspace')}
        >
          <div className="self-center font-semibold">Abandonar Espacio</div>

          <img
            src={control}
            alt="control arrow"
            className="h-[28px] w-[28px] rotate-180 self-center"
          />
        </button>

        {
          selectedWorkspace.is_admin && (
            <button
              type="button"
              className="flex w-full items-center justify-between py-5 hover:bg-background"
              onClick={() => onClick('DeleteWorkspace')}
            >
              <div className="self-center  font-semibold">Eliminar Espacio</div>

              <img
                src={control}
                alt="control arrow"
                className="h-[28px] w-[28px] rotate-180"
              />
            </button>
          )
        }
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
            labelText="Nombre"
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
            labelText="Color"
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
  const { selectedWorkspace, getWorkspaces, setView } = useOutletContext();
  const navigate = useNavigate();

  const buttonClick = async () => {
    try {
      const response = await workspacesService.leaveWorkspace(selectedWorkspace.workspace_id);
      notifications.success(response);
      getWorkspaces();
      navigate('/espacios-de-trabajo');
      setView('WorkspaceList');
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

        <p className="text-justify text-gray-500">
          Si estás seguro de querer abandonar este espacio de trabajo,
          haz clic en el botón &quot;Abandonar Espacio&quot;.
        </p>
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

const DeleteWorkspace = ({ resetView }) => {
  const { selectedWorkspace, getWorkspaces, setView } = useOutletContext();
  const [workspaceName, setWorkspaceName] = useState('');
  const navigate = useNavigate();

  const handleWorkspaceDeletion = async () => {
    if (selectedWorkspace.name === workspaceName) {
      try {
        const response = await workspacesService.deleteWorkspace(selectedWorkspace.workspace_id);
        notifications.success(response);
        getWorkspaces();
        navigate('/espacios-de-trabajo');
        setView('WorkspaceList');
      } catch (err) {
        notifications.error(err);
      }
    } else {
      notifications.errorMsg('El nombre ingresado no es correcto.');
    }
  };

  return (
    <div className="flex grow flex-col space-y-5 rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Eliminar Espacio"
          hasButton
          onButtonClick={() => resetView()}
        />

        <Divider />

        <div className="space-y-5">
          <p className="text-justify text-gray-500">
            {`Si estás seguro de querer eliminar el espacio de trabajo "${selectedWorkspace.name}", 
            ingrese el nombre del mismo y luego haga clic en el botón "Eliminar Espacio".`}
          </p>

          <p className="text-justify text-gray-500">
            {`Toma en cuenta que se eliminara todos los datos del mismo, 
            incluyendo la informacion de los nodos registrados y las lecturas realizadas por los mismos.`}
          </p>
        </div>
      </div>

      <TextInput
        id="workspaceName"
        type="text"
        labelText="Nombre del espacio de trabajo"
        value={workspaceName}
        setValue={setWorkspaceName}
      />

      <Button
        text="Eliminar Espacio"
        typeIsButton
        onClick={() => handleWorkspaceDeletion()}
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
      case 'DeleteWorkspace':
        return (
          <DeleteWorkspace resetView={() => setView(null)} />
        );
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
