import { React, useState } from 'react';

import {
  useLoaderData,
} from 'react-router-dom';

import { control } from 'src/assets';
import {
  Button, Divider, Heading, Label, TextInput,
} from 'src/components';
import accountsService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

export const loader = async (accountId) => {
  const response = await accountsService.get(accountId);
  return response;
};

const OverviewButton = ({
  title, value, isFirst, onClick,
}) => (
  <button
    type="button"
    className={`${isFirst ? 'pb-5' : 'py-5'} flex justify-between hover:bg-background`}
    onClick={() => onClick()}
  >
    <div className="text-left">
      <Label text={title} />
      <div>
        {value}
      </div>
    </div>

    <img
      src={control}
      alt="control arrow"
      className="size-[28px] rotate-180 self-center"
    />
  </button>
);

const AccountOverview = ({ changeView }) => {
  const accountData = useLoaderData();

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <Heading text="Cuenta" />

      <Divider />

      <div className="flex grow flex-col divide-y">
        <OverviewButton
          title="Nombre"
          value={`${accountData.firstName} ${accountData.lastName}`}
          isFirst
          onClick={() => changeView('UpdateName')}
        />
        <OverviewButton
          title="Correo Electrónico"
          value={accountData.email}
          onClick={() => changeView('UpdateEmail')}
        />
        <OverviewButton
          title="Contraseña"
          value="●●●●●●●● "
          onClick={() => changeView('UpdatePassword')}
        />
      </div>

    </div>
  );
};

const UpdateName = ({
  accountId, fn, ln, resetView, updateData,
}) => {
  const [firstName, setFirstName] = useState(fn);
  const [lastName, setLastName] = useState(ln);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountsService.updateName(accountId, { firstName, lastName });
      notifications.success(response);
      updateData();
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Nombre"
          hasButton
          onButtonClick={() => resetView()}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <TextInput
            id="firstName"
            type="text"
            labelText="Nuevo nombre"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            id="lastName"
            type="text"
            labelText="Nuevo apellido"
            value={lastName}
            setValue={setLastName}
          />
        </form>
      </div>

      <Button
        text="Guardar Cambios"
        form="form"
        color="blue"
      />
    </div>
  );
};

const UpdateEmail = ({ accountId, em, resetView }) => {
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountsService.updateEmail(accountId, { newEmail, password });
      notifications.success(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Correo"
          hasButton
          onButtonClick={() => resetView()}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <TextInput
            id="email"
            type="email"
            labelText="Correo electrónico actual"
            value={em}
            disabled
          />
          <TextInput
            id="newEmail"
            type="email"
            labelText="Nuevo correo electrónico"
            value={newEmail}
            setValue={setNewEmail}
            autoComplete="email"
          />
          <TextInput
            id="password"
            type="password"
            labelText="Contraseña"
            value={password}
            setValue={setPassword}
            autoComplete="current-password"
          />

        </form>
      </div>

      <Button
        text="Guardar Cambios"
        form="form"
        color="blue"
      />
    </div>
  );
};

const UpdatePassword = ({ accountId, resetView }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== repeatNewPassword) {
      notifications.error('Los campos \'Nueva contraseña\' y \'Repetir nueva contraseña\' deben de coincidir.');
    } else {
      try {
        const response = await accountsService.updatePassword(
          accountId,
          { currentPassword, newPassword, repeatNewPassword },
        );
        notifications.success(response);
      } catch (err) {
        notifications.error(err);
      }
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col">
        <Heading
          text="Actualizar Contraseña"
          hasButton
          onButtonClick={() => resetView()}
        />

        <Divider />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <input
            type="text"
            name="email"
            value="..."
            autoComplete="email"
            style={{ display: 'none' }}
            readOnly
            hidden
          />
          <TextInput
            id="currentPassword"
            type="password"
            labelText="Contraseña actual"
            value={currentPassword}
            setValue={setCurrentPassword}
            autoComplete="current-password"
          />
          <TextInput
            id="newPassword"
            type="password"
            labelText="Nueva contraseña"
            value={newPassword}
            setValue={setNewPassword}
            autoComplete="new-password"
          />
          <TextInput
            id="repeatNewPassword"
            type="password"
            labelText="Repetir nueva contraseña"
            value={repeatNewPassword}
            setValue={setRepeatNewPassword}
            autoComplete="new-password"
          />
        </form>
      </div>

      <Button
        text="Guardar Cambios"
        form="form"
        color="blue"
      />
    </div>
  );
};

const Account = () => {
  const [view, setView] = useState(null);
  const isScreenSM = (window.innerWidth <= 640);

  const renderView = () => {
    switch (view) {
      case 'UpdateName':
        return (
          <UpdateName resetView={() => setView(null)} />
        );
      case 'UpdateEmail':
        return (
          <UpdateEmail resetView={() => setView(null)} />
        );
      case 'UpdatePassword':
        return (
          <UpdatePassword resetView={() => setView(null)} />
        );
      default:
        return (
          (isScreenSM)
            ? (
              <AccountOverview changeView={(value) => setView(value)} />
            )
            : (
              <div className="flex grow flex-col items-center justify-center rounded-lg bg-white font-medium shadow">
                <span>Selecciona una opción para realizar cambios.</span>
              </div>
            )
        );
    }
  };

  return (
    <div className="flex grow bg-background px-5 pb-5 sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:gap-5">
      <div className="hidden grow bg-background sm:flex">
        <AccountOverview changeView={(value) => setView(value)} />
      </div>

      <div className="flex grow bg-background">
        {renderView()}
      </div>
    </div>
  );
};

export default Account;
