import { React } from 'react';

import {
  Divider, SelectionBar, TextInput, ToggleNodeType,
} from 'src/components';

const NodeInformation = ({
  name, setName, type, setType, leftButtonClick, rightButtonClick,
}) => (
  <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-2.5">
    <SelectionBar
      text="Información del Nodo"
      leftAction={leftButtonClick}
      rightAction={rightButtonClick}
    />

    <Divider changePadding="p-[5px]" />

    <div className="flex flex-col space-y-5">
      <TextInput
        id="name"
        type="text"
        labelText="Nombre"
        value={name}
        setValue={setName}
      />

      <ToggleNodeType
        selectedType={type}
        selectType={setType}
      />
    </div>
  </div>
);

export default NodeInformation;
