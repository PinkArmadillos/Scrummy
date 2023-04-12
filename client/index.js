import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DragDropContext } from 'react-beautiful-dnd';
import App from './App';


import './style.css';

const root = createRoot(document.querySelector('#root'));
root.render(
  <StrictMode>
    <DragDropContext>
        <App/>
    </DragDropContext>
  </StrictMode>
);