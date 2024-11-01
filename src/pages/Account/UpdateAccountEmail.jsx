import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import accountsService from 'src/services/accounts';
import notificationHelper from 'src/utils/notificationHelper';

import useAuth from '../../hooks/useAuth';

const UpdateAccountEmail = () => {
  const { auth } = useAuth();
  const { accountData, errorHandler } = useOutletContext();

  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const navigate = useNavigate();

  const handleUpdateEmailSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountsService.updateEmail(auth?.accountId, { newEmail, password });
      notificationHelper.success(response);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Correo"
          hasButton
          onButtonClick={() => navigate('/cuenta')}
        />

        <Divider />

        <form onSubmit={handleUpdateEmailSubmit} id="form" className="space-y-5">
          <TextInput
            id="email"
            type="email"
            labelText="Correo electrónico actual"
            value={accountData.email}
            disabled
          />
          <TextInput
            id="newEmail"
            type="email"
            labelText="Nuevo correo electrónico"
            value={newEmail}
            setValue={setNewEmail}
            autoComplete="email"
          />
          <TextInput
            id="password"
            type="password"
            labelText="Contraseña"
            value={password}
            setValue={setPassword}
            autoComplete="current-password"
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

export default UpdateAccountEmail;
