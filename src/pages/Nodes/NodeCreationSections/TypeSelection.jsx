import { React, useEffect, useState } from 'react';

import { Divider, Label, SelectionBar } from 'src/components';
import nodesService from 'src/services/nodes';
import notifications from 'src/utils/notifications';

const TypeSelection = ({
  SelectedType, selectType, selectedVisibility, selectVisibility, leftButtonClick, rightButtonClick,
}) => {
  const [nodeTypes, setNodeTypes] = useState([]);

  const getTypes = async () => {
    try {
      const response = await nodesService.getTypes();
      setNodeTypes(response);
    } catch (err) {
      notifications.error(err);
    }
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg border bg-white p-2.5">
      <SelectionBar
        text="Selecionar Tipos"
        leftAction={leftButtonClick}
        rightAction={rightButtonClick}
      />

      <Divider changePadding="p-[5px]" />

      <div className="flex flex-col space-y-5">
        <div className="w-full">
          <Label text="Tipo" />
          <select
            name="nodeType"
            id="nodeType"
            value={JSON.stringify(SelectedType)}
            onChange={(event) => selectType(event.target.value)}
            className="h-[38px] w-full rounded-lg border border-gray-300 px-1 py-0.5 focus:border-main focus:ring-1 focus:ring-main"
          >
            <option value={JSON.stringify({})} disabled hidden> </option>
            {
              nodeTypes
                .map((nt) => (
                  <option
                    key={nt.node_type_id}
                    value={JSON.stringify(nt)}
                  >
                    {nt.type}
                  </option>
                ))
            }
          </select>
        </div>

        <div className="w-full">
          <Label text="Visibilidad" />
          <select
            name="nodeVisibility"
            id="nodeVisibility"
            value={JSON.stringify(selectedVisibility)}
            onChange={(event) => selectVisibility(event.target.value)}
            className="h-[38px] w-full rounded-lg border border-gray-300 px-1 py-0.5 focus:border-main focus:ring-1 focus:ring-main"
          >
            <option value={JSON.stringify({})} disabled hidden> </option>
            <option value={JSON.stringify({ is_visible: true, type: 'Publico' })}>Publico</option>
            <option value={JSON.stringify({ is_visible: false, type: 'Privado' })}>Privado</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TypeSelection;
