import {
  React, useState, useContext,
} from 'react';

import { control } from 'src/assets';
import {
  Button, Heading, Label, TextInput,
} from 'src/components';
import { AuthContext } from 'src/context/authProvider';
import accountService from 'src/services/accounts';
import notifications from 'src/utils/notifications';

const OverviewButton = ({ title, value, onClick }) => (
  <button
    type="button"
    className="flex justify-between py-5 hover:bg-background"
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
      className="h-[28px] w-[28px] rotate-180 self-center"
    />
  </button>
);

const AccountOverview = ({ onClick }) => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex grow flex-col divide-y rounded-lg bg-white p-5 shadow">
      <Heading text="Cuenta" />

      <OverviewButton
        title="Nombre"
        value={`${auth.firstName} ${auth.lastName}`}
        onClick={() => onClick('UpdateName')}
      />
      <OverviewButton
        title="Correo Electrónico"
        value={auth.email}
        onClick={() => onClick('UpdateEmail')}
      />
      <OverviewButton
        title="Contraseña"
        value="●●●●●●●● "
        onClick={() => onClick('UpdatePassword')}
      />
    </div>
  );
};

const UpdateName = ({ resetView, isScreenSM }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.updateName({ firstName, lastName });
      notifications.success(response);
      setAuth({ ...auth, firstName, lastName });
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col divide-y">
        <Heading
          text="Actualizar Nombre"
          hasButton
          isCloseButton={!isScreenSM}
          onButtonClick={() => resetView()}
        />

        <form onSubmit={handleSubmit} id="form" className="space-y-5 py-5">
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

const UpdateEmail = ({ resetView, isScreenSM }) => {
  const { auth } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.updateEmail({ newEmail, password });
      notifications.success(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col divide-y">
        <Heading
          text="Actualizar Correo Electrónico"
          hasButton
          isCloseButton={!isScreenSM}
          onButtonClick={() => resetView()}
        />

        <form onSubmit={handleSubmit} id="form" className="space-y-5 py-5">
          <TextInput
            id="email"
            type="email"
            labelText="Correo electrónico actual"
            value={auth.email}
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

const UpdatePassword = ({ resetView, isScreenSM }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await accountService.updatePassword({
        currentPassword, newPassword, repeatNewPassword,
      });
      notifications.success(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <div className="flex grow flex-col divide-y">
        <Heading
          text="Actualizar Contraseña"
          hasButton
          isCloseButton={!isScreenSM}
          onButtonClick={() => resetView()}
        />

        <form onSubmit={handleSubmit} id="form" className="space-y-5">
          <input
            type="text"
            name="email"
            value="..."
            autoComplete="email"
            style={{ display: 'none' }}
            readOnly
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
  const isScreenSM = (window.innerWidth < 640);

  const renderView = () => {
    switch (view) {
      case 'UpdateName':
        return (
          <UpdateName
            resetView={() => setView(null)}
            isScreenSM={isScreenSM}
          />
        );
      case 'UpdateEmail':
        return (
          <UpdateEmail
            resetView={() => setView(null)}
            isScreenSM={isScreenSM}
          />
        );
      case 'UpdatePassword':
        return (
          <UpdatePassword
            resetView={() => setView(null)}
            isScreenSM={isScreenSM}
          />
        );
      default:
        return (
          (isScreenSM)
            ? (
              <AccountOverview
                onClick={(value) => setView(value)}
              />
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
        <AccountOverview
          onClick={(value) => setView(value)}
        />
      </div>

      <div className="flex grow bg-background">
        {renderView()}
      </div>
    </div>
  );
};

export default Account;
