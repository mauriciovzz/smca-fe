import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from './SideBar';
import NodeView from './accountViews/nodes/NodeView';
import NodeCreation from './accountViews/nodes/NodeCreation';
import NodeManagement from './accountViews/nodes/NodeManagement';
import LocationView from './accountViews/locations/LocationView';
import LocationCreation from './accountViews/locations/LocationCreation';
import LocationManagement from './accountViews/locations/LocationManagement';

const Account = ({ setUser }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="flex grow bg-slate-100 ">
      <div className="flex w-full space-x-5 p-5">
        <SideBar setUser={setUser} />

        <Routes>
          <Route path="/nodos" element={<NodeView setSelectedNode={setSelectedNode} />} />
          <Route path="/nodos/crear" element={<NodeCreation />} />
          <Route path="/nodos/:node_type/:node_id" element={<NodeManagement node={selectedNode} />} />

          <Route path="/ubicaciones" element={<LocationView setSelectedLocation={setSelectedLocation} />} />
          <Route path="/ubicaciones/crear" element={<LocationCreation />} />
          <Route path="/ubicaciones/:lat/:long" element={<LocationManagement location={selectedLocation} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Account;
