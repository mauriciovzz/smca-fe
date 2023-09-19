import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import notifications from 'src/utils/notifications'
import FormInput from '../FormInput';
import userAccountService from '../../services/userAccounts';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userInfo = await userAccountService.login({ email, password });

      notifications.info(`Bienvenid@, ${userInfo.firstName} ${userInfo.lastName}`);
      window.localStorage.setItem('loggedSmcaUser', JSON.stringify(userInfo));
      setUser(userInfo);
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (exception) {
      notifications.error(exception);
    }
  };

  return (
    <div className="relative flex grow bg-slate-100">
      <div className="z-0 flex grow items-center justify-center">

        <div className="grid w-full grid-cols-9">

          <div className="col-span-7 col-start-2 w-full rounded-lg bg-white shadow sm:col-span-3 sm:col-start-4">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Iniciar sesion
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <FormInput id="email" type="email" labelName="Correo electronico" value={email} setValue={setEmail} />
                <FormInput id="password" type="password" labelName="Contraseña" value={password} setValue={setPassword} />

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="remember"
                    className="flex items-start text-gray-500"
                  >
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-primary-300"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      Recuerdame
                    </div>
                  </label>

                  <Link
                    to="/recuperar-contraseña"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Olvide contraseña
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300"
                >
                  Iniciar sesion
                </button>

                <p className="text-sm font-light text-gray-500">
                  No tienes una cuenta?
                  <Link
                    to="/registro"
                    className="ml-1 font-medium text-primary-600 hover:underline"
                  >
                    Registrate
                  </Link>
                </p>
              </form>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
