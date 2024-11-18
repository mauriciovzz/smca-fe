import { React } from 'react';

const ComponentLabel = ({ component }) => {
  const getLabelData = () => {
    switch (component.type) {
      case 'board':
        return {
          color: 'text-board',
          text: 'PLACA',
        };
      case 'sensor':
        return {
          color: 'text-sensor',
          text: 'SENSOR',
        };
      case 'rain_detector':
        return {
          color: 'text-rain',
          text: 'DETECTOR DE LLUVIA',
        };
      case 'camera':
        return {
          color: 'text-camera',
          text: 'CAMARA',
        };
      case 'other':
        return {
          color: 'text-other',
          text: 'OTRO',
        };
      default:
        return {
          color: 'text-white',
          text: null,
        };
    }
  };

  const labelData = getLabelData();

  return (
    <div className={`${labelData.color} flex text-left text-xs font-medium`}>
      {labelData.text}
    </div>
  );
};
export default ComponentLabel;
