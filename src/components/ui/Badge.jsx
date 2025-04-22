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
      case 'other':
        return 'bg-other';

      case 'active':
        return 'bg-[#1ED660]';
      case 'inactive':
        return 'bg-inactive';

      case 'outdoor':
        return 'bg-outdoor';
      case 'indoor':
        return 'bg-indoor';

      case 'public':
        return 'bg-public';
      case 'private':
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
      case 'other':
        return 'otro';

      case 'active':
        return 'activo';
      case 'inactive':
        return 'inactivo';

      case 'public':
        return 'público';
      case 'private':
        return 'privado';

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
      flex items-center justify-center self-center rounded-3xl text-center text-sm font-semibold leading-none text-white
    `}
    >
      <div>
        {getText()}
      </div>
    </div>
  );
};

export default Badge;
