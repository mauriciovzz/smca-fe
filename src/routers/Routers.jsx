import { React } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import {
  Account,
  Faq,
  Home,
  Information,
  Login,
  PasswordRecover,
  PasswordReset,
  Register,
  Verification,
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

    <Route path="/iniciar-sesion" element={<Login />} />
    <Route path="/registro" element={<Register />} />

    <Route path="/verificacion/:verificationToken" element={<Verification />} />

    <Route path="/recuperar-contraseña" element={<PasswordRecover />} />
    <Route path="/restablecer-contraseña/:accountId/:resetToken" element={<PasswordReset />} />

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

    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
);

export default Routers;
