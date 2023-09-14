import React from 'react';

const NodeManagement = ({ node }) => (
  <div>
    {node.node_type}
    {node.node_id}
  </div>
);

export default NodeManagement;
