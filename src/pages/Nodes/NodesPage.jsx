import { React, useState } from 'react';
import { Outlet } from 'react-router-dom';

const NodesPage = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <Outlet context={{ selectedNode, setSelectedNode }} />
  );
};

export default NodesPage;
