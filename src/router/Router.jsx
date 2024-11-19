import { React } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { VerificationSuccess, VerificationError } from 'src/components/messages';
import useAuth from 'src/hooks/useAuth';
import {
  AccountRoot, accountInfoLoader, DeleteAccount, UpdateAccountEmail,
  UpdateAccountName, UpdateAccountPassword,
} from 'src/pages/Account';
import Faq from 'src/pages/Faq';
import Information from 'src/pages/Information';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import PasswordRecover from 'src/pages/PasswordRecover';
import PasswordReset from 'src/pages/PasswordReset';
import Register from 'src/pages/Register';
import ResendVerificationLink from 'src/pages/ResendVerificationLink';
import Root from 'src/pages/Root';
import {
  ComponentsRoot, ComponentCreation, ComponentManagement, componentsLoader,
} from 'src/pages/SpaceComponents';
import {
  LocationsRoot, LocationCreation, LocationManagement, locationsLoader,
} from 'src/pages/SpaceLocations';
import {
  MemberManagement, MemberInvitation, MembersRoot, membersLoader,
} from 'src/pages/SpaceMembers';
import {
  NodeCreation, NodesRoot, SelectedNodeRoot, SelectedNodeManagementRoot,
  selectedNodeComponentsLoader, nodesLoader, nodeCreationLoader,
  DownloadNodeConfigFile, UpdateNodeInfo, UpdateNodeComponents, UpdateNodeLocation, DeleteNode,
} from 'src/pages/SpaceNodes';
import {
  SelectedSpaceRoot, selectedSpaceLoader, SpacesCreation,
  SpacesInvitations, SpacesRoot, spacesLoader,
} from 'src/pages/Spaces';
import {
  DeleteSpace, LeaveSpace, SpaceSettingsRoot, UpdateSpaceColor,
  UpdateSpaceName,
} from 'src/pages/SpaceSettings';
import {
  VariablesRoot, variablesLoader, VariableCreation, VariableManagement,
} from 'src/pages/SpaceVariables';
import Verification, { accountVerificationLoader, newEmailVerificationLoader } from 'src/pages/Verification';

import HiddenRoutes from './HiddenRoutes';

const Router = () => {
  const { auth } = useAuth();

  const loaderErrors = [
    {
      errorMessage: 'La sesión ha expirado.',
      showMessage: false,
      redirectTo: '/iniciar-sesion',
    },
    {
      errorMessage: 'Acceso no autorizado.',
      showMessage: true,
      redirectTo: '/espacios',
    },
    {
      errorMessage: 'El espacio indicado no se encuentra registrado.',
      showMessage: true,
      redirectTo: '/espacios',
    },
    {
      errorMessage: 'El nodo indicado no se encuentra registrado.',
      showMessage: true,
    },
  ];

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      // errorElement: <Navigate to="/" />,
      errorElement: <NotFound />,
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
          element: <Verification />,
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
          element: <AccountRoot />,
          loader: () => accountInfoLoader(auth, loaderErrors),
          children: [
            {
              path: 'actualizar-nombre',
              element: <UpdateAccountName />,
            },
            {
              path: 'actualizar-contraseña',
              element: <UpdateAccountPassword />,
            },
            {
              path: 'actualizar-correo-electronico',
              element: <UpdateAccountEmail />,
            },
            {
              path: 'eliminar-cuenta',
              element: <DeleteAccount />,
            },
          ],
        },
        {
          path: 'espacios',
          element: <SpacesRoot />,
          loader: () => spacesLoader(auth, loaderErrors),
          children: [
            {
              path: 'agregar',
              element: <SpacesCreation />,
            },
            {
              path: 'invitaciones',
              element: <SpacesInvitations />,
            },
          ],
        },
        {
          path: '/espacios/:spaceId',
          element: <SelectedSpaceRoot />,
          loader: ({ params }) => selectedSpaceLoader(auth, params, loaderErrors),
          children: [
            {
              path: 'reportes',
            },
            {
              path: 'miembros',
              element: <MembersRoot />,
              loader: ({ params }) => membersLoader(auth, params, loaderErrors),
              children: [
                {
                  path: 'invitar',
                  element: <MemberInvitation />,
                },
                {
                  path: ':accountId',
                  element: <MemberManagement />,
                },
              ],
            },
            {
              path: 'nodos',
              element: <NodesRoot />,
              loader: ({ params }) => nodesLoader(auth, params, loaderErrors),
              children: [
                {
                  path: 'agregar',
                  element: <NodeCreation />,
                  loader: ({ params }) => nodeCreationLoader(auth, params, loaderErrors),
                },
                {
                  path: ':nodeId',
                  element: <SelectedNodeRoot />,
                  loader: ({ params }) => selectedNodeComponentsLoader(auth, params, loaderErrors),
                  children: [
                    {
                      path: 'ajustes',
                      element: <SelectedNodeManagementRoot />,
                      children: [
                        {
                          path: 'descargar-configuracion',
                          element: <DownloadNodeConfigFile />,
                        },
                        {
                          path: 'informacion',
                          element: <UpdateNodeInfo />,
                        },
                        {
                          path: 'componentes',
                          element: <UpdateNodeComponents />,
                          loader: ({ params }) => nodeCreationLoader(auth, params, loaderErrors),
                        },
                        {
                          path: 'ubicacion',
                          element: <UpdateNodeLocation />,
                          loader: ({ params }) => nodeCreationLoader(auth, params, loaderErrors),
                        },
                        {
                          path: 'eliminar',
                          element: <DeleteNode />,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              path: 'ubicaciones',
              element: <LocationsRoot />,
              loader: ({ params }) => locationsLoader(auth, params, loaderErrors),
              children: [
                {
                  path: 'agregar',
                  element: <LocationCreation />,
                },
                {
                  path: ':locationId',
                  element: <LocationManagement />,
                },
              ],
            },
            {
              path: 'componentes',
              element: <ComponentsRoot />,
              loader: ({ params }) => componentsLoader(auth, params, loaderErrors),
              children: [
                {
                  path: 'agregar',
                  element: <ComponentCreation />,
                  loader: ({ params }) => variablesLoader(auth, params, loaderErrors),
                },
                {
                  path: ':componentId',
                  element: <ComponentManagement />,
                  loader: ({ params }) => variablesLoader(auth, params, loaderErrors),
                },
              ],
            },
            {
              path: 'variables',
              element: <VariablesRoot />,
              loader: ({ params }) => variablesLoader(auth, params, loaderErrors),
              children: [
                {
                  path: 'agregar',
                  element: <VariableCreation />,
                },
                {
                  path: ':variableId',
                  element: <VariableManagement />,
                },
              ],
            },
            {
              path: 'ajustes',
              element: <SpaceSettingsRoot />,
              children: [
                {
                  path: 'actualizar-nombre',
                  element: <UpdateSpaceName />,
                },
                {
                  path: 'actualizar-color',
                  element: <UpdateSpaceColor />,
                },
                {
                  path: 'abandonar-espacio',
                  element: <LeaveSpace />,
                },
                {
                  path: 'eliminar-espacio',
                  element: <DeleteSpace />,
                },
              ],
            },
          ],
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

export default Router;
