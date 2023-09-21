import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import marker from 'src/assets/marker-icon.png';
import markerShadow from 'src/assets/marker-shadow.png';
import nodeLocationService from 'src/services/nodeLocations';

const icon = new L.Icon({
  iconUrl: marker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const mapCenter = [8.32263, -62.69119];

const NodeView = ({ setSelectedNode }) => {
  const navigate = useNavigate();
  const [nodeList, setNodeList] = useState([]);

  useEffect(() => {
    nodeLocationService
      .getAll()
      .then((nodes) => setNodeList(nodes));
  }, []);

  return (
    <div className="grid w-full grid-cols-2 gap-5">

      {/* Map */}
      <div className="flex w-full rounded-lg bg-white p-5 shadow">
        <div className="flex w-full overflow-hidden rounded-lg shadow">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={false}
            attributionControl={false}
            className="grow"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              nodeList.map((node) => (
                <Marker
                  key={`${node.node_type}${node.node_id}`}
                  icon={icon}
                  position={[node.lat, node.long]}
                  eventHandlers={{
                    click: () => {
                      setSelectedNode(node);
                      navigate(`/cuenta/nodos/${node.node_type}/${node.node_id}`);
                    },
                    mouseover: (event) => event.target.openPopup(),
                    mouseout: (event) => event.target.closePopup(),
                  }}
                >
                  <Popup>{node.lat}</Popup>
                </Marker>
              ))
            }
          </MapContainer>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col space-y-5 overflow-hidden rounded-lg bg-white p-5 shadow">

        {/* Title */}
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Nodos
        </h1>

        {/* Table */}
        <div className="relative basis-11/12 overflow-hidden rounded-xl bg-slate-100 shadow">
          <div className="absolute flex h-full w-full flex-col text-sm">
            <div className="flex w-full">
              <div className="flex-1 border-b p-4 pl-8  font-medium text-slate-400">tipo</div>
              <div className="flex-1 border-b p-4       font-medium text-slate-400">id</div>
              <div className="flex-1 border-b p-4       font-medium text-slate-400">lat</div>
              <div className="flex-1 border-b p-4 pr-10 font-medium text-slate-400">long</div>
            </div>

            <div className="flex flex-col overflow-auto bg-white">
              {
                nodeList.map((node) => (
                  <Link
                    key={`${node.node_type}${node.node_id}`}
                    className="flex hover:bg-slate-200"
                    onClick={() => setSelectedNode(node)}
                    to={`/cuenta/nodos/${node.node_type}/${node.node_id}`}
                  >
                    <div className="flex-1 border-b border-slate-100 p-4 pl-8  text-slate-500">{node.node_type}</div>
                    <div className="flex-1 border-b border-slate-100 p-4       text-slate-500">{node.node_id}</div>
                    <div className="flex-1 border-b border-slate-100 p-4       text-slate-500">{node.lat}</div>
                    <div className="flex-1 border-b border-slate-100 p-4 pr-10 text-slate-500">{node.long}</div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          className="flex basis-1/12 items-center justify-center rounded-lg bg-primary-600 font-medium text-white shadow hover:bg-primary-700"
          to="/cuenta/nodos/crear"
        >
          Agregar Nodo
        </Link>

      </div>
    </div>
  );
};

export default NodeView;
