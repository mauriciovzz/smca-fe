import { React, useState, useEffect } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import nodeLocationService from '../services/nodeLocations';
import AccountBar from './AccountBar';
import NodeView from './nodes/NodeView';
import CreateNode from './nodes/CreateNode';
import ManageNode from './nodes/ManageNode';

const Account = ({ user, setUser }) => {
  const [nodeList, setNodeList] = useState([]);

  useEffect(() => {
    nodeLocationService
      .getAll()
      .then((initialNodes) =>
        setNodeList(initialNodes));
  }, []);

  const match = useMatch('/cuenta/nodos/:node_type/:node_id');
  const node = match
    ? nodeList.find((n) =>
      (n.node_type === match.params.node_type) && (n.node_id === Number(match.params.node_id)))
    : null;

  return (
    <div className="relative flex flex-grow bg-primary-600 ">
      <div className="z-0 flex flex-grow ">

        <div className="flex flex-col w-full px-11 py-5 space-y-5">
          <AccountBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/nodos" element={<NodeView nodeList={nodeList} />} />
            <Route path="/nodos/crear" element={<CreateNode />} />
            <Route path="/nodos/:node_type/:node_id" element={<ManageNode node={node} />} />
          </Routes>
        </div>

      </div>
    </div>
  );
};

export default Account;
