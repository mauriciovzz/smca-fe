import { React } from 'react';

import { control } from 'src/assets';

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
              src={control}
              alt="control arrow"
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
              src={control}
              alt="control arrow"
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
