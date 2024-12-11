import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateAccountPassword = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const handleUpdatePasswordSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== repeatNewPassword) {
      notificationHelper.error('Los campos \'Nueva contraseña\' y \'Repetir nueva contraseña\' deben de coincidir.');
    } else {
      try {
        const response = await axiosPrivate.put(
          `/api/accounts/${auth.accountId}/update-password`,
          { currentPassword, newPassword, repeatNewPassword },
        );

        notificationHelper.success(response.data);
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
