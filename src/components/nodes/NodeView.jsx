import { React } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
} from 'react-leaflet';
import L from 'leaflet';
import marker from '../../assets/marker-icon.png';
import markerShadow from '../../assets/marker-shadow.png';

const icon = new L.Icon({
  iconUrl: marker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const mapCenter = [8.32263, -62.69119];

const NodeView = ({ nodeList }) => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-grow p-5 bg-white rounded-lg shadow text-primary-600">
      <div className="flex w-full flex-grow grid grid-cols-2 gap-5">

        <div className="relative w-full flex flex-grow rounded-lg shadow">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={false}
            attributionControl={false}
            className="z-0 flex flex-grow items-center justify-center rounded-lg shadow"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {nodeList.map((nodeLocation) =>
              (
                <Marker
                  key={`Marker ${nodeLocation.node_type}${nodeLocation.node_id}`}
                  icon={icon}
                  position={[nodeLocation.lat, nodeLocation.long]}
                  eventHandlers={{
                    click: () =>
                      navigate(`/cuenta/nodos/${nodeLocation.node_type}/${nodeLocation.node_id}`),
                  }}
                />
              ))}
          </MapContainer>
        </div>

        <div className="flex w-full flex-grow grid grid-rows-5 gap-5">

          <div className="row-span-4 not-prose relative bg-slate-100 rounded-xl overflow-hidden">
            <div className="relative rounded-xl overflow-auto ">
              <div className="shadow-sm overflow-hidden my-8">
                <table className="border-collapse table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">node type</th>
                      <th className="border-b font-medium p-4 pt-0      pb-3 text-slate-400 text-left">node id</th>
                      <th className="border-b font-medium p-4 pt-0      pb-3 text-slate-400 text-left">lat</th>
                      <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">long</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {
                      nodeList.map((node) =>
                        (
                          <tr key={`Table ${node.node_type}${node.node_id}`}>
                            <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">{node.node_type}</td>
                            <td className="border-b border-slate-100 p-4      text-slate-500 ">{node.node_id}</td>
                            <td className="border-b border-slate-100 p-4      text-slate-500 ">{node.lat}</td>
                            <td className="border-b border-slate-100 p-4 pr-8 text-slate-500">{node.long}</td>
                            <td className="border-b border-slate-100 p-4 pr-8 text-slate-500">
                              <Link to={`/cuenta/nodos/${node.node_type}/${node.node_id}`}>Administrar</Link>
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Link
            className="bg-primary-600 rounded-lg shadow text-white row-span-1 flex items-center justify-center"
            to="/cuenta/nodos/crear"
          >
            + Nodo
          </Link>

        </div>
      </div>
    </div>
  );
};

export default NodeView;
