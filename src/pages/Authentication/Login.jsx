import { React, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import axios from 'src/api/axios';
import { Button, CheckBoxInput, TextInput } from 'src/components/inputs';
import { MapBackground } from 'src/components/maps';
import { Divider, Heading } from 'src/components/ui';
import useAuth from 'src/hooks/useAuth';
import notificationHelper from 'src/utils/notificationHelper';

const Login = () => {
  const { setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        '/api/auth/login',
        { email, password, rememberMe },
      );

      setAuth(response.data);
      notificationHelper.info('Bienvenid@!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response.data.message;

      if (errorMessage === 'Su cuenta no se encuentra verificada.') {
        navigate('/reenviar-enlace-verificacion/', { state: { email } });
      } else {
        notificationHelper.error(errorMessage);
      }
    }
  };

  return (
    <>
      <div className="z-20 flex grow space-y-5 px-5 pb-5 sm:items-center sm:justify-center">
        <div className="h-fit w-full rounded-lg bg-white p-5 shadow sm:size-fit">
          <Heading text="Iniciar Sesión" />

          <Divider />

          <form onSubmit={handleLoginSubmit} id="form" className="space-y-5">
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
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <CheckBoxInput
                labelText="Recuérdame"
                value={rememberMe}
                setValue={setRememberMe}
              />

              <Link
                to="/recuperar-contraseña"
                className="text-sm font-medium text-main hover:underline"
              >
                Olvidé mi contraseña
              </Link>
            </div>

            <Button
              text="Iniciar Sesión"
              form="form"
              color="blue"
            />

            <p className="text-sm font-light text-gray-500">
              No tienes una cuenta?
              <Link
                to="/registro"
                className="ml-1 font-medium text-main hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </form>
        </div>
      </div>

      <MapBackground />
    </>
  );
};

export default Login;
