import { React, useState } from 'react';

import { MapContainer, TileLayer } from 'react-leaflet';

import ReadingsDashboard from 'src/components/readingsDashboard';

import MapMarkers from './MapMarkers';
import OptionsMenu from './OptionsMenu';
import ZoomControl from './ZoomControl';

const mapCenter = [8.322376, -62.689662];
const mapZoom = 13;

const southWestBound = [8.183530, -62.878919];
const northEastBound = [8.398253, -62.539415];

const ReadingsMap = ({ markersData }) => {
  const [isModOpen, setIsModOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});

  const [viewType, setViewType] = useState('ICA');
  const [selectedVariable, setSelectedVariable] = useState('todas');
  const [selectedNodeTypes, setSelectedNodeTypes] = useState('todos');

  const selectNode = (node) => {
    setIsModOpen(true);
    setSelectedNode(node);
  };

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        zoomControl={false}
        minZoom={12}
        maxBounds={[southWestBound, northEastBound]}
        maxBoundsViscosity={0.75}
        scrollWheelZoom
        attributionControl={false}
        className="fixed top-0 z-0 size-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl />

        <OptionsMenu
          viewType={viewType}
          setViewType={setViewType}
          selectedVariable={selectedVariable}
          setSelectedVariable={setSelectedVariable}
          selectedNodeTypes={selectedNodeTypes}
          setSelectedNodeTypes={setSelectedNodeTypes}
        />

        <MapMarkers
          markersData={markersData}
          viewType={viewType}
          selectedVariable={selectedVariable}
          selectedNodeTypes={selectedNodeTypes}
          onMarkerClick={(marker) => selectNode(marker)}
        />
      </MapContainer>

      {isModOpen && (
        <ReadingsDashboard
          selectedNode={selectedNode}
          setIsModOpen={setIsModOpen}
        />
      )}
    </>
  );
};

export default ReadingsMap;
