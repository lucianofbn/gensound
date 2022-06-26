import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/js/App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Gensound from './pages/js/Gensound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/gensound" element={<Gensound />} />
    </Routes>
  </Router>
);
