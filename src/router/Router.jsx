import { React } from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  AccountRoot, DeleteAccount, UpdateAccountEmail, UpdateAccountName, UpdateAccountPassword,
} from 'src/pages/Account';
import {
  Faq, Information,
} from 'src/pages/AppInformation';
import {
  Login, PasswordRecover, PasswordReset, Register, ResendVerificationLink, Verification,
} from 'src/pages/Authentication';
import Home from 'src/pages/Home';
import NotFound from 'src/pages/NotFound';
import { ReadingsRoot } from 'src/pages/Readings';
import Root from 'src/pages/Root';
import {
  ComponentsRoot, ComponentCreation, ComponentManagement,
} from 'src/pages/SpaceComponents';
import {
  SelectedSpaceHome, SelectedSpaceRoot,
} from 'src/pages/SpaceInstance';
import {
  LocationsRoot, LocationCreation, LocationManagement,
} from 'src/pages/SpaceLocations';
import {
  MemberManagement, MemberInvitation, MembersRoot,
} from 'src/pages/SpaceMembers';
import {
  NodesRoot, NodeCreationRoot,
} from 'src/pages/SpaceNodes';
import {
  SelectedNodeRoot,
} from 'src/pages/SpaceNodes/SelectedNode';
import {
  SelectedNodeManagementRoot, DownloadNodeConfigFile, UpdateNodeInfo, UpdateNodeComponents,
  UpdateNodeLocation, DeleteNode,
} from 'src/pages/SpaceNodes/SelectedNodeManagement';
import { SelectedSpaceReadingsRoot } from 'src/pages/SpaceReadings';
import {
  SpacesCreation, SpacesInvitations, SpacesRoot,
} from 'src/pages/Spaces';
import {
  DeleteSpace, LeaveSpace, SpaceSettingsRoot, UpdateSpaceColor, UpdateSpaceName,
} from 'src/pages/SpaceSettings';
import {
  VariablesRoot, VariableCreation, VariableManagement,
} from 'src/pages/SpaceVariables';

import HiddenRoutes from './HiddenRoutes';
import PersistentLogin from './PersistentLogin';

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <PersistentLogin />,
      children: [
        {
          path: '/',
          element: <Root />,
          errorElement: <NotFound />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: 'lecturas',
              element: <ReadingsRoot />,
            },
            {
              path: 'informacion',
              element: <Information />,
            },
            {
              path: 'faq',
              element: <Faq />,
            },
            {
              path: 'verificar/:verificationType/:accountId/:verificationToken',
              element: <Verification />,
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
              children: [
                {
                  index: true,
                  element: <SelectedSpaceHome />,
                },
                {
                  path: 'lecturas',
                  element: <SelectedSpaceReadingsRoot />,
                },
                {
                  path: 'miembros',
                  element: <MembersRoot />,
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
                  children: [
                    {
                      path: 'agregar',
                      element: <NodeCreationRoot />,
                    },
                    {
                      path: ':nodeId',
                      element: <SelectedNodeRoot />,
                    },
                    {
                      path: ':nodeId/ajustes',
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
                        },
                        {
                          path: 'ubicacion',
                          element: <UpdateNodeLocation />,
                        },
                        {
                          path: 'eliminar',
                          element: <DeleteNode />,
                        },
                      ],
                    },
                  ],
                },
                {
                  path: 'ubicaciones',
                  element: <LocationsRoot />,
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
                  children: [
                    {
                      path: 'agregar',
                      element: <ComponentCreation />,
                    },
                    {
                      path: ':componentId',
                      element: <ComponentManagement />,
                    },
                  ],
                },
                {
                  path: 'variables',
                  element: <VariablesRoot />,
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
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
