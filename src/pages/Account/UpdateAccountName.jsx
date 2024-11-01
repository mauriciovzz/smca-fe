import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import accountsService from 'src/services/accounts';
import notificationHelper from 'src/utils/notificationHelper';

import useAuth from '../../hooks/useAuth';

const UpdateAccountName = () => {
  const { auth } = useAuth();
  const { accountData, updateAccountRoot, errorHandler } = useOutletContext();

  const [firstName, setFirstName] = useState(accountData.firstName);
  const [lastName, setLastName] = useState(accountData.lastName);

  const navigate = useNavigate();

  const HandleUpdateNameSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountsService.updateName(
        auth?.accountId,
        { firstName, lastName },
      );

      notificationHelper.success(response);
      updateAccountRoot();
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Nombre"
          hasButton
          onButtonClick={() => navigate('/cuenta')}
        />

        <Divider />

        <form onSubmit={HandleUpdateNameSubmit} id="form" className="space-y-5">
          <TextInput
            id="firstName"
            type="text"
            labelText="Nuevo nombre"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            id="lastName"
            type="text"
            labelText="Nuevo apellido"
            value={lastName}
            setValue={setLastName}
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

export default UpdateAccountName;
