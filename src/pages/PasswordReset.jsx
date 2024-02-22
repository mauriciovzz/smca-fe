import { React, useState } from 'react';

import { useParams } from 'react-router-dom';

import {
  BackdropFilter, Button, Divider, Heading, Map, TextInput,
} from 'src/components';
import { VerificationError, VerificationSuccess } from 'src/layout';
import accountService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

const PasswordReset = () => {
  const { verificationToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [requestMade, setRequestMade] = useState(false);
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.resetPassword({ verificationToken, newPassword });
      setMessage(response);
      setWasSuccessful(!wasSuccessful);
      setRequestMade(!requestMade);
    } catch (err) {
      const errorMessage = err.response.data.error;

      if (errorMessage === 'Link inválido.' || errorMessage === 'El link utilizado ha expirado.') {
        setMessage(err.errorMessage);
        setRequestMade(!requestMade);
      } else {
        notifications.error(err);
      }
    }
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        {
          !requestMade
            ? (
              <div className="h-fit w-full rounded-lg bg-white p-5 shadow sm:h-fit sm:w-fit">
                <Heading text="Ingresar Nueva Contraseña" />

                <Divider />

                <form id="form" onSubmit={handleSubmit} className="space-y-5">
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
            )
            : (
              <div className="w-full sm:w-96">
                {
                  wasSuccessful
                    ? (
                      <VerificationSuccess text="Restablecer Contraseña" message={message} />
                    )
                    : (
                      <VerificationError text="Restablecer Contraseña" message={message} />
                    )
                }
              </div>
            )
        }
      </div>

      <BackdropFilter index="z-10" />
      <Map />
    </>
  );
};

export default PasswordReset;
