import { React, useState } from 'react';

import { Link } from 'react-router-dom';

import { BackdropBlur, Map } from 'src/components/backdrop';
import { Button, TextInput } from 'src/components/inputs';
import { EmailSent } from 'src/components/messages';
import { Divider, Heading } from 'src/components/ui';
import accountService from 'src/services/accounts';
import notificationHelper from 'src/utils/notificationHelper';

const Register = () => {
  const [requestMade, setRequestMade] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [requestResponse, setRequestResponse] = useState(null);

  const handleCreateAccountSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.create({
        firstName, lastName, email, password,
      });

      setRequestResponse(response);
      setRequestMade(true);
    } catch (error) {
      notificationHelper.error(error);
    }
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        {
          !requestMade
            ? (
              <div className="h-fit w-full rounded-lg bg-white p-5 shadow sm:size-fit">
                <Heading text="Registro" />

                <Divider />

                <form id="form" onSubmit={handleCreateAccountSubmit} className="space-y-5">
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <TextInput
                      id="firstName"
                      type="text"
                      labelText="Nombre"
                      value={firstName}
                      setValue={setFirstName}
                      autoComplete="given-name"
                    />
                    <TextInput
                      id="lastName"
                      type="text"
                      labelText="Apellido"
                      value={lastName}
                      setValue={setLastName}
                      autoComplete="family-name"
                    />
                  </div>
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <TextInput
                      id="email"
                      type="email"
                      labelText="Correo Electrónico"
                      value={email}
                      setValue={setEmail}
                      autoComplete="email"
                    />
                    <TextInput
                      id="password"
                      type="password"
                      labelText="Contraseña"
                      value={password}
                      setValue={setPassword}
                      autoComplete="new-password"
                    />
                  </div>
                  <Button
                    text="Crear Cuenta"
                    form="form"
                    color="blue"
                  />
                  <p className="text-sm font-light text-gray-500">
                    Ya tienes una cuenta?
                    <Link
                      to="/iniciar-sesion"
                      className="ml-1 font-medium text-sky-600 hover:underline"
                    >
                      Inicia sesión
                    </Link>
                  </p>
                </form>
              </div>
            )
            : (
              <EmailSent requestResponse={requestResponse} />
            )
        }
      </div>

      <BackdropBlur index="z-10" />
      <Map />
    </>
  );
};

export default Register;
