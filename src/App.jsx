import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Map from "./components/Map";
import Footer from "./components/Footer";
import nodeService from "./services/nodes";

const App = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    nodeService
      .getAll()
      .then((initialNodes) =>
        setNodes(initialNodes));
  }, []);

  return (
    <div className="flex h-screen flex-col bg-white ">
      <div className="z-50 flex items-center justify-center px-6 sm:px-16">
        <div className="w-full xl:max-w-[1280px]">
          <Navbar />
        </div>
      </div>

      <Map nodeList={nodes} />

      <div className="flex items-start justify-center px-6 sm:px-16">
        <div className="w-full xl:max-w-[1280px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
