import { React, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { control } from 'src/assets';
import {
  Button, ColorInput, Heading, Label, TextInput,
} from 'src/components';
import workspaceService from 'src/services/workspaces';
import colors from 'src/utils/colors';
import notifications from 'src/utils/notifications';

const WorkspaceButton = ({
  workspaceId, text, color, onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="flex h-[200px] w-full justify-between rounded-lg p-5 shadow sm:w-[230]"
      style={{ backgroundColor: isHovered ? colors.getDarkerColor(color, 0.25) : color }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={workspaceId ? () => navigate(`/espacios-de-trabajo/${workspaceId}`) : () => onClick()}
    >
      <div className="flex flex-col text-left">
        <Label text={text} />
        Mas info de esta broma
      </div>
      <img
        src={control}
        alt="control arrow"
        className="h-[28px] w-[28px] rotate-180 self-center"
      />
    </button>
  );
};

const WorkspaceList = ({ workspaces, onCreateClick }) => (
  <div className="flex grow flex-col divide-y rounded-lg bg-white p-5 shadow">
    <Heading
      text="Espacios de Trabajo"
    />
    <div className="relative h-full overflow-hidden rounded-lg pt-5">
      <div className={`small-scrollbar absolute flex h-full w-full flex-col justify-start space-y-5 overflow-y-auto rounded-lg bg-background p-5 pb-10 shadow
                      sm:inline-grid sm:grid-cols-layout sm:justify-center sm:gap-5 sm:space-y-0`}
      >
        {
          workspaces
            .map((workspace) => (
              <div key={workspace.workspace_id}>
                <WorkspaceButton
                  workspaceId={workspace.workspace_id}
                  text={workspace.name}
                  color={workspace.color}
                />
              </div>
            ))
        }
        <div>
          <WorkspaceButton
            text="Agregar Espacio de Trabajo"
            color="#0284C7"
            onClick={onCreateClick}
          />
        </div>
      </div>
    </div>
  </div>
);

const WorkspaceCreation = ({ closeView, updateList }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await workspaceService.create({
        name, color,
      });
      notifications.success(response);
      updateList();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col divide-y rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col divide-y">
        <Heading
          text="Agregar Espacio de Trabajo"
          hasButton
          isCloseButton={false}
          onButtonClick={() => closeView()}
        />

        <form onSubmit={handleSubmit} id="form" className="space-y-5 py-5">
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
  const [workspaces, setWorkspaces] = useState([]);
  const [view, setView] = useState(null);

  const getWorkspaces = async () => {
    try {
      const response = await workspaceService.getAll();
      setWorkspaces(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getWorkspaces();
  }, []);

  const renderView = () => {
    switch (view) {
      case 'create':
        return (
          <WorkspaceCreation
            closeView={() => setView(null)}
            updateList={() => getWorkspaces()}
          />
        );
      default:
        return (
          <WorkspaceList
            workspaces={workspaces}
            onCreateClick={() => setView('create')}
          />
        );
    }
  };

  return (
    <div className="flex grow bg-background px-5 pb-5">
      {renderView()}
    </div>
  );
};

export default Workspaces;
