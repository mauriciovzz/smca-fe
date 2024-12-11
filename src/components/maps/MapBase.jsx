import { React, useRef, useMemo } from 'react';

import L from 'leaflet';
import {
  MapContainer, TileLayer, Marker, Popup, ZoomControl,
} from 'react-leaflet';
import { useMap, useMapEvents } from 'react-leaflet/hooks';

const RegularMarker = (color) => (
  `
    <svg width="42" height="60" viewBox="0 0 42 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_10_54" fill="white">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z"/>
    </mask>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z" fill="${color}"/>
    <path d="M29.1905 40.3428L28.4098 38.5014L27.6583 38.8201L27.3444 39.5736L29.1905 40.3428ZM12.8095 40.3428L14.6556 39.5736L14.3417 38.8201L13.5902 38.5014L12.8095 40.3428ZM21 60L19.1538 60.7692L21 65.2L22.8462 60.7692L21 60ZM40 21C40 28.8612 35.2253 35.6119 28.4098 38.5014L29.9712 42.1841C38.2127 38.69 44 30.5231 44 21H40ZM21 2C31.4934 2 40 10.5066 40 21H44C44 8.29745 33.7026 -2 21 -2V2ZM2 21C2 10.5066 10.5066 2 21 2V-2C8.29745 -2 -2 8.29745 -2 21H2ZM13.5902 38.5014C6.77466 35.6119 2 28.8612 2 21H-2C-2 30.5231 3.78731 38.69 12.0288 42.1841L13.5902 38.5014ZM22.8462 59.2308L14.6556 39.5736L10.9633 41.112L19.1538 60.7692L22.8462 59.2308ZM27.3444 39.5736L19.1538 59.2308L22.8462 60.7692L31.0367 41.112L27.3444 39.5736Z" fill="black" mask="url(#path-1-inside-1_10_54)"/>
    <circle cx="21" cy="21" r="8" fill="white" stroke="black" stroke-width="2"/>
    </svg>
  `
);

const IndoorMarker = (color) => (
  `
    <svg width="42" height="60" viewBox="0 0 42 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_10_55" fill="white">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z"/>
    </mask>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z" fill="${color}"/>
    <path d="M29.1905 40.3428L28.4098 38.5014L27.6583 38.8201L27.3444 39.5736L29.1905 40.3428ZM12.8095 40.3428L14.6556 39.5736L14.3417 38.8201L13.5902 38.5014L12.8095 40.3428ZM21 60L19.1538 60.7692L21 65.2L22.8462 60.7692L21 60ZM40 21C40 28.8612 35.2253 35.6119 28.4098 38.5014L29.9712 42.1841C38.2127 38.69 44 30.5231 44 21H40ZM21 2C31.4934 2 40 10.5066 40 21H44C44 8.29745 33.7026 -2 21 -2V2ZM2 21C2 10.5066 10.5066 2 21 2V-2C8.29745 -2 -2 8.29745 -2 21H2ZM13.5902 38.5014C6.77466 35.6119 2 28.8612 2 21H-2C-2 30.5231 3.78731 38.69 12.0288 42.1841L13.5902 38.5014ZM22.8462 59.2308L14.6556 39.5736L10.9633 41.112L19.1538 60.7692L22.8462 59.2308ZM27.3444 39.5736L19.1538 59.2308L22.8462 60.7692L31.0367 41.112L27.3444 39.5736Z" fill="black" mask="url(#path-1-inside-1_10_55)"/>
    <circle cx="21" cy="21" r="14" fill="white" stroke="black" stroke-width="2"/>
    <path d="M15.1666 27.6667V20.0417L12.8333 21.8333L11.8333 20.5L21 13.5L24.3333 16.0417V14.3333H26.8333V17.9583L30.1666 20.5L29.1666 21.8333L26.8333 20.0417V27.6667H21.8333V22.6667H20.1666V27.6667H15.1666ZM16.8333 26H18.5V21H23.5V26H25.1666V18.7708L21 15.6042L16.8333 18.7708V26ZM19.3333 19.3542H22.6666C22.6666 18.9097 22.5 18.5451 22.1666 18.2604C21.8333 17.9757 21.4444 17.8333 21 17.8333C20.5555 17.8333 20.1666 17.9757 19.8333 18.2604C19.5 18.5451 19.3333 18.9097 19.3333 19.3542Z" fill="black"/>
    </svg>  

  `
);

