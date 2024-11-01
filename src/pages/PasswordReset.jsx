import { React, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { errorIcon, successIcon } from 'src/assets';
import { BackdropBlur, Map } from 'src/components/backdrop';
import { Button, TextInput } from 'src/components/inputs';
import { Divider, Heading } from 'src/components/ui';
import accountService from 'src/services/accounts';
import notificationHelper from 'src/utils/notificationHelper';

const PasswordResetResponse = ({ wasSuccessful, requestResponse }) => (
  <div className="flex h-fit w-full flex-col items-center rounded-lg bg-white p-5 shadow sm:h-fit sm:w-96">
    <Heading text="Restablecer contraseña" />

    <Divider />

    <div className="flex w-full flex-col items-center space-y-5">
      <img
        src={wasSuccessful ? successIcon : errorIcon}
        alt={wasSuccessful ? 'success' : 'error'}
        className="size-[60px] self-center"
      />

      <div className="text-center font-bold">
        {`${(wasSuccessful) ? '' : 'Error: '}${requestResponse}`}
      </div>
    </div>

    {
        (wasSuccessful) && (
          <>
            <Divider />

            <p className="w-full text-center font-light text-gray-500">
              <Link
                to="/iniciar-sesion"
                className="font-medium text-main hover:underline"
              >
                Inicia sesión
              </Link>
              &nbsp;con tu cuenta.
            </p>
          </>

        )
      }
  </div>
);

const PasswordReset = () => {
  const { accountId, verificationToken } = useParams();

  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const [requestMade, setRequestMade] = useState(false);
  const [requestResponse, setRequestResponse] = useState(null);
  const [wasSuccessful, setWasSuccessful] = useState(false);

  const handlePasswordVerificationSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== repeatNewPassword) {
      notificationHelper.errorMsg('Los campos \'Nueva contraseña\' y \'Repetir nueva contraseña\' deben de coincidir.');
    } else {
      try {
        const response = await accountService.resetPassword(
          accountId,
          verificationToken,
          { newPassword, repeatNewPassword },
        );

        setRequestResponse(response);
        setWasSuccessful(true);
        setRequestMade(true);
      } catch (error) {
        const errorMessage = error.response.data.message;
        const errorList = ['Link inválido.', 'El link utilizado ha expirado.'];

        if (errorList.includes(errorMessage)) {
          setRequestResponse(errorMessage);
          setRequestMade(true);
        } else {
          notificationHelper.error(error);
        }
      }
    }
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        {
          (!requestMade)
            ? (
              <div className="h-fit w-full rounded-lg bg-white p-5 shadow sm:size-fit">
                <Heading text="Restablecer Contraseña" />

                <Divider />

                <form id="passwordVerificationForm" onSubmit={handlePasswordVerificationSubmit} className="space-y-5">
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
                    labelText="Repetir nueva Contraseña"
                    value={repeatNewPassword}
                    setValue={setRepeatNewPassword}
                    autoComplete="new-password"
                  />

                  <Button
                    text="Restablecer Contraseña"
                    form="passwordVerificationForm"
                    color="blue"
                  />
                </form>
              </div>
            )
            : (
              <PasswordResetResponse
                wasSuccessful={wasSuccessful}
                requestResponse={requestResponse}
              />
            )
        }
      </div>

      <BackdropBlur index="z-10" />
      <Map />
    </>

  );
};

export default PasswordReset;
