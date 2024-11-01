import { React } from 'react';

import { arrowIcon } from 'src/assets';

const SelectionBar = ({ text, leftAction, rightAction }) => (
  <div className="flex justify-between">
    {
      (leftAction)
        ? (
          <button
            type="button"
            onClick={() => leftAction()}
          >
            <img
              src={arrowIcon}
              alt="go back arrow"
            />
          </button>
        )
        : (
          <div className="w-[24px]" />
        )
    }

    <div className="font-medium">
      {text}
    </div>

    {
      (rightAction)
        ? (
          <button
            type="button"
            onClick={() => rightAction()}
          >
            <img
              src={arrowIcon}
              alt="arrowIcon arrow"
              className="rotate-180"
            />
          </button>
        )
        : (
          <div className="w-[24px]" />
        )
    }
  </div>
);

export default SelectionBar;
