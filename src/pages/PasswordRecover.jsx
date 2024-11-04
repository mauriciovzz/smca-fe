import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, TextInput } from 'src/components/inputs';
import { BlurEffect, MapBase } from 'src/components/maps';
import { EmailSent } from 'src/components/messages';
import { Divider, Heading } from 'src/components/ui';
import accountService from 'src/services/accounts';
import notificationHelper from 'src/utils/notificationHelper';

const PasswordRecover = () => {
  const [email, setEmail] = useState('');
  const [wasSuccessful, setWasSuccessful] = useState(false);

  const [requestResponse, setRequestResponse] = useState(null);

  const navigate = useNavigate();

  const handlePasswordRecoverSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.recoverPassword({ email });

      setRequestResponse(response);
      setWasSuccessful(!wasSuccessful);
    } catch (error) {
      if (error.response.data.message === 'Su cuenta no se encuentra verificada.') {
        navigate('/reenviar-enlace-verificacion/', { state: { email } });
      } else {
        notificationHelper.error(error);
      }
    }
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        {
          !wasSuccessful
            ? (
              <div className="h-fit w-full rounded-lg bg-white p-5 shadow sm:size-fit">
                <Heading text="Recuperar Contraseña" />

                <Divider />

                <form id="form" onSubmit={handlePasswordRecoverSubmit} className="space-y-5">
                  <p className="text-justify text-sm font-light">
                    {'Ingrese el correo electrónico de su cuenta y le enviaremos '}
                    <br className="hidden sm:flex" />
                    {'un correo que le permitirá restablecer su contraseña. '}
                  </p>

                  <TextInput
                    id="email"
                    type="email"
                    labelText="Correo Electrónico"
                    value={email}
                    setValue={setEmail}
                    autoComplete="email"
                  />

                  <Button
                    text="Recuperar Contraseña"
                    form="form"
                    color="blue"
                  />
                </form>
              </div>
            )
            : (
              <EmailSent requestResponse={requestResponse} />
            )
        }
      </div>

      <BlurEffect index="z-10" />
      <MapBase />
    </>
  );
};

export default PasswordRecover;
