import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginService from '../services/login';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userInfo = await loginService.login({
        email, password,
      });

      window.localStorage.setItem('loggedSmcaUser', JSON.stringify(userInfo));
      setUser(userInfo);
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div className="relative flex flex-grow bg-bluey">
      <div className="z-0 flex flex-grow items-center justify-center">

        <div className="w-full grid grid-cols-9">
          <div className="col-start-2 col-span-7 sm:col-start-4 sm:col-span-3 w-full bg-white rounded-lg shadow">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Iniciar sesion
              </h1>

              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">

                <label htmlFor="email" className="block">
                  <div className="mb-2 text-sm font-medium text-gray-900">
                    Correo electronico
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={({ target }) =>
                      setEmail(target.value)}
                    placeholder="name@example.com"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </label>

                <label htmlFor="password" className="block">
                  <div className="mb-2 text-sm font-medium text-gray-900">
                    Contraseña
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={({ target }) =>
                      setPassword(target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </label>

                <div className="flex items-center justify-between">
                  <label htmlFor="remember" className="flex items-start text-gray-500">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                      />
                    </div>
                    <div className="ml-2 text-sm">
                      Recuerdame
                    </div>
                  </label>
                  <Link to="/recuperar-contraseña" className="text-sm font-medium text-primary-600 hover:underline">Olvide contraseña</Link>
                </div>

                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar sesion</button>

                <p className="text-sm font-light text-gray-500">
                  No tienes una cuenta?
                  <Link to="/registro" className="font-medium ml-1 text-primary-600 hover:underline">Registrate</Link>
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
