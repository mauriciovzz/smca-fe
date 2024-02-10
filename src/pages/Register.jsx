import { React, useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import {
  BackdropFilter, Button, Heading, Map, TextInput,
} from 'src/components';
import { AuthContext } from 'src/context/authProvider';
import accountService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await accountService.register({
        firstName, lastName, email, password,
      });

      const response = await accountService.login({
        email, password, rememberMe: false,
      });
      login(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <>
      <div className="z-20 flex grow px-5 pb-5 sm:items-center sm:justify-center">
        <div className="h-fit w-full divide-y rounded-lg bg-white p-5 shadow sm:h-fit sm:w-fit">
          <Heading text="Registro" />

          <form id="form" onSubmit={handleSubmit} className="space-y-5 pt-5">
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
      </div>

      <BackdropFilter index="z-10" />
      <Map />
    </>
  );
};

export default Register;
