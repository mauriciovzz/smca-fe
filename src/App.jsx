import { React, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Map from './components/Map';
import Report from './components/Report';
import Information from './components/Information';
import Faq from './components/Faq';
import Login from './components/Login';
import Footer from './components/Footer';
import nodeLocationService from './services/nodeLocations';

const App = () => {
  const [user, setUser] = useState(null);
  const [nodeList, setNodeList] = useState([]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON);
      setUser(userInfo);
    }
  }, []);

  useEffect(() => {
    nodeLocationService
      .getAll()
      .then((initialNodes) =>
        setNodeList(initialNodes));
  }, []);

  return (
    <div className="flex h-screen flex-col bg-white ">
      <div className="z-50 flex items-center justify-center px-6 sm:px-16">
        <div className="w-full xl:max-w-[1280px]">
          <Navbar />
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Map nodeList={nodeList} />} />
        <Route path="/reportes" element={<Report />} />
        <Route path="/informacion" element={<Information />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>

      <div className="flex items-start justify-center px-6 sm:px-16">
        <div className="w-full xl:max-w-[1280px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
