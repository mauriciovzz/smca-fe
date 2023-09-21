import React from 'react';

const NodeManagement = ({ node }) => {
  if (node) {
    return (
      <div>
        {node.node_type}
        {node.node_id}
      </div>
    );
  }
  return <h1>nada</h1>;
};

export default NodeManagement;
