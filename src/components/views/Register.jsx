import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import notifications from 'src/utils/notifications';
import FormInput from 'src/components/FormInput';
import userAccountService from 'src/services/userAccounts';

const Register = ({ setUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await userAccountService.register({
        firstName, lastName, email, password,
      });
      const userInfo = await userAccountService.login({ email, password });

      notifications.info(`Bienvenid@, ${firstName} ${lastName}`);
      setUser(userInfo);
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
                Registro
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

                <div className="flex items-center justify-between space-x-4 ">
                  <FormInput id="firstName" type="text" labelName="Nombre" value={firstName} setValue={setFirstName} />
                  <FormInput id="lastName" type="text" labelName="Apellido" value={lastName} setValue={setLastName} />
                </div>

                <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <FormInput id="email" type="email" labelName="Correo electronico" value={email} setValue={setEmail} />
                  <FormInput id="password" type="text" labelName="Contraseña" value={password} setValue={setPassword} />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:ring-4 focus:ring-primary-300"
                >
                  Crear cuenta
                </button>

                <p className="text-sm font-light text-gray-500">
                  Ya tienes una cuenta?
                  <Link
                    to="/login"
                    className="ml-1 font-medium text-primary-600 hover:underline"
                  >
                    Inicia sesion
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

export default Register;
