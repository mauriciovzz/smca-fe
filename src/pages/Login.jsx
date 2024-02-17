import { React, useState, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {
  BackdropFilter, Button, CheckBoxInput, Heading, Map, TextInput,
} from 'src/components';
import { AuthContext } from 'src/context/authProvider';
import accountService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.login({
        email, password, rememberMe,
      });
      login(response);
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
      <div className="z-20 flex grow space-y-5 px-5 pb-5 sm:items-center sm:justify-center">
        <div className="h-fit w-full divide-y rounded-lg bg-white p-5 shadow sm:h-fit sm:w-fit">
          <Heading text="Iniciar Sesión" />

          <form onSubmit={handleSubmit} id="form" className="space-y-5 pt-5">
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

      <BackdropFilter index="z-10" />
      <Map />
    </>
  );
};

export default Login;
