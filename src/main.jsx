import React from 'react';

import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from 'src/context/AuthProvider';

import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import '../index.css';
import 'weather-icons/css/weather-icons.css';
import 'leaflet/dist/leaflet.css';
import 'regenerator-runtime';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>,
);
