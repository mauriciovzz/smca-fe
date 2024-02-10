import React from 'react';

import { useOutletContext } from 'react-router-dom';

const NodeManagement = () => {
  const { selectedNode } = useOutletContext();

  if (selectedNode) {
    return (
      <div>
        {selectedNode.node_type}
        {selectedNode.node_id}
      </div>
    );
  }
  return <h1>nada</h1>;
};

export default NodeManagement;
