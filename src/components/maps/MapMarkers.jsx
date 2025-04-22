import { React, useState } from 'react';

import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

import { sunIcon, moonIcon, rainIcon } from 'src/assets';
import 'leaflet/dist/leaflet.css';
import './pupup.css';
import { Badge } from 'src/components/ui';
import colorHelper from 'src/utils/colorHelper';

const MarkerPopUp = ({ marker }) => {
  const parseDate = (markerDate) => {
    const startDate = new Date(markerDate);

    return `${(`0${startDate.getDate()}`).slice(-2)}-${(`0${startDate.getMonth() + 1}`).slice(-2)}-${(`0${startDate.getFullYear()}`).slice(-2)}`;
  };

  return (
    <Popup minWidth="350" minHeight="150" closeButton={false} autoClose={false}>
      <div className="flex w-full flex-col gap-1 p-2.5" style={{ backgroundColor: marker.color }}>
        <div className="text-lg font-bold leading-none">
          {marker.node_name}
        </div>

        <div className="flex flex-col leading-none">
          <div className="text-sm font-bold">{marker.location_name}</div>
          <div className="text-xs">{marker.location}</div>
        </div>
      </div>

      <div className="w-full border-b bg-white p-2.5">
        <div className="grid h-fit w-full grid-cols-2 gap-2 sm:flex sm:grid-cols-none">
          <Badge value={marker.is_visible ? 'public' : 'private'} width="w-full" rounded="rounded-lg" />
          <Badge value={marker.is_indoor ? 'indoor' : 'outdoor'} width="w-full" rounded="rounded-lg" />
          <Badge value={marker.is_active ? 'active' : 'inactive'} width="w-full" rounded="rounded-lg" />
          <div className="flex h-[24px] w-full items-center justify-center rounded-lg bg-slate-500">
            <div className="text-sm font-semibold leading-none text-white">{parseDate(marker.start_time_stamp)}</div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

const createCircle = ({ color, reading }) => {
  const { bgColor, borderColor } = color;
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;

  const circleImage = (iconLink) => ` <img
                    src="${iconLink}"
                    alt="precipitation icon"
                    className="size-[10px]"
                  />`;

  const circleInfo = () => {
    switch (reading) {
      case 'no_rain':
        return circleImage(isDay ? sunIcon : moonIcon);
      case 'rain':
        return circleImage(rainIcon);
      default:
        return reading;
    }
  };

  return (
    `<div class="flex ${bgColor} border-2 ${borderColor} rounded-[50%] leading-none font-bold text-black size-[40px] items-center justify-center ">
      ${circleInfo()}
    </div>`
  );
};

const createTextCircleIcon = (markerData) => L.divIcon({
  className: 'custom-circle-marker',
  html: createCircle(markerData),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const CustomMarker = ({ marker, onMarkerClick, markerData }) => {
  const [zIndex, setZIndex] = useState(0);

  return (
    <Marker
      position={[marker.lat, marker.long]}
      icon={createTextCircleIcon(markerData)}
      zIndexOffset={zIndex}
      eventHandlers={{
        click: () => onMarkerClick(),
        mouseover: (event) => {
          event.target.openPopup();
          setZIndex(1000);
        },
        mouseout: (event) => {
          event.target.closePopup();
          setZIndex(0);
        },
      }}
    >
      <MarkerPopUp marker={marker} />
    </Marker>
  );
};

const MapMarkers = ({
  markersData, viewType, selectedVariable, selectedNodeTypes, onMarkerClick,
}) => {
  const getMarkers = () => {
    switch (selectedNodeTypes) {
      case 'indoor':
        return markersData.filter((m) => m.is_indoor);
      case 'outdoor':
        return markersData.filter((m) => !m.is_indoor);
      default:
        return markersData;
    }
  };

  const getMarkerData = (marker) => {
    const hasNoData = {
      color: {
        bgColor: 'bg-black/75',
        borderColor: 'border-black',
      },
      reading: '-',
    };

    const hasData = (reading) => ({
      color: {
        bgColor: 'bg-main/75',
        borderColor: 'border-main',
      },
      reading,
    });

    switch (viewType) {
      case 'ICA':
        if (selectedVariable === 'todas') {
          const criteriaPollutants = ['pm2.5', 'pm10', 'o3', 'no2', 'so2', 'co'];
          const allAqis = criteriaPollutants.map((p) => marker.current_readings[p]?.aqi);

          const allnulls = allAqis.every((item) => item === null);

          if (allnulls)
            return hasNoData;

          const biggestAqi = Math.max(...allAqis);

          return {
            color: colorHelper.getAqiColor(biggestAqi),
            reading: biggestAqi,
          };
        }

        if (marker.current_readings[selectedVariable].aqi) {
          return {
            color: colorHelper.getAqiColor(marker.current_readings[selectedVariable].aqi),
            reading: marker.current_readings[selectedVariable].aqi,
          };
        }

        return hasNoData;
      case 'Concentraciones':
        if (marker.current_readings[selectedVariable].con !== null)
          return hasData(marker.current_readings[selectedVariable].con);
        return {
          color: hasNoData,
        };
      case 'Meteorología':
        if (marker.current_readings[selectedVariable] !== null)
          switch (selectedVariable) {
            case 'temperatura':
              return hasData(`${marker.current_readings[selectedVariable]} °C`);
            case 'humedad':
              return hasData(`${marker.current_readings[selectedVariable]}%`);
            case 'presión':
              return hasData(`${marker.current_readings[selectedVariable]}hPa`);
            case 'precipitación':
              return {
                color: (marker.current_readings[selectedVariable] === 0)
                  ? {
                    bgColor: (new Date().getHours() >= 6 && new Date().getHours() < 18) ? 'bg-aqi2/75' : 'bg-main/75',
                    borderColor: (new Date().getHours() >= 6 && new Date().getHours() < 18) ? 'border-aqi2/75' : 'border-main/75',
                  }
                  : {
                    bgColor: 'bg-main/75',
                    borderColor: 'border-main',
                  },
                reading: (marker.current_readings[selectedVariable] === 0) ? 'no_rain' : 'rain',
              };
            case 'radiación solar':
              return colorHelper.getUvIndexColor(marker.current_readings[selectedVariable]);
            default:
              return hasData(Math.round(marker.current_readings[selectedVariable]));
          }
        return hasNoData;
      default:
        return hasNoData;
    }
  };

  return (
    <>
      {getMarkers().map((marker) => (
        <CustomMarker
          key={`${marker.lat}-${marker.long}`}
          marker={marker}
          onMarkerClick={() => onMarkerClick(marker)}
          markerData={getMarkerData(marker)}
        />
      ))}
    </>
  );
};

export default MapMarkers;
