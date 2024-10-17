import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Button, Divider, Heading, TextInput,
} from 'src/components';
import accountsService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

import useAuth from '../../hooks/useAuth';

const UpdatePassword = () => {
  const { auth } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const navigate = useNavigate();

  const handleUpdatePasswordSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== repeatNewPassword) {
      notifications.errorMsg('Los campos \'Nueva contraseña\' y \'Repetir nueva contraseña\' deben de coincidir.');
    } else {
      try {
        const response = await accountsService.updatePassword(
          auth?.accountId,
          { currentPassword, newPassword, repeatNewPassword },
        );
        notifications.success(response);
      } catch (error) {
        notifications.error(error);
      }
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Contraseña"
          hasButton
          onButtonClick={() => navigate('/cuenta')}
        />

        <Divider />

        <form onSubmit={handleUpdatePasswordSubmit} id="form" className="space-y-5">
          <TextInput
            id="currentPassword"
            type="password"
            labelText="Contraseña actual"
            value={currentPassword}
            setValue={setCurrentPassword}
            autoComplete="current-password"
          />
          <TextInput
            id="newPassword"
            type="password"
            labelText="Nueva contraseña"
            value={newPassword}
            setValue={setNewPassword}
            autoComplete="new-password"
          />
          <TextInput
            id="repeatNewPassword"
            type="password"
            labelText="Repetir nueva contraseña"
            value={repeatNewPassword}
            setValue={setRepeatNewPassword}
            autoComplete="new-password"
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

export default UpdatePassword;
