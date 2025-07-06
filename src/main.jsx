import React from 'react';
import { createRoot } from 'react-dom/client';
import { GameProvider } from './context/GameContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
)
