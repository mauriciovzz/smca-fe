import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const MemberInvitation = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const navigate = useNavigate();

  const { spaceData } = useOutletContext();
  const [email, setEmail] = useState('');

  const handleInviteSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosPrivate.post(
        `/api/invitations/${spaceData.space_id}`,
        { email },
      );

      notificationHelper.success(response.data);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Invitar Usuario"
          hasButton
          onButtonClick={() => navigate('..')}
        />

        <Divider />

        <form onSubmit={handleInviteSubmit} id="inviteForm" className="space-y-5">
          <p className="text-justify text-gray-500">
            Ingrese el correo de un usuario verificado en el sistema para
            enviarle una invitación a este espacio.
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
        form="inviteForm"
        color="blue"
      />
    </div>
  );
};

export default MemberInvitation;
