import {
  React, useState, useContext,
} from 'react';

import Button from 'src/components/Button';
import TextInput from 'src/components/TextInput';
import Heading from 'src/components/Heading';
import MapWidget from 'src/components/MapWidget';
import { AuthContext } from 'src/context/authProvider';
import locationService from 'src/services/locations';
import notifications from 'src/utils/notifications';

const mapCenter = [8.322376, -62.689662];

const LocationCreation = () => {
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [coordenates, setCoordenates] = useState({ lat: mapCenter[0], long: mapCenter[1] });
  const [recenter, setRecenter] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await locationService.create({
        coordenates, locationName, address,
      });

      notifications.success(`Ubicacion "${locationName}" creada.`);
      setCoordenates({ lat: mapCenter[0], long: mapCenter[1] });
      setLocationName('');
      setAddress('');
      setRecenter(true);
    } catch (err) {
      if (err.response.data.error === 'La sesión expiró') logout(err);
    }
  };

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-1 gap-5">
      <div className="flex w-full rounded-lg bg-white p-5 shadow">
        <div className="flex w-full overflow-hidden rounded-lg shadow">
          <MapWidget
            mapType="select"
            coordenates={coordenates}
            setCoordenates={setCoordenates}
            recenter={recenter}
          />
        </div>
      </div>

      <div className="flex h-full w-full flex-col gap-2.5 rounded-lg bg-white p-5 shadow">

        {/* <div className="flex justify-between">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
            Registrar Ubicación
          </h1>

          {
            setIsOpen && (
              <div className="row-span-1 flex items-center justify-center rounded-xl bg-white shadow">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={close}
                    alt="close button"
                    className="h-[28px] w-[28px]"
                  />
                </button>
              </div>
            )
          }

        </div> */}

        <div className="flex grow flex-col gap-2.5">
          <Heading text="Registrar Ubicación" />

          <form className="flex flex-col gap-2.5 space-y-4 md:space-y-1">
            <div className="flex justify-between space-x-4 ">
              <TextInput
                id="lat"
                type="number"
                disabled
                labelText="Latitud"
                value={coordenates.lat}
                setValue={(newValue) => setCoordenates({ ...coordenates, lat: newValue })}
              />

              <TextInput
                id="long"
                type="number"
                disabled
                labelText="Longitud"
                value={coordenates.long}
                setValue={(newValue) => setCoordenates({ ...coordenates, long: newValue })}
              />
            </div>

            <TextInput
              id="locationName"
              type="text"
              labelText="Nombre"
              value={locationName}
              setValue={setLocationName}
            />

            <label htmlFor="address" className="block">
              <div className="mb-2 text-sm font-medium text-gray-900">
                Dirección
              </div>
              <textarea
                id="address"
                name="address"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
                rows="3"
                required
                className="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-sky-600 sm:text-sm"
              />
            </label>
          </form>
        </div>

        <Button
          text="Agregar Ubicación"
          color="blue"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default LocationCreation;
