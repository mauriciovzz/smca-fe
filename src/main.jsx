import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AxiosInterceptor from 'src/services/AxiosInterceptor';

import App from './App';
import { AuthProvider } from './context/authProvider';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import 'weather-icons/css/weather-icons.css';
import 'leaflet/dist/leaflet.css';
import 'regenerator-runtime';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AxiosInterceptor>
          <App />
          <ToastContainer />
        </AxiosInterceptor>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
