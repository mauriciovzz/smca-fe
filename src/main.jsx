import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

import './index.css';
import 'leaflet/dist/leaflet.css';

import 'react-tooltip/dist/react-tooltip.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>,
);
