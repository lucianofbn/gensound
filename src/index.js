import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/js/App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Gensound from './pages/js/Gensound';
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/gensound" element={<Gensound />} />
      </Routes>
    </Router>
  </Web3ReactProvider>
);

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}