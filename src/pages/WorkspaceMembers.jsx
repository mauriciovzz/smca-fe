import { React, useEffect, useState } from 'react';

import { useParams, useOutletContext } from 'react-router-dom';

import { addUserIcon } from 'src/assets';
import {
  Button, Divider, Heading, Label, TextInput,
} from 'src/components';
import workspacesService from 'src/services/workspaces';
import notifications from 'src/utils/notifications';

const MemberList = ({ members, selectMember, changeView }) => {
  const { selectedWorkspace } = useOutletContext();

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <div className="flex justify-between">
          <Heading text="Miembros del Espacio" />

          {
            (selectedWorkspace.is_admin) && (
              <button
                type="button"
                onClick={() => changeView('MemberInvitation')}
                className="self-start"
              >
                <img
                  src={addUserIcon}
                  alt="add user"
                  className="h-[25px] w-[25px] sm:h-[36px] sm:w-[36px]"
                />
              </button>
            )
          }
        </div>

        <Divider />

        <div className="relative h-full w-full">
          <ul className="small-scrollbar absolute flex h-full w-full flex-col overflow-hidden overflow-y-auto rounded-lg border bg-background">
            {
              members
                .map((account) => (
                  <li
                    key={account.account_id}
                    className="h-fit w-full border-b bg-white p-5 shadow hover:bg-slate-100"
                  >
                    <button
                      type="button"
                      onClick={() => selectMember(account)}
                      className="flex h-fit w-full justify-between"
                    >
                      <div className="flex flex-col font-medium">
                        <div className="flex">
                          <div>
                            {account.first_name}
                          </div>
                          <div className="ml-1">
                            {account.last_name}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {account.email}
                        </div>
                      </div>

                      <div className={`${account.is_admin ? 'flex' : 'hidden'} h-[28px] w-[56px] items-center justify-center self-center rounded-3xl bg-main text-sm font-medium text-white`}>
                        <div>admin</div>
                      </div>
                    </button>

                  </li>
                ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

const Member = ({ selectedMember, updateMembers, changeView }) => {
  const { workspaceId } = useParams();
  const { selectedWorkspace } = useOutletContext();

  const memberRoleUpdate = async () => {
    try {
      const response = await workspacesService.memberRoleUpdate({
        workspaceId,
        accountId: selectedMember.account_id,
        isAdmin: !selectedMember.is_admin,
      });
      notifications.success(response);
      updateMembers();
    } catch (err) {
      notifications.error(err);
    }
  };

  const memberRemoval = async () => {
    try {
      const response = await workspacesService.memberRemoval(
        workspaceId,
        selectedMember.account_id,
      );
      notifications.success(response);
      changeView(null);
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Miembro"
          hasButton
          onButtonClick={() => changeView(null)}
        />

        <Divider />

        <div className="w-full divide-y">
          <div className="flex gap-2.5 pb-5">
            <div className="w-1/2 text-left">
              <Label text="Nombre" />
              <div>
                {selectedMember.first_name}
              </div>
            </div>

            <div className="w-1/2 text-left">
              <Label text="Apellido" />
              <div>
                {selectedMember.last_name}
              </div>
            </div>
          </div>

          <div className="py-5 text-left">
            <Label text="Correo Electrónico" />
            <div>
              {selectedMember.email}
            </div>
          </div>

          <div className="py-5 text-left">
            <Label text="Rol" />
            <div className="flex h-[30px] w-full overflow-hidden rounded-2xl border-2 border-black font-medium ">
              <div className={`${selectedMember.is_admin ? 'bg-white text-black' : 'rounded-r-2xl bg-black text-white'} w-1/2 text-center`}>
                usuario
              </div>
              <div className={`${selectedMember.is_admin ? 'rounded-l-2xl bg-black text-white' : 'bg-white text-black'} w-1/2 text-center`}>
                admin
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        (selectedWorkspace.is_admin) && (
          <div className="flex gap-2.5">
            <Button
              text="Cambiar Rol"
              typeIsButton
              onClick={() => memberRoleUpdate()}
              color="blue"
            />
            <Button
              text="Remover"
              typeIsButton
              onClick={() => memberRemoval()}
              color="red"
            />
          </div>
        )
      }

    </div>
  );
};

const MemberInvitation = ({ workspaceId, changeView }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await workspacesService.invitationCreation({ workspaceId, email });
      notifications.success(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Invitar Usuario"
          hasButton
          onButtonClick={() => changeView(null)}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <p className="text-justify text-gray-500">
            Ingrese el correo de un usuario verificado en el sistema para
            enviarle una invitación a este espacio de trabajo.
          </p>

          <TextInput
            id="email"
            type="email"
            labelText="Correo electrónico"
            value={email}
            setValue={setEmail}
            autoComplete="off"
          />
        </form>
      </div>

      <Button
        text="Invitar Usuario"
        form="form"
        color="blue"
      />
    </div>
  );
};

const WorkspaceMembers = () => {
  const { workspaceId } = useParams();
  const [view, setView] = useState(null);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState({});
  const isScreenSM = (window.innerWidth <= 640);

  const getMembers = async () => {
    try {
      const response = await workspacesService.getMembers(workspaceId);
      setMembers(response);

      if (selectedMember) {
        setSelectedMember(
          response.find((member) => member.account_id === selectedMember.account_id),
        );
      }
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const selectMember = (member) => {
    setSelectedMember(member);
    setView('Member');
  };

  const renderView = () => {
    switch (view) {
      case 'Member':
        return (
          <Member
            selectedMember={selectedMember}
            updateMembers={() => getMembers()}
            changeView={(value) => setView(value)}
          />
        );
      case 'MemberInvitation':
        return (
          <MemberInvitation
            workspaceId={workspaceId}
            changeView={(value) => setView(value)}
          />
        );
      default:
        return (
          (isScreenSM)
            ? (
              <MemberList
                members={members}
                selectMember={(member) => selectMember(member)}
                changeView={(value) => setView(value)}
              />
            )
            : (
              <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
                <span>Gestiona a los miembros de este espacio o agrega nuevos integrantes.</span>
              </div>
            )
        );
    }
  };

  return (
    <div className="flex grow flex-col">
      <div className="flex grow bg-background sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
        {
          !isScreenSM && (
            <div className="grow bg-background sm:flex">
              <MemberList
                members={members}
                selectMember={(member) => selectMember(member)}
                changeView={(value) => setView(value)}
              />
            </div>
          )
        }

        <div className="flex grow bg-background">
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceMembers;
