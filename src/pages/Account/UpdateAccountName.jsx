import { React, useState } from 'react';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import useAxiosPrivate from 'src/hooks/useAxiosPrivate';
import useErrorHandler from 'src/hooks/useErrorHandler';
import notificationHelper from 'src/utils/notificationHelper';

const UpdateAccountName = () => {
  const axiosPrivate = useAxiosPrivate();
  const errorHandler = useErrorHandler();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { accountData, getAccountData } = useOutletContext();

  const [firstName, setFirstName] = useState(accountData.firstName);
  const [lastName, setLastName] = useState(accountData.lastName);

  const HandleUpdateNameSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosPrivate.put(
        `/api/accounts/${auth.accountId}/update-name`,
        { firstName, lastName },
      );

      notificationHelper.success(response.data);
      getAccountData();
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