const OutdoorMarker = (color) => (
  `
    <svg width="42" height="60" viewBox="0 0 42 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_11_64" fill="white">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z"/>
    </mask>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z" fill="${color}"/>
    <path d="M29.1905 40.3428L28.4098 38.5014L27.6583 38.8201L27.3444 39.5736L29.1905 40.3428ZM12.8095 40.3428L14.6556 39.5736L14.3417 38.8201L13.5902 38.5014L12.8095 40.3428ZM21 60L19.1538 60.7692L21 65.2L22.8462 60.7692L21 60ZM40 21C40 28.8612 35.2253 35.6119 28.4098 38.5014L29.9712 42.1841C38.2127 38.69 44 30.5231 44 21H40ZM21 2C31.4934 2 40 10.5066 40 21H44C44 8.29745 33.7026 -2 21 -2V2ZM2 21C2 10.5066 10.5066 2 21 2V-2C8.29745 -2 -2 8.29745 -2 21H2ZM13.5902 38.5014C6.77466 35.6119 2 28.8612 2 21H-2C-2 30.5231 3.78731 38.69 12.0288 42.1841L13.5902 38.5014ZM22.8462 59.2308L14.6556 39.5736L10.9633 41.112L19.1538 60.7692L22.8462 59.2308ZM27.3444 39.5736L19.1538 59.2308L22.8462 60.7692L31.0367 41.112L27.3444 39.5736Z" fill="black" mask="url(#path-1-inside-1_11_64)"/>
    <circle cx="21" cy="21" r="14" fill="white" stroke="black" stroke-width="2"/>
    <path d="M16.4166 26.6667C15.1528 26.6667 14.0729 26.2292 13.1771 25.3542C12.2812 24.4792 11.8333 23.4097 11.8333 22.1458C11.8333 21.0625 12.1597 20.0972 12.8125 19.25C13.4653 18.4028 14.3194 17.8611 15.375 17.625C15.7222 16.3472 16.4166 15.3125 17.4583 14.5208C18.5 13.7292 19.6805 13.3333 21 13.3333C22.625 13.3333 24.0035 13.8993 25.1354 15.0312C26.2673 16.1632 26.8333 17.5417 26.8333 19.1667C27.7916 19.2778 28.5868 19.691 29.2187 20.4062C29.8507 21.1215 30.1666 21.9583 30.1666 22.9167C30.1666 23.9583 29.8021 24.8437 29.0729 25.5729C28.3437 26.3021 27.4583 26.6667 26.4166 26.6667H16.4166ZM16.4166 25H26.4166C27 25 27.493 24.7986 27.8958 24.3958C28.2986 23.993 28.5 23.5 28.5 22.9167C28.5 22.3333 28.2986 21.8403 27.8958 21.4375C27.493 21.0347 27 20.8333 26.4166 20.8333H25.1666V19.1667C25.1666 18.0139 24.7604 17.0312 23.9479 16.2187C23.1354 15.4062 22.1528 15 21 15C19.8472 15 18.8646 15.4062 18.0521 16.2187C17.2396 17.0312 16.8333 18.0139 16.8333 19.1667H16.4166C15.6111 19.1667 14.9236 19.4514 14.3541 20.0208C13.7847 20.5903 13.5 21.2778 13.5 22.0833C13.5 22.8889 13.7847 23.5764 14.3541 24.1458C14.9236 24.7153 15.6111 25 16.4166 25Z" fill="black"/>
    </svg>

  `
);

const PublicMarker = (color) => (
  `
    <svg width="42" height="60" viewBox="0 0 42 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_12_10" fill="white">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z"/>
    </mask>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z" fill="${color}"/>
    <path d="M29.1905 40.3428L28.4098 38.5014L27.6583 38.8201L27.3444 39.5736L29.1905 40.3428ZM12.8095 40.3428L14.6556 39.5736L14.3417 38.8201L13.5902 38.5014L12.8095 40.3428ZM21 60L19.1538 60.7692L21 65.2L22.8462 60.7692L21 60ZM40 21C40 28.8612 35.2253 35.6119 28.4098 38.5014L29.9712 42.1841C38.2127 38.69 44 30.5231 44 21H40ZM21 2C31.4934 2 40 10.5066 40 21H44C44 8.29745 33.7026 -2 21 -2V2ZM2 21C2 10.5066 10.5066 2 21 2V-2C8.29745 -2 -2 8.29745 -2 21H2ZM13.5902 38.5014C6.77466 35.6119 2 28.8612 2 21H-2C-2 30.5231 3.78731 38.69 12.0288 42.1841L13.5902 38.5014ZM22.8462 59.2308L14.6556 39.5736L10.9633 41.112L19.1538 60.7692L22.8462 59.2308ZM27.3444 39.5736L19.1538 59.2308L22.8462 60.7692L31.0367 41.112L27.3444 39.5736Z" fill="black" mask="url(#path-1-inside-1_12_10)"/>
    <circle cx="21" cy="21" r="14" fill="white" stroke="black" stroke-width="2"/>
    <path d="M16 17.6667H23.5V16C23.5 15.3056 23.257 14.7153 22.7708 14.2292C22.2847 13.7431 21.6945 13.5 21 13.5C20.3056 13.5 19.7153 13.7431 19.2292 14.2292C18.7431 14.7153 18.5 15.3056 18.5 16H16.8333C16.8333 14.8472 17.2396 13.8646 18.0521 13.0521C18.8646 12.2396 19.8472 11.8333 21 11.8333C22.1528 11.8333 23.1354 12.2396 23.9479 13.0521C24.7604 13.8646 25.1667 14.8472 25.1667 16V17.6667H26C26.4583 17.6667 26.8507 17.8299 27.1771 18.1562C27.5035 18.4826 27.6667 18.875 27.6667 19.3333V27.6667C27.6667 28.125 27.5035 28.5174 27.1771 28.8437C26.8507 29.1701 26.4583 29.3333 26 29.3333H16C15.5417 29.3333 15.1493 29.1701 14.8229 28.8437C14.4965 28.5174 14.3333 28.125 14.3333 27.6667V19.3333C14.3333 18.875 14.4965 18.4826 14.8229 18.1562C15.1493 17.8299 15.5417 17.6667 16 17.6667ZM16 27.6667H26V19.3333H16V27.6667ZM21 25.1667C21.4583 25.1667 21.8507 25.0035 22.1771 24.6771C22.5035 24.3507 22.6667 23.9583 22.6667 23.5C22.6667 23.0417 22.5035 22.6493 22.1771 22.3229C21.8507 21.9965 21.4583 21.8333 21 21.8333C20.5417 21.8333 20.1493 21.9965 19.8229 22.3229C19.4965 22.6493 19.3333 23.0417 19.3333 23.5C19.3333 23.9583 19.4965 24.3507 19.8229 24.6771C20.1493 25.0035 20.5417 25.1667 21 25.1667Z" fill="black"/>
    </svg>
  `
);

