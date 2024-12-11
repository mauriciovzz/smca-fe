import { React, useState } from 'react';

import { Link } from 'react-router-dom';

import axios from 'src/api/axios';
import { Button, TextInput } from 'src/components/inputs';
import { MapBackground } from 'src/components/maps';
import { EmailSent } from 'src/components/messages';
import { Divider, Heading, LoaderSpinner } from 'src/components/ui';
import useErrorHandler from 'src/hooks/useErrorHandler';

const Register = () => {
  const errorHandler = useErrorHandler();

  const [requestMade, setRequestMade] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [requestResponse, setRequestResponse] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccountSubmit = async (event) => {
    event.preventDefault();

    setWaitingForResponse(true);
    setRequestMade(true);

    try {
      const response = await axios.post(
        '/api/accounts',
        {
          firstName, lastName, email, password,
        },
      );

      setRequestResponse(response.data);
    } catch (error) {
      setRequestMade(false);
      errorHandler(error);
    } finally {
      setWaitingForResponse(false);
    }
  };

  const renderView = () => {
    if (!requestMade)
      return (
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
      );

    if (waitingForResponse)
      return <LoaderSpinner />;

    return <EmailSent requestResponse={requestResponse} />;
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        {renderView()}
      </div>

      <MapBackground />
    </>
  );
};

export default Register;
