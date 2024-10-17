import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Button, Divider, Heading, TextInput,
} from 'src/components';
import accountsService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

import useAuth from '../../hooks/useAuth';

const DeleteAccount = () => {
  const { auth, logout } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleDeleteAccountSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountsService.remove(auth?.accountId, { email, password });
      notifications.success(response);

      logout();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Eliminar Cuenta"
          hasButton
          onButtonClick={() => navigate('/cuenta')}
        />

        <Divider />

        <form onSubmit={handleDeleteAccountSubmit} id="deleteAccountForm" className="space-y-5">
          <TextInput
            id="text"
            type="text"
            labelText="Correo electrónico"
            value={email}
            setValue={setEmail}
          />

          <TextInput
            id="password"
            type="password"
            labelText="Contraseña"
            value={password}
            setValue={setPassword}
          />

        </form>
      </div>

      <Button
        text="Eliminar Cuenta"
        form="deleteAccountForm"
        color="red"
      />
    </div>
  );
};

export default DeleteAccount;
