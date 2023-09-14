import { React, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Map from './components/views/map/Map';
import Reports from './components/views/Reports';
import Information from './components/views/Information';
import Faq from './components/views/Faq';
import Login from './components/views/Login';
import Register from './components/views/Register';
import Account from './components/views/account/Account';
import Footer from './components/Footer';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSmcaUser');
    if (loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON);
      setUser(userInfo);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col bg-white ">
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/reportes" element={<Reports />} />
        <Route path="/informacion" element={<Information />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/registro" element={<Register setUser={setUser} />} />
        {
          user
            ? <Route path="/cuenta/*" element={<Account user={user} setUser={setUser} />} />
            : null
        }
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
