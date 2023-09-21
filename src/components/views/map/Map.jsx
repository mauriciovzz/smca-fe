import { React, useState, useEffect } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';
import marker from 'src/assets/marker-icon.png';
import markerShadow from 'src/assets/marker-shadow.png';
import nodeLocationService from 'src/services/nodeLocations';
import Modal from './modal/Modal';

const icon = new L.Icon({
  iconUrl: marker,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});

const mapCenter = [8.322376, -62.689662];

const Map = () => {
  const [nodeList, setNodeList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});

  useEffect(() => {
    nodeLocationService
      .getAll()
      .then((activeNodes) => setNodeList(activeNodes));
  }, []);

  return (
    <div className="relative flex grow">
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom
        attributionControl={false}
        className="z-0 grow"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {nodeList.map((node) => (
          <Marker
            key={node.node_type + node.node_id}
            icon={icon}
            position={[node.lat, node.long]}
            eventHandlers={{
              click: () => {
                setIsOpen(true);
                setSelectedNode(node);
              },
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
            }}
          >
            <Popup>Node Info</Popup>
          </Marker>
        ))}
      </MapContainer>

      {isOpen && <Modal selectedNode={selectedNode} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Map;
