import {
  React, useState, useEffect, useContext, useMemo,
} from 'react';

import {
  useNavigate, useOutletContext,
} from 'react-router-dom';

import Button from 'src/components/Button';
import Heading from 'src/components/Heading';
import MapWidget from 'src/components/MapWidget';
import Table from 'src/components/Table/Table';
import { AuthContext } from 'src/context/authProvider';
import locationsService from 'src/services/locations';

const LocationList = () => {
  const [locationList, setLocationList] = useState([]);
  const { setSelectedLocation } = useOutletContext();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const selectLocation = (location) => {
    setSelectedLocation(location);
    navigate(`/cuenta/ubicaciones/${location.lat}/${location.long}`);
  };

  const updateLocationList = () => {
    locationsService
      .getAll()
      .then((freeLocations) => setLocationList(freeLocations))
      .catch((err) => {
        if (err.response.data.error === 'La sesión expiró') logout(err);
      });
  };

  useEffect(() => {
    updateLocationList();
  }, []);

  const columns = useMemo(() => [
    {
      Header: 'Coordenadas',
      Cell: ({ row }) => `[${row.original.lat}, ${row.original.long}]`,
    },
    {
      Header: 'Ubicación',
      accessor: 'location_name',
    },
    {
      Header: 'Dirección',
      accessor: 'address',

    },
  ], []);

  return (
    <div className="grid h-full w-full grid-cols-2 grid-rows-1 gap-5">
      <div className="flex h-full w-full rounded-lg bg-white p-5 shadow">
        <div className="flex w-full overflow-hidden rounded-lg shadow">
          <MapWidget
            markerList={locationList}
            onMarkerClick={((location) => selectLocation(location))}
            markerPopup={
              (location) => (
                <>
                  <b>{location.location_name}</b>
                  <br />
                  {location.address}
                </>
              )
            }
            mapType="showing"
          />
        </div>
      </div>

      <div className="flex h-full w-full flex-col justify-between rounded-lg bg-white p-5 shadow">
        <Heading text="Ubicaciones" />

        <Table
          columns={columns}
          data={locationList}
          onRowClick={(location) => {
            selectLocation(location);
          }}
        />

        <Button
          text="Agregar Ubicacion"
          color="blue"
          onClick={() => navigate('/cuenta/ubicaciones/registrar')}
        />
      </div>
    </div>

  );
};

export default LocationList;
