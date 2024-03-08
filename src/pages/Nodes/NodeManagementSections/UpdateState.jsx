import { React, useEffect, useState } from 'react';

// import { useOutletContext } from 'react-router-dom';

import {
  Button, Divider, Heading, OptionButton,
} from 'src/components';
import nodesService from 'src/services/nodes';

const UpdateState = ({ nodeState, changeView }) => {
  // const { selectedWorkspace } = useOutletContext();
  const [states, setStates] = useState([]);

  const [selectedState, setSelectedState] = useState(nodeState);

  const getStates = async () => {
    const response = await nodesService.getStates();
    setStates(response);
  };

  useEffect(() => {
    getStates();
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
          states.map((state) => (
            <OptionButton
              key={state.node_state_id}
              type={state.state}
              description={state.description}
              color={state.color}
              onClick={() => setSelectedState(state.state)}
              selected={selectedState === state.state}
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

export default UpdateState;
