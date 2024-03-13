import { React } from 'react';

import {
  Divider, SelectionBar, ToggleNodeVisibility,
} from 'src/components';

const VisibilitySelection = ({
  visibility, setVisibility, leftButtonClick, rightButtonClick,
}) => (
  <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-2.5">
    <SelectionBar
      text="Selecionar Visibilidad"
      leftAction={leftButtonClick}
      rightAction={rightButtonClick}
    />

    <Divider changePadding="p-[5px]" />

    <div className="flex">
      <ToggleNodeVisibility
        selectedVisibility={visibility}
        selectVisibility={setVisibility}
      />
    </div>
  </div>
);

export default VisibilitySelection;
