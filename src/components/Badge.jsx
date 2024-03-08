import { React } from 'react';

const Badge = ({ value, changeHeight, changeWidht }) => {
  const getColor = () => {
    switch (value) {
      case 'admin':
        return 'bg-main';
      case 'Meteorológica':
        return 'bg-meteorological';
      case 'Ambiental':
        return 'bg-enviromental';
      case 'Placa':
        return 'bg-board';
      case 'Sensor':
        return 'bg-sensor';
      case 'Camara':
        return 'bg-camera';
      case 'Pantalla':
        return 'bg-screen';
      case 'Otro':
        return 'bg-other';
      default:
        return 'bg-slate-100';
    }
  };

  const getText = () => {
    switch (value) {
      case 'Ambiental':
        return 'amb';
      case 'Meteorológica':
        return 'met';
      default:
        return value;
    }
  };

  return (
    <div className={`
      ${getColor()} 
      ${!changeHeight ? 'h-[24px]' : changeHeight} 
      ${!changeWidht ? 'w-[60px]' : changeWidht} 
      flex items-center justify-center self-center rounded-3xl text-sm font-medium text-white
    `}
    >
      {getText()}
    </div>
  );
};

export default Badge;