const PrivateMarker = (color) => (
  `
    <svg width="42" height="60" viewBox="0 0 42 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-inside-1_12_2" fill="white">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z"/>
    </mask>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M29.1905 40.3428C36.719 37.1509 42 29.6922 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 29.6922 5.28099 37.1509 12.8095 40.3428L21 60L29.1905 40.3428Z" fill="${color}"/>
    <path d="M29.1905 40.3428L28.4098 38.5014L27.6583 38.8201L27.3444 39.5736L29.1905 40.3428ZM12.8095 40.3428L14.6556 39.5736L14.3417 38.8201L13.5902 38.5014L12.8095 40.3428ZM21 60L19.1538 60.7692L21 65.2L22.8462 60.7692L21 60ZM40 21C40 28.8612 35.2253 35.6119 28.4098 38.5014L29.9712 42.1841C38.2127 38.69 44 30.5231 44 21H40ZM21 2C31.4934 2 40 10.5066 40 21H44C44 8.29745 33.7026 -2 21 -2V2ZM2 21C2 10.5066 10.5066 2 21 2V-2C8.29745 -2 -2 8.29745 -2 21H2ZM13.5902 38.5014C6.77466 35.6119 2 28.8612 2 21H-2C-2 30.5231 3.78731 38.69 12.0288 42.1841L13.5902 38.5014ZM22.8462 59.2308L14.6556 39.5736L10.9633 41.112L19.1538 60.7692L22.8462 59.2308ZM27.3444 39.5736L19.1538 59.2308L22.8462 60.7692L31.0367 41.112L27.3444 39.5736Z" fill="black" mask="url(#path-1-inside-1_12_2)"/>
    <circle cx="21" cy="21" r="14" fill="white" stroke="black" stroke-width="2"/>
    <path d="M16 29.3333C15.5416 29.3333 15.1493 29.1701 14.8229 28.8437C14.4965 28.5174 14.3333 28.125 14.3333 27.6667V19.3333C14.3333 18.875 14.4965 18.4826 14.8229 18.1562C15.1493 17.8299 15.5416 17.6667 16 17.6667H16.8333V16C16.8333 14.8472 17.2396 13.8646 18.0521 13.0521C18.8646 12.2396 19.8472 11.8333 21 11.8333C22.1528 11.8333 23.1354 12.2396 23.9479 13.0521C24.7604 13.8646 25.1666 14.8472 25.1666 16V17.6667H26C26.4583 17.6667 26.8507 17.8299 27.1771 18.1562C27.5035 18.4826 27.6666 18.875 27.6666 19.3333V27.6667C27.6666 28.125 27.5035 28.5174 27.1771 28.8437C26.8507 29.1701 26.4583 29.3333 26 29.3333H16ZM16 27.6667H26V19.3333H16V27.6667ZM21 25.1667C21.4583 25.1667 21.8507 25.0035 22.1771 24.6771C22.5035 24.3507 22.6666 23.9583 22.6666 23.5C22.6666 23.0417 22.5035 22.6493 22.1771 22.3229C21.8507 21.9965 21.4583 21.8333 21 21.8333C20.5416 21.8333 20.1493 21.9965 19.8229 22.3229C19.4965 22.6493 19.3333 23.0417 19.3333 23.5C19.3333 23.9583 19.4965 24.3507 19.8229 24.6771C20.1493 25.0035 20.5416 25.1667 21 25.1667ZM18.5 17.6667H23.5V16C23.5 15.3056 23.2569 14.7153 22.7708 14.2292C22.2847 13.7431 21.6944 13.5 21 13.5C20.3055 13.5 19.7153 13.7431 19.2291 14.2292C18.743 14.7153 18.5 15.3056 18.5 16V17.6667Z" fill="black"/>
    </svg>
  `
);

