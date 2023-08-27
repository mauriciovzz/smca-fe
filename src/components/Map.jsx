import { React, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import marker from '../assets/marker-icon.png';
import markerShadow from '../assets/marker-shadow.png';
import Modal from './Modal';

const icon = new L.Icon({
  iconUrl: marker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const mapCenter = [8.32263, -62.69119];

const Map = ({ nodeList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});

  return (
    <div className="relative flex flex-grow">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        attributionControl={false}
        className="z-0 flex flex-grow items-center  justify-center"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {nodeList.map((nodeLocation) =>
          (
            <Marker
              key={nodeLocation.node_type + nodeLocation.node_id}
              icon={icon}
              position={[nodeLocation.lat, nodeLocation.long]}
              eventHandlers={{
                click: () => {
                  setIsOpen(true);
                  setSelectedNode(nodeLocation);
                },
                mouseover: (event) =>
                  event.target.openPopup(),
                mouseout: (event) =>
                  event.target.closePopup(),
              }}
            >
              <Popup>Node Info</Popup>
            </Marker>
          ))}
      </MapContainer>

      {isOpen && <Modal nodeLocation={selectedNode} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Map;
