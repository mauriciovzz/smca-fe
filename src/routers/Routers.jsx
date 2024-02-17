import { React } from 'react';

import { Routes, Route } from 'react-router-dom';

import {
  Account,
  NotFound,
  Faq,
  Home,
  Information,
  Login,
  PasswordRecover,
  PasswordReset,
  Register,
  ResendVerificationLink,
  Verification,
  VerifyAccount,
  VerifyEmail,
  WorkspaceAccounts,
  WorkspaceInstance,
  WorkspaceMap,
  WorkspaceReports,
  Workspaces,
  WorkspaceSettings,
} from 'src/pages';

import ProtectedRoute from './ProtectedRoute';

const Routers = () => (
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/informacion" element={<Information />} />

    <Route path="/faq" element={<Faq />} />

    <Route path="/registro" element={<Register />} />

    <Route path="/recuperar-contraseña" element={<PasswordRecover />} />
    <Route path="/restablecer-contraseña/:verificationToken" element={<PasswordReset />} />

    <Route path="/verificar" element={<Verification />}>
      <Route path="cuenta/:verificationToken" element={<VerifyAccount />} />
      <Route path="cuenta/reenviar-enlace/" element={<ResendVerificationLink />} />
      <Route path="correo-electronico/:verificationToken" element={<VerifyEmail />} />
    </Route>

    <Route path="/iniciar-sesion" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/cuenta" element={<Account />} />

      <Route path="/espacios-de-trabajo">
        <Route index element={<Workspaces />} />
        <Route path=":workspaceId" element={<WorkspaceInstance />}>
          <Route path="" element={<WorkspaceMap />} />
          <Route path="reportes" element={<WorkspaceReports />} />
          <Route path="cuentas" element={<WorkspaceAccounts />} />
          <Route path="ajustes" element={<WorkspaceSettings />} />
        </Route>
      </Route>
    </Route>

    {/* <Route element={<Auth allowedRoles={['USER', 'RESEARCHER', 'ADMIN']} />}>
      <Route path="/cuenta" element={<Account />}>

        <Route path="nodos" element={<NodesPage />}>
          <Route path="" element={<NodesView />} />
          <Route path="registrar" element={<NodeCreation />} />
          <Route path=":node_type/:node_id" element={<NodeManagement />} />
        </Route>

        <Route path="ubicaciones" element={<Locations />}>
          <Route path="" element={<LocationList />} />
          <Route path="registrar" element={<LocationCreation />} />
          <Route path=":lat/:long" element={<LocationManagement />} />
        </Route>

        <Route path="componentes" element={<Components />} />

        <Route path="variables" element={<Variables />} />

        <Route path="reportes" element={<Reports />} />

      </Route>
    </Route> */}

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Routers;
