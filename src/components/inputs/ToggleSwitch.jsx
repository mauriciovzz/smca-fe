import React from 'react';

import { Divider, Label } from 'src/components/ui';

const ToggleOption = ({ side, option, selectedOption }) => {
  const getUI = () => {
    if (selectedOption === option.value) {
      if (side === 'left')
        return `${option.color} rounded-r-2xl text-white`;

      return `${option.color} rounded-l-2xl text-white`;
    }
    return 'bg-white text-slate-400';
  };

  return (
    <button
      type="button"
      className={`${getUI()} flex w-1/2 flex-col items-center justify-center p-1`}
      onClick={!option.onClick ? undefined : () => option.onClick()}
      disabled={!option.onClick}
    >
      <div className="text-sm">
        {option.title}
      </div>

      {
        (option.text) && (
          <>
            <Divider changePadding="p-[2.5px]" changeColor={(selectedOption === option.value) ? 'border-white' : 'border-slate-400'} />
            <div className="text-xs">
              {option.text}
            </div>
          </>
        )
      }
    </button>
  );
};

const ToggleSwitch = ({
  labelText, selectedOption, leftOption, rigthOption,
}) => (
  <div>
    <Label text={labelText} />

    <div className="flex h-fit w-full overflow-hidden rounded-2xl border-2 bg-white font-medium ">
      <ToggleOption
        side="left"
        option={leftOption}
        selectedOption={selectedOption}
      />

      <ToggleOption
        side="right"
        option={rigthOption}
        selectedOption={selectedOption}
      />
    </div>
  </div>
);

export default ToggleSwitch;
