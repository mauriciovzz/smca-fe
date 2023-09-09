import React from 'react';

const ManageNode = ({ node }) =>
  (
    <div>
      {node.node_type}
      {node.node_id}
    </div>
  );

export default ManageNode;
