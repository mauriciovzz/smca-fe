import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import spacesService from 'src/services/spaces';
import notificationHelper from 'src/utils/notificationHelper';

const MemberInvitation = () => {
  const { spaceData, updateSpaceInstanceRoot, errorHandler } = useOutletContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleInviteSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await spacesService.invite(
        spaceData.space_id,
        { email },
      );

      notificationHelper.success(response);
    } catch (error) {
      const goTo = errorHandler(error, updateSpaceInstanceRoot);

      if (goTo)
        navigate(goTo);
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

        <form onSubmit={handleInviteSubmit} id="form" className="space-y-5">
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
        form="form"
        color="blue"
      />
    </div>
  );
};

export default MemberInvitation;
