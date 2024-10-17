import { React } from 'react';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import HiddenRoutes from './components/HiddenRoutes';
import useAuth from './hooks/useAuth';
import AccountRoot, { accountInfoLoader } from './routes/Account/AccountRoot';
import DeleteAccount from './routes/Account/DeleteAccount';
import UpdateEmail from './routes/Account/UpdateEmail';
import UpdateName from './routes/Account/UpdateName';
import UpdatePassword from './routes/Account/UpdatePassword';
import Faq from './routes/Faq';
import Information from './routes/Information';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import PasswordRecover from './routes/PasswordRecover';
import PasswordReset from './routes/PasswordReset';
import Register from './routes/Register';
import ResendVerificationLink from './routes/ResendVerificationLink';
import Root from './routes/Root';
import VerificationError from './routes/Verification/VerificationError';
import VerificationRoot, { accountVerificationLoader, newEmailVerificationLoader } from './routes/Verification/VerificationRoot';
import VerificationSuccess from './routes/Verification/VerificationSuccess';

const App = () => {
  const { auth } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <Navigate to="/" />,
      children: [
        {
          path: 'informacion',
          element: <Information />,
        },
        {
          path: 'faq',
          element: <Faq />,
        },
        {
          path: 'verificar',
          element: <VerificationRoot />,
          children: [
            {
              path: 'cuenta/:accountId/:verificationToken',
              loader: accountVerificationLoader,
              element: <VerificationSuccess headingText="Verificar Cuenta" showLoginLink />,
              errorElement: <VerificationError headingText="Verificar Cuenta" showLoginLink />,
            },
            {
              path: 'correo-electronico/:accountId/:verificationToken',
              loader: newEmailVerificationLoader,
              element: <VerificationSuccess headingText="Verificar Correo Electrónico" />,
              errorElement: <VerificationError headingText="Verificar Correo Electrónico" />,
            },
          ],
        },
        {
          path: 'restablecer-contraseña/:accountId/:verificationToken',
          element: <PasswordReset />,
        },
        {
          element: <HiddenRoutes />,
          children: [
            {
              path: 'iniciar-sesion',
              element: <Login />,
            },
            {
              path: 'registro',
              element: <Register />,
            },
            {
              path: 'reenviar-enlace-verificacion',
              element: <ResendVerificationLink />,
            },
            {
              path: 'recuperar-contraseña',
              element: <PasswordRecover />,
            },
          ],
        },
        {
          path: 'cuenta',
          loader: () => accountInfoLoader(auth),
          element: <AccountRoot />,
          children: [
            {
              path: 'actualizar-nombre',
              element: <UpdateName />,
            },
            {
              path: 'actualizar-contraseña',
              element: <UpdatePassword />,
            },
            {
              path: 'actualizar-correo-electronico',
              element: <UpdateEmail />,
            },
            {
              path: 'eliminar-cuenta',
              element: <DeleteAccount />,
            },
          ],
        },
        {
          path: 'espacios',
          element: <div>ws</div>,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default App;
