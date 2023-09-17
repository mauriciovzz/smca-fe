import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import marker from 'src/assets/marker-icon.png';
import markerShadow from 'src/assets/marker-shadow.png';
import locationService from 'src/services/locations';

const icon = new L.Icon({
  iconUrl: marker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const mapCenter = [8.322376, -62.689662];

const LocationView = ({ setSelectedLocation }) => {
  const navigate = useNavigate();
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    locationService.getAll()
      .then((locations) => setLocationList(locations));
  }, []);

  return (
    <div className="grid w-full grid-cols-2 gap-5">

      {/* Map */}
      <div className="flex w-full rounded-lg bg-white p-5 shadow">
        <div className="flex w-full overflow-hidden rounded-lg shadow">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={true}
            attributionControl={false}
            className="grow"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              locationList.map((location) => (
                <Marker
                  key={`${location.lat}${location.long}`}
                  icon={icon}
                  position={[location.lat, location.long]}
                  eventHandlers={{
                    click: () => {
                      setSelectedLocation(location);
                      navigate(`/cuenta/ubicaciones/${location.lat}/${location.long}`);
                    },
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                  }}
                >
                  <Popup>{location.location_name}</Popup>
                </Marker>
              ))
            }
          </MapContainer>
        </div>
      </div>

      {/* Info */}      
      <div className="flex flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">  
        
        {/* Title */}
        <h1 className="font-bold leading-tight tracking-tight text-gray-900 text-2xl">
            Ubicaciones
        </h1>
        
        {/* Table */}
        <div className="relative basis-11/12 overflow-hidden rounded-xl bg-slate-100 shadow">              
          <div className="absolute flex h-full w-full flex-col text-sm">
            <div className="flex w-full">
              <div className="flex-1 border-b p-4 pl-8  font-medium text-slate-400">Coordenadas</div>
              <div className="flex-1 border-b p-4       font-medium text-slate-400">Nombre</div>
              <div className="flex-1 border-b p-4 pr-10 font-medium text-slate-400">Dirección</div>
            </div>

            <div className="flex flex-col overflow-y-auto bg-white">
              {
                locationList.map((location) => (
                  <Link
                    key={`${location.lat}${location.long}`}
                    className="flex hover:bg-slate-200"
                    onClick={() => setSelectedLocation(location)}
                    to={`/cuenta/ubicaciones/${location.lat}/${location.long}`}
                  >
                    <div className="flex-1 border-b border-slate-100 p-4 pl-8 text-slate-500">{`[${location.lat}, ${location.long}]`}</div>
                    <div className="flex-1 border-b border-slate-100 p-4       text-slate-500">{location.location_name}</div>
                    <div className="flex-1 border-b border-slate-100 p-4 pr-8 text-slate-500">{location.location_address}</div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          className="flex basis-1/12 items-center justify-center rounded-lg bg-primary-600 font-medium text-white shadow hover:bg-primary-700"
          to="/cuenta/ubicaciones/crear"
        >
          Agregar Ubicacion
        </Link>

      </div>

    </div>
  );
};

export default LocationView;
