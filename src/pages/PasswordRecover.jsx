import { React, useState } from 'react';

import {
  BackdropFilter, Button, Heading, Map, TextInput,
} from 'src/components';
import accountService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

const PasswordRecover = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.forgotPassword({ email });
      notifications.success(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        <div className="h-fit w-full divide-y rounded-lg bg-white p-5 shadow sm:h-fit sm:w-fit">
          <Heading text="Recuperar Contraseña" />

          <form id="form" onSubmit={handleSubmit} className="space-y-5 pt-5">
            <p className="text-wrap text-sm font-light">
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
      </div>

      <BackdropFilter index="z-10" />
      <Map />
    </>
  );
};

export default PasswordRecover;
