import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

import './style.css';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.querySelector('#root'));