import { React, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  BackdropFilter, Button, Divider, Heading, Map, TextInput,
} from 'src/components';
import { EmailSend } from 'src/layout';
import accountService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

const PasswordRecover = () => {
  const [email, setEmail] = useState('');
  const [wasSuccessful, setWasSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.recoverPassword({ email });
      setMessage(response);
      setWasSuccessful(!wasSuccessful);
    } catch (err) {
      if (err.response.data.error === 'Su cuenta no se encuentra verificada.') {
        navigate('/verificar/cuenta/reenviar-enlace/', { state: { email } });
      } else {
        notifications.error(err);
      }
    }
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        {
          !wasSuccessful
            ? (
              <div className="h-fit w-full rounded-lg bg-white p-5 shadow sm:h-fit sm:w-fit">
                <Heading text="Recuperar Contraseña" />

                <Divider />

                <form id="form" onSubmit={handleSubmit} className="space-y-5">
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
              <EmailSend type="password" email={email} message={message} />
            )
        }
      </div>

      <BackdropFilter index="z-10" />
      <Map />
    </>
  );
};

export default PasswordRecover;
