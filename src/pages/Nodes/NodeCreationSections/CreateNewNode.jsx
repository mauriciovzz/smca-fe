import { React } from 'react';

import { Divider, SelectionBar } from 'src/components';

const CreateNewNode = ({ createNode, leftButtonClick }) => (
  <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-2.5">
    <SelectionBar
      text="Finalizar"
      leftAction={leftButtonClick}
    />

    <Divider changePadding="p-[5px]" />

    <div className="flex h-full w-full flex-col items-center justify-center">
      <button
        type="button"
        onClick={() => createNode()}
        className="h-1/3 w-1/2 rounded-lg bg-main font-medium text-white shadow hover:bg-main-dark"
      >
        Agregar Nodo
      </button>
    </div>
  </div>
);

export default CreateNewNode;
