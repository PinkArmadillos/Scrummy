import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './style.css';

const root = createRoot(document.querySelector('#root'));
root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);