import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import GeneradorContraseñas from './GeneradorContraseñas';
import { LangProvider } from './contexto/langContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LangProvider>
    <React.StrictMode>
      <GeneradorContraseñas />
    </React.StrictMode>
  </LangProvider>
);
