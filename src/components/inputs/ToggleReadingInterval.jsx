import React from 'react';

import { Label } from 'src/components/ui';

const ToggleOption = ({
  option, selectedOption, select, isDisabled,
}) => {
  const getColor = () => {
    if (selectedOption === option.value) {
      return 'bg-main rounded-lg text-white';
    }

    return `${isDisabled ? 'bg-disabled' : 'bg-white'} text-slate-400`;
  };

  return (
    <button
      type="button"
      className={`${getColor()} flex w-1/2 flex-col items-center justify-center p-1 text-sm`}
      onClick={isDisabled ? undefined : select}
      disabled={isDisabled}
    >
      {option.text}
    </button>
  );
};

const ToggleReadingInterval = ({
  selectedOption, setSelectedOption, isDisabled,
}) => (
  <div>
    <Label text="Intervalo de Lectura" />

    <div className={`${isDisabled ? 'bg-disabled' : 'bg-white'} flex h-fit w-full overflow-hidden rounded-lg border-2 font-medium`}>
      <ToggleOption
        option={{ text: '10m', value: 10 }}
        selectedOption={selectedOption}
        select={() => setSelectedOption(10)}
        isDisabled={isDisabled}
      />

      <ToggleOption
        option={{ text: '15m', value: 15 }}
        selectedOption={selectedOption}
        select={() => setSelectedOption(15)}
        isDisabled={isDisabled}
      />

      <ToggleOption
        option={{ text: '30m', value: 30 }}
        selectedOption={selectedOption}
        select={() => setSelectedOption(30)}
        isDisabled={isDisabled}
      />
      <ToggleOption
        option={{ text: '60m', value: 60 }}
        selectedOption={selectedOption}
        select={() => setSelectedOption(60)}
        isDisabled={isDisabled}
      />
    </div>
  </div>
);

export default ToggleReadingInterval;
