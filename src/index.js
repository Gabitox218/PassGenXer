import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GeneradorContraseñas from './componentes/GeneradorContraseñas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GeneradorContraseñas />
  </React.StrictMode>
);
