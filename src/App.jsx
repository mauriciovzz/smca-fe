import { React, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from 'src/components/Navbar';
import PrivateRoutes from 'src/components/PrivateRoutes';
import {
  Map, Reports, Information, Faq, Login, Register, Account, NodeView, NodeList,
  NodeCreation, NodeManagement, LocationView, LocationCreation, LocationManagement,
} from 'src/components/views';
import Footer from 'src/components/Footer';

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="flex h-screen flex-col bg-white ">
      <Navbar />

      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/reportes" element={<Reports />} />
        <Route path="/informacion" element={<Information />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        <Route path="/cuenta" element={<PrivateRoutes />}>
          <Route path="" element={<Account />}>

            <Route path="nodos" element={<NodeView />}>
              <Route path="" element={<NodeList setSelectedNode={setSelectedNode} />} />
              <Route path="crear" element={<NodeCreation />} />
              <Route path=":node_type/:node_id" element={<NodeManagement node={selectedNode} />} />
            </Route>

            <Route path="ubicaciones" element={<LocationView setSelectedLocation={setSelectedLocation} />} />
            <Route path="ubicaciones/crear" element={<LocationCreation />} />
            <Route path="ubicaciones/:lat/:long" element={<LocationManagement location={selectedLocation} />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>

      <Footer />

      <ToastContainer />
    </div>
  );
};

export default App;
