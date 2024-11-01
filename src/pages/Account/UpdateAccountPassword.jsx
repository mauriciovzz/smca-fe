import { React, useState } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import accountsService from 'src/services/accounts';
import notificationHelper from 'src/utils/notificationHelper';

import useAuth from '../../hooks/useAuth';

const UpdateAccountPassword = () => {
  const { auth } = useAuth();
  const { errorHandler } = useOutletContext();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const navigate = useNavigate();

  const handleUpdatePasswordSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== repeatNewPassword) {
      notificationHelper.errorMsg('Los campos \'Nueva contraseña\' y \'Repetir nueva contraseña\' deben de coincidir.');
    } else {
      try {
        const response = await accountsService.updatePassword(
          auth.accountId,
          { currentPassword, newPassword, repeatNewPassword },
        );

        notificationHelper.success(response);
      } catch (error) {
        errorHandler(error);
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

export default UpdateAccountPassword;
