import { React, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { mailIcon } from 'src/assets';
import {
  BackdropFilter, Button, Divider, Map, TextInput,
} from 'src/components';
import accountService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

import EmailSentResponse from '../components/EmailSentResponse';

const ResendVerificationLink = () => {
  const { state } = useLocation();

  const [email, setEmail] = useState(state?.email ? state.email : null);

  const [requestMade, setRequestMade] = useState(false);

  const [requestResponse, setRequestResponse] = useState(null);

  const handleResendVerificationLink = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.resendVerificationLink({ email });

      setRequestResponse(response);
      setRequestMade(true);
    } catch (error) {
      notifications.error(error);
    }
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        {
          !requestMade
            ? (
              <div className="flex h-fit w-full flex-col space-y-5 rounded-lg bg-white p-5 shadow sm:w-96">
                <img
                  src={mailIcon}
                  alt="mail"
                  className="size-[60px] self-center"
                />

                <p className="text-center text-lg font-bold">
                  Su cuenta no se encuentra verificada
                </p>

                <p className="text-justify">
                  Ingrese su correo electrónico para recibir un nuevo enlace de verificación&nbsp;
                </p>

                <form onSubmit={handleResendVerificationLink} id="form" className="space-y-5">
                  <TextInput
                    id="email"
                    type="email"
                    labelText="Correo Electrónico"
                    value={email}
                    setValue={setEmail}
                    autoComplete="email"
                  />

                  <Button
                    text="Enviar Enlace"
                    form="form"
                    color="blue"
                  />
                </form>

                <Divider changePadding="p-0" />

                <p className="w-full text-center font-light text-gray-500">
                  Este enlace de verificación expirará en 1 hora.
                </p>
              </div>
            )
            : (
              <EmailSentResponse requestResponse={requestResponse} />
            )
        }
      </div>

      <BackdropFilter index="z-10" />
      <Map />
    </>
  );
};

export default ResendVerificationLink;
