import { React, useState } from 'react';

import L from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup, ZoomControl,
} from 'react-leaflet';
import { LayerGroup } from 'react-leaflet/LayerGroup';
import { LayersControl } from 'react-leaflet/LayersControl';

import {
  indoorMarker, outdoorMarker, privateMarker, publicMarker, regularMarker,
} from 'src/assets';
import ReadingsDashboard from 'src/components/readingsDashboard';
import useAuth from 'src/hooks/useAuth';

import './inputRadio.css';

const mapCenter = [8.322376, -62.689662];
const mapZoom = 13;

const southWestBound = [8.183530, -62.878919];
const northEastBound = [8.398253, -62.539415];

const createMarker = (marker, markersType) => {
  const MarkerConfig = () => {
    const color = () => {
      if (markersType === 'node' && marker.is_visible)
        return '#0284c7';

      if (markersType === 'node' && marker.color)
        return marker.color;

      return '#0284c7';
    };

    switch (markersType) {
      case 'location':
        return (marker.is_visible) ? publicMarker(color()) : privateMarker(color());
      case 'node':
        return (marker.is_indoor) ? indoorMarker(color()) : outdoorMarker(color());
      default: return regularMarker(color());
    }
  };

  const icon = L.divIcon({
    className: 'marker',
    html: MarkerConfig(),
    iconSize: [42, 60],
    iconAnchor: [42 / 2, 60],
    popupAnchor: [2, -62.5],
  });

  return icon;
};

const createMarkerPopUp = (markersType, marker) => {
  switch (markersType) {
    case 'location':
      return (
        <>
          <b>{marker.name}</b>
          <br />
          {marker.location}
        </>
      );
    case 'node':
      return (
        <>
          <b>{marker.node_name}</b>
          <br />
          {marker.location_name}
        </>
      );
    default:
      return null;
  }
};

const SingleMarker = ({ marker, onMarkerClick }) => (
  <Marker
    key={`${marker.lat}-${marker.long}`}
    icon={createMarker(marker, 'node')}
    position={[marker.lat, marker.long]}
    eventHandlers={{
      click: () => onMarkerClick(marker),
      mouseover: (event) => event.target.openPopup(),
      mouseout: (event) => event.target.closePopup(),
    }}
  >
    <Popup minWidth="250" closeButton={false}>
      {createMarkerPopUp('node', marker)}
    </Popup>
  </Marker>
);

const ReadingsMap = ({ markersData, showLayerControl }) => {
  const { auth } = useAuth();

  const [isModOpen, setIsModOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});

  const markersReduced = markersData.reduce(
    (finalMarkers, currentObj) => {
      const indx = finalMarkers.findIndex((m) => m.spaceId === currentObj.space_id);

      if (indx !== -1)
        finalMarkers[indx].markers.push(currentObj);
      else
        finalMarkers.push({
          spaceId: currentObj.space_id,
          spaceName: currentObj.space_name,
          spaceColor: currentObj.color,
          markers: [currentObj],
        });

      return finalMarkers;
    },
    [],
  );

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

        {showLayerControl
          ? (
            <>
              <LayersControl position="bottomleft">
                <LayersControl.BaseLayer checked name="<span style='font-weight: 600;'>Todos</span>">
                  <LayerGroup>
                    {
                      markersData.map((marker) => (
                        <SingleMarker
                          key={`${marker.lat}-${marker.long}`}
                          marker={marker}
                          onMarkerClick={() => selectNode(marker)}
                        />
                      ))
                    }
                  </LayerGroup>
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="<span style='font-weight: 600;'>Nodos Indoor</span>">
                  <LayerGroup>
                    {
                      markersData.filter((marker) => marker.is_indoor).map((marker) => (
                        <SingleMarker
                          key={`${marker.lat}-${marker.long}`}
                          marker={marker}
                          onMarkerClick={() => selectNode(marker)}
                        />
                      ))
                    }
                  </LayerGroup>
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name="<span style='font-weight: 600;'>Nodos Outdoor</span>">
                  <LayerGroup>
                    {
                      markersData.filter((marker) => !marker.is_indoor).map((marker) => (
                        <SingleMarker
                          key={`${marker.lat}-${marker.long}`}
                          marker={marker}
                          onMarkerClick={() => selectNode(marker)}
                        />
                      ))
                    }
                  </LayerGroup>
                </LayersControl.BaseLayer>

                {(auth?.accessToken) && markersReduced.map((markerGroup) => (
                  <LayersControl.BaseLayer
                    key={markerGroup.spaceId}
                    name={`<span style='font-weight: 600;'>${markerGroup.spaceName}</span>`}
                  >
                    <LayerGroup>
                      {
                        markerGroup.markers.map((marker) => (
                          <SingleMarker
                            key={`${marker.lat}-${marker.long}`}
                            marker={marker}
                            onMarkerClick={() => selectNode(marker)}
                          />
                        ))
                      }
                    </LayerGroup>
                  </LayersControl.BaseLayer>
                ))}
              </LayersControl>

              <ZoomControl position="bottomright" />
            </>
          )
          : (
            <>
              {markersData.map((marker) => (
                <SingleMarker
                  key={`${marker.lat}-${marker.long}`}
                  marker={marker}
                  onMarkerClick={() => selectNode(marker)}
                />
              ))}
            </>
          )}
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
