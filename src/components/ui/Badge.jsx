import { React } from 'react';

const Badge = ({
  value, height, width, rounded,
}) => {
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
      case 'Sensor de Lluvia':
        return 'bg-rain-sensor';
      case 'Camara':
        return 'bg-camera';
      case 'Pantalla':
        return 'bg-screen';
      case 'Otro':
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
      case 'Ambiental':
        return 'amb';
      case 'Meteorológica':
        return 'met';
      case 'Sensor de Lluvia':
        return 'Lluvia';
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
      flex items-center justify-center self-center rounded-3xl text-xs font-semibold text-white
    `}
    >
      <div>
        {getText()}
      </div>
    </div>
  );
};

export default Badge;
