import { React, useState, useEffect } from 'react';

import { useNavigate, Outlet } from 'react-router-dom';

import {
  addIcon, adminIcon, bellIcon, nodeIcon, userIcon, usersIcon,
} from 'src/assets';
import {
  Button, ColorInput, Divider, Heading, TextInput,
} from 'src/components';
import workspacesService from 'src/services/workspaces';
import colors from 'src/utils/colors';
import notifications from 'src/utils/notifications';

const WorkspaceButton = ({ workspace, enterWorkspace }) => {
  const [isHovered, setIsHovered] = useState(false);

  const addZeros = (number) => {
    switch (number.length) {
      case 3:
        return number;
      case 2:
        return `0${number}`;
      case 1:
        return `00${number}`;
      default:
        return '';
    }
  };

  return (
    <button
      type="button"
      className="flex h-fit w-full flex-col gap-2.5 rounded-lg p-5 shadow-lg sm:w-[230px]"
      style={{
        backgroundColor: isHovered
          ? colors.getDarkerColor(workspace.color, 0.25)
          : workspace.color,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => enterWorkspace(workspace)}
    >
      <p className="h-[50px] w-full overflow-hidden break-words text-left font-semibold">
        {workspace.name}
      </p>

      <div className="flex h-[25px] w-full justify-between">
        <div className="flex h-fit w-[25px] flex-col items-center">
          <img
            src={workspace.is_admin ? adminIcon : userIcon}
            alt={workspace.is_admin ? 'admin' : 'user'}
            className="h-[25px] w-[25px]"
          />
        </div>

        <div className="flex w-[55px] items-center justify-between">
          <img
            src={usersIcon}
            alt="users"
            className="h-[25px] w-[25px]"
          />

          <span className="text-sm">
            {addZeros(workspace.members)}
          </span>
        </div>

        <div className="flex h-fit w-[50px] items-center justify-between">
          <img
            src={nodeIcon}
            alt="nodes"
            className="h-[25px] w-[25px]"
          />

          <span className="text-sm">
            {addZeros(workspace.nodes)}
          </span>
        </div>
      </div>
    </button>
  );
};

const WorkspaceList = ({
  workspaces, invitations, changeView, enterWorkspace,
}) => (
  <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
    <div className="flex justify-between">
      <Heading text="Espacios de Trabajo" />

      <button
        type="button"
        onClick={() => changeView('WorkspaceInvitations')}
        className="relative self-start"
      >
        {
          !(invitations.length === 0) && (
            <div className="absolute -right-2.5 -top-1.5 flex h-[20px] w-[20px] items-center justify-center rounded-xl bg-red-500 shadow sm:h-[25px] sm:w-[25px]">
              <span className="h-fit w-fit text-xs font-bold text-white">
                {invitations.length}
              </span>
            </div>
          )
        }

        <img
          src={bellIcon}
          alt="bell"
          className="h-[25px] w-[25px] sm:h-[36px] sm:w-[36px]"
        />
      </button>
    </div>

    <Divider />

    <div className="relative h-full">
      <ul className={`small-scrollbar absolute flex h-full w-full flex-col justify-start space-y-5 overflow-y-auto rounded-lg border bg-background p-5 shadow
                      sm:inline-grid sm:grid-cols-layout sm:justify-center sm:gap-5 sm:space-y-0`}
      >
        {
          workspaces
            .map((workspace) => (
              <li key={workspace.workspace_id}>
                <WorkspaceButton workspace={workspace} enterWorkspace={enterWorkspace} />
              </li>
            ))
        }
        <li>
          <button
            type="button"
            className="flex h-fit w-full flex-col items-center gap-2.5 rounded-lg bg-main p-5 shadow-lg hover:bg-main-dark sm:w-[230px]"
            onClick={() => changeView('WorkspaceCreation')}
          >
            <p className="h-[25px] w-full overflow-hidden break-words font-semibold text-white">
              Agregar Espacio de Trabajo
            </p>
            <img
              src={addIcon}
              alt="add"
              className="h-[50px] w-[50px]"
            />
          </button>
        </li>
      </ul>
    </div>
  </div>
);

const WorkspaceInvitations = ({
  invitations, updateInvitations, updateWorkspaces, changeView,
}) => {
  const invitationResponse = async (workspaceId, wasAccepted) => {
    try {
      const response = await workspacesService.invitationResponse({
        workspaceId, wasAccepted,
      });
      notifications.success(response);
      updateInvitations();
      updateWorkspaces();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
      <Heading
        text="Invitaciones"
        hasButton
        onButtonClick={() => changeView(null)}
      />

      <Divider />

      <div className="relative h-full w-full space-y-5 overflow-hidden">
        <ul className="small-scrollbar absolute flex h-full w-full flex-col space-y-5 overflow-y-auto rounded-lg border bg-background p-5 pb-10">
          {
            (invitations.length !== 0)
              ? (
                invitations
                  .map((invitation) => (
                    <li
                      key={invitation.workspace_id}
                      className="flex h-fit w-full flex-col space-y-2.5 rounded-lg bg-white p-5 shadow"
                    >
                      <div>
                        <div className="break-words font-semibold">
                          {invitation.name}
                        </div>
                        <div className="text-xs">
                          {`Invitado por: ${invitation.first_name} ${invitation.last_name}`}
                        </div>
                      </div>

                      <div className="flex gap-2.5">
                        <Button
                          text="Aceptar"
                          typeIsButton
                          onClick={() => invitationResponse(invitation.workspace_id, true)}
                          color="blue"
                        />
                        <Button
                          text="Rechazar"
                          typeIsButton
                          onClick={() => invitationResponse(invitation.workspace_id, false)}
                          color="red"
                        />
                      </div>
                    </li>
                  ))
              )
              : (
                <li className="h-fit w-full rounded-lg bg-white p-5 text-center shadow">
                  No has recibido invitaciones a otros espacios de trabajo
                </li>
              )
          }
        </ul>
      </div>
    </div>
  );
};

const WorkspaceCreation = ({ updateWorkspaces, changeView }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await workspacesService.create({ name, color });
      notifications.success(response);
      updateWorkspaces();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Agregar Espacio"
          hasButton
          onButtonClick={() => changeView(null)}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <TextInput
            id="name"
            type="text"
            labelText="Nombre del Espacio de Trabajo"
            value={name}
            setValue={setName}
          />
          <ColorInput
            id="color"
            labelText="Color del Espacio de Trabajo"
            value={color}
            setValue={setColor}
          />
        </form>
      </div>

      <Button
        text="Agregar Espacio de Trabajo"
        form="form"
        color="blue"
      />
    </div>
  );
};

const Workspaces = () => {
  const [invitations, setInvitations] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [view, setView] = useState(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState({});
  const [isSideOpen, setIsSideOpen] = useState(false);
  const isScreenSM = (window.innerWidth <= 640);
  const navigate = useNavigate();

  const getInvitations = async () => {
    try {
      const response = await workspacesService.getInvitations();
      setInvitations(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  const getWorkspaces = async () => {
    try {
      const response = await workspacesService.getAll();
      setWorkspaces(response);

      if (selectedWorkspace) {
        setSelectedWorkspace(
          response.find((workspace) => workspace.workspace_id === selectedWorkspace.workspace_id),
        );
      }
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getInvitations();
    getWorkspaces();
  }, []);

  const changeView = (value) => {
    if (!isScreenSM) {
      setIsSideOpen(true);
      if (!value) setIsSideOpen(false);
    }
    setView(value);
  };

  const enterWorkspace = (workspace) => {
    setSelectedWorkspace(workspace);
    setView('WorkspaceInstance');
    if (!isScreenSM) {
      setIsSideOpen(false);
    }
    navigate(`/espacios-de-trabajo/${workspace.workspace_id}`);
  };

  const renderView = () => {
    switch (view) {
      case 'WorkspaceCreation':
        return (
          <WorkspaceCreation
            updateWorkspaces={() => getWorkspaces()}
            changeView={(value) => changeView(value)}
          />
        );
      case 'WorkspaceInvitations':
        return (
          <WorkspaceInvitations
            invitations={invitations}
            updateInvitations={() => getInvitations()}
            updateWorkspaces={() => getWorkspaces()}
            changeView={(value) => changeView(value)}
          />
        );
      default:
        return (
          (isScreenSM) && (
            <WorkspaceList
              invitations={invitations}
              workspaces={workspaces}
              changeView={(value) => changeView(value)}
              enterWorkspace={(workspace) => enterWorkspace(workspace)}
            />
          )
        );
    }
  };

  return (
    (view === 'WorkspaceInstance')
      ? (
        <Outlet context={{ selectedWorkspace, getWorkspaces, setView }} />
      )
      : (
        <div className="flex grow bg-background px-5 pb-5 sm:grid sm:grid-cols-4 sm:grid-rows-1 sm:gap-5">
          <div className={`${isSideOpen ? 'col-span-3' : 'col-span-4'} hidden grow bg-background sm:flex`}>
            <WorkspaceList
              invitations={invitations}
              workspaces={workspaces}
              changeView={(value) => changeView(value)}
              enterWorkspace={(workspace) => enterWorkspace(workspace)}
            />
          </div>

          <div className={`${isSideOpen && 'col-span-1'} flex grow bg-background`}>
            {renderView()}
          </div>
        </div>
      )
  );
};

export default Workspaces;