function createMarker(marker, markersType, markerColor) {
  const MarkerConfig = () => {
    const color = () => {
      if (markerColor)
        return markerColor;

      if (markersType === 'node' && marker.is_visible)
        return '#0284c7';

      if (markersType === 'node' && marker.color)
        return marker.color;

      return '#0284c7';
    };

    switch (markersType) {
      case 'location':
        return (marker.is_visible) ? PublicMarker(color()) : PrivateMarker(color());
      case 'node':
        return (marker.is_indoor) ? IndoorMarker(color()) : OutdoorMarker(color());
      default: return RegularMarker(color());
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
}

const mapCenter = [8.322376, -62.689662];
const mapZoom = 13;

const southWestBound = [8.183530, -62.878919];
const northEastBound = [8.398253, -62.539415];

const getPos = (coordinate, type) => {
  if (type === 'lat') {
    if (coordinate < southWestBound[0])
      return southWestBound[0];

    if (coordinate > northEastBound[0])
      return northEastBound[0];

    return coordinate;
  }

  if (coordinate < southWestBound[1])
    return southWestBound[1];

  if (coordinate > northEastBound[1])
    return northEastBound[1];

  return coordinate;
};

const RecenterAutomatically = ({ recenter }) => {
  const map = useMap();

  if (recenter) {
    map.setView(mapCenter, mapZoom);
  }
  return null;
};

const Recenter = ({ position }) => {
  const map = useMap();

  map.setView(position, 18);

  return null;
};

const MapEvents = ({ setCoordenates }) => {
  useMapEvents({
    click(e) {
      setCoordenates({
        lat: getPos(e.latlng.lat.toFixed(6), 'lat'),
        long: getPos(e.latlng.lng.toFixed(6), 'long'),
      });
    },
  });
  return false;
};

const markerPopUp = (markersType, marker) => {
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

const MapBase = ({
  markersQuantity,
  markerList, markersType, markerColor, onMarkerClick,
  coordinates, setCoordenates, recenter,
  hideZoomControl, isNotFullScreen,
}) => {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const currentMarker = markerRef.current;

        if (currentMarker != null) {
          setCoordenates({
            lat: getPos(currentMarker.getLatLng().lat.toFixed(6), 'lat'),
            long: getPos(currentMarker.getLatLng().lng.toFixed(6), 'long'),
          });
        }
      },
    }),
    [],
  );

  const populateMap = () => {
    switch (markersQuantity) {
      case 'many':
        return (
          markerList.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.long}`}
              icon={createMarker(marker, markersType, markerColor)}
              position={[marker.lat, marker.long]}
              eventHandlers={{
                click: () => onMarkerClick(marker),
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
              }}
            >
              <Popup minWidth="250" closeButton={false}>
                {markerPopUp(markersType, marker)}
              </Popup>
            </Marker>
          ))
        );
      case 'one':
        return (
          <>
            <Marker
              icon={createMarker(null, null, markerColor)}
              draggable
              eventHandlers={eventHandlers}
              position={[coordinates.lat, coordinates.long]}
              ref={markerRef}
            />
            <RecenterAutomatically recenter={recenter} />
            <MapEvents setCoordenates={setCoordenates} />
          </>
        );
      case 'oneToShow':
        return (
          <>
            <Marker
              icon={createMarker(null, null, markerColor)}
              position={[coordinates.lat, coordinates.long]}
            />
            <Recenter position={[coordinates.lat, coordinates.long]} />
          </>
        );
      default:
        return (null);
    }
  };

  return (
    <MapContainer
      center={(markersQuantity === 'oneToShow') ? [coordinates.lat, coordinates.long] : mapCenter}
      zoom={(markersQuantity === 'oneToShow') ? '18' : mapZoom}
      zoomControl={false}
      minZoom={12}
      maxBounds={[southWestBound, northEastBound]}
      maxBoundsViscosity={0.75}
      scrollWheelZoom
      attributionControl={false}
      className={`${!isNotFullScreen && 'fixed top-0 '} z-0 size-full`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {!hideZoomControl && <ZoomControl position="bottomright" />}

      {populateMap()}
    </MapContainer>
  );
};

export default MapBase;
