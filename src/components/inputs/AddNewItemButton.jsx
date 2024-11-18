import React from 'react';

import { addIcon } from 'src/assets';

const AddNewItemButton = ({ text, onClick }) => (
  <li className="h-fit w-full border-b bg-white px-5 py-2.5 shadow hover:bg-slate-100">
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
  </li>
);

export default AddNewItemButton;
