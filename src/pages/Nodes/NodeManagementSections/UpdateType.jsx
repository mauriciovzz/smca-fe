import { React, useEffect, useState } from 'react';

// import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, OptionButton,
} from 'src/components';
import nodesService from 'src/services/nodes';

const UpdateType = ({ nodeType, changeView }) => {
  // const { selectedWorkspace } = useOutletContext();
  const [types, setTypes] = useState([]);

  const [selectedType, setSelectedType] = useState(nodeType);

  const getTypes = async () => {
    const response = await nodesService.getTypes();
    setTypes(response);
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <div className="flex grow flex-col rounded-lg bg-white p-5 shadow">
      <Heading
        text="Actualizar Estado"
        hasButton
        onButtonClick={() => changeView('ManagementMenu')}
      />

      <Divider />

      <div className="flex grow flex-col space-y-5">
        {
          types.map((type) => (
            <OptionButton
              key={type.node_type_id}
              type={type.type}
              description={type.description}
              color={type.color}
              onClick={() => setSelectedType(type.type)}
              selected={selectedType === type.type}
            />
          ))
        }
      </div>

      <Button
        text="Guardar Cambios"
        typeIsButton
        onClick={undefined}
        color="blue"
      />
    </div>
  );
};

export default UpdateType;
