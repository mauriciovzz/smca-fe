import { React } from 'react';

import { Routes, Route } from 'react-router-dom';

import {
  Account,
  Components,
  NotFound,
  Faq,
  Home,
  Information,
  Locations,
  Login,
  Nodes,
  PasswordRecover,
  PasswordReset,
  Register,
  ResendVerificationLink,
  Variables,
  Verification,
  VerifyAccount,
  VerifyEmail,
  WorkspaceMembers,
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

      <Route path="/espacios-de-trabajo" element={<Workspaces />}>
        <Route path=":workspaceId" element={<WorkspaceInstance />}>
          <Route path="" element={<WorkspaceMap />} />

          <Route path="reportes" element={<WorkspaceReports />} />

          <Route path="miembros" element={<WorkspaceMembers />} />

          <Route path="nodos" element={<Nodes />} />

          <Route path="ubicaciones" element={<Locations />} />

          <Route path="componentes" element={<Components />} />

          <Route path="variables" element={<Variables />} />

          <Route path="ajustes" element={<WorkspaceSettings />} />
        </Route>
      </Route>

    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Routers;
