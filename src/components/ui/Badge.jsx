import { React } from 'react';

const Badge = ({
  value, height, width, rounded,
}) => {
  const getColor = () => {
    switch (value) {
      case 'admin':
        return 'bg-main';

      case 'enviromental':
        return 'bg-enviromental';
      case 'meteorological':
        return 'bg-meteorological';

      case 'board':
        return 'bg-board';
      case 'sensor':
        return 'bg-sensor';
      case 'rain_detector':
        return 'bg-rain';
      case 'camera':
        return 'bg-camera';
      case 'screen':
        return 'bg-screen';
      case 'other':
        return 'bg-other';

      case 'Activo':
        return 'bg-active';
      case 'Inactivo':
        return 'bg-inactive';
      case 'Terminado':
        return 'bg-terminated';
      case 'Outdoor':
        return 'bg-outdoor';
      case 'Indoor':
        return 'bg-indoor';
      case 'Público':
        return 'bg-public';
      case 'Privado':
        return 'bg-private';
      default:
        return 'bg-slate-100';
    }
  };

  const getText = () => {
    switch (value) {
      case 'enviromental':
        return 'amb';
      case 'meteorological':
        return 'met';

      case 'board':
        return 'placa';
      case 'sensor':
        return 'sensor';
      case 'rain_detector':
        return 'detector de lluvia';
      case 'camera':
        return 'camara';
      case 'screen':
        return 'pantalla';
      case 'other':
        return 'otro';

      default:
        return value;
    }
  };

  return (
    <div className={`
      ${getColor()} 
      ${!height ? 'h-[24px]' : height} 
      ${!width ? 'w-[60px]' : width} 
      ${!rounded ? 'rounded-3xl' : rounded} 
      flex items-center justify-center self-center rounded-3xl text-center text-sm font-medium text-white
    `}
    >
      <div>
        {getText()}
      </div>
    </div>
  );
};

export default Badge;
