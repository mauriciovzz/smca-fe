import React from 'react';

import { Divider, Label } from 'src/components/ui';

const ToggleOption = ({
  side, option, selectedOption, isDisabled,
}) => {
  const getUI = () => {
    if (selectedOption === option.value) {
      if (side === 'left')
        return `${option.color} rounded-r-lg text-white`;

      return `${option.color} rounded-l-lg text-white`;
    }
    return `${isDisabled ? 'bg-disabled' : 'bg-white'} text-slate-400`;
  };

  return (
    <button
      type="button"
      className={`${getUI()} flex w-1/2 flex-col items-center justify-center p-1`}
      onClick={isDisabled ? undefined : option.onClick}
      disabled={isDisabled}
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
  labelText, selectedOption, leftOption, rigthOption, isDisabled,
}) => (
  <div>
    {(labelText) && <Label text={labelText} />}

    <div className={`${isDisabled ? 'bg-disabled' : 'bg-white'} flex h-fit w-full overflow-hidden rounded-lg border-2 font-medium`}>
      <ToggleOption
        side="left"
        option={leftOption}
        selectedOption={selectedOption}
        isDisabled={isDisabled}
      />

      <ToggleOption
        side="right"
        option={rigthOption}
        selectedOption={selectedOption}
        isDisabled={isDisabled}
      />
    </div>
  </div>
);

export default ToggleSwitch;
