import { React } from 'react';

import { arrowIcon } from 'src/assets';

const SelectionBar = ({ text, leftAction, rightAction }) => (
  <div className="flex justify-between border-b py-1.5">
    {
      (leftAction)
        ? (
          <button type="button" onClick={() => leftAction()}>
            <img src={arrowIcon} alt="go left arrow" className="sm:w-[30px]" />
          </button>
        )
        : (<div className="w-[24px] sm:w-[30px]" />)
    }

    <div className="flex items-center justify-center font-medium">
      {text}
    </div>

    {
      (rightAction)
        ? (
          <button type="button" onClick={() => rightAction()}>
            <img src={arrowIcon} alt="arrowIcon arrow" className="rotate-180 sm:w-[30px]" />
          </button>
        )
        : (<div className="w-[24px] sm:w-[30px]" />)
    }
  </div>
);

export default SelectionBar;
