import { React, useState } from 'react';

import useScreenWidth from 'src/hooks/useScreenWidth';

import MapBase from './MapBase';

const ReadingsMap = ({ markersData, markerColor }) => {
  const [isModOpen, setIsModOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});

  const isScreenSmall = useScreenWidth();

  const selectNode = (node) => {
    setIsModOpen(true);
    setSelectedNode(node);
  };

  return (
    <>
      <MapBase
        markersQuantity="many"
        markerList={markersData}
        markersType="node"
        markerColor={markerColor}
        onMarkerClick={selectNode}
        hideZoomControl={isScreenSmall}
      />

      {/* {isModOpen && (
        <NodeReadingsDashboard
          selectedNode={selectedNode}
          setIsModOpen={setIsModOpen}
        />)} */}
    </>
  );
};

export default ReadingsMap;
