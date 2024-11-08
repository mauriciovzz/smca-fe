import React from 'react';

import { addIcon } from 'src/assets';

const AddToListButton = ({ text, onClick }) => (
  <button
    type="button"
    onClick={() => onClick()}
    className="flex w-full items-center justify-center space-x-2.5"
  >
    <img
      src={addIcon}
      alt="add icon"
    />
    <div>{text}</div>
  </button>
);

export default AddToListButton;
