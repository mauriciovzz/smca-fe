import {
  React,
  useState,
  // useEffect,
} from 'react';

import { Map } from 'src/components';
// import nodesService from 'src/services/nodes';

import Modal from './Modal/Modal';

const Home = () => {
  const [nodeList, setNodeList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});

  const selectNode = (node) => {
    setIsOpen(true);
    setSelectedNode(node);
  };

  // useEffect(() => {
  //   nodesService
  //     .getActiveNodes()
  //     .then((activeNodes) => setNodeList(activeNodes));
  // }, []);

  return (
    <>
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
        markersQuantity="many"
        zoomControl
      />

      {isOpen && <Modal selectedNode={selectedNode} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Home;
