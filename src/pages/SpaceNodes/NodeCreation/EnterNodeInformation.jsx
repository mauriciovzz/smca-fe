import { React } from 'react';

import {
  SelectionBar, TextInput, ToggleNodeType,
} from 'src/components/inputs';

const NodeInformation = ({
  name, isIndoor, nextPage,
}) => (
  <div className="flex size-full flex-col gap-2.5 bg-white sm:gap-5">
    <SelectionBar
      text="Información del Nodo"
      rightAction={nextPage}
    />

    <div className="flex flex-col gap-2.5 sm:gap-5">
      <TextInput
        id="name"
        type="text"
        labelText="Nombre"
        value={name.name}
        setValue={name.setName}
      />

      <ToggleNodeType
        selectedType={isIndoor.isIndoor}
        selectType={isIndoor.setIsIndoor}
      />
    </div>
  </div>
);

export default NodeInformation;
