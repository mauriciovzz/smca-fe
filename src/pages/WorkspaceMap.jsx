import { React, useState } from 'react';

import { Map } from 'src/components';

const WorkspaceMap = () => {
  const [nodeList, setNodeList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});

  const selectNode = (node) => {
    setIsOpen(true);
    setSelectedNode(node);
  };

  return (
    <Map
      markerList={nodeList}
      onMarkerClick={selectNode}
      markerPopup={(node) => (
        <>
          <b>
            {(node.node_type === 'OUT') ? 'Outdoor' : 'Indoor'}
            -
            {node.node_id}
          </b>
          <br />
          {node.location_name}
        </>
      )}
      nodesToRender="many"
    />
  );
};

export default WorkspaceMap;
