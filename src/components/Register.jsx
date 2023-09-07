import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import userAccountsService from '../services/userAccountsService';

const Register = ({ setUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      if (password === confirmPassword) {
        await userAccountsService.create({
          firstName, lastName, email, password,
        });

        const userInfo = await userAccountsService.login({
          email, password,
        });
        window.localStorage.setItem('loggedSmcaUser', JSON.stringify(userInfo));
        setUser(userInfo);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/');
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div className="relative flex flex-grow bg-primary-500">
      <div className="z-0 flex flex-grow items-center justify-center">

        <div className="w-full grid grid-cols-9">
          <div className="col-start-2 col-span-7 sm:col-start-4 sm:col-span-3 w-full bg-white rounded-lg shadow">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Registro
              </h1>

              <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
                <div className="flex items-center justify-between space-x-4 ">
                  <Input id="firstName" name="firstName" type="text" labelName="Nombre" value={firstName} setValue={setFirstName} placeHolder="" />
                  <Input id="lastName" name="lastName" type="text" labelName="Apellido" value={lastName} setValue={setLastName} placeHolder="" />
                </div>

                <Input id="email" name="email" type="email" labelName="Correo electronico" value={email} setValue={setEmail} placeHolder="" />

                <div className="flex items-center justify-between space-x-4">
                  <Input id="password" name="password" type="text" labelName="Contraseña" value={password} setValue={setPassword} placeHolder="" />
                  <Input id="confirmPassword" name="confirmPassword" type="text" labelName="Confirmar" value={confirmPassword} setValue={setConfirmPassword} placeHolder="" />
                </div>

                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Crear cuenta
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
