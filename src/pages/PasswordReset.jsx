import { React, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  BackdropFilter, Button, Heading, Map, TextInput,
} from 'src/components';
import accountService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState('');
  const { accountId, resetToken } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.resetPassword(accountId, resetToken, newPassword);
      notifications.success(response);
      navigate('/iniciar-sesion');
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        <div className="h-fit w-full divide-y rounded-lg bg-white p-5 shadow sm:h-fit sm:w-fit">
          <Heading text="Ingresar Nueva Contraseña" />

          <form id="form" onSubmit={handleSubmit} className="space-y-5 pt-5">
            <TextInput
              id="newPassword"
              type="password"
              labelText="Nueva Contraseña"
              value={newPassword}
              setValue={setNewPassword}
              autoComplete="new-password"
            />

            <Button
              text="Restablecer Contraseña"
              form="form"
              color="blue"
            />
          </form>
        </div>
      </div>

      <BackdropFilter index="z-10" />
      <Map />
    </>
  );
};

export default PasswordReset;
