import { React } from 'react';

const getBackgroundColor = (color) => {
  switch (color) {
    case 'green':
      return 'bg-activo';
    case 'yellow':
      return 'bg-inactivo';
    case 'red':
      return 'bg-terminado';
    case 'sky':
      return 'bg-outdoor';
    case 'stone':
      return 'bg-indoor';
    default:
      return 'bg-white';
  }
};

const OptionButton = ({
  type, description, color, selected, onClick,
}) => (
  <button
    type="button"
    onClick={() => onClick()}
    className={`${selected ? 'ring ring-black' : 'hover:bg-slate-100'} flex h-fit w-full overflow-hidden rounded-xl border`}
  >
    <div className={`${getBackgroundColor(color)} flex h-full w-[100px] items-center justify-center p-2.5 font-medium text-white`}>
      <div>
        {type}
      </div>
    </div>

    <div className="flex flex-1 items-center justify-center p-2.5 text-sm">
      <div>
        {description}
      </div>
    </div>
  </button>
);

export default OptionButton;
