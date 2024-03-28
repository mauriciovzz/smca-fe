import React from 'react';

import Divider from './Divider';
import Label from './Label';

const ToggleButton = ({
  labelText, selectedOption, leftOption, rigthOption,
}) => (
  <div>
    <Label text={labelText} />
    <div className="flex h-fit w-full overflow-hidden rounded-2xl border-2 bg-white font-medium ">
      <button
        type="button"
        className={`
          ${(selectedOption === leftOption.value) ? `${leftOption.color} rounded-r-2xl text-white` : 'bg-white text-slate-400'} 
          flex w-1/2 flex-col items-center justify-center p-1
        `}
        onClick={!leftOption.onClick ? undefined : () => leftOption.onClick()}
        // eslint-disable-next-line no-unneeded-ternary
        disabled={leftOption.onClick ? false : true}
      >
        <div className="text-sm">
          {leftOption.title}
        </div>
        {
          (leftOption.text) && (
            <>
              <Divider changePadding="p-[2.5px]" changeColor={(selectedOption === leftOption.value) ? 'border-white' : 'border-slate-400'} />
              <div className="text-xs">
                {leftOption.text}
              </div>
            </>

          )
        }
      </button>

      <button
        type="button"
        className={`
          ${(selectedOption === rigthOption.value) ? `${rigthOption.color} rounded-l-2xl text-white` : 'bg-white text-slate-400'} 
          flex w-1/2 flex-col items-center justify-center p-1
        `}
        onClick={!rigthOption.onClick ? undefined : () => rigthOption.onClick()}
        // eslint-disable-next-line no-unneeded-ternary
        disabled={rigthOption.onClick ? false : true}
      >
        <div className="text-sm">
          {rigthOption.title}
        </div>
        {
          (rigthOption.text) && (
            <>
              <Divider changePadding="p-[2.5px]" changeColor={(selectedOption === rigthOption.value) ? 'border-white' : 'border-slate-400'} />
              <div className="text-xs">
                {rigthOption.text}
              </div>
            </>

          )
        }
      </button>
    </div>
  </div>
);

export default ToggleButton;
